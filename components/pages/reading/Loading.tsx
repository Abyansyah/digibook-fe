'use client';

export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Memuat buku...</p>
      </div>
    </div>
  );
}
