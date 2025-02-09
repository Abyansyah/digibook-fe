import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripHtmlTags(html: string): string {
  return html?.replace(/<\/?[^>]+(>|$)/g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export const getStatusText = (status: string) => {
  switch (status) {
    case 'ongoing':
      return 'Sedang Berlangsung';
    case 'completed':
      return 'Program Berakhir';
    default:
      return 'Akan Datang';
  }
};
