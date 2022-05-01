<template>
  <div>
    <div class="bg-white p-3 shadow-sm rounded-sm">
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
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </span>
          <span class="tracking-wide">Form Pendaftaran Baru</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-2 text-sm">
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Siswa</div>
              <div class="px-4 py-2">Jane</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Tempat Prakerin</div>
              <div class="px-4 py-2">Female</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Pembimbing Lapangan</div>
              <div class="px-4 py-2">+62 998001001</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Pembimbing Sekolah</div>
              <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Status</div>
              <div class="px-4 py-2">
                <span
                  class="bg-gray-400 py-2 px-2 rounded-lg text-white font-bold text-sm"
                  >Waiting</span
                >
              </div>
            </div>
          </div>
        </div>
        <button
          class="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
        >
          Simpan
        </button>

        <button
          class="block w-full text-red-900 text-sm font-semibold rounded-lg bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:shadow-outline focus:bg-yellow-100 hover:shadow-xs p-3 my-4"
        >
          Reset Form
        </button>
      </div>
      <!-- End of about section -->
    </div>
  </div>
</template>
