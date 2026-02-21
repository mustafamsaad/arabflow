import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import logger from "@/lib/logger";
const questions: Question[] = [
  {
    _id: "1",
    title: "How to learn Next.js?",
    tags: [{ _id: "1", name: "Next.js" }],
    author: {
      _id: "1",
      name: "Author 1",
      avatar: "/icons/avatar.svg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn React.js?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Web development" },
      { _id: "3", name: "frameworks" },
    ],
    author: {
      _id: "2",
      name: "Author 1",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2022-01-01"),
  },
  {
    _id: "3",
    title: "How to learn Node.js?",
    tags: [
      { _id: "1", name: "Node.js" },
      { _id: "2", name: "Web development" },
      { _id: "3", name: "frameworks" },
    ],
    author: {
      _id: "3",
      name: "Author 1",
      avatar: "/icons/avatar.svg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2025-01-01"),
  },
  {
    _id: "4",
    title: "How to learn Python?",
    tags: [
      { _id: "1", name: "Python" },
      { _id: "2", name: "Programming" },
      { _id: "3", name: "language" },
    ],
    author: {
      _id: "4",
      name: "Author 1",
      avatar: "/icons/avatar.svg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2026-01-01"),
  },
  {
    _id: "5",
    title: "How to learn JavaScript?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "Programming" },
      { _id: "3", name: "language" },
    ],
    author: {
      _id: "5",
      name: "Author 1",
      avatar: "/icons/avatar.svg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2025-08-05"),
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
    str.toLowerCase().replaceAll(/[^a-z0-9]/g, "");

  const filteredQuestions = questions.filter((question) => {
    const matchedQuery = normalize(question.title).includes(normalize(query));
    const matchedFilter = question.tags.some((tag) =>
      normalize(tag.name).includes(normalize(filter)),
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
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
