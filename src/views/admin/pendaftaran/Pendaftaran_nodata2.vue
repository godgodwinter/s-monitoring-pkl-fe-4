<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
</script>
<template>
  <BreadCrumb>
    <template v-slot:content>
      <router-link :to="{ name: 'AdminSiswa' }"
        ><button class="underline rounded rounded-md hover:bg-gray-200">
          Pendaftaran
        </button></router-link
      >
      <BreadCrumbSpace /> Index</template
    >
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >Pendaftaran Prakerin</span
    >
  </div>

  <div class="container mx-auto my-5 p-5">
    <div class="md:flex no-wrap md:-mx-2">
      <!-- Left Side -->
      <div class="w-full md:w-3/12 md:mx-2">
        <!-- Profile Card -->
        <div class="bg-white p-3 border-t-4 border-green-400">
          <div class="image overflow-hidden">
            <img
              class="h-20 w-20 mx-auto"
              src="@/assets/img/flat/portfolio_2.png"
              alt=""
            />
          </div>
          <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center pt-2">
            Menu - menu pedaftaran Prakerin / PKL
          </p>
          <ul
            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
          >
            <li class="flex items-center py-3">
              <span>Status Pendaftaran</span>
              <span class="ml-auto"
                ><span class="bg-green-500 py-1 px-2 rounded text-white text-sm"
                  >Aktif</span
                ></span
              >
            </li>
          </ul>
        </div>
        <!-- End of profile card -->
        <div class="my-4"></div>
        <!-- Friends card -->
        <div class="bg-white p-3 hover:shadow h-screen">
          <div
            class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
          >
            <span class="text-green-500">
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </span>
            <span>Menu Utama</span>
          </div>
          <div class="grid grid-cols-2 xl:grid-cols-3">
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-sky-500 hover:text-white flex text-xl font-bold items-center justify-center text-sky-200 hover:bg-sky-800"
              >
                Da
              </div>
              <p class="text-main-color text-sm text-slate-600 font-semibold">
                Daftar Baru
              </p>
            </div>
          </div>
          <div
            class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8 pt-2"
          >
            <span class="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span>Informasi Pendaftaran</span>
          </div>
          <div class="grid grid-cols-2 xl:grid-cols-3">
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                1
              </div>
              <p class="text-main-color text-sm text-slate-700">Belum Daftar</p>
            </div>
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                10
              </div>
              <p class="text-main-color text-sm text-slate-700">Menunggu</p>
            </div>
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                2
              </div>
              <p class="text-main-color text-sm text-slate-700">Disetujui</p>
            </div>
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                1
              </div>
              <p class="text-main-color text-sm text-slate-700">Sedang PKL</p>
            </div>
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                1
              </div>
              <p class="text-main-color text-sm text-slate-700">Telah Selesai PKL</p>
            </div>
          </div>
        </div>
        <!-- End of Data Statistik card -->
      </div>
      <!-- Right Side -->
      <div class="w-full md:w-9/12 mx-2 h-64">
        <!-- Profile tab -->
        <!-- Experience and education -->
        <div class="bg-white p-3 shadow-sm rounded-sm">
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
                <p class="text-main-color text-xs font-medium text-slate-700">
                  NIS : 123
                </p>
              </div>
              <ul class="list-inside space-y-2 flex justify-center">
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Status Pendaftaran</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
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
        <!-- End of Experience and education grid -->

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
        <div class="my-4"></div>

        <!-- End of profile tab -->
      </div>
    </div>
  </div>

  <!-- <div class="pt-6 px-4 lg:flex">
    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <h1>Profile</h1>
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat minus
          quibusdam dolore, vitae expedita ipsam quisquam hic in possimus eveniet eos
          explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at aliquid.
        </p>
      </div>
    </div>
    <div class="w-full lg:w-8/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <h1>Prakerin</h1>
        <h1>Jurnal dan Absensi</h1>
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat minus
          quibusdam dolore, vitae expedita ipsam quisquam hic in possimus eveniet eos
          explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at aliquid.
        </p>
      </div>
    </div>
  </div> -->
</template>
