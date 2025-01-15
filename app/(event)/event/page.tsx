'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProgramCard } from '@/components/event-card';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateURLParams } from '@/lib/url-params';
import { Suspense } from 'react';

const TABS = [
  { id: 'all', label: 'Semua Program' },
  { id: 'ongoing', label: 'Sedang Berlangsung' },
  { id: 'upcoming', label: 'Akan Datang' },
  { id: 'completed', label: 'Sudah Berakhir' },
];

const CATEGORIES = ['Semua Kategori', 'Lomba', 'Workshop', 'Webinar', 'Bootcamp'];

const PROGRAMS = [
  {
    id: '1',
    category: 'Lomba',
    title: 'Kompetisi Literasi & Numerasi',
    isFree: true,
    startDate: '2024-01-28',
    endDate: '2024-02-14',
    registeredCount: 120,
    status: 'ongoing' as const,
    participants: 120,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oe5hTgck4aB2vPfYW7wVLGoMf28x84.png',
  },
  {
    id: '2',
    category: 'Lomba',
    title: 'Kompetisi Literasi & Numerasi',
    isFree: true,
    startDate: '2024-01-28',
    endDate: '2024-02-14',
    registeredCount: 120,
    status: 'ongoing' as const,
    participants: 120,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oe5hTgck4aB2vPfYW7wVLGoMf28x84.png',
  },
  {
    id: '3',
    category: 'Lomba',
    title: 'Kompetisi Literasi & Numerasi',
    isFree: true,
    startDate: '2024-01-28',
    endDate: '2024-02-14',
    registeredCount: 120,
    status: 'ongoing' as const,
    participants: 120,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oe5hTgck4aB2vPfYW7wVLGoMf28x84.png',
  },
  {
    id: '4',
    category: 'Lomba',
    title: 'Kompetisi Literasi & Numerasi',
    isFree: true,
    startDate: '2024-01-28',
    endDate: '2024-02-14',
    registeredCount: 120,
    status: 'ongoing' as const,
    participants: 120,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oe5hTgck4aB2vPfYW7wVLGoMf28x84.png',
  },
];

function ProgramListing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'Semua Kategori');

  const handleFiltersChange = (updates: Record<string, string>) => {
    const queryString = updateURLParams(searchParams, updates);
    router.push(queryString ? `?${queryString}` : '.');
  };

  const filteredPrograms = PROGRAMS.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Semua Kategori' || program.category === category;
    const matchesTab = activeTab === 'all' || program.status === activeTab;

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="min-h-screen py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Program Kami</h1>

        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={(value) => {
            setActiveTab(value);
            handleFiltersChange({ tab: value });
          }}
        >
          <div className="mb-6 flex justify-center">
            <div className="overflow-x-auto max-w-full">
              <TabsList className="inline-flex">
                {TABS.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="px-4 py-2 flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-white whitespace-nowrap">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 my-6 sm:my-10">
            <Input
              placeholder="Cari program..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleFiltersChange({ search: e.target.value });
              }}
              className="w-full sm:max-w-xs"
            />
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                handleFiltersChange({ category: value });
              }}
            >
              <SelectTrigger className="w-full sm:max-w-xs">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <ProgramCard key={program.id} {...program} />
                ))}
              </div>

              {filteredPrograms.length === 0 && <div className="text-center py-12 text-gray-500">Tidak ada program yang ditemukan</div>}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default function ProgramListingWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgramListing />
    </Suspense>
  );
}
