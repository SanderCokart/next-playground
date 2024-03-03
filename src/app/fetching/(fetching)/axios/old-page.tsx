import fs from 'fs';
import path from 'path';

import hljs from 'highlight.js';

import 'highlight.js/styles/tokyo-night-dark.css';

// import typescript from 'highlight.js/lib/languages/typescript';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetContentClose, SheetTrigger } from '@/components/ui/sheet';

import { CodeSheet } from '@/app/components/code-sheet';

// hljs.registerLanguage('typescript', typescript);

/**
 * @param relativePath -  path relative to the src folder
 * @param language - code language for syntax highlighting
 * @returns [source, highlightedSource]
 */
const processCode = (relativePath: string, language: string): [string, string] => {
  const srcPath = path.join(process.cwd(), '/src' + relativePath);
  const source = fs.readFileSync(srcPath, 'utf-8');
  const highlightedSource = hljs.highlight(source, { language }).value;

  return [source, highlightedSource] as const;
};

export default async function AxiosPage() {
  const [sourceAxios, highlightedSourceAxios] = processCode('/app/fetching/(fetching)/axios/api.ts', 'javascript');

  const [sourceFormHelpers, highlightedSourceFormHelpers] = processCode(
    '/app/fetching/(fetching)/axios/form-helpers.ts',
    'javascript',
  );

  const [sourceExample1, highlightedSourceExample1] = processCode(
    '/app/fetching/(fetching)/axios/axios-example-1.txt',
    'javascript',
  );

  const [sourceSnippet1, highlightedSourceSnippet1] = processCode(
    '/app/fetching/(fetching)/axios/axios-snippet-1.txt',
    'javascript',
  );

  const [sourceSnippet2, highlightedSourceSnippet2] = processCode(
    '/app/fetching/(fetching)/axios/axios-snippet-2.txt',
    'javascript',
  );

  return (
    <main>
      <article className="prose mx-auto py-8 dark:prose-invert prose-code:prose-p:text-primary">
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

        <h2>What this allows you to do.</h2>
        <p>
          This allows you to follow a simple syntax for making requests. It also handles the error handling and response
          handling for you. This approach ensures a consistent format for all your requests.
        </p>

        <CodeSheet code={sourceExample1} html={highlightedSourceExample1}>
          View Full Example
        </CodeSheet>

        <h2>Let's break it down.</h2>
        <pre className="p-4">
          {/*{import { API } from '@/app/fetching/(fetching)/axios/api';*/}

          {/*  const params = { limit: 10 };*/}
          {/*  const {*/}
          {/*  data: articles,*/}
          {/*  status,*/}
          {/*  errors,*/}
          {/*} = await API.get<Article[], typeof params>('/api/articles', {*/}
          {/*  params,*/}
          {/*});*/}
          {/*}*/}
          <code dangerouslySetInnerHTML={{ __html: highlightedSourceSnippet1 }} />
        </pre>
        <p>
          The following code is an example of how to use the API class to make a request. It is a simple example of how
          to fetch a list of articles from an API.
        </p>
        <p>
          We have defined an interface for the response data we expect to receive and add it as a generic to the{' '}
          <code>API.get</code> function. like so: <code>API.get&lt;Article[], typeof params&gt;</code> where{' '}
          <code>Article[]</code> is the expected response data and <code>typeof params</code> is the type of the params
          (obviously).
        </p>
        <p>
          The <code>params</code> object is used to pass query parameters to the request. In this case, we are passing a{' '}
          <code>limit</code> parameter to the request.
        </p>
        <p>
          The geneated URL will look like this: <code>/API_URL/articles?limit=10</code>
        </p>
        <h3>Validation errors</h3>
        <p>
          Now when a validation error occurs, the <code>errors</code> will contain a generic error message on{' '}
          <code>errors.message</code> as well as the specific error messages on <code>errors.fields</code>. We expect
          that fields is only ever present when the status code is 422 (Unprocessable Entity).
        </p>
        <p>
          If this was a client component we'd use the form helpers to set the errors on the form fields. But since pages
          are server components and we assume that the developer applied the correct params to the get request, we
          should throw an error to notify the developer that they are using the API incorrectly.
        </p>
        <p>
          This does again come with the expectation that the error responses from the backend are consistent. If they
          are not, you will have to adjust the API class to handle the errors properly.
        </p>
        <p>Here is how that would look in a server component:</p>
        <pre className="p-4">
          <code dangerouslySetInnerHTML={{ __html: highlightedSourceSnippet2 }} />
        </pre>

        <h3>Successful responses</h3>
        <p>
          If errors is null or falsy, then we can safely assume that the request was successful. The <code>data</code>{' '}
          will contain the response data specified in the <code>Article[]</code> type we defined as the first generic
          parameter to the <code>.get</code> method and the <code>status</code> will contain the status code of the
          response. This will typically be 200, 201 or 204.
        </p>

        <p>You could then do additional handling depending on the status code you got.</p>
      </article>
    </main>
  );
}
