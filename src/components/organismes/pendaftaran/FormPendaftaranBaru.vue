<script setup>
import { ref } from "vue";
import Toast from "@/components/lib/Toast.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const dataDetail = ref({
  siswa: null,
  tempatpkl: null,
  tempatpkl: null,
  pembimbinglapangan: null,
  pembimbingsekolah: null,
});
let dataSiswa = [
  { label: "Canada", id: "ca" },
  { label: "Afrika", id: "af" },
  { label: "Indonesia", id: "id" },
];

// let dataTempatPrakerin = [
//   { label: "Malang", id: "M" },
//   { label: "Surabaya", id: "S" },
//   { label: "Blitar", id: "B" },
// ];

// let dataPembimbingLapangan = [
//   { label: "Paijo", id: "ca" },
//   { label: "Sri", id: "af" },
//   { label: "Wulan", id: "id" },
// ];

// let dataPembimbingSekolah = [
//   { label: "Jokowi", id: "jk" },
//   { label: "Makrup", id: "mk" },
//   { label: "Amin", id: "am" },
// ];

function onSubmit() {
  // data.value = null;
  // const res = doStoreData(dataDetail.value);
  // getData();
  let err = 0;
  if (dataDetail.value.siswa == null) {
    Toast.danger("Warning", "Siswa belum dipilih");
    err++;
  }
  // if (dataDetail.value.tempatpkl == null) {
  //   Toast.danger("Warning", "Tempat Prakerin belum dipilih");
  //   err++;
  // }
  // if (dataDetail.value.pembimbinglapangan == null) {
  //   Toast.danger("Warning", "Pembimbing Lapangan belum dipilih");
  //   err++;
  // }
  // if (dataDetail.value.pembimbingsekolah == null) {
  //   Toast.danger("Warning", "Pembimbing Sekolah belum dipilih");
  //   err++;
  // }
  if (err == 0) {
    Toast.success("Success", "Simpan dan lanjutkan");
    router.push({ name: "AdminPendaftaranProsesDua" });
    console.log(dataDetail.value);
  }
}
</script>
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
              <div class="px-4 py-2">
                <v-select :options="dataSiswa" v-model="dataDetail.siswa"></v-select>
              </div>
            </div>
            <!-- <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Tempat Prakerin</div>
              <div class="px-4 py-2">
                <v-select
                  :options="dataTempatPrakerin"
                  v-model="dataDetail.tempatpkl"
                ></v-select>
              </div>
            </div> -->
            <!-- <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Pembimbing Lapangan</div>
              <div class="px-4 py-2">
                <v-select
                  :options="dataPembimbingLapangan"
                  v-model="dataDetail.pembimbinglapangan"
                ></v-select>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Pembimbing Sekolah</div>
              <div class="px-4 py-2">
                <v-select
                  :options="dataPembimbingSekolah"
                  v-model="dataDetail.pembimbingsekolah"
                ></v-select>
              </div>
            </div> -->
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
          @click="onSubmit()"
          class="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
        >
          Simpan dan Lanjutkan
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
