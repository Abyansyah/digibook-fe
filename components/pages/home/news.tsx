import Image from 'next/image';
import Link from 'next/link';

export default function NewsSection() {
  const articles = [
    {
      id: 1,
      date: 'MARET 16 2024',
      source: 'SINDONEWS',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wp4PneTH3jr8GApnoiVeYwo1JFJALq.png',
      title: 'Literasi Digital Permudah Siswa Peroleh Sumber Belajar Secara Akurat',
      description: 'Literasi digital banyak memberikan manfaat dalam dunia pendidikan. Selain memberikan akses informasi yang cepat dan mudah, literasi digital dapat meningkatkan keterampilan berpikir hingga peluang belajar kolaboratif.',
    },
    {
      id: 2,
      date: 'JANUARI 10 2024',
      source: 'LIPUTAN6',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wp4PneTH3jr8GApnoiVeYwo1JFJALq.png',
      title: 'Teknologi Makin Mendarah Daging, Ini 5 Alasan Pentingnya Literasi Digital bagi Siswa',
      description:
        'Meskipun literasi dan matematika tetap jadi inti pendidikan, kurikulum literasi digital nampaknya perlu dipertimbangkan sebagai suatu kebutuhan dalam sistem pendidikan di era teknologi ini. Pasalnya, literasi digital telah jadi keterampilan.',
    },
    {
      id: 3,
      date: 'JULI 14 2023',
      source: 'KOMPAS',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wp4PneTH3jr8GApnoiVeYwo1JFJALq.png',
      title: 'Orangtua Berperan Tanamkan Minat Baca Anak',
      description:
        'Minat baca pada anak bisa ditumbuhkan dari rumah dan hal ini butuh peran aktif orangtua. Agar anak tertarik, orangtua bisa membacakan buku dengan nyaring, membuat pojok buku sederhana di rumah, mengajak anak ke perpustakaan atau toko buku.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Berita Terkini</h2>
        <p className="text-gray-600">Temukan berita menarik seputar literasi digital.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article key={article.id} className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48 sm:h-56">
              <Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
            </div>

            <div className="flex-1 p-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <time className="font-medium">{article.date}</time>
                <span className="font-medium">{article.source}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>

              <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>

              <Link href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Baca Selengkapnya
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
