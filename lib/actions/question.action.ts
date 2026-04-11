"use server";

import { handleError } from "@/lib/handlers/error";
import mongoose from "mongoose";
import action from "../handlers/action";
import {
  AskQuestionSchema,
  EditQuestionSchema,
  GetQuestionSchema,
} from "../validations";
import Question from "@/database/question.model";
import Tag, { ITagDoc } from "@/database/tag.model";
import TagQuestion from "@/database/tag-question.model";

export const createQuestion = async (
  params: CreateQuestionParams,
): Promise<ActionResponse<Question>> => {
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
    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const editQuestion = async (
  params: EditQuestionParams,
): Promise<ActionResponse<Question>> => {
  const validatedResult = await action({
    params,
    schema: EditQuestionSchema,
    authorize: true,
  });

  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { questionId, title, content, tags } = validatedResult.params!;
  const userId = validatedResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId)
      .populate("tags")
      .session(session);
    if (!question) throw new Error("Question not found");
    if (question.author.toString() !== userId) throw new Error("Unauthorized");

    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save({ session });
    }

    const existingTagNames = question.tags.map(
      (tag: { name: string }) => tag.name,
    );
    const tagsToAdd = tags.filter(
      (tag) => !existingTagNames.includes(tag.toLowerCase().trim()),
    );
    const tagsToRemove = existingTagNames.filter(
      (tag: string) => !tags.includes(tag.toLowerCase().trim()),
    );

    const newTagDocs = [];

    if (tagsToAdd.length > 0) {
      for (const tagName of tagsToAdd) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: tagName.toLowerCase().trim() },
          {
            $setOnInsert: { name: tagName.toLowerCase().trim() },
            $inc: { numberOfQuestions: 1 },
          },
          { session, new: true, upsert: true },
        );
        if (!existingTag) throw new Error("Failed to add tag");

        question.tags.push(existingTag._id);
        newTagDocs.push({ tag: existingTag._id, question: question._id });
      }
    }

    if (newTagDocs.length > 0) {
      await TagQuestion.insertMany(newTagDocs, { session });
    }

    if (tagsToRemove.length > 0) {
      const tagsToRemoveDocs = await Tag.find(
        { name: { $in: tagsToRemove } },
        { _id: 1 },
        { session },
      );
      const tagIdsToRemove = tagsToRemoveDocs.map((tag) => tag._id);

      await Tag.updateMany(
        { _id: { $in: tagIdsToRemove } },
        { $inc: { numberOfQuestions: -1 } },
        { session },
      );

      await TagQuestion.deleteMany(
        { tag: { $in: tagIdsToRemove }, question: question._id },
        { session },
      );

      question.tags = question.tags.filter(
        (tag: ITagDoc) => !tagsToRemove.includes(tag.name),
      );
    }

    await question.save({ session });
    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const getQuestion = async (
  params: GetQuestionParams,
): Promise<ActionResponse<Question>> => {
  const validatedResult = await action({
    params,
    schema: GetQuestionSchema,
    authorize: false,
  });

  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { questionId } = validatedResult.params!;

  try {
    const question = await Question.findById(questionId).populate("tags");
    if (!question) throw new Error("Question not found");

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
