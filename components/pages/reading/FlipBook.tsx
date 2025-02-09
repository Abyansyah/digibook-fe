'use client';

import { useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${'3.4.120'}/pdf.worker.min.js`;

// Hook untuk track ukuran window
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Debounce untuk optimize performance
    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  return windowSize;
};

// Helper debounce
const debounce = (func: () => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const FlipBook = ({ pdfUrl }: { pdfUrl: string }) => {
  const [pages, setPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width: windowWidth } = useWindowSize();

  // Hitung ukuran flipbook secara responsive
  const calculateBookSize = useCallback(() => {
    const maxWidth = 1200; // Lebar maksimum
    const minWidth = 300; // Lebar minimum
    const aspectRatio = 3 / 4; // Rasio aspek buku (tinggi/lebar)

    // Hitung lebar berdasarkan viewport
    let bookWidth = Math.min(windowWidth * 0.9, maxWidth);
    bookWidth = Math.max(bookWidth, minWidth);

    return {
      width: bookWidth,
      height: bookWidth * aspectRatio,
    };
  }, [windowWidth]);

  const { width, height } = calculateBookSize();

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const pdf = await getDocument(pdfUrl).promise;
        const totalPages = pdf.numPages;
        const renderedPages = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({
            scale: calculateScale(windowWidth), // Scale responsive
          });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;

          renderedPages.push(canvas.toDataURL());
        }

        setPages(renderedPages);
      } catch (error) {
        console.error('Error loading PDF:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl, windowWidth]);

  // Fungsi untuk kalkulasi scale berdasarkan lebar layar
  const calculateScale = (screenWidth: number) => {
    if (screenWidth < 768) return 1.0; // Mobile
    if (screenWidth < 1024) return 1.2; // Tablet
    return 1.5; // Desktop
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
        <HTMLFlipBook
          width={width}
          height={height}
          showCover={true}
          mobileScrollSupport={true}
          className="shadow-xl"
          style={{
            backgroundColor: '#fff',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className="bg-white relative overflow-hidden"
              style={{
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                padding: '1rem',
              }}
            >
              <img
                src={page}
                alt={`Halaman ${index + 1}`}
                className="w-full h-full object-contain"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default FlipBook;
