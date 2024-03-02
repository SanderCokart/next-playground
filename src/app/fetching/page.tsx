import Link from 'next/link';

import type { Metadata } from 'next';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { fetchingLinks } from '@/constants/fetching-links';

import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Fetching',
  description: 'Learn about different ways to fetch data in React',
};

export default async function FetchingPage() {
  return (
    <main>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 p-8">
        {fetchingLinks.map(({ topic, description, workInProgress, href }) => (
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
