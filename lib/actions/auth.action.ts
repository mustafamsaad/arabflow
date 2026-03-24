"use server";

import { handleError } from "@/lib/handlers/error";
import action from "@/lib/handlers/action";
import { SignInSchema, SignUpSchema } from "../validations";
import mongoose from "mongoose";
import User from "@/database/user.model";
import { NotFoundError } from "@/lib/http-errors";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn } from "@/auth";

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">,
): Promise<ActionResponse> {
  const validatedResult = await action({ params, schema: SignInSchema });
  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { email, password } = validatedResult.params!;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = await Account.findOne({ userId: existingUser._id });
    if (!existingAccount) throw new NotFoundError("Account");

    const isValidPassword = await bcrypt.compare(
      password,
      existingAccount.password,
    );
    if (!isValidPassword) throw new Error("Invalid credentials");

    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function signUpWithCredentials(
  params: AuthCredentials,
): Promise<ActionResponse> {
  const validatedResult = await action({ params, schema: SignUpSchema });
  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { name, email, password, username } = validatedResult.params!;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) throw new Error("Email already exists");

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await User.create([{ name, email, username }], {
      session,
    });
    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          password: hashedPassword,
          provider: "credentials",
          providerAccountId: email,
        },
      ],
      { session },
    );
    await session.commitTransaction();
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
