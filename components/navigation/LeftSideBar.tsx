"use client";
import NavLinks from "./navbar/NavLinks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";

const LeftSideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-scroll border-r p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-col gap-6">
        <NavLinks/>
      </div>
      <div className="flex flex-col gap-3 max-lg:mt-6">
        <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
          <Link href={ROUTES.SIGN_IN}>
          <Image src="/icons/account.svg" alt="Log In" width={20} height={20} className="invert-colors lg:hidden border" />
          <p className="primary-text-gradient max-lg:hidden">Log In</p>
          </Link>
        </Button>

        <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
          <Link href={ROUTES.SIGN_UP}>
            <Image
              src="/icons/sign-up.svg"
              alt="Sign Up"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <p className="max-lg:hidden">Sign Up</p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSideBar;
