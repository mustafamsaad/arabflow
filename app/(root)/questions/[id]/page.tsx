import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {after} from "next/server";
import ROUTES from "@/constants/routes";
import { getQuestion, incrementViews } from "@/lib/actions/question.action";
import UserAvatar from "@/components/UserAvatar";
import Metric from "@/components/Metric";
import TagCard from "@/components/cards/TagCard";
import QuestionVoting from "@/components/questions/QuestionVoting";
import AllAnswers from "@/components/answers/AllAnswers";
import Preview from "@/components/Preview";
import { formatNumber, getTimeAgo } from "@/lib/utils";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const { success, data: question } = await getQuestion({ questionId: id });
  if (!success || !question) return notFound();

  after(() => {
    incrementViews({ questionId: id });
  })

  const {
    author,
    title,
    content,
    tags,
    createdAt,
    upvotes,
    downvotes,
    answers,
    views,
  } = question;

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center gap-1">
            <UserAvatar
              userId={author._id}
              name={author.name}
              image={author.image}
              className="size-[22px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <QuestionVoting upvotes={upvotes} downvotes={downvotes ?? 0} />
            <button
              type="button"
              aria-label="save question"
              className="cursor-pointer"
            >
              <Image
                src="/icons/star.svg"
                alt="save"
                width={18}
                height={18}
                className="invert-colors"
              />
            </button>
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mt-5 mb-8 flex flex-wrap gap-4">
        <Metric
          imgSrc="/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeAgo(createdAt)}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgSrc="/icons/message.svg"
          alt="message icon"
          value={formatNumber(answers)}
          title="Answers"
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgSrc="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title="Views"
          textStyles="small-regular text-dark400_light700"
        />
      </div>

      <Preview content={content} />

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
          ))}
        </div>
      )}

      <section className="my-5">
        <AllAnswers totalAnswers={answers} />
      </section>
    </>
  );
};

export default QuestionDetails;
