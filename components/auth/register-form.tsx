'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md">
                <Image src={'/images/logoBook.png'} alt="Logo Website" className="w-14" width={400} height={400} />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-3xl font-semibold ">Pendaftaran Akun</h1>
            <p className="text-center text-sm text-slate-500">Yuk, gabung untuk meningkatkan literasimu di DigiBook.</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-4">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" type="text" placeholder="example: budi siregar" required />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} required />
                <Button type="button" variant={'ghost'} size={'sm'} className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeOffIcon className="h-4 w-4" aria-hidden="true" />}
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <Label htmlFor="password">Konfirmasi Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} required />
                <Button type="button" variant={'ghost'} size={'sm'} className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeOffIcon className="h-4 w-4" aria-hidden="true" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Daftar
            </Button>
          </div>
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our{' '}
        <Link target="_blank" className="text-primary" href="https://policies.google.com/terms">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link target="_blank" className="text-primary" href="https://policies.google.com/privacy">
          Privacy Policy
        </Link>
        .
      </div>
      <div className="text-center text-sm">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-primary font-medium">
          Masuk Sekarang
        </Link>
      </div>
    </div>
  );
}
