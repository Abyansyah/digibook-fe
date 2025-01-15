import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, Pen, TestTube, Rocket, Globe, BarChart } from 'lucide-react';

const timelineItems = [
  {
    title: 'Penilaian berdasarkan Kriteria dan Pedoman',
    description: 'Evaluasi naskah berdasarkan standar kualitas yang ketat.',
    icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Pengembangan Fitur Penulisan Pengguna',
    description: 'Implementasi alat penulisan yang intuitif dan efisien.',
    icon: <Pen className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Uji Coba Internal',
    description: 'Pengujian menyeluruh untuk memastikan kualitas dan keandalan platform.',
    icon: <TestTube className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Peluncuran Beta Publik',
    description: 'Membuka akses terbatas untuk mendapatkan umpan balik dari pengguna awal.',
    icon: <Rocket className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Peluncuran Resmi',
    description: 'Membuka platform untuk umum dengan fitur lengkap.',
    icon: <Globe className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'Pemantauan',
    description: 'Evaluasi berkelanjutan dan peningkatan berdasarkan umpan balik pengguna.',
    icon: <BarChart className="w-8 h-8 text-blue-500" />,
  },
];

export default function Timeline() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Proses Penerbitan</h2>
        <div className="space-y-8">
          {timelineItems.map((item, index) => (
            <Card key={index} className="relative overflow-hidden transition-all hover:shadow-lg">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
              <CardContent className="p-6 ml-6 flex items-start">
                <div className="mr-6 bg-white p-2 rounded-full shadow-md">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
