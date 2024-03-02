import fs from 'fs';
import path from 'path';

import hljs from 'highlight.js/lib/core';

import 'highlight.js/styles/tokyo-night-dark.css';

import typescript from 'highlight.js/lib/languages/typescript';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetContentClose, SheetTrigger } from '@/components/ui/sheet';

import { CodeSheet } from '@/app/components/code-sheet';

hljs.registerLanguage('typescript', typescript);

export default async function AxiosPage() {
  const srcPathAxios = path.join(process.cwd(), '/src/app/fetching/(fetching)/axios/api.ts');
  const sourceAxios = fs.readFileSync(srcPathAxios, 'utf-8');
  const highlightedSourceAxios = hljs.highlight(sourceAxios, { language: 'typescript' }).value;

  const srcPathFormHelpers = path.join(process.cwd(), '/src/app/fetching/(fetching)/axios/form-helpers.ts');
  const sourceFormHelpers = fs.readFileSync(srcPathFormHelpers, 'utf-8');
  const highlightedSourceFormHelpers = hljs.highlight(sourceFormHelpers, { language: 'typescript' }).value;

  return (
    <main>
      <article className="prose mx-auto py-8 dark:prose-invert">
        <h1>Axios</h1>

        <p>
          Axios is a promise-based HTTP client for the browser and Node.js. It has a lot of features and is easy to use.
          We will leave you the official documentation here but we will also show you some examples of how to use it.
        </p>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Axios Docs</Button>
          </SheetTrigger>
          <SheetContent hideClose className="m-0 p-0" side="bottom">
            <iframe className="h-[90dvh] w-full" src="https://axios-http.com/docs/intro" title="axios-docs" />
            <SheetContentClose className="right-8 top-4" />
          </SheetContent>
        </Sheet>

        <h2>Main features</h2>
        <p>
          Axios is one of the most popular libraries for making HTTP requests. For React and Vue applications, it is
          very common because it automatically handles CSRF tokens via XSRF headers. It can also ease the process of JWT
          authentication and refresh tokens by utilizing interceptors.
        </p>
        <p>
          However, ever since Next.js has introduced the new{' '}
          <a href="https://nextjs.org/docs/app" target="_blank">
            &apos;app router&apos;
          </a>{' '}
          people have started reverting to native fetch. The reason behind this is that: &quot;Next.js{' '}
          <a href="https://nextjs.org/docs/app/api-reference/functions/fetch" target="_blank">
            extends
          </a>{' '}
          the native{' '}
          <a href="https://developer.mozilla.org/docs/Web/API/Fetch_API" target="_blank">
            Web fetch()
          </a>{' '}
          API to allow each request on the server to set its own persistent caching semantics&quot;.
        </p>

        <h2>Maximise Axios utility for Next.js Applications</h2>
        <p>
          A while back I wanted to solve the error handling and response handling for once and for all. I wanted it to
          do proper handling in server vs client instances. I could go into the specifics of why I did what I did but
          since most people should probably use fetch() instead of Axios, I will leave you with the source code of my
          Axios API class.
        </p>

        <CodeSheet code={sourceAxios} html={highlightedSourceAxios}>
          Custom Axios API Class Source Code
        </CodeSheet>

        <h2>Form Helpers</h2>
        <p>
          I also created a form helper file which provides a simple function to handle setting form errors automatically
          for{' '}
          <a href="https://react-hook-form.com/" target="_blank">
            react-hook-form
          </a>
          .
        </p>
        <CodeSheet code={sourceFormHelpers} html={highlightedSourceFormHelpers}>
          Form Helpers Source Code
        </CodeSheet>
      </article>
    </main>
  );
}
