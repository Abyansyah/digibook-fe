'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarNavigation } from '@/constant/sidebar';

const Sidebar: React.FC = () => {
  const NavigationList = () => (
    <nav className="flex-1 space-y-1 p-4">
      {SidebarNavigation.map((item) => (
        <Link key={item.label} href="#" className={`flex items-center gap-3 rounded-lg px-4 py-2 ${item.active ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`}>
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
  return (
    <aside className="hidden h-screen w-64 border-r border-gray-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-gray-200 p-4">
          <div className="relative h-12 w-12">
            <Image src="https://github.com/shadcn.png" alt="Profile" className="rounded-full" width={48} height={48} />
          </div>
          <div>
            <h2 className="font-semibold">Ahmad Abyansyah</h2>
            <p className="text-sm text-gray-500">ID: 1037</p>
          </div>
        </div>

        <NavigationList />
      </div>
    </aside>
  );
};

export default Sidebar;
