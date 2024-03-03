'use client';

import React, { useState } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

import { dependencies, devDependencies } from '../../../package.json';

export const Dependencies = () => {
  const devDeps = Object.entries(devDependencies).map(([name, version]) => ({ name, version }));
  const deps = Object.entries(dependencies).map(([name, version]) => ({ name, version }));

  const [searchDependencies, setSearchDependencies] = useState('');
  const [searchDevDependencies, setSearchDevDependencies] = useState('');

  return (
    <Accordion type="multiple">
      <AccordionItem asChild className="not-prose" value="development dependencies">
        <section id="development dependencies">
          <AccordionTrigger>Development dependencies</AccordionTrigger>
          <AccordionContent className="prose space-y-4 dark:prose-invert">
            <div className="m-1">
              <Input
                placeholder="Search development dependencies "
                type="search"
                value={searchDevDependencies}
                onChange={e => setSearchDevDependencies(e.target.value)}
              />
            </div>
            <ul className="space-y-1 divide-y">
              {devDeps
                .filter(dep => dep.name.toLowerCase().includes(searchDevDependencies.toLowerCase()))
                .map(({ name, version }) => (
                  <li key={name}>
                    {name}@{version}
                  </li>
                ))}
            </ul>
          </AccordionContent>
        </section>
      </AccordionItem>
      <AccordionItem asChild className="not-prose" value="dependencies">
        <section id="dependencies">
          <AccordionTrigger>Dependencies</AccordionTrigger>
          <AccordionContent className="prose space-y-4 dark:prose-invert">
            <div className="m-1">
              <Input
                placeholder="Search dependencies"
                type="search"
                value={searchDependencies}
                onChange={e => setSearchDependencies(e.target.value)}
              />
            </div>

            <ul className="space-y-1 divide-y">
              {deps
                .filter(dep => dep.name.toLowerCase().includes(searchDependencies.toLowerCase()))
                .map(({ name, version }) => (
                  <li key={name}>
                    {name}@{version}
                  </li>
                ))}
            </ul>
          </AccordionContent>
        </section>
      </AccordionItem>
    </Accordion>
  );
};
