<script setup>
import Popper from "@/components/atoms/Popper.vue";
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
      <router-link :to="{ name: 'AdminPendaftaranBelumDaftar' }"
        ><ButtonDataTwo title="Belum Daftar" :titleShort="data.belumdaftar"
      /></router-link>
      <router-link :to="{ name: 'ListProsesPengajuanTempatPKL' }"
        ><ButtonDataTwo
          title="Proses Pengajuan Tempat PKL"
          :titleShort="data.prosesPengajuanTempatPKL"
      /></router-link>
      <router-link :to="{ name: 'ListProsesPenempatanPKL' }"
        ><ButtonDataTwo
          title="Proses Penempatan PKL"
          :titleShort="data.prosesPenempatanPKL"
      /></router-link>

      <router-link :to="{ name: 'ListProsesPemberkasan' }">
        <ButtonDataTwo title="Proses Pemberkasan" :titleShort="data.prosesPemberkasan"
      /></router-link>

      <router-link :to="{ name: 'ListProsesPersetujuan' }">
        <ButtonDataTwo title="Proses Persetujuan" :titleShort="data.prosesPersetujuan"
      /></router-link>

      <router-link :to="{ name: 'AdminPendaftaranDisetujui' }">
        <ButtonDataTwo title="Disetujui" :titleShort="data.disetujui"
      /></router-link>

      <router-link :to="{ name: 'AdminPendaftaranDisetujui' }">
        <ButtonDataTwo title="Ditolak" :titleShort="data.ditolak"
      /></router-link>

      <!-- <ButtonDataTwo title="Sedang PKL" :titleShort="data.sedangpkl" />
      <ButtonDataTwo title="Telah Selesai PKL" :titleShort="data.telahselesai" /> -->
    </div>
    <ul
      class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
    >
      <li class="flex items-center py-3">
        <span>Menu Refresh Data Sidebar</span>
        <span class="ml-auto">
          <div class="flex justify-center">
            <Popper content="Tombol Refresh Data" @click="getData()">
              <template #content>
                <div class="form-check form-switch">
                  <button
                    class="bg-emerald-600 py-2 px-2 rounded-full text-gray-100 text-xs font-bold"
                  >
                    Refresh
                  </button>
                </div></template
              >
            </Popper>
          </div>
        </span>
      </li>
    </ul>
  </div>
</template>
