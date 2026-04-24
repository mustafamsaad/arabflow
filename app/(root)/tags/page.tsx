import CommonFilter from "@/components/filters/CommonFilter";
import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRenderer";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { TagFilters } from "@/constants/filters";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tags.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Tags = async ({ searchParams }: SearchParams) => {
  const {
    page = "1",
    pageSize = "12",
    query = "",
    filter = "",
  } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page),
    pageSize: Number(pageSize),
    query,
    filter,
  });

  const { tags = [] } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <section className="mt-11 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <LocalSearch
          iconPosition="start"
          placeholder="Search by tag name..."
          imgSrc="/icons/search.svg"
          otherClasses="flex-1"
          route={ROUTES.TAGS}
        />
        <CommonFilter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <DataRenderer
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard
                key={tag._id}
                _id={tag._id}
                title={tag.name}
                questions={tag.numberOfQuestions}
                showCount
                compact={false}
              />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Tags;
