import User from "@/database/user.model";
import dbConnect from "@/lib/mongoose";
import { handleError } from "@/lib/handlers/error";
import { NextResponse } from "next/server";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { UserSchema } from "@/lib/validations";
import { flattenError } from "zod";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();
    const validatedData = UserSchema.partial().safeParse({ email });
    if (!validatedData.success) {
      throw new ValidationError(flattenError(validatedData.error).fieldErrors);
    }
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ApiErrorResponse;
  }
}
