'use client';

import { Menu, X, ChevronDown, ChevronUp, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DigiBook from '@/public/images/digibook.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ListMenu } from '@/constant/menu';
import { MenuTypes } from '@/types/menu';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavbarProps } from '@/types/navbar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { push } = useRouter();

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const { token, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    push('/');
  };

  return (
    <header className={cn('sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b-[0.2px] md:supports-[backdrop-filter]:bg-background/60', className)}>
      <nav className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <Image src={DigiBook} alt="Logo Website" className="w-36" />
          <ul className="hidden md:flex items-center gap-10 text-card-foreground">
            {ListMenu.map((item: MenuTypes, index: number) => (
              <li key={index} className="relative">
                {item.dropdown ? (
                  <div>
                    <button onClick={() => toggleDropdown(item.name)} className="flex items-center text-gray-700 hover:text-blue-600 focus:outline-none">
                      {item.name}
                      <svg className={`ml-1 h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link key={dropdownIndex} href={dropdownItem.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href || '/'} className="text-gray-700 hover:text-blue-600">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center gap-2">
            {token ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Budi Seti</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LayoutDashboard /> <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-red-500 focus:text-white cursor-pointer">
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button onClick={() => push('/register')} variant="ghost" className="px-2 hover:bg-blue-200 text-primary hover:text-primary">
                  Daftar
                </Button>
                <Button onClick={() => push('/login')}>Masuk</Button>
              </>
            )}
          </div>
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {isOpen && (
          <div className="md:hidden border-t fixed w-full bg-background/95 backdrop-blur border-b-[0.2px] supports-[backdrop-filter]:bg-background/100 z-50">
            <div className="p-4 space-y-4">
              {ListMenu.map((item: MenuTypes, index: number) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      <button onClick={() => toggleDropdown(item.name)} className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 focus:outline-none">
                        {item.name}
                        {openDropdown === item.name ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                      {openDropdown === item.name && (
                        <div className="mt-4 space-y-4 pl-4 ">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <Link key={dropdownIndex} href={dropdownItem.href} className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href || '/'} className="block text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t">
              <div className="p-4 flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">hi@shadcndesign.com</span>
                </div>
              </div>
              <div className="border-t  flex flex-col p-4 space-y-4">
                {/* <Link href="/profile" className="block py-2 text-muted-foreground" onClick={() => setIsOpen(false)}>
                  My profile
                </Link>
                <Link href="/account" className="block py-2 text-muted-foreground" onClick={() => setIsOpen(false)}>
                  Account settings
                </Link>
                <Link href="/billing" className="block py-2 text-muted-foreground" onClick={() => setIsOpen(false)}>
                  Billing
                </Link> */}
                {/* <Button variant="ghost" className="w-full justify-start hover:bg-muted" onClick={() => setIsOpen(false)}>
                  Sign out
                </Button> */}
                <Button variant="ghost" className="px-2 hover:bg-blue-200 text-primary hover:text-primary">
                  Daftar
                </Button>
                <Button>Masuk</Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
