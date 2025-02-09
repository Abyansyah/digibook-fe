'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, CornerDownRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// This would typically come from a database or API
const topic = {
  id: 1,
  title: 'The Impact of Classic Literature on Modern Writing',
  author: 'John Doe',
  content:
    "Classic literature has had a profound impact on modern writing styles and themes. From Shakespeare to Austen, these timeless works continue to influence contemporary authors. In this discussion, let's explore how classic literature shapes our current literary landscape and why it remains relevant in today's world.",
  date: '2 days ago',
  replies: [
    {
      id: 1,
      author: 'Jane Smith',
      content: 'I completely agree! I find that many modern novels draw inspiration from classic themes. For instance, the way Jane Austen explored social dynamics is still relevant in contemporary fiction.',
      date: '1 day ago',
    },
    {
      id: 2,
      author: 'Bob Johnson',
      content: "While I appreciate classic literature, I think we should also recognize how modern authors are pushing boundaries and creating new forms of expression. It's a balance between honoring tradition and fostering innovation.",
      date: '12 hours ago',
    },
    {
      id: 3,
      author: 'Alice Brown',
      content: "Classic literature provides a foundation, but I believe it's crucial to read it critically. Some outdated views in classic works need to be addressed when studying their impact on modern writing.",
      date: '3 hours ago',
    },
  ],
};

export default function TopicPage({ params }: { params: { slug: string } }) {
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
  };

  const currentUser = 'Alice Brown'; // This would normally come from authentication

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Link href="/" className="text-blue-500 hover:text-blue-600 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Forum
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Posted by {topic.author} • {topic.date}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Replies</h2>
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
                    Reply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">{replyingTo ? 'Reply to Comment' : 'Post a Reply'}</h2>
            {replyingTo && (
              <button onClick={() => setReplyingTo(null)} className="text-sm text-blue-500 hover:text-blue-600">
                Cancel Reply
              </button>
            )}
            <form className="mt-4">
              <ReactQuill theme="snow" value={replyContent} onChange={setReplyContent} modules={modules} className="h-32 mb-12" />
              <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <MessageSquare className="mr-2 h-5 w-5" />
                Post Reply
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
