import hljs from 'highlight.js';

import 'highlight.js/styles/tokyo-night-dark.css';

import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: props => {
      return (
        <div className="not-prose flex max-h-[75dvh] flex-col overflow-auto rounded border border-primary">
          {props.title && (
            <h1 className="rounded-b bg-primary px-4 py-1 font-bold text-primary-foreground">{props.title}</h1>
          )}
          <pre {...props}>{props.children}</pre>
        </div>
      );
    },

    code: ({ children, ...props }) => {
      const language = props.className?.replace('language-', '') as string;
      const highlightedCode = hljs.highlight(children as string, { language });

      return <code {...props} dangerouslySetInnerHTML={{ __html: highlightedCode.value }} />;
    },

    CodeTabs: props => {
      return <pre>{JSON.stringify(props, null, 2)}</pre>;
    },

    Code: props => {
      return <pre>{JSON.stringify(props, null, 2)}</pre>;
    },
  };
}
