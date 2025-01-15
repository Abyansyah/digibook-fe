import { ClipboardCheck, PenTool, TestTube, Globe, Rocket, LineChart } from 'lucide-react';

export default function PedomanPenerbitan() {
  const steps = [
    {
      icon: ClipboardCheck,
      title: 'Penilaian berdasarkan Kriteria dan Pedoman',
      description: 'Tim DigiBook melakukan riset dan analisis untuk menilai kriteria dan pedoman yang akan diterapkan untuk menulis buku, jurnal, dan artikel.',
    },
    {
      icon: PenTool,
      title: 'Pengembangan Fitur Penulisan Pengguna',
      description: 'Desain dan perencanaan fitur penulisan dilakukan oleh tim pengembang, namun juga bisa dilakukan oleh penulis.',
    },
    {
      icon: TestTube,
      title: 'Uji Coba Internal',
      description: 'Pengujian lanjutan oleh tim internal DigiBook untuk mengevaluasi pengalaman pembaca dan mendapatkan umpan balik.',
    },
    {
      icon: Globe,
      title: 'Peluncuran Beta Publik',
      description: 'Peluncuran beta publik buku kepada sejumlah pengguna terbatas untuk mendapatkan umpan balik awal.',
    },
    {
      icon: Rocket,
      title: 'Peluncuran Resmi',
      description: 'Setelah mendapatkan umpan balik positif dari pengguna beta, Buku akan resmi diluncurkan ke seluruh pengguna DigiBook.',
    },
    {
      icon: LineChart,
      title: 'Pemantauan',
      description: 'Setelah peluncuran, tim DigiBook terus memantau perkembangan penjualan buku, mengumpulkan umpan balik dari pembaca.',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pedoman Penerbitan</h2>
        <p className="text-gray-600">Bagaimana sih cara untuk melakukan penerbitan buku di DigiBook?</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 -z-0 h-full w-0.5 bg-blue-500 -translate-x-1/2" />
        {/* <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-blue-500 -translate-x-1/2" /> */}

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="absolute invisible md:visible right-0 md:left-1/2 -top-[20] -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <step.icon className="w-4 h-4 text-white" />
              </div>

              <div className="md:w-1/2 md:-mx-10">
                <div className={`p-6 bg-white border rounded-lg shadow-sm ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-16">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Tertarik untuk membuat buku?</h3>
        <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Pelajari lebih lanjut</button>
      </div>
    </section>
  );
}
