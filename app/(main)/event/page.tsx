'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProgramCard } from '@/components/pages/event/event-card';
import { EventCategory, useEventStore } from '@/store/eventStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateURLParams } from '@/lib/url-params';
import { Suspense } from 'react';
import SkeletonCard from '@/components/loading-card';

const TABS = [
  { id: 'all', label: 'Semua Program' },
  { id: 'ongoing', label: 'Sedang Berlangsung' },
  { id: 'upcoming', label: 'Akan Datang' },
  { id: 'completed', label: 'Sudah Berakhir' },
];

function ProgramListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { events, eventCategory, loading, fetchEvents, fetchEventCategory } = useEventStore();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    fetchEvents({
      search,
      event_category: category !== 'all' ? category : '',
      status: activeTab !== 'all' ? activeTab : undefined,
    });
  }, [search, category, activeTab, fetchEvents]);

  useEffect(() => {
    fetchEventCategory();
  }, [fetchEventCategory]);

  const handleFiltersChange = (updates: Record<string, string>) => {
    const queryString = updateURLParams(searchParams, updates);
    router.push(queryString ? `?${queryString}` : '.');
  };

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
            <TabsList className="inline-flex">
              {TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
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
                <SelectItem value="all">Pilih kategori</SelectItem>
                {eventCategory?.map((cat: EventCategory) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            TABS.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((program) => (
                    <ProgramCard key={program.id} {...program} />
                  ))}
                </div>
                {events.length === 0 && <div className="text-center py-12 text-gray-500">Tidak ada program yang ditemukan</div>}
              </TabsContent>
            ))
          )}
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
