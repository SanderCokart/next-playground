import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

import { TbBrandNextjs } from 'react-icons/tb';

import Link from 'next/link';

import type { LayoutType } from '@/app/types/common-types';

import { DesktopNav } from '@/app/components/desktop-nav';
import { MobileNav } from '@/app/components/mobile-nav';

import { GlobalProviders } from './components/global-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Playground',
  description: 'A Next.js playground with Tailwind CSS and TypeScript.',
  authors: [{ name: 'Sander Cokart', url: 'https://github.com/sandercokart' }],
};

export default function RootLayout({ children }: LayoutType) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <Header />
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <NamedLogo />
      </div>
      <div className="flex lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <DesktopNav />
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Actions />
      </div>
    </nav>
  </header>
);

const NamedLogo = () => (
  <Link className="-m-1.5 flex items-center gap-4 p-1.5" href="/">
    <TbBrandNextjs className="h-6 w-6" />
    <span className="font-bold tracking-wide">Next.js Playground</span>
  </Link>
);
const Actions = () => {
  return (
    <>
      {/*<a className="text-sm font-semibold leading-6" href="#">*/}
      {/*  Log in <span aria-hidden="true">&rarr;</span>*/}
      {/*</a>*/}
    </>
  );
};
