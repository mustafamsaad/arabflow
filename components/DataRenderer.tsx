import Image from "next/image";
import { DEFAULT_EMPTY, DEFAULT_ERROR } from "@/constants/states";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props<T> {
  success: boolean;
  data?: T[];
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  empty?: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  image: {
    dark: string;
    light: string;
    alt: string;
  };
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({
  image,
  title,
  message,
  button,
}: StateSkeletonProps) => {
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center sm:mt-20">
      <Image
        src={image.dark}
        alt={image.alt}
        width={270}
        height={200}
        className="hidden object-contain dark:block"
      />
      <Image
        src={image.light}
        alt={image.alt}
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <h2 className="h2-bold text-dark300_light700 mt-8">{title}</h2>
      <p className="text-dark500_light700 body-regular my-3.5 max-w-md text-center">
        {message}
      </p>
      {button && (
        <Button
          asChild
          className="paragraph-medium bg-primary-500 hover:bg-primary-500 text-light-900! min-h-[46px] rounded-lg px-4 py-3"
        >
          <Link href={button.href}>{button.text}</Link>
        </Button>
      )}
    </div>
  );
};

const DataRenderer = <T,>({
  success,
  data,
  error,
  empty,
  render,
}: Props<T>) => {
  if (!success) {
    return StateSkeleton({
      image: {
        dark: "/images/dark-error.png",
        light: "/images/light-error.png",
        alt: "Error",
      },
      title: error?.message || DEFAULT_ERROR.title,
      message: error?.details
        ? JSON.stringify(error.details)
        : DEFAULT_ERROR.message,
      button: DEFAULT_ERROR.button,
    });
  }

  if (!data || data.length === 0) {
    return StateSkeleton({
      image: {
        dark: "/images/dark-illustration.png",
        light: "/images/light-illustration.png",
        alt: "Empty",
      },
      title: empty?.title || DEFAULT_EMPTY.title,
      message: empty?.message || DEFAULT_EMPTY.message,
      button: empty?.button || DEFAULT_EMPTY.button,
    });
  }

  return <div>{render(data)}</div>;
};
export default DataRenderer;
