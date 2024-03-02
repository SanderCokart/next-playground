'use client';

import { ThemeProvider } from 'next-themes';

import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export { GlobalProviders };
