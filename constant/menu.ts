import { MenuTypes } from '@/types/menu';

export const ListMenu: MenuTypes[] = [
  {
    name: 'Beranda',
    href: '/',
  },
  {
    name: 'Baca Buku',
    href: '/books',
  },
  {
    name: 'Event',
    href: '/event',
  },
  {
    name: 'Berita',
    href: '/news',
  },
  {
    name: 'Edukasi & Publikasi',
    dropdown: [
      { name: 'Pelaporan Hoaks', href: '/report' },
      { name: 'Penerbitan Buku', href: '/publish' },
      { name: 'Tips Terbaru', href: '/tips' },
    ],
  },
];
