'use client';

import { ThemeProvider } from 'next-themes';

import type { ReactNode } from 'react';

const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export { GlobalProviders };
