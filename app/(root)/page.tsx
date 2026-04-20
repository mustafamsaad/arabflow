import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const {
    page = 1,
    pageSize = 10,
    query = "",
    filter = "",
  } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page),
    pageSize: Number(pageSize),
    query,
    filter,
  });

  if (!success) {
    return <div>Error: {error?.message}</div>;
  }

  const { questions = [], isNext } = data!;

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-8 sm:flex-row">
        <h1 className="h1-bold">All Questions</h1>
        <Button
          asChild
          className="primary-gradient text-light-900! min-h-[46px] px-4 py-3"
        >
          <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          iconPosition="start"
          placeholder="Search questions..."
          imgSrc="/icons/search.svg"
          otherClasses="flex-1"
          route={ROUTES.HOME}
        />
      </section>
      <HomeFilter />
      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700 body-regular">
                No questions found
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700 body-regular">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )}
    </>
  );
};

export default Home;
