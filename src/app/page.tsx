import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Dependencies } from '@/app/components/dependencies';

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/*<div*/}
      {/*  aria-hidden="true"*/}
      {/*  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">*/}
      {/*  <div*/}
      {/*    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"*/}
      {/*    style={{*/}
      {/*      clipPath:*/}
      {/*        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-accent/50 hover:ring-accent/75">
            Fetching docs are under construction.{' '}
            <Link className="font-semibold text-primary" href="/fetching/axios">
              <span aria-hidden="true" className="absolute inset-0" />
              Check it out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Next.js Playground</h1>
          <p className="prose mt-6 text-lg leading-8 dark:prose-invert prose-a:text-primary">
            This is a <a href="https://nextjs.org">Next.js</a> app with{' '}
            <a href="https://tailwindcss.com">Tailwind CSS</a> and{' '}
            <a href="https://www.typescriptlang.org">TypeScript</a>. As well as numerous other tools and libraries.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button>Show dependencies</Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                  <SheetTitle>Dependencies</SheetTitle>
                  <SheetDescription>Libraries and tools include the following:</SheetDescription>
                </SheetHeader>
                <Dependencies />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/*<div*/}
      {/*  aria-hidden="true"*/}
      {/*  className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">*/}
      {/*  <div*/}
      {/*    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"*/}
      {/*    style={{*/}
      {/*      clipPath:*/}
      {/*        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
}
const Hero = () => (
  <section id="hero">
    <p>
      This is a <a href="https://nextjs.org">Next.js</a> app with <a href="https://tailwindcss.com">Tailwind CSS</a> and{' '}
      <a href="https://www.typescriptlang.org">TypeScript</a>. As well as numerous other tools and libraries.
    </p>
  </section>
);
