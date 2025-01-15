import { Book, BarChart3, Pencil, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const FeatureSection = () => {
  return (
    <section className="py-28 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="p-6">
            <div className="flex flex-col items-start space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Book className="w-8 h-8 text-blue-500 group-hover:text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold">Apa aja sih keunggulan website DigiBook?</h2>
              <p className="text-gray-500 leading-loose">
                Sebagai platform digital kami memiliki komitmen untuk meningkatkan literasi digital di Indonesia. Tentunya kami memeliki beberapa fitur unggulan yang ada di website ini.
              </p>
              <Button variant="ghost" className="mt-4 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                Hubungi Kami
              </Button>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6 flex flex-col justify-between">
            <Card className="p-6 transition-all duration-300 hover:bg-blue-500 hover:text-white group mt-4 lg:mt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Book className="w-8 h-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium">Koleksi Buku Digital Dan Fisik</h3>
                <p className="group-hover:text-white/90 text-gray-500">Kami menyediakan akses ke beragam buku dalam format digital untuk diakses online dan offline.</p>
              </div>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:bg-blue-500 hover:text-white group mt-4 lg:mt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Pencil className="w-8 h-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium">Platform Penulisan dan Publikasi.</h3>
                <p className="group-hover:text-white/90 text-gray-500">Pengguna dapat menulis, menerbitkan, dan menjual karya mereka sendiri di platform kami dengan panduan penulisan dan publikasi.</p>
              </div>
            </Card>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <Card className="p-6 transition-all duration-300 hover:bg-blue-500 hover:text-white group -mt-4 lg:-mt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <BarChart3 className="w-8 h-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium">Leaderboard</h3>
                <p className="group-hover:text-white/90 text-gray-500">Kami menyediakan fitur leaderboard untuk mendorong kompetisi dan semangat pembelajaran di antara pengguna.</p>
              </div>
            </Card>

            <Card className="p-6 transition-all duration-300 hover:bg-blue-500 hover:text-white group -mt-4 lg:-mt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Calendar className="w-8 h-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-medium">Kegiatan Edukatif</h3>
                <p className="group-hover:text-white/90 text-gray-500">Untuk meningkatkan kemampuan berpikir kritis menyelenggarakan berbagai kegiatan edukatif, seperti seminar literasi, workshop menulis, dan kompetisi literasi.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
