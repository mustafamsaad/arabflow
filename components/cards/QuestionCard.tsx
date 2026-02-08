import { formatNumber, getTimeAgo } from "@/lib/utils";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Metric from "../Metric";
import TagCard from "@/components/cards/TagCard";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, createdAt, author, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper flex w-full flex-col rounded-xl p-9 sm:px-11">
      <span className="subtle-regular text-dark400_light700 sm:hidden">
        {getTimeAgo(createdAt)}
      </span>

      <Link href={ROUTES.QUESTIONS(_id)}>
        <h3 className="sm:h3-semibold base-semibold line-clamp-1">{title}</h3>
      </Link>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagCard key={tag._id} _id={tag._id} title={tag.name} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <Metric
          imgSrc={author.avatar}
          alt={author.name}
          value={author.name}
          title={`• asked ${getTimeAgo(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="text-dark400_light700 body-medium"
          isAuthor
        />

        <div className="flex items-center gap-3">
          <Metric
            imgSrc="/icons/like.svg"
            alt="like"
            value={formatNumber(upvotes)}
            title="Votes"
            textStyles="text-dark400_light800 small-regular"
          />
          <Metric
            imgSrc="/icons/message.svg"
            alt="message"
            value={formatNumber(answers)}
            title="Answers"
            textStyles="text-dark400_light800 small-regular"
          />
          <Metric
            imgSrc="/icons/eye.svg"
            alt="eye"
            value={formatNumber(views)}
            title="Views"
            textStyles="text-dark400_light800 small-regular"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
