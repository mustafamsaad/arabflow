"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathName = usePathname();
  let userId
  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive = pathName === item.route;
        if (item.route === "/profile") {
          if (!userId) {
            return null
          } 
        }
        const linkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? "primary-gradient text-light-900 rounded-lg"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4",
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden",
              )}
            >
              {item.label}
            </p>
          </Link>
        );
        if (isMobileNav) {
          return (
            <SheetClose asChild key={item.label}>
              {linkComponent}
            </SheetClose>
          );
        }
        return <div key={item.label}>{linkComponent}</div>;
      })}
    </>
  );
};

export default NavLinks;
