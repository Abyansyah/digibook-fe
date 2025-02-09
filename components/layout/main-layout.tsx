'use client';

import React, { useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Toaster } from 'sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isNoLayout = ['/login', '/register', '/404'].includes(pathname) || pathname.startsWith('/reading/');

  const { token, fetchUser } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token, fetchUser]);

  return (
    <>
      <Toaster position="top-right" richColors closeButton={true} />
      {!isNoLayout && <Navbar />}
      {children}
      {!isNoLayout && <Footer />}
    </>
  );
}
