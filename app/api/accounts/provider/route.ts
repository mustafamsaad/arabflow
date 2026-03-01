import Account from "@/database/account.model";
import dbConnect from "@/lib/mongoose";
import { handleError } from "@/lib/handlers/error";
import { NextResponse } from "next/server";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import { flattenError } from "zod";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { providerAccountId } = await request.json();
    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });
    if (!validatedData.success) {
      throw new ValidationError(flattenError(validatedData.error).fieldErrors);
    }
    const account = await Account.findOne({
      providerAccountId,
    });
    if (!account) throw new NotFoundError("Account");
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
