import dynamic from 'next/dynamic';

const PDFReader = dynamic(() => import('@/app/(main)/reading/pdf-viewer'), { ssr: false });

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function ReadingPage({ params }: { params: { slug: string } }) {
  return <PDFReader params={params} />;
}
