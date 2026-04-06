import Link from "next/link";
import Image from "next/image";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "@/auth";
import ROUTES from "@/constants/routes";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full gap-5 p-6 sm:px-12 dark:shadow-none">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Image
          src="/images/site-logo.svg"
          width={23}
          height={23}
          alt="Arabflow Logo"
        />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Arab<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <p>Global search</p>
      <div className="flex-between gap-5">
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            userId={session.user.id}
            name={session.user.name || "User"}
            image={session.user.image}
          />
        )}
        <MobileNavigation userId={session?.user?.id} />
      </div>
    </nav>
  );
};

export default Navbar;
