<script setup>
import Toast from "@/components/lib/Toast.js";
import Popper from "../../../components/atoms/Popper.vue";
import FormPendaftaranBaru from "../../../components/organismes/pendaftaran/FormPendaftaranBaru.vue";
import CardStepPendaftaran from "../../../components/organismes/pendaftaran/CardStepPendaftaran.vue";
function onSubmit() {
  // data.value = null;
  // const res = doStoreData(dataDetail.value);
  // getData();
  let err = 0;
  // if (dataDetail.value.siswa == null) {
  //   Toast.danger("Warning", "Siswa belum dipilih");
  //   err++;
  // }
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
    Toast.success("Success", "Berhasil disimpan");
    // router.push({ name: "AdminPendaftaranProsesTiga" });
    console.log(dataDetail.value);
  }
}
</script>
<template>
  <CardStepPendaftaran :step="3"></CardStepPendaftaran>
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
          <span class="tracking-wide">Form Konfirmasi Pendaftaran PKL</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-2 text-sm">
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Download Lembar Persetujuan</div>
              <div class="px-4 py-2">
                <Popper content="Download Lembar Persetujuan">
                  <template #content>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-slate-500 hover:text-slate-800 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      /></svg
                  ></template>
                </Popper>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Download Lembar Ijin PKL</div>
              <div class="px-4 py-2">
                <Popper content="Download Lembar Ijin PKL">
                  <template #content>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-slate-500 hover:text-slate-800 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      /></svg
                  ></template>
                </Popper>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Status</div>
              <div class="px-4 py-2">
                <span
                  class="bg-green-400 py-2 px-2 rounded-lg text-white font-bold text-sm"
                  >Menunggu</span
                >
              </div>
            </div>
          </div>
        </div>
        <button
          @click="onSubmit()"
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
