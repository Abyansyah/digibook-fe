'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BookOpen, BookPlus, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import MobileNavbar from '@/components/layout/mobile-navbar';
import { useAuthStore } from '@/store/authStore';

const navigation = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    description: 'Overview of your activities',
  },
  {
    name: 'Events',
    icon: Calendar,
    href: '/dashboard/events',
    description: 'View your event participation',
  },
  {
    name: 'Reading History',
    icon: BookOpen,
    href: '/dashboard/reading',
    description: 'Track your reading progress',
  },
  {
    name: 'Book Publishing',
    icon: BookPlus,
    href: '/dashboard/publishing',
    description: 'Publish and manage your books',
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    description: 'View and manage your profile',
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex gap-y-20 min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col h-full py-5 bg-white border-r">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 md:pl-4 md:pr-8 xl:px-4">{children}</div>
        </main>
        {isMobile && <MobileNavbar navigation={navigation} />}
      </div>
    </div>
  );
}

function Sidebar() {
  const { user } = useAuthStore();
  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-20 h-20 mb-3">
          <Image src={user?.foto || 'https://github.com/shadcn.png'} alt="Profile" width={80} height={80} className="rounded-full object-cover" />
        </div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500">Reader & Author</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigation.map((item) => (
          <NavigationLink key={item.name} item={item} />
        ))}
      </nav>
    </>
  );
}

function NavigationLink({ item }: { item: (typeof navigation)[0] }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link href={item.href} className={cn('group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors', isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')}>
      <item.icon className={cn('mr-3 h-5 w-5 flex-shrink-0', isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900')} />
      <div className="flex flex-col">
        <span>{item.name}</span>
        <span className="text-xs text-gray-500">{item.description}</span>
      </div>
    </Link>
  );
}
