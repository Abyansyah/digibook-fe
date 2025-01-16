'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { registerApi } from '@/services/authApi';

export function RegisterForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setToken } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Nama lengkap harus diisi.';
    if (!formData.email) newErrors.email = 'Email harus diisi.';
    if (!formData.password) newErrors.password = 'Password harus diisi.';
    else if (formData.password.length < 8) newErrors.password = 'Password harus minimal 8 karakter.';
    if (!formData.password_confirmation) newErrors.password_confirmation = 'Konfirmasi password harus diisi.';
    else if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Konfirmasi password tidak cocok dengan password.';

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const { data } = await registerApi(formData);
      setToken(data.token);
      router.push('/login');
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors({ general: err.response?.data?.error || 'Registrasi gagal. Coba lagi.' });
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
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
              <Input id="name" type="text" placeholder="example: budi siregar" value={formData.name} onChange={handleInputChange} required />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleInputChange} required />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} required />
                <Button type="button" variant={'ghost'} size={'sm'} className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer hover:bg-transparent" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeOffIcon className="h-4 w-4" aria-hidden="true" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
              <Input id="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleInputChange} required />
              {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
            </div>
            {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Daftar
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
