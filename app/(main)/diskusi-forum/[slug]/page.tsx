'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, CornerDownRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// Data topik diskusi (seharusnya berasal dari database atau API)
const topic = {
  id: 1,
  title: 'Dampak Literasi Klasik terhadap Penulisan Modern',
  author: 'Andi Wijaya',
  content:
    'Literasi klasik memiliki dampak besar terhadap gaya dan tema penulisan modern. Dari karya Shakespeare hingga Pramoedya Ananta Toer, karya-karya ini terus mempengaruhi penulis kontemporer. Dalam diskusi ini, mari kita bahas bagaimana literasi klasik membentuk lanskap sastra saat ini dan mengapa masih relevan di era modern.',
  date: '2 hari yang lalu',
  replies: [
    {
      id: 1,
      author: 'Siti Rahma',
      content: 'Saya setuju! Banyak novel modern masih terinspirasi oleh tema klasik. Misalnya, bagaimana Pramoedya membahas ketimpangan sosial masih sangat relevan dalam sastra kontemporer.',
      date: '1 hari yang lalu',
    },
    {
      id: 2,
      author: 'Budi Santoso',
      content: 'Saya menghargai literasi klasik, tetapi kita juga harus mengakui bahwa penulis modern mendorong batasan dan menciptakan bentuk ekspresi baru. Penting untuk menyeimbangkan penghormatan terhadap tradisi dan inovasi baru.',
      date: '12 jam yang lalu',
    },
    {
      id: 3,
      author: 'Dewi Kartika',
      content: 'Literasi klasik menjadi fondasi, tetapi saya percaya penting untuk membacanya secara kritis. Beberapa pandangan lama dalam karya klasik perlu dikaji ulang saat kita meneliti pengaruhnya terhadap penulisan modern.',
      date: '3 jam yang lalu',
    },
  ],
};

export default function TopicPage({ params }: { params: { slug: string } }) {
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  console.log(params);

  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
  };

  const currentUser = 'Dewi Kartika'; // Seharusnya berasal dari autentikasi

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Link href="/diskusi-forum" className="text-blue-500 hover:text-blue-600 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali ke Forum
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Diposting oleh {topic.author} • {topic.date}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Balasan</h2>
          <ul className="space-y-8">
            {topic.replies.map((reply) => (
              <li key={reply.id} className={`bg-white shadow overflow-hidden sm:rounded-lg ${reply.author === currentUser ? 'border-l-4 border-blue-500' : ''}`}>
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-900">{reply.author}</p>
                    <p className="text-sm text-gray-500">{reply.date}</p>
                  </div>
                  <div className="mt-2 text-gray-700 prose" dangerouslySetInnerHTML={{ __html: reply.content }}></div>
                  <button onClick={() => setReplyingTo(reply.id)} className="mt-2 text-blue-500 hover:text-blue-600 flex items-center">
                    <CornerDownRight className="h-4 w-4 mr-1" />
                    Balas
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">{replyingTo ? 'Balas Komentar' : 'Tulis Balasan'}</h2>
            {replyingTo && (
              <button onClick={() => setReplyingTo(null)} className="text-sm text-blue-500 hover:text-blue-600">
                Batal Balas
              </button>
            )}
            <form className="mt-4">
              <ReactQuill theme="snow" value={replyContent} onChange={setReplyContent} modules={modules} className="h-32 mb-12" />
              <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <MessageSquare className="mr-2 h-5 w-5" />
                Kirim Balasan
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
