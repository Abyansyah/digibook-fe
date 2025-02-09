'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarNavigation } from '@/constant/sidebar';

const SidebarMobile = () => {
  const [open, setOpen] = useState(false);

  const NavigationList = () => (
    <nav className="flex-1 space-y-1 p-4">
      {SidebarNavigation.map((item) => (
        <Link key={item.label} href="#" className={`flex items-center gap-3 rounded-lg px-4 py-2 ${item.active ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setOpen(false)}>
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarMobile;
