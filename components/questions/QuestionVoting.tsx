import Image from "next/image";

import { formatNumber } from "@/lib/utils";

interface Props {
  upvotes: number;
  downvotes: number;
  className?: string;
}

const QuestionVoting = ({ upvotes, downvotes, className = "" }: Props) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        className="flex-center cursor-pointer"
        aria-label="upvote"
      >
        <Image
          src="/icons/upvote.svg"
          alt="upvote"
          width={18}
          height={18}
          className="invert-colors"
        />
      </button>
      <div className="background-light700_dark400 flex-center size-[18px] rounded-sm">
        <p className="subtle-medium text-dark400_light900">
          {formatNumber(upvotes)}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-1.5">
      <button
        type="button"
        className="flex-center cursor-pointer"
        aria-label="downvote"
      >
        <Image
          src="/icons/downvote.svg"
          alt="downvote"
          width={18}
          height={18}
          className="invert-colors"
        />
      </button>
      <div className="background-light700_dark400 flex-center size-[18px] rounded-sm">
        <p className="subtle-medium text-dark400_light900">
          {formatNumber(downvotes)}
        </p>
      </div>
    </div>
  </div>
);

export default QuestionVoting;
