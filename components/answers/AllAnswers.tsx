import { ChevronDown, ListFilter } from "lucide-react";

import { DUMMY_ANSWERS } from "@/constants/dummy-answers";
import AnswerCard from "./AnswerCard";

interface Props {
  totalAnswers: number;
}

const AllAnswers = ({ totalAnswers }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient base-semibold">
          {totalAnswers} Answers
        </h3>

        <button
          type="button"
          className="background-light800_dark300 text-dark400_light700 small-regular flex cursor-pointer items-center gap-1.5 rounded-sm px-5 py-2.5"
        >
          <ListFilter className="size-4" />
          <span>Highest Upvotes</span>
          <ChevronDown className="size-4" />
        </button>
      </div>

      <div className="mt-7 flex flex-col">
        {DUMMY_ANSWERS.map((answer) => (
          <AnswerCard key={answer._id} {...answer} />
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
