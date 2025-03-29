'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BASE_URL, fetcher } from '@/services/authClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Event {
  id: number;
  name: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  time: string;
  slug: string;
  location: string;
  total_participant: number;
}

interface EventResponse {
  data: Event[];
}

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'upcoming'>('all');

  const { data, error } = useSWR<EventResponse>(`${BASE_URL}/dashboard/event?tab=${filter}`, fetcher);

  if (error) {
    return <div>Error loading events</div>;
  }

  const events: Event[] = data?.data || [];

  const filteredEvents = filter === 'all' ? events : events.filter((event) => event.status === filter);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Events</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>
            All Programs
          </TabsTrigger>
          <TabsTrigger value="ongoing" onClick={() => setFilter('ongoing')}>
            Ongoing
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilter('completed')}>
            Completed
          </TabsTrigger>
          <TabsTrigger value="upcoming" onClick={() => setFilter('upcoming')}>
            Upcoming
          </TabsTrigger>
        </TabsList>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-6">{!data ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />) : filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>
        ) : (
          <div className="flex justify-center ">
            <div className="flex flex-col items-center justify-center">
              <iframe className="w-60 h-60 mb-6" src="https://lottie.host/embed/25b433c0-c82b-4fa7-a51e-f63826a954e4/HEEbrJ7g7z.lottie"></iframe>
              <h2 className="font-semibold text-xl text-center">Wahh, kamu belum mengikuti event sama sekali nih!!</h2>
              <p className="mb-6">Yuk ikutin event dan dapatkan poin!</p>
              <Link href={'/event'}>
                <Button>Ikut Event Sekarang!</Button>
              </Link>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const router = useRouter();

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">{event.name}</h3>
          <div className="grid gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {event.date} {event.time && `at ${event.time}`}
              </span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{event.total_participant} participants</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end justify-between">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${event.status === 'completed' ? 'bg-green-100 text-green-800' : event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>

          <Button onClick={() => router.push(`/event/${event.slug}`)} variant={event.status === 'completed' ? 'outline' : 'default'}>
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end justify-between">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-8 bg-gray-300 rounded w-28"></div>
        </div>
      </div>
    </Card>
  );
}
