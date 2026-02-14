"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ZodType } from "zod";
import {
  useForm,
  Controller,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  Path,
  Resolver,
} from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  formType: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T, T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

const AuthForm = <T extends FieldValues>({
  defaultValues,
  onSubmit,
  schema,
  formType,
}: AuthFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const submitHandler: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      form.reset();
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(submitHandler)}>
      <FieldGroup className="mt-10">
        {Object.keys(defaultValues).map((inputField) => (
          <Controller
            key={inputField}
            name={inputField as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="flex w-full flex-col gap-2.5"
              >
                <FieldLabel
                  htmlFor={`form-rhf-demo-${inputField}`}
                  className="paragraph-medium text-dark400_light700"
                >
                  {inputField === "email"
                    ? "Email Address"
                    : inputField.charAt(0).toUpperCase() + inputField.slice(1)}
                </FieldLabel>
                <Input
                  {...field}
                  id={`form-rhf-demo-${inputField}`}
                  type={inputField === "password" ? "password" : "text"}
                  aria-invalid={fieldState.invalid}
                  placeholder={
                    inputField.charAt(0).toUpperCase() + inputField.slice(1)
                  }
                  autoComplete="off"
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium rounded-2 font-inter text-light-900! min-h-12 w-full px-4 py-3"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign in
            </Link>
          </p>
        )}
      </FieldGroup>
    </form>
  );
};

export default AuthForm;
