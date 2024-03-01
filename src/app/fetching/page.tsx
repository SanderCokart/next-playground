import Link from 'next/link';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';

export default async function FetchingPage() {
  const topics = [
    {
      href: '/fetching/axios',
      topic: 'axios',
      description: 'Promise based HTTP client for the browser and node.js',
      workInProgress: true,
    },
    {
      href: '/fetching/redaxios',
      topic: 'redaxios',
      description: 'A tiny HTTP client wrapper around the Fetch API',
      workInProgress: true,
    },
    {
      href: '/fetching/wretch',
      topic: 'wretch',
      description: 'A tiny wrapper built around fetch with an intuitive syntax.',
      workInProgress: true,
    },
    {
      href: '/fetching/swr',
      topic: 'swr',
      description: 'React Hooks library for remote data fetching',
      workInProgress: true,
    },
    {
      href: '/fetching/react-query',
      topic: 'react-query',
      description: 'Hooks for fetching, caching and updating asynchronous data in React',
      workInProgress: true,
    },
  ];

  return (
    <main>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 p-8">
        {topics.map(({ topic, description, workInProgress, href }) => (
          <li key={topic}>
            <Link className={cn(workInProgress && 'cursor-not-allowed')} href={workInProgress ? '' : href}>
              <Card className="flex h-full flex-col hover:bg-accent hover:text-accent-foreground">
                <CardHeader className="grow">
                  <CardTitle>{topic}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  {workInProgress && <span className="text-sm text-destructive">Work in progress</span>}
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
