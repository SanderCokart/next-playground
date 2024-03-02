import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

import type { NavItemProps } from '@/app/components/nav-item';
import type { LayoutType } from '@/app/types/common-types';

import { NavItem } from '@/app/components/nav-item';

import { GlobalProviders } from './components/global-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Playground',
  description: 'A Next.js playground with Tailwind CSS and TypeScript.',
  authors: [{ name: 'Sander Cokart', url: 'https://github.com/sandercokart' }],
};

const Navigation = () => {
  const links: NavItemProps[] = [{ href: '/fetching', children: 'Fetching' }];

  return (
    <nav className="flex items-center gap-6 text-sm">
      {links.map(({ href, children }) => (
        <NavItem key={href} href={href}>
          {children}
        </NavItem>
      ))}
    </nav>
  );
};

const Logo = () => (
  <a className="mr-6 flex items-center space-x-2" href="/">
    <span className="hidden font-bold sm:inline-block">Next.js Playground</span>
  </a>
);

export default function RootLayout({ children }: LayoutType) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <GlobalProviders>
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex items-end">
                <Logo />
                <Navigation />
              </div>
            </div>
          </header>
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
