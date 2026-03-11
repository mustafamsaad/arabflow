import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { flattenError, ZodType } from "zod";
import { auth } from "@/auth";
import { Session } from "next-auth";
import dbConnect from "../mongoose";

type ActionParams<T> = {
  params?: T;
  schema?: ZodType<T>;
  authorize?: boolean;
};

const action = async <T>({
  params,
  schema,
  authorize = false,
}: ActionParams<T>): Promise<{ params?: T; session?: unknown } | Error> => {
  if (schema && params) {
    const result = schema.safeParse(params);
    if (!result.success) {
      return new ValidationError(
        flattenError(result.error).fieldErrors as Record<string, string[]>,
      );
    }
  }

  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) return new UnauthorizedError();
  }

  await dbConnect();

  return { params, session };
};

export default action;
