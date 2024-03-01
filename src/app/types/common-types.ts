import type { ReactNode } from 'react';

type PageType<PARAMS extends Record<string, string> = {}, SEARCH_PARAMS extends Record<string, string> = {}> = {
  params: PARAMS;
  searchParams: SEARCH_PARAMS;
};

type LayoutType<PARAMS extends Record<string, string> = {}> = {
  params: PARAMS;
  children: Readonly<ReactNode>;
};

export type { PageType, LayoutType };
