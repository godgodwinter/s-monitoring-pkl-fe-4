<template>
  <div>
    <div class="grid grid-cols-2">
      <div>
        <div
          class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
        >
          <span clas="text-green-500">
            <svg
              class="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </span>
          <span class="tracking-wide">Detail Pendaftaran</span>
        </div>

        <div class="text-center my-2">
          <div
            class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
          >
            2
          </div>
          <p class="text-main-color text-sm font-bold text-slate-700">Nama Siswa</p>
          <p class="text-main-color text-xs font-medium text-slate-700">NIS : 123</p>
        </div>
        <ul class="list-inside space-y-2 flex justify-center">
          <li>
            <div class="w-full flex gap-1">
              <div class="text-teal-600 pt-1">Status Pendaftaran</div>
              <img src="@/assets/img/flat/check-mark_2.png" alt="" class="h-8 w-8" />
              <span
                class="bg-green-600 text-white py-2 px-2 font-bold text-sm pt-1 rounded-lg"
                >Disetujui</span
              >
            </div>
            <div class="text-gray-500 text-xs">05 Januari 2022</div>
          </li>
        </ul>
      </div>
      <div>
        <div
          class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
        >
          <span clas="text-green-500">
            <svg
              class="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                fill="#fff"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </span>
          <span class="tracking-wide">DATA PRAKERIN</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-1 text-sm">
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
          Update Data
        </button>
      </div>
    </div>
  </div>
</template>
