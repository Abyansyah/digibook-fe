'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DescriptionBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string | undefined;
}

export function DescriptionBookModal({ isOpen, onClose, description }: DescriptionBookModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const descriptionContent = (
    <ScrollArea className="max-h-[300px] sm-p-0 px-4">
      <div className="prose prose-lg">
        <p className="text-justify text-sm">{description}</p>
      </div>
    </ScrollArea>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Deskripsi</DrawerTitle>
            <DrawerDescription>Deskripsi Lengkap</DrawerDescription>
          </DrawerHeader>
          {descriptionContent}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Tutup</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">Deskripsi</DialogTitle>
          <DialogDescription>Deskripsi Lengkap</DialogDescription>
        </DialogHeader>
        {descriptionContent}
      </DialogContent>
    </Dialog>
  );
}
