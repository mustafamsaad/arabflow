import ROUTES from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = ({
  userId,
  name,
  image,
  className = "h-9 w-9",
}: {
  userId: string;
  name: string;
  image?: string | null;
  className?: string;
}) => {
  return (
    <Link href={ROUTES.PROFILE(userId)} className={className}>
      <Avatar className={className}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="36px"
          />
        ) : (
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
