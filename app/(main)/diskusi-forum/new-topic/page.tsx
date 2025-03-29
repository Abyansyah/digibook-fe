'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewTopicPage() {
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'strike', 'blockquote'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], ['link', 'image'], ['clean']],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];
  const categories = ['Literasi Digital', 'Membaca', 'Menulis', 'Keuangan', 'Pendidikan', 'Budaya'];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <Link href="/diskusi-forum" className="text-blue-500 hover:text-blue-600 flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Forum
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Topic</h1>
          <form action="">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Judul
              </label>
              <Input type="text" id="title" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your topic title" />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Topik</SelectLabel>
                   {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Konten</label>
              <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} className="h-64 mb-12" />
            </div>
            <div className="flex justify-end mt-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <Send className="mr-2 h-5 w-5" />
                Tambah Topik
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
