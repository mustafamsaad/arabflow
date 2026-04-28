import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";

Code.theme = {
  light: "github-light",
  dark: "github-dark-dimmed",
  lightSelector: "html.light",
};

const PreBlock = (props: ComponentProps<typeof Code>) => (
  <Code
    lineNumbers={false}
    className="shadow-light-200 dark:shadow-dark-200 my-4 overflow-x-auto rounded-[10px] bg-[#0d1117]! p-4 text-[13px] leading-relaxed"
    {...props}
  />
);

const mdxComponents = { pre: PreBlock };

interface Props {
  content: string;
  className?: string;
}

const Preview = ({ content, className = "" }: Props) => {
  const formatted = (content ?? "").replaceAll("\\", "").replaceAll("&#x20;", "");

  return (
    <section
      className={`markdown prose dark:prose-invert max-w-full wrap-break-word ${className}`}
    >
      <MDXRemote source={formatted} components={mdxComponents} />
    </section>
  );
};

export default Preview;
