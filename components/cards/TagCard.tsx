import ROUTES from "@/constants/routes";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  _id: string;
  title: string;
  number: number;
}

const TagCard = ({ _id, title, number }: Props) => {
  return (
    <Link key={_id} href={ROUTES.TAGS(_id)} className="flex justify-between">
      <Badge className="body-medium background-light800_dark300 text-light400_light500 rounded-sm px-3 py-1">
        {title}
      </Badge>
      <p className="small-regular text-dark500_light700">{number}</p>
    </Link>
  );
};

export default TagCard;
