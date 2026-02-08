import ROUTES from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  number?: number;
}

const TagCard = ({ _id, title, number }: Props) => {
  return (
    <Link key={_id} href={ROUTES.TAGS(_id)} className="flex justify-between">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-sm px-4 py-2 uppercase">
        {title}
      </Badge>
      {number && (
        <p className="small-regular text-dark500_light700">
          {formatNumber(number)}
        </p>
      )}
    </Link>
  );
};

export default TagCard;
