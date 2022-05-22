<script setup>
import { ref } from "vue";
import CardCompany from "@/components/atoms/CardCompanySatu.vue";
import Toast from "@/components/lib/Toast.js";
let randomAngka = () => {
  return Math.floor(Math.random() * 4);
};
const container = ref("tempatPKL");

const btnTempatPKLClick = () => {
  container.value = "tempatPKL";
};

const btnSiswaClick = () => {
  container.value = "siswa";
};

const doSubmit = () => {
  Toast.warning("Info", "Belum ada fitur ini");
};
</script>
<template>
  <!-- head Tampilkan Tempat PKL Terpilih dan Siswa di tempat tersebut -->
  <div class="bg-white shadow-sm rounded-sm py-4 px-4 border">
    <div class="px-2 py-2 space-x-2">
      <button
        @click="btnTempatPKLClick()"
        :class="container == 'tempatPKL' ? 'bg-sky-200' : ''"
        class="bg-gray-200 text-gray-500 px-2 py-2 rounded-lg shadow-sm hover:bg-gray-500 hover:text-white border border-slate-500"
      >
        Pilih Tempat PKL
      </button>
      <button
        @click="btnSiswaClick()"
        :class="container == 'siswa' ? 'bg-sky-200' : ''"
        class="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-500 hover:text-white border border-slate-500"
      >
        Pilih Siswa
      </button>
      <button
        @click="btnSiswaClick()"
        class="bg-orange-200 text-gray-500 px-4 py-2 rounded-lg shadow-sm hover:bg-orange-500 hover:text-white border border-slate-500"
      >
        RESET
      </button>
    </div>
    <div class="flex flex-wrap py-4 w-full">
      <div class="w-full md:w-1/2 py-2 px-2">
        <p class="text-gray-500 text-lg">Belum memilih tempat PKL!</p>
        <CardCompany></CardCompany>
      </div>
      <div class="w-full md:w-1/2">
        <div class="w-full md:w-1/2 py-2 px-2">
          <p class="text-gray-500 text-lg">Belum memilih tempat PKL!</p>
          <p class="text-gray-500 text-lg">Tabel!</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        @click="doSubmit()"
        class="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-500 hover:text-white border border-slate-500"
      >
        Simpan dan Lanjutkan
      </button>
    </div>
  </div>
  <!-- head Tampilkan Tempat PKL Terpilih dan Siswa di tempat tersebut -->

  <!--Content Tampilkan Card Cari Tempat PKL atau Card Cari Siswa berdasarkan Kelas -->

  <div></div>

  <div class="bg-white shadow-sm rounded-sm py-4 px-4 border pt-10 mt-2">
    <div id="containerTempatPrakerin" v-if="container == 'tempatPKL'">
      <div id="headTitle">
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
          <span class="tracking-wide">Cari Tempat Prakerin</span>
        </div>
      </div>
      <div id="body">
        <div id="bodyHeader" class="flex flex-col md:flex-row justify-center gap-2">
          <v-select
            class="py-2 px-3 w-72 mx-auto md:mx-0"
            :options="statusPerusahaan"
            v-model="inputTersedia"
            v-bind:class="{ disabled: false }"
          ></v-select>
          <!-- <InputCari v-model="inputCari"></InputCari> -->
          <div>
            <div class="w-full md:w-72 pt-4 md:pt-2 mx-auto md:mx-0">
              <div class="relative">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  v-model="inputCari"
                  @keyup="doCari()"
                  type="search"
                  class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari ..."
                  required
                />
                <!-- <button
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Pencarian
                  </button> -->
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="doCari()"
          >
            Pencarian
          </button>
        </div>
        <div id="bodyContent" class="text-gray-700">
          <div class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 text-sm">
            <!-- <img src="@/assets/img/photo/company-1.jpg" alt="company-1.jpg" /> -->

            <!-- <div v-for="(item, index) in tempatPKL" :key="item.id">
              <CardCompany
                :id="item.id"
                :title="item.nama"
                :alamat="item.alamat"
                :tersedia="item.tersedia"
                :jmlTersedia="item.terisi + '/' + item.kuota"
              ></CardCompany>
            </div> -->
            <div v-for="n in 10">
              <CardCompany
                title="Nama Tempat Prakerin"
                :tersedia="randomAngka()"
                :jmlTersedia="randomAngka()"
              ></CardCompany>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="containerTempatPrakerin" v-if="container == 'siswa'">
      <div id="headTitle">
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
          <span class="tracking-wide">Cari Siswa</span>
        </div>
      </div>
      <div id="body">
        <div id="bodyHeader" class="flex flex-col md:flex-row justify-center gap-2">
          <v-select
            class="py-2 px-3 w-72 mx-auto md:mx-0"
            :options="statusPerusahaan"
            v-model="inputTersedia"
            v-bind:class="{ disabled: false }"
          ></v-select>
          <!-- <InputCari v-model="inputCari"></InputCari> -->
          <div>
            <div class="w-full md:w-72 pt-4 md:pt-2 mx-auto md:mx-0">
              <div class="relative">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  v-model="inputCari"
                  @keyup="doCari()"
                  type="search"
                  class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari ..."
                  required
                />
                <!-- <button
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Pencarian
                  </button> -->
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="doCari()"
          >
            Pencarian
          </button>
        </div>
        <div id="bodyContent" class="text-gray-700">
          <div class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 text-sm">
            <!-- <img src="@/assets/img/photo/company-1.jpg" alt="company-1.jpg" /> -->

            <!-- <div v-for="(item, index) in tempatPKL" :key="item.id">
              <CardCompany
                :id="item.id"
                :title="item.nama"
                :alamat="item.alamat"
                :tersedia="item.tersedia"
                :jmlTersedia="item.terisi + '/' + item.kuota"
              ></CardCompany>
            </div> -->
            <div v-for="n in 10">
              <CardCompany
                title="Nama Tempat Prakerin"
                :tersedia="randomAngka()"
                :jmlTersedia="randomAngka()"
              ></CardCompany>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
