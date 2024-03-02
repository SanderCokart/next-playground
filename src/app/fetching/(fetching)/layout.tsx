import Link from 'next/link';

import type { LayoutType } from '@/app/types/common-types';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { fetchingLinks } from '@/constants/fetching-links';

import { cn } from '@/lib/utils';

const FetchingNavigation = () => {
  return (
    <ScrollArea>
      <nav className="container">
        <ul className="flex items-center gap-4">
          {fetchingLinks.map(({ workInProgress, topic, href, description }) => (
            <li key={topic}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link className="font-bold" href={workInProgress ? '' : href}>
                      {workInProgress ? (
                        <span aria-disabled className={cn('cursor-not-allowed', workInProgress && 'text-destructive')}>
                          {topic}
                        </span>
                      ) : (
                        topic
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default async function FetchingLayout({ children }: LayoutType) {
  return <div>{children}</div>;
}
