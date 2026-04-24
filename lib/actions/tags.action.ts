import { handleError } from "@/lib/handlers/error";
import { QueryFilter } from "mongoose";
import action from "../handlers/action";
import { PaginatedSearchSchema } from "../validations";
import { Tag } from "@/database";

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

  const filterQuery: QueryFilter<Tag> = {};

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
      .limit(limit);
    const isNext = totalTags > skip + limit;
    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
