'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calendar, Settings, User, Menu } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const SidebarContext = React.createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
} | null>(null);

const AppSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Events', href: '/dashboard/events', icon: Calendar },
    { name: 'Books', href: '/dashboard/books', icon: BookOpen },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <Sidebar collapsible='offcanvas' className={collapsed ? 'w-16' : 'w-64'}>
        <SidebarHeader>
          <h2 className="text-xl font-bold flex items-center justify-between p-4">
            {!collapsed && <span className="truncate">MyDashboard</span>}
            <Menu className="w-6 h-6 cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
          </h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton isActive={pathname === item.href}>
                  <Link href={item.href} className="flex items-center w-full">
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="ml-2 truncate">{item.name}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>{/* You can add footer content here if needed */}</SidebarFooter>
      </Sidebar>
    </SidebarContext.Provider>
  );
};

export default AppSidebar;
