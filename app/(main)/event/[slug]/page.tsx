'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Share2, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RegistrationModal } from '@/components/pages/event/registration-modal';
import { useEventStore } from '@/store/eventStore';
import parse from 'html-react-parser';
import { getStatusText } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function EventDetail({ params }: { params: { slug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuthStore();
  const { eventDetail, loadingDetail, fetchEventDetail } = useEventStore();

  const slug = params.slug;

  const { push } = useRouter();

  useEffect(() => {
    if (slug) {
      fetchEventDetail(slug);
    }
  }, [fetchEventDetail, slug]);

  const handleClickEvent = () => {
    if (token) {
      setIsModalOpen(true);
    } else {
      push('/login');
    }
  };

  if (loadingDetail) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/event" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Event
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
              <Image src={eventDetail?.imageUrl || '/images/publish-hero.jpg'} alt="Event Cover" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>

            <div>
              <Badge className="mb-4">{eventDetail?.category}</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{eventDetail?.title}</h1>
              <p className="text-gray-600 mb-6">{eventDetail?.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {eventDetail?.start_date} - {eventDetail?.end_date}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>
                    {eventDetail?.start_time} - {eventDetail?.end_time}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{eventDetail?.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{eventDetail?.participants_count} Peserta</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Deskripsi Event</h2>
              {parse(eventDetail?.event_overview || '')}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">Gratis</span>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Status Pendaftaran</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {getStatusText(eventDetail?.status || '')}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Peserta Terdaftar</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: `${((eventDetail?.registeredCount || 0) / (eventDetail?.participants_count || 1)) * 100}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {eventDetail?.registeredCount}/{eventDetail?.participants_count}
                    </span>
                  </div>
                </div>

                <Button disabled={eventDetail?.is_registration || eventDetail?.status === 'completed'} className="w-full" size="lg" onClick={handleClickEvent}>
                  {eventDetail?.is_registration ? 'Anda Sudah Daftar' : eventDetail?.status === 'completed' ? 'Event Selesai' : 'Daftar Sekarang'}
                </Button>

                {eventDetail?.registration_deadline && <p className="text-sm text-gray-500 text-center">Pendaftaran ditutup dalam {eventDetail?.registration_deadline} hari</p>}
              </div>
            </div>
          </div>
        </div>

        {/* <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Rekomendasi Kelas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Digital Marketing"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">Bootcamp</Badge>
                <h3 className="font-semibold text-lg mb-2">Digital Marketing Masterclass</h3>
                <p className="text-sm text-gray-600 mb-4">Pelajari strategi pemasaran digital dari para ahli industri</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>1 Februari 2025</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="UI/UX Design"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">Workshop</Badge>
                <h3 className="font-semibold text-lg mb-2">UI/UX Design Fundamentals</h3>
                <p className="text-sm text-gray-600 mb-4">Dasar-dasar desain antarmuka dan pengalaman pengguna</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>15 Februari 2025</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Data Analytics"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <Badge className="mb-2">Kursus</Badge>

                <h3 className="font-semibold text-lg mb-2">Data Analytics Essential</h3>
                <p className="text-sm text-gray-600 mb-4">Analisis data untuk pengambilan keputusan bisnis</p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>5 Maret 2025</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full">
                  Lihat Detail
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section> */}
      </main>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} params={{ slug }} />
    </div>
  );
}
