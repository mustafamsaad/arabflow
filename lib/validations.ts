import * as z from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "Invalid email address" }).min(1, {
    message: "Email is required",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

export const SignUpSchema = z.object({
  username: z
    .string({ error: "Required" })
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^\w+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string({ error: "Required" })
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z.email({ message: "Please provide a valid email address." }),

  password: z
    .string({ error: "Required" })
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(130, { message: "Title cannot exceed 130 characters." }),
  content: z
    .string()
    .min(20, { message: "Body must be at least 20 characters." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required." })
        .max(30, { message: "Tag cannot exceed 30 characters." }),
    )
    .min(1, { message: "At least one tag is required." })
    .max(3, { message: "Cannot add more than 3 tags." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^\w+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  email: z.email("Invalid email address"),
  bio: z.string().optional(),
  image: z.url("Invalid image URL").optional(),
  location: z.string().optional(),
  portfolio: z.url("Invalid portfolio URL").optional(),
  reputation: z.number().optional(),
});
