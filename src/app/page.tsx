import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { dependencies, devDependencies } from '../../package.json';

export default function Home() {
  return (
    <main>
      <div className="prose mx-auto mt-8 dark:prose-invert">
        <h1>Hello, World!</h1>
        <Hero />
        <Dependencies />
      </div>
    </main>
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

const Dependencies = () => {
  const devDeps = Object.entries(devDependencies).map(([name, version]) => ({ name, version }));

  const deps = Object.entries(dependencies).map(([name, version]) => ({ name, version }));

  return (
    <section id="tools">
      Libraries and tools include the following:
      <Accordion type="multiple">
        <AccordionItem className="not-prose" value="development dependencies">
          <AccordionTrigger>Development dependencies</AccordionTrigger>
          <AccordionContent className="prose dark:prose-invert">
            <ul>
              {devDeps.map(({ name, version }) => (
                <li key={name}>
                  {name}@{version}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="not-prose" value="dependencies">
          <AccordionTrigger>Dependencies</AccordionTrigger>
          <AccordionContent className="prose dark:prose-invert">
            <ul>
              {deps.map(({ name, version }) => (
                <li key={name}>
                  {name}@{version}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
