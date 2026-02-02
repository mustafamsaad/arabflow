"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface LocalSearchProps {
  route: string;
  iconPosition: string;
  placeholder: string;
  imgSrc: string;
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  placeholder,
  imgSrc,
  otherClasses,
}: LocalSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (route === pathname) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [pathname, searchQuery, router, route]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="Search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular placeholder no-focus text-dark400_light700 border-none bg-transparent shadow-none outline-none dark:bg-transparent"
      />
    </div>
  );
};

export default LocalSearch;
