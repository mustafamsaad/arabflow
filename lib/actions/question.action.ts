"use server";

import { handleError } from "@/lib/handlers/error";
import mongoose from "mongoose";
import action from "../handlers/action";
import { AskQuestionSchema } from "../validations";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tag-question.model";

export const createQuestion = async (
  params: CreateQuestionParams,
): Promise<ActionResponse<{ _id: string }>> => {
  const validatedResult = await action({
    params,
    schema: AskQuestionSchema,
    authorize: true,
  });

  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { title, content, tags } = validatedResult.params!;
  const userId = validatedResult?.session?.user?.id;

  if (!userId) return handleError(new Error("Unauthorized")) as ErrorResponse;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocs = [];

    const normalizedTags = [
      ...new Set(tags.map((tag) => tag.toLowerCase().trim())),
    ];

    for (const normalizedTag of normalizedTags) {
      const tagDoc = await Tag.findOneAndUpdate(
        { name: normalizedTag },
        {
          $setOnInsert: { name: normalizedTag },
          $inc: { numberOfQuestions: 1 },
        },
        { session, new: true, upsert: true },
      );

      if (!tagDoc)
        throw new Error(`Failed to create or update tag: ${normalizedTag}`);

      tagIds.push(tagDoc._id);
    }

    const [question] = await Question.create(
      [
        {
          title,
          content,
          tags: tagIds,
          author: userId,
        },
      ],
      { session },
    );

    if (!question) throw new Error("Failed to create question");

    for (const tagId of tagIds) {
      tagQuestionDocs.push({ tag: tagId, question: question._id });
    }

    await TagQuestion.insertMany(tagQuestionDocs, { session });

    await session.commitTransaction();
    return { success: true, data: { _id: question._id.toString() } };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};
