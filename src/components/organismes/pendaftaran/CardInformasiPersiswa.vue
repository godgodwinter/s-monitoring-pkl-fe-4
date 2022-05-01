<template>
  <div>
    <!-- About Section -->
    <div class="bg-white p-3 shadow-sm rounded-sm">
      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span clas="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        <span class="tracking-wide">Siswa Disetujui</span>
      </div>
      <div class="text-gray-700">
        <div class="grid md:grid-cols-2 text-sm">
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Tempat PKL</div>
            <div class="px-4 py-2">PT ABCD Indonesia</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Tanggal Daftar</div>
            <div class="px-4 py-2">22 Januari 2022</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Status Prakerin</div>
            <div class="px-4 py-2">
              Belum Daftar/ Proses Daftar / Sedang Prakerin / Telah Selesai
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">No. Telp</div>
            <div class="px-4 py-2">+11 998001001</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Pembimbing Lapangan</div>
            <div class="px-4 py-2">Sukro - +628512345678</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Pembimbing Sekolah</div>
            <div class="px-4 py-2">Jokowi - +628512345678</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Kehadiran</div>
            <div class="px-4 py-2">15/15</div>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Jurnal</div>
            <div class="px-4 py-2">12/15</div>
          </div>
        </div>
      </div>
      <button
        class="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
      >
        Update Data
      </button>
    </div>
    <!-- End of about section -->
  </div>
</template>
