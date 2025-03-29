'use client';

import { useState } from 'react';
import { X, ListChecks, BookOpenCheck, CircleCheck, FileWarning } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AlertType = 'submitted' | 'approved' | 'rejected' | 'published' | 'draft';

interface AlertRibbonProps {
  type?: AlertType;
  message: string;
  className?: string;
}

const alertStyles: Record<AlertType, string> = {
  submitted: 'bg-purple-100 text-purple-800',
  published: 'bg-green-100 text-green-800',
  approved: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  draft: '',
};

const alertIcons: Record<AlertType, React.ReactNode> = {
  submitted: <ListChecks className="h-5 w-5" />,
  published: <BookOpenCheck className="h-5 w-5" />,
  approved: <CircleCheck className="h-5 w-5" />,
  rejected: <FileWarning className="h-5 w-5" />,
  draft: '',
};

export const alertMessages = {
  submitted: 'Buku dalam pengecekan oleh tim digibook',
  published: 'Buku anda telah terbit, cek analisa untuk menilai kualitas buku',
  approved: 'Buku anda telah disetujui oleh tim digibook, silahkan tunggu hingga buku anda terbit',
  rejected: 'Buku anda telah ditolak oleh tim digibook, silahkan perbaiki kembali buku anda',
  draft: '',
};

export function AlertRibbon({ type = 'draft', message, className }: AlertRibbonProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn('z-50 flex items-center justify-between px-4 py-3 rounded-lg', alertStyles[type], className)} role="alert">
      <div className="flex items-center">
        {alertIcons[type]}
        <span className="ml-3 font-medium">{message}</span>
      </div>
      <button onClick={() => setIsVisible(false)} className="flex-shrink-0 rounded-md p-1 transition-colors duration-200 hover:bg-opacity-20 hover:bg-black focus:outline-none focus:ring-2 focus:ring-opacity-50" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
