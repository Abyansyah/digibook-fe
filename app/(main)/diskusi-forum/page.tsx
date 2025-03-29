import Link from 'next/link';
import { Search, PlusCircle } from 'lucide-react';

const topics = [
  {
    id: 1,
    title: 'Pengantar Literasi Digital',
    author: 'Andi Wijaya',
    replies: 10,
    views: 200,
    lastPost: '2 jam yang lalu',
  },
  {
    id: 2,
    title: 'Meningkatkan Kemampuan Membaca Kritis',
    author: 'Siti Rahma',
    replies: 7,
    views: 150,
    lastPost: '5 jam yang lalu',
  },
  {
    id: 3,
    title: 'Pentingnya Literasi Keuangan Sejak Dini',
    author: 'Budi Santoso',
    replies: 12,
    views: 300,
    lastPost: '1 hari yang lalu',
  },
  {
    id: 4,
    title: 'Strategi Meningkatkan Minat Baca',
    author: 'Dewi Kartika',
    replies: 9,
    views: 180,
    lastPost: '3 hari yang lalu',
  },
];

const categories = ['Literasi Digital', 'Membaca', 'Menulis', 'Keuangan', 'Pendidikan', 'Budaya'];

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Forum Literasi</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-64">
                <input type="text" placeholder="Search topics..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Link href="/diskusi-forum/new-topic" className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <PlusCircle className="mr-2 h-5 w-5" />
                Topik Baru
              </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {topics.map((topic) => (
                  <li key={topic.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-300">
                    <Link href={`/diskusi-forum/${topic.id}`} className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="text-lg font-medium text-blue-600">{topic.title}</h3>
                        <p className="text-sm text-gray-500">by {topic.author}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{topic.replies} replies</span>
                        <span className="mr-4">{topic.views} views</span>
                        <span>{topic.lastPost}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/4">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Kategori</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <li key={category} className="px-4 py-3 hover:bg-gray-50 transition duration-300">
                    <Link href={`/category/${category.toLowerCase().replace(' ', '-')}`} className="text-blue-600 hover:underline">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
