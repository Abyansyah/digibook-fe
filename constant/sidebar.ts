import { SidebarProps } from '@/types/sidebar';
import { Bell, Book, Bookmark, Home, User } from 'lucide-react';

export const SidebarNavigation: SidebarProps[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },

  {
    label: 'Event',
    href: '/dashboard/event',
    icon: Bell,
  },
  {
    label: 'Histori Membaca',
    href: '/dashboard/histori-membaca',
    icon: Book,
  },
  {
    label: 'Buku Favorit',
    href: '/dashboard/buku-favorit',
    icon: Bookmark,
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
];
