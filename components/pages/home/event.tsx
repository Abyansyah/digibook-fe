import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const events = [
  {
    id: 1,
    type: 'Lomba',
    title: 'Kompetisi Literasi & Numerasi',
    image: 'https://images.unsplash.com/photo-1563050860-87d45eaaeabb?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 'Gratis',
    startDate: '28 Januari 2024',
    endDate: '14 Februari 2024',
    participants: 120,
    participantsText: 'Peserta telah terdaftar',
  },
  {
    id: 2,
    type: 'Workshop',
    title: 'Workshop Menulis Kreatif',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 'Gratis',
    startDate: '28 Januari 2024',
    endDate: '14 Februari 2024',
    participants: 300,
    participantsText: 'Peserta telah terdaftar',
  },
];

export default function EventSection() {
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
            {events.map((event) => (
              <Card key={event.id} className="bg-white overflow-hidden">
                <div className="relative h-48">
                  <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-blue-600 font-medium mb-2">{event.type}</div>
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium">{event.price}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <span>
                          {event.startDate} - {event.endDate}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(event.participants / 500) * 100}%` }} />
                      </div>
                      <div className="text-sm text-gray-600">
                        {event.participants} {event.participantsText}
                      </div>
                    </div>

                    <Button className="w-full">Daftar</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
