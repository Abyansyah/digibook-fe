'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { loginApi } from '@/services/authApi';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, setToken, setLoading, setError } = useAuthStore();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await loginApi({ email, password });
      setToken(data.access_token);
      Cookies.set('authToken', data.access_token);
      router.push('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md">
                <Image src={'/images/logoBook.png'} alt="Logo Website" className="w-14" width={400} height={400} />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-3xl font-semibold ">Masuk Ke DigiBook</h1>
            <p className="text-center text-sm text-slate-500">Yuk, gabung untuk meningkatkan literasimu di DigiBook.</p>
          </div>
          <div className="flex flex-col gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="button" variant={'ghost'} size={'sm'} className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeOffIcon className="h-4 w-4" aria-hidden="true" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : 'Masuk'}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-center text-sm">
        Belum punya akun?{' '}
        <Link href="/register" className="text-primary font-medium">
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
