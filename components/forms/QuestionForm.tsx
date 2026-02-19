"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { type MDXEditorMethods } from "@mdxeditor/editor";
import { toast } from "sonner";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AskQuestionSchema } from "@/lib/validations";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

type QuestionFormValues = z.infer<typeof AskQuestionSchema>;

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const [tagInput, setTagInput] = useState("");

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const { isSubmitting } = form.formState;

  const handleAddTag = (
    tag: string,
    field: { value: string[]; onChange: (value: string[]) => void },
  ) => {
    const trimmedTag = tag.trim().toLowerCase();

    if (!trimmedTag) return;

    if (trimmedTag.length > 30) {
      form.setError("tags", {
        message: "Tag cannot exceed 30 characters.",
      });
      return;
    }

    if (field.value.includes(trimmedTag)) {
      form.setError("tags", {
        message: `"${trimmedTag}" is already added.`,
      });
      return;
    }

    if (field.value.length >= 3) {
      form.setError("tags", {
        message: "Cannot add more than 3 tags.",
      });
      return;
    }

    field.onChange([...field.value, trimmedTag]);
    setTagInput("");
    form.clearErrors("tags");
  };

  const handleRemoveTag = (
    tagToRemove: string,
    field: { value: string[]; onChange: (value: string[]) => void },
  ) => {
    field.onChange(field.value.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: { value: string[]; onChange: (value: string[]) => void },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(tagInput, field);
    }
  };

  const onSubmit = async (data: QuestionFormValues) => {
    // TODO: Replace with actual server action / API call when backend is ready
    // For now, we just show a success toast so you can verify the form works
    try {
      console.log("Form submitted:", data);
      toast.success("Question posted successfully!");
      // form.reset(); // Uncomment when you have a real submission
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="mt-10 flex flex-col gap-9">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="question-title"
                className="paragraph-semibold text-dark400_light900"
              >
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="question-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="e.g. How to center a div in CSS?"
                className="paragraph-regular background-light800_dark300 rounded-1.5 no-focus text-dark300_light700 light-border-2 min-h-12 px-6"
              />
              <FieldDescription className="text-light-500 body-regular mt-2.5">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="question-content"
                className="paragraph-semibold text-dark400_light900"
              >
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>
              <Editor
                editorRef={editorRef}
                markdown={field.value || ""}
                onChange={field.onChange}
              />
              <FieldDescription className="text-light-500 body-regular mt-2.5">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="question-tags"
                className="paragraph-semibold text-dark400_light900"
              >
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>

              <Input
                id="question-tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => handleTagKeyDown(e, field)}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                placeholder="Add a tag and press Enter..."
                className="paragraph-regular background-light800_dark300 rounded-1.5 no-focus text-dark300_light700 light-border-2 min-h-12 px-6"
              />

              {field.value.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {field.value.map((tag) => (
                    <Badge
                      key={tag}
                      className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                    >
                      {tag}
                      <Image
                        src="/icons/close.svg"
                        alt={`Remove ${tag}`}
                        width={12}
                        height={12}
                        className="cursor-pointer object-contain invert-0 dark:invert"
                        onClick={() => handleRemoveTag(tag, field)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              <FieldDescription className="text-light-500 body-regular mt-2.5">
                Add up to 3 tags to describe what your question is about. Press
                Enter to add a tag.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-12 flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="primary-gradient !text-light-900 w-fit cursor-pointer px-10 py-3"
        >
          {isSubmitting ? "Posting..." : "Ask a Question"}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
