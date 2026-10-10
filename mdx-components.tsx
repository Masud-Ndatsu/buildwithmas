import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="display mt-12 text-3xl" {...props} />,
  h3: (props) => <h3 className="display mt-8 text-2xl" {...props} />,
  p: (props) => <p className="mt-5 text-lg leading-relaxed" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc pl-6 text-lg leading-relaxed" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal pl-6 text-lg leading-relaxed" {...props} />,
  a: (props) => <a className="link-line" {...props} />,
  code: (props) => <code className="font-mono text-[0.9em]" {...props} />,
  pre: (props) => (
    <pre className="mt-5 overflow-x-auto rounded-lg border border-line bg-surface p-4 text-sm" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
