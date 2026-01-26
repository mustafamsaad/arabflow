import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";

const topQuestions = [
  {
    _id: "1",
    title: "What is the best way to learn React?",
  },
  {
    _id: "2",
    title: "How to center a div?",
  },
  {
    _id: "3",
    title:
      "How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
  },
  {
    _id: "4",
    title: "ReactJs or NextJs for beginners i ask for advice?",
  },
  {
    _id: "5",
    title:
      "Node.js res.json() and res.send(), not working but still able to change status code",
  },
];

const popularTags = [
  {
    _id: "1",
    title: "React",
    number: 10,
  },
  {
    _id: "2",
    title: "NextJs",
    number: 20,
  },
  {
    _id: "3",
    title: "NodeJs",
    number: 30,
  },
  {
    _id: "4",
    title: "MongoDB",
    number: 40,
  },
  {
    _id: "5",
    title: "PostgreSQL",
    number: 50,
  },
];

const RightSideBar = () => {
  return (
    <section className="background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-[350px] flex-col justify-between gap-20 overflow-y-scroll border-l p-6 pt-36 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold">Top Questions</h3>
        <div className="mt-7 flex flex-col gap-7">
          {topQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.QUESTIONS(_id)}
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
          {popularTags.map((tag) => (
            <TagCard key={tag._id} {...tag} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default RightSideBar;
