import { RequestError, ValidationError } from "@/lib/http-errors";
import { NextResponse } from "next/server";
import { flattenError, ZodError } from "zod";
import logger from "../logger";

type HandlerResponseType = "api" | "server";

const formateResponse = (
  response: HandlerResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>,
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return response === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

export const handleError = (
  error: unknown,
  responseType: HandlerResponseType = "server",
) => {
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} error: ${error.message}`,
    );
    return formateResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors,
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      flattenError(error).fieldErrors as Record<string, string[]>,
    );
    logger.error(
      { err: validationError },
      `${responseType.toUpperCase()} error: ${validationError.message}`,
    );
    return formateResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors,
    );
  }

  if (error instanceof Error) {
    logger.error({ err: error }, `error: ${error.message}`);
    return formateResponse(responseType, 500, error.message);
  }

  logger.error(
    { err: error },
    `${responseType.toUpperCase()} error: Unexpected error occurred`,
  );
  return formateResponse(responseType, 500, "Unexpected error occurred");
};
