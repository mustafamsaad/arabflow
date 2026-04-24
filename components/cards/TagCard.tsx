import Link from "next/link";

import ROUTES from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  number?: number;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  description?: string;
}

const DEFAULT_DESCRIPTION =
  "A collection of questions and discussions tagged with this topic.";

const TagCard = ({
  _id,
  title,
  number,
  questions,
  showCount,
  compact = true,
  description,
}: Props) => {
  if (compact) {
    return (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-sm px-4 py-2 uppercase">
          {title.toUpperCase()}
        </Badge>
        {number !== undefined && (
          <p className="small-regular text-dark500_light700">
            {formatNumber(number)}
          </p>
        )}
      </Link>
    );
  }

  const count = questions ?? number ?? 0;

  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border rounded-2 flex h-[243px] w-full flex-col border px-8 py-10 sm:w-[260px]">
        <div className="flex items-center justify-between gap-3">
          <Badge className="regular-medium background-light800_dark400 text-light900_dark300 rounded-sm px-4 py-2 uppercase">
            {title}
          </Badge>
        </div>

        <p className="small-regular text-dark500_light700 mt-5 line-clamp-3">
          A collection of questions and discussions tagged with {title}
        </p>

        {showCount && (
          <p className="small-medium text-dark400_light500 mt-auto">
            <span className="body-semibold primary-text-gradient mr-2.5">
              {formatNumber(count)}+
            </span>
            <span>Questions</span>
          </p>
        )}
      </article>
    </Link>
  );
};

export default TagCard;
