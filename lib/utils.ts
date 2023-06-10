import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseImgUrl(filename: string) {
  if (!filename) return '//:0';

  return `${process.env.NEXT_PUBLIC_API_URL}upload/file/${filename}`;
}
