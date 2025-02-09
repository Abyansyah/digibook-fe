'use client';

import * as React from 'react';
import { SpecialZoomLevel, Viewer, Worker, PageChangeEvent } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { toolbarPlugin, type ToolbarSlot, type TransformToolbarSlot, type ToolbarProps } from '@react-pdf-viewer/toolbar';
import useSWR from 'swr';
import authClient from '@/services/authClient';
import { BASE_URL } from '@/services/authClient';
import { readBook } from '@/services/bookApi';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => authClient.get(url).then((res) => res.data);

const PDFReader = ({ params }: { params: { slug: string } }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar } = toolbarPluginInstance;
  const { data, isLoading } = useSWR(`${BASE_URL}/reading-session/${params.slug}`, fetcher);
  const { push } = useRouter();

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    Print: () => <></>,
    Open: () => <></>,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar: (props: ToolbarProps) => React.ReactElement) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>,
  });

  const [lastPage, setLastPage] = React.useState<number | null>(null);
  const [pageCount, setPageCount] = React.useState<number | null>(null);
  const [animation, setAnimation] = React.useState(false);

  React.useEffect(() => {
    if (data?.last_page) {
      setLastPage(data.last_page);
    }
    if (data?.page_count) {
      setPageCount(data.page_count);
    }
  }, [data]);

  const updateLastPage = async (currentPage: number) => {
    if (lastPage === null) {
      setLastPage(currentPage);
      return;
    }

    if (currentPage <= lastPage) return;

    if (currentPage - lastPage > 1) {
      return;
    }

    try {
      const response = await readBook(params.slug, currentPage);

      if (response.success) {
        setLastPage(currentPage);
        if (currentPage === pageCount) {
          setAnimation(true);
        }
      }
    } catch (error) {
      console.error('Gagal memperbarui halaman terakhir:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <iframe src="https://lottie.host/embed/0d53fecd-f5f5-4f67-a651-b33f93d434cc/pT97OQp5TH.lottie"></iframe>
          <p className="text-xl">Memuat buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-h-screen overflow-hidden">
      {animation && (
        <div className="absolute top-0 bottom-0 right-0 left-0 z-[999] w-full h-screen bg-black bg-opacity-80 flex flex-col justify-center items-center">
          <iframe className="w-96 h-96" src="https://lottie.host/embed/32c13fb9-188a-4317-9524-87a01a2e1199/zxSC3kF8Ri.lottie"></iframe>
          <h2 className="text-2xl font-bold text-white mt-4">🎉 Yeyy, Anda telah membaca sampai halaman terakhir! 🎉</h2>
          <p className="text-lg text-white mt-2">Selamat! Anda telah menyelesaikan buku ini.</p>
          <Button onClick={() => push('/dashboard')} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">Kembali ke Dashboard</Button>
        </div>
      )}

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="w-full h-dvh overflow-hidden">
          <Viewer
            onPageChange={(e: PageChangeEvent) => updateLastPage(e.currentPage + 1)}
            theme="dark"
            defaultScale={SpecialZoomLevel.PageFit}
            initialPage={lastPage ? lastPage - 1 : 0}
            fileUrl={data?.book_file}
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PDFReader;
