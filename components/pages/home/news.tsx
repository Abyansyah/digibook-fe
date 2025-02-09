'use client';

import SkeletonCard from '@/components/loading-card';
import { stripHtmlTags } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
const BASE_URL = process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE;

export default function NewsSection() {
  const { data, isLoading } = useSWR(`${BASE_URL}/news?per_page=3`, fetcher);
  // const { news, loading, fetchNews } = useNewsStore();
  // useEffect(() => {
  //   fetchNews({ per_page: 3 });
  // }, [fetchNews]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Berita Terkini</h2>
        <p className="text-gray-600">Temukan berita menarik seputar literasi digital.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.list?.map((article?: any) => (
            <article key={article.id} className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48 sm:h-56">
                <Image src={article.image} priority={true} alt={article.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <time className="font-medium">{article.created_at}</time>
                  <span className="font-medium">{article.author}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{stripHtmlTags(article.description)}</p>

                <Link href={`/news/${article.slug}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Baca Selengkapnya
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
