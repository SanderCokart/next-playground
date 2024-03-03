'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

import { navigation } from './navigation';

export const DesktopNav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigation.map(parent => {
          if (!parent.children) {
            return (
              <NavigationMenuItem key={parent.name}>
                <Link legacyBehavior passHref href={parent.href}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{parent.name}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          } else
            return (
              <NavigationMenuItem key={parent.name}>
                <NavigationMenuTrigger>{parent.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {parent.children.map(child => (
                      <li key={child.name} className={cn(child.wip && 'cursor-not-allowed')}>
                        <NavigationMenuLink asChild>
                          <Link
                            className={cn(
                              'block h-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                              child.wip && 'pointer-events-none',
                            )}
                            href={child.href}>
                            <div className="text-sm font-medium leading-none">{child.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {child.description}
                            </p>
                            {child.wip && (
                              <span className="text-xs font-semibold leading-none text-destructive">
                                Work in progress
                              </span>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
