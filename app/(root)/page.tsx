import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";

const questions = [
  {
    _id: 1,
    title: "How to learn Next.js?",
    tags: ["Next.js"],
    author: "Author 1",
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: "2022-01-01",
  },
  {
    _id: 2,
    title: "How to learn React.js?",
    tags: ["React"],
    author: "Author 1",
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: "2022-01-01",
  },
  {
    _id: 3,
    title: "How to learn Node.js?",
    tags: ["Node.js"],
    author: "Author 1",
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: "2022-01-01",
  },
  {
    _id: 4,
    title: "How to learn Python?",
    tags: ["Python"],
    author: "Author 1",
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: "2022-01-01",
  },
  {
    _id: 5,
    title: "How to learn JavaScript?",
    tags: ["JavaScript"],
    author: "Author 1",
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: "2022-01-01",
  },
];

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { query = "", filter = "" } = await searchParams;
  // Normalize string by removing non-alphanumeric characters
  const normalize = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]/g, "");

  const filteredQuestions = questions.filter((question) => {
    const matchedQuery = normalize(question.title).includes(normalize(query));
    const matchedFilter = normalize(question.tags[0]).includes(
      normalize(filter),
    );
    return matchedQuery && matchedFilter;
  });
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
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <p key={question._id}>{question.title}</p>
        ))}
      </div>
    </>
  );
};

export default Home;
