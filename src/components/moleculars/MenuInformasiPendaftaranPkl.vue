<script setup>
import ButtonDataTwo from "../atoms/ButtonDataTwo.vue";
import { ref } from "vue";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
const data = ref("");
const getData = async () => {
  try {
    const response = await Api.get("admin/pendaftaranpkl/list/subsidebardata");
    // console.log(response);
    data.value = response.data;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getData();
</script>
<template>
  <div>
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
    <div class="grid grid-cols-2 xl:grid-cols-3" v-if="data">
      <router-link :to="{ name: 'AdminPendaftaran' }">
        <ButtonDataTwo title="Semua Siswa" :titleShort="data.siswa"
      /></router-link>
      <router-link :to="{ name: 'AdminPendaftaran' }"
        ><ButtonDataTwo title="Belum Daftar" :titleShort="data.belumdaftar"
      /></router-link>
      <ButtonDataTwo title="Menunggu" :titleShort="data.menunggu" />

      <router-link :to="{ name: 'AdminPendaftaranDisetujui' }">
        <ButtonDataTwo title="Disetujui" :titleShort="data.disetujui"
      /></router-link>
      <ButtonDataTwo title="Sedang PKL" :titleShort="data.sedangpkl" />
      <ButtonDataTwo title="Telah Selesai PKL" :titleShort="data.telahselesai" />
    </div>
  </div>
</template>
