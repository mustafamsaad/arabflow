import Account from "@/database/account.model";
import User from "@/database/user.model";
import mongoose from "mongoose";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { flattenError } from "zod";
import slugify from "slugify";
import { handleError } from "@/lib/handlers/error";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await dbConnect();

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });
    if (!validatedData.success) {
      throw new ValidationError(flattenError(validatedData.error).fieldErrors);
    }

    const { email, name, image, username } = validatedData.data.user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });
    let existingUser = await User.findOne({
      email,
    }).session(session);

    if (existingUser) {
      existingUser.name = name;
      existingUser.image = image;
      await existingUser.save({ session });
    } else {
      [existingUser] = await User.create(
        [
          {
            name,
            username: slugifiedUsername,
            email,
            image,
          },
        ],
        { session },
      );
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session },
      );
    }

    await session.commitTransaction();
    return NextResponse.json({ success: true });
  } catch (error) {
    await session.abortTransaction();
    return handleError(error, "api") as ApiErrorResponse;
  } finally {
    await session.endSession();
  }
}
