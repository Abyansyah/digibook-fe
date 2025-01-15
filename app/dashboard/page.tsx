'use client';

import { Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <>
      <div className="bg-red-600 p-6 text-white">
        <h1 className="text-2xl font-bold">Halo, Ahmad Abyansyah!</h1>
        <p className="mt-1 text-red-100">Mulai belajar lagi, kumpulkan Skilpoin dan Skilbadge dari Skilvul.</p>
      </div>

      <div className="mx-auto  p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-600">Total SkilPoin</h3>
              <span className="text-yellow-500">⭐</span>
            </div>
            <p className="mt-2 text-4xl font-bold text-red-600">3705</p>
            <p className="mt-1 text-sm text-gray-500">SkilPoin</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-600">SkilBadge</h3>
              <span>🏆</span>
            </div>
            <p className="mt-2 text-4xl font-bold text-red-600">1</p>
            <p className="mt-1 text-sm text-gray-500">SkilBadge</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-red-100 p-2">
              <Bell className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">Profil kamu belum dilengkapi!</h3>
              <p className="mt-1 text-sm text-gray-500">Kelengkapan profil kamu saat ini masih 90,9%. Lengkapi profilmu untuk unlock SkilReward di Skilvul.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
