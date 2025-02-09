'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import SkeletonCard from '@/components/loading-card';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/services/authClient';

const BASE_URL = process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE;

export default function EventSection() {
  const { data, isLoading } = useSWR(`${BASE_URL}/events?per_page=2`, fetcher);
  const { push } = useRouter();

  return (
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[400px,1fr] gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold ">Event Terbaru</h2>
            <p className="text-gray-500 text-lg">
              Dengan mengikuti event di DigiBook, kamu bukan hanya akan menambah wawasan dan menguji kemampuanmu, tetapi kamu juga akan mendapatkan point yang dimana dapat ditukar dengan buku gratis atau mengikuti event gratis.
            </p>
            <Button variant="default" className="group  hover:text-white ">
              Lihat Event
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                {Array.from({ length: 2 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data?.data?.list?.map((event?: any) => (
                <Card key={event.id} className="bg-white overflow-hidden">
                  <div className="relative h-48">
                    <Image src={event.imageUrl} alt={event.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-blue-600 font-medium mb-2">{event.category}</div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{event.title}</h3>
                      </div>

                      {/* <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-medium">{event.price}</span>
                      </div> */}

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <span>
                            {event.start_time} - {event.end_time}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(event.registeredCount / event.participants_count) * 100}%` }} />
                        </div>
                        <div className="text-sm text-gray-600">{event.participants} Peserta telah terdaftar</div>
                      </div>

                      <Button onClick={() => push(`/event/${event.slug}`)} className="w-full">
                        Daftar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
