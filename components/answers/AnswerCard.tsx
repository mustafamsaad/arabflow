import Link from "next/link";

import ROUTES from "@/constants/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getTimeAgo } from "@/lib/utils";
import QuestionVoting from "@/components/questions/QuestionVoting";
import Preview from "@/components/Preview";

interface AnswerCardProps {
  _id: string;
  author: { _id: string; name: string; image?: string };
  content: string;
  createdAt: Date | string;
  upvotes: number;
  downvotes: number;
}

const AnswerCard = ({
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
}: AnswerCardProps) => {
  return (
    <article className="light-border border-b py-10 last:border-b-0">
      <div className="mb-5 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-1.5">
          <Avatar className="size-6">
            <AvatarFallback className="primary-gradient text-light-900 text-xs font-bold">
              {author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col sm:flex-row sm:items-center sm:gap-1"
          >
            <p className="body-semibold text-dark300_light700">{author.name}</p>
            <p className="small-regular text-light400_light500 line-clamp-1">
              <span className="max-sm:hidden"> • </span>answered{" "}
              {getTimeAgo(createdAt)}
            </p>
          </Link>
        </div>

        <QuestionVoting upvotes={upvotes} downvotes={downvotes} />
      </div>

      <Preview content={content} />
    </article>
  );
};

export default AnswerCard;
