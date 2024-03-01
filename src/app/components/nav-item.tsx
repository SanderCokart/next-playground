'use client';

import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface NavItemProps {
  children: ReactNode;
  href: string;
}

const NavItem = ({ children, href }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <a
      className={cn('text-foreground/60 transition-colors hover:text-foreground/80', {
        'text-foreground': pathname === href,
      })}
      href={href}>
      {children}
    </a>
  );
};

export { NavItem };
export type { NavItemProps };
