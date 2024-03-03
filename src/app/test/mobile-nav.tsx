import { RiMenu3Line } from 'react-icons/ri';
import { TbBrandNextjs } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';

import { navigation } from './navigation';

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <span className="sr-only">Open main menu</span>
          <RiMenu3Line className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center justify-between">
            <a className="-m-1.5 flex items-center gap-4 p-1.5" href="#">
              <TbBrandNextjs className="h-6 w-6" />
              <span className="sr-only">Next.js Playground</span>
            </a>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent hover:text-accent-foreground"
                    href={item.href}>
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-accent hover:text-accent-foreground"
                  href="#">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
