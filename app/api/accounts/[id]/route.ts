import { handleError } from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { AccountSchema, UserSchema } from "@/lib/validations";
import { flattenError } from "zod";
import Account from "@/database/account.model";

// GET /api/accounts/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");
  try {
    await dbConnect();
    const account = await Account.findById(id);
    if (!account) throw new NotFoundError("Account");
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

// PUT /api/accounts/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AccountSchema.partial().safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(flattenError(validatedData.error).fieldErrors);
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validatedData.data,
      {
        new: true,
      },
    );
    if (!updatedAccount) throw new NotFoundError("Account");
    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}

// DELETE /api/accounts/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");
  try {
    await dbConnect();
    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("Account");
    return NextResponse.json({ success: true, data: account }, { status: 204 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
