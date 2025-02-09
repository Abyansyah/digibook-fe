import Link from 'next/link';
import { Search, PlusCircle } from 'lucide-react';

const topics = [
  {
    id: 1,
    title: 'Getting started with Next.js',
    author: 'John Doe',
    replies: 15,
    views: 230,
    lastPost: '2 hours ago',
  },
  {
    id: 2,
    title: 'Tailwind CSS best practices',
    author: 'Jane Smith',
    replies: 8,
    views: 120,
    lastPost: '5 hours ago',
  },
  {
    id: 3,
    title: 'React Server Components explained',
    author: 'Bob Johnson',
    replies: 22,
    views: 345,
    lastPost: '1 day ago',
  },
  {
    id: 4,
    title: 'Optimizing performance in Next.js',
    author: 'Alice Brown',
    replies: 12,
    views: 180,
    lastPost: '3 days ago',
  },
];

const categories = ['General', 'Next.js', 'React', 'Tailwind CSS', 'JavaScript', 'TypeScript'];

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Developer Forum</h1>
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
                New Topic
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
                <h2 className="text-lg font-medium text-gray-900">Categories</h2>
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
