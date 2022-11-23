<script setup>
import Api from "@/axios/axios.js";
import VTailwindModal from "../../components/atoms/VTailwindModal.vue";
import VButton from "../../components/atoms/VButton.vue";

import { ref } from "vue";
let show = ref(false);
function confirm() {
  // some code...
  console.log("tutup modal");
  show.value = false;
}
function cancel(close) {
  // some code...
  close();
}

const data = ref("");

const getData = async () => {
  try {
    const response = await Api.get("admin/settings/get");
    data.value = response.data;

    return response;
  } catch (error) {
    Toast.danger("Warning", "Gagal memuat data settings Aplikasi");
    console.error(error);
  }
};

getData();
</script>
<template>
  <div class="pt-10 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Dashboard</span>
  </div>
  <div class="w-full px-2 py-2">
    <div class="stats shadow">
      <div class="stat place-items-center">
        <div class="stat-title"> Siswa</div>
        <div class="stat-value">{{ data.jml_siswa }}</div>
        <!-- <div class="stat-desc">From January 1st to February 1st</div> -->
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Guru</div>
        <div class="stat-value text-secondary">{{ data.jml_guru }}</div>
        <!-- <div class="stat-desc text-secondary">↗︎ 40 (2%)</div> -->
      </div>

      <div class="stat place-items-center">
        <div class="stat-title">Tempat PKL</div>
        <div class="stat-value">{{ data.jml_tempatpkl }}</div>
        <!-- <div class="stat-desc">↘︎ 90 (14%)</div> -->
      </div>
    </div>
  </div>
  <!-- <div class="px-4">
    <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
        <div class="flex items-start justify-between">
          <div class="flex flex-col space-y-2">
            <span class="text-gray-400">Menu Siswa</span>
            <span class="text-lg font-semibold">100,221</span>
          </div>
          <div class="p-10 bg-gray-200 rounded-md"></div>
        </div>
        <div>
          <span class="inline-block px-2 text-sm text-white bg-green-300 rounded">14%</span>
          <span>from 2019</span>
        </div>
      </div>
    </div>
  </div> -->
</template>
