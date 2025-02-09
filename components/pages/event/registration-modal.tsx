'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEventStore } from '@/store/eventStore';
import { useAuthStore } from '@/store/authStore';
import { registEvent } from '@/services/eventApi';
import { toast } from 'sonner';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: { slug: string };
}

export function RegistrationModal({ isOpen, onClose, params }: RegistrationModalProps) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { eventDetail, fetchEventDetail } = useEventStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await registEvent(eventDetail?.id);
      console.log(response.message);
      toast.success(response?.message);
      await fetchEventDetail(params?.slug);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Registrasi gagal. Coba lagi.');
    }

    setIsLoading(false);
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>Sebelum mendaftar bootcamp, yuk cek kembali data profile yang akan digunakan di sertifikatmu nanti.</AlertDescription>
      </Alert>
      <div className="space-y-2">
        <Label htmlFor="fullName">Nama Lengkap</Label>
        <Input disabled id="fullName" className="disabled:opacity-100" value={user?.name} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input disabled id="email" type="email" className="disabled:opacity-100" value={user?.email} />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} required />
        <Label htmlFor="terms">Saya setuju dengan syarat dan ketentuan yang berlaku</Label>
      </div>
      <Button disabled={!agreeTerms || isLoading} type="submit" className="w-full">
        {isLoading ? 'Loading...' : ' Daftar Sekarang'}
      </Button>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Daftar Event</DrawerTitle>
            <DrawerDescription>Silakan isi formulir pendaftaran di bawah ini.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">{formContent}</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Batal</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Daftar Event</DialogTitle>
          <DialogDescription>Silakan isi formulir pendaftaran di bawah ini.</DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
