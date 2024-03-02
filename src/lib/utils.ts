import { clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = async (text: string, title: string = 'Copied to clipboard') => {
  await navigator.clipboard.writeText(text);
  toast(title, {
    duration: 1000,
  });
};
