'use client';

import { Copy, X } from 'lucide-react';

import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { copyToClipboard } from '@/lib/utils';

export const CodeSheet = ({
  children = 'View Source Code',
  html,
  code,
}: {
  children?: ReactNode;
  html: string;
  code: string;
}) => {
  const copyCodeToClipboard = () => {
    void copyToClipboard(code, 'Code copied to clipboard!');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>{children}</Button>
      </SheetTrigger>
      <SheetContent hideClose className="m-0 p-0" side="bottom">
        <pre className="max-h-[90dvh] overflow-y-auto p-4 pb-32">
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
        <Button className="absolute right-20 top-4  p-2" size="icon" variant="outline" onClick={copyCodeToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
        <SheetClose asChild>
          <Button className="absolute  right-8 top-4 border p-2" size="icon" variant="destructive">
            <X className="h-4 w-4" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
