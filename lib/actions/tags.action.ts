import { handleError } from "@/lib/handlers/error";
import { QueryFilter } from "mongoose";
import action from "../handlers/action";
import { PaginatedSearchSchema, GetTagQuestionsSchema } from "../validations";
import { Tag, Question } from "@/database";

export const getTags = async (
  params: PaginatedSearchParams,
): Promise<ActionResponse<{ tags: Tag[]; isNext: boolean }>> => {
  const validatedResult = await action({
    params,
    schema: PaginatedSearchSchema,
  });

  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { page = 1, pageSize = 10, query, filter } = validatedResult.params!;
  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<typeof Tag> = {};

  if (query) {
    filterQuery.$or = [{ name: { $regex: new RegExp(query, "i") } }];
  }

  let sortCriteria: Record<string, 1 | -1>;

  switch (filter) {
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "popular":
      sortCriteria = { numberOfQuestions: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { numberOfQuestions: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);
    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();
    const isNext = totalTags > skip + limit;
    return {
      success: true,
      data: { tags, isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getPopularTags = async (): Promise<ActionResponse<Tag[]>> => {
  try {
    const tags = await Tag.find()
      .sort({ numberOfQuestions: -1 })
      .limit(5)
      .lean();
    return { success: true, data: tags };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getTagQuestions = async (
  params: GetTagQuestionsParams,
): Promise<
  ActionResponse<{ questions: Question[]; tag: Tag; isNext: boolean }>
> => {
  const validatedResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validatedResult instanceof Error)
    return handleError(validatedResult) as ErrorResponse;

  const { tagId, page = 1, pageSize = 10, query } = validatedResult.params!;

  const skip = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  const tag = await Tag.findById(tagId).lean();
  if (!tag) throw new Error("Tag not found");

  const filterQuery: QueryFilter<typeof Question> = {
    tags: tagId,
  };

  if (query) {
    filterQuery.title = { $regex: new RegExp(query, "i") };
  }

  try {
    const totalQuestions = await Question.countDocuments(filterQuery);
    const questions = await Question.find(filterQuery)
      .select("_id title createdAt upvotes downvotes answers views author")
      .populate("tags", "name")
      .populate("author", "name image")
      .skip(skip)
      .limit(limit)
      .lean();
    const isNext = totalQuestions > skip + limit;

    return {
      success: true,
      data: {
        questions,
        tag,
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
