import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { handleError } from "@/lib/handlers/error";
import Account from "@/database/account.model";
import { ForbiddenError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const accounts = await Account.find({});
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AccountSchema.parse(body);
    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount)
      throw new ForbiddenError("Account already exists for this provider");

    const newAccount = await Account.create(validatedData);
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
