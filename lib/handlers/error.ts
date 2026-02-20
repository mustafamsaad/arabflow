import { RequestError, ValidationError } from "@/lib/http-errors";
import { NextResponse } from "next/server";
import { flattenError, ZodError } from "zod";

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
    return formateResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors,
    );
  }

  if (error instanceof Error) {
    return formateResponse(responseType, 500, error.message);
  }

  return formateResponse(responseType, 500, "Unexpected error occurred");
};
