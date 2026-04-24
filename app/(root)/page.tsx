import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import DataRenderer from "@/components/DataRenderer";
import { EMPTY_QUESTION } from "@/constants/states";

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

  const { questions = [], isNext } = data || {};

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
      <DataRenderer
        success={success}
        data={questions}
        error={error}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
    </>
  );
};

export default Home;
