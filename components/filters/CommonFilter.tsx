"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ListFilter } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface FilterOption {
  name: string;
  value: string;
}

interface Props {
  filters: FilterOption[];
  otherClasses?: string;
  containerClasses?: string;
}

const CommonFilter = ({
  filters,
  otherClasses = "",
  containerClasses = "",
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") ?? "";

  const currentLabel =
    filters.find((f) => f.value === activeFilter)?.name ?? filters[0]?.name;

  const handleSelect = (value: string) => {
    const newUrl =
      value === activeFilter
        ? removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["filter"],
          })
        : formUrlQuery({
            params: searchParams.toString(),
            key: "filter",
            value,
          });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={containerClasses}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`background-light800_dark300 text-dark500_light700 body-regular flex min-h-[56px] items-center justify-between gap-3 rounded-[10px] border-none px-4 py-2 outline-none ${otherClasses}`}
        >
          <div className="flex items-center gap-2">
            <ListFilter className="size-4" />
            <span className="line-clamp-1">{currentLabel}</span>
          </div>
          <ChevronDown className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="background-light900_dark200 min-w-48 border-none">
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter.value}
              onSelect={() => handleSelect(filter.value)}
              className={`text-dark500_light700 cursor-pointer ${
                activeFilter === filter.value
                  ? "text-primary-500 focus:text-primary-500 bg-primary-100 dark:bg-dark-400"
                  : ""
              }`}
            >
              {filter.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommonFilter;
