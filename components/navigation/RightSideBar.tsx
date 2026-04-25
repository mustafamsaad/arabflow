import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";
import { getTopQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tags.action";

const RightSideBar = async () => {
  const { success: topQuestionsSuccess, data: topQuestionsData } =
    await getTopQuestions();
  const { success: popularTagsSuccess, data: popularTagsData } =
    await getPopularTags();

  return (
    <section className="background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-[350px] flex-col justify-between gap-20 overflow-y-scroll border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold">Top Questions</h3>
        <div className="mt-7 flex flex-col gap-7">
          {topQuestionsData?.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.QUESTION(_id)}
              className="flex justify-between gap-4"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="arrow-right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h3 className="h3-bold">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTagsData?.map((tag) => (
            <TagCard key={tag._id} {...tag} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSideBar;
