import hljs from 'highlight.js';

import 'highlight.js/styles/tokyo-night-dark.css';

import type { MDXComponents } from 'mdx/types';

import { cn } from '@/lib/utils';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ className, ...props }) => {
      return (
        <div className="not-prose relative mb-5 flex max-h-[75dvh] flex-col overflow-auto rounded border border-primary last:mb-0">
          {props.title && (
            <h1 className="sticky top-0 rounded-b bg-primary px-4 py-1 font-bold text-primary-foreground">
              {props.title}
            </h1>
          )}
          <pre {...props} className={cn('p-4', className)}>
            {props.children}
          </pre>
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
