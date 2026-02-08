import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgSrc: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  imgStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgSrc,
  alt,
  value,
  title,
  href,
  textStyles,
  imgStyles,
  isAuthor,
}: MetricProps) => {
  const content = (
    <>
      <Image
        src={imgSrc}
        alt={alt}
        width={16}
        height={16}
        className={`${isAuthor ? "rounded-full" : ""} ${imgStyles ?? ""}`}
      />
      <p className={`flex items-center gap-1 ${textStyles}`}>
        <span>{value}</span>
        <span className={`small-regular ${isAuthor ? "max-sm:hidden" : ""}`}>
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-1">
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-1">{content}</div>;
};

export default Metric;
