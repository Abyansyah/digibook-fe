'use client';

import { Book, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { BASE_URL, fetcher } from '@/services/authClient';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: dataPoint, isLoading: isLoadingPoint } = useSWR(`${BASE_URL}/dashboard/poin`, fetcher);
  const { data: dataEvent, isLoading: isLoadingEvent } = useSWR(`${BASE_URL}/dashboard/attendance-event`, fetcher);
  const { data: dataBook, isLoading: isLoadingBook } = useSWR(`${BASE_URL}/dashboard/book-read`, fetcher);

  const { data: dataRecentEvent, isLoading: isLoadingRecentEvent } = useSWR(`${BASE_URL}/dashboard/recent-event`, fetcher);
  const { data: dataRecentBook, isLoading: isLoadingRecentBook } = useSWR(`${BASE_URL}/dashboard/recent-book`, fetcher);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {isLoadingPoint ? <SkeletonStatsCard /> : <StatsCard title="Total Points" value={dataPoint?.poin || 0} icon={<Star className="h-6 w-6 text-yellow-500" />} description="Points earned from reading" />}
        {isLoadingEvent ? <SkeletonStatsCard /> : <StatsCard title="Events Attended" value={dataEvent?.event || 0} icon={<Calendar className="h-6 w-6 text-blue-500" />} description="Total events participated" />}
        {isLoadingBook ? <SkeletonStatsCard /> : <StatsCard title="Books Read" value={dataBook?.book || 0} icon={<Book className="h-6 w-6 text-green-500" />} description="Completed books" />}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {isLoadingRecentEvent ? <SkeletonRecentEvents /> : <RecentEvents events={dataRecentEvent} />}
        {isLoadingRecentBook ? <SkeletonRecentBooks /> : <RecentBooks books={dataRecentBook} />}
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}

type EventType = {
  id: number;
  name: string;
  date: string;
  status: string;
};

type BookType = {
  id: number;
  title: string;
  last_page: number;
  page_count: number;
  presentase: string;
};

interface RecentEventsProps {
  events: {
    data: EventType[];
  };
}

function RecentEvents({ events }: RecentEventsProps) {
  const { push } = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events?.data?.length > 0 ? (
            events?.data?.map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${event.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{event.status}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-center ">
              <div className="flex flex-col items-center justify-center">
                <iframe className="w-60 h-60 mb-6" src="https://lottie.host/embed/25b433c0-c82b-4fa7-a51e-f63826a954e4/HEEbrJ7g7z.lottie"></iframe>
                <h2 className="font-semibold text-xl text-center">Wahh, kamu belum mengikuti event sama sekali nih!!</h2>
                <p className="mb-6">Yuk ikutin event dan dapatkan poin!</p>
                <Button onClick={() => push('/event')}>Ikut Event Sekarang!</Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface RecentBooksProps {
  books: {
    data: BookType[];
  };
}

function RecentBooks({ books }: RecentBooksProps) {
  const { push } = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Books</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {books?.data?.length > 0 ? (
            books?.data?.map((book, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium">{book.title}</p>
                  <span className="text-sm text-gray-500">{parseFloat(book.presentase)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${parseFloat(book.presentase)}%` }} />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center ">
              <div className="flex flex-col items-center justify-center">
                <iframe className="w-60 h-60 mb-6" src="https://lottie.host/embed/25b433c0-c82b-4fa7-a51e-f63826a954e4/HEEbrJ7g7z.lottie"></iframe>
                <h2 className="font-semibold text-xl text-center">Wahh, kamu belum membaca buku sama sekali nih!!</h2>
                <p className="mb-6">Yuk Baca buku sekarang dan dapatkan poin!</p>
                <Button onClick={() => push('/books')}>Ikut Event Sekarang!</Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonStatsCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="h-6 w-6 bg-gray-300 rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-6 w-16 bg-gray-300 rounded mb-2" />
        <div className="h-3 w-20 bg-gray-300 rounded" />
      </CardContent>
    </Card>
  );
}

function SkeletonRecentEvents() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle>
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="h-3 w-40 bg-gray-300 rounded mb-1" />
                <div className="h-2 w-28 bg-gray-300 rounded" />
              </div>
              <div className="h-4 w-16 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonRecentBooks() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle>
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-40 bg-gray-300 rounded" />
                <div className="h-3 w-10 bg-gray-300 rounded" />
              </div>
              <div className="h-2 bg-gray-300 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
