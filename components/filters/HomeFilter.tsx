"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const filters = [
  { name: "React", value: "react" },
  { name: "Next.js", value: "nextjs" },
  { name: "Node.js", value: "nodejs" },
  { name: "Python", value: "python" },
  { name: "JavaScript", value: "javascript" },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterParams = searchParams.get("filter");
  const [activeFilter, setActiveFilter] = useState(filterParams || "");

  const handleFilterClick = (filterValue: string) => () => {
    let newUrl = "";
    if (filterValue === activeFilter) {
      setActiveFilter("");
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActiveFilter(filterValue);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filterValue,
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={`cursor-pointer px-6 py-3 font-normal ${filterParams === filter.value ? "text-primary-500 hover:text-primary-500 hover:bg-primary-100 bg-primary-100 dark:bg-dark-400 hover:dark:bg-dark-400" : "text-light-500 background-light800_dark300"} `}
          onClick={handleFilterClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
