<script setup>
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
import { ref } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import Toast from "@/components/lib/Toast.js";
import Popper from "../../../components/atoms/Popper.vue";
import FormPendaftaranBaru from "../../../components/organismes/pendaftaran/FormPendaftaranBaru.vue";
import CardStepPendaftaran from "../../../components/organismes/pendaftaran/CardStepPendaftaran.vue";
const id = route.params.id;
let dataId = null;
const dataDetail = ref({
  siswa: { label: "-", id: id },
  tempatpkl: { label: "-", id: id },
  tempatpkl: { label: "-", id: id },
  pembimbinglapangan: { label: "-", id: id },
  pembimbingsekolah: { label: "-", id: id },
});
let dataSiswa = ref([]);
let dataAsli = ref([]);
let status = ref("Menunggu");
let dataStatus = [
  { label: "Disetujui", id: "Disetujui" },
  { label: "Ditolak", id: "Ditolak" },
];
const getData = async () => {
  try {
    const response = await Api.get(`admin/siswa/${id}`);
    // console.log(response);
    dataAsli.value = response.data;
    dataDetail.value.siswa.label = ` ${dataAsli.value.nama} - ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix}`;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
getData();
const periksaId = async () => {
  try {
    const response = await Api.get(`admin/pendaftaranpkl/list/periksaid/${id}`);
    status.value = response.data;
    if (response.data == "Belum Daftar") {
      Toast.danger("Warning", "Belum Daftar Prakerin, Daftar lebih dahulu");
      router.push({
        name: "AdminPendaftaranProsesSatu",
        params: { id: id },
      });
    } else if (response.data == "Proses Daftar") {
      Toast.danger("Warning", "Data ditemukan, Data belum lengkap!");
      router.push({
        name: "AdminPendaftaranProsesDuaId",
        params: { id: id },
      });
    } else if (response.data == "Disetujui") {
      Toast.danger(
        "Warning",
        "Data ditemukan, Proses pendaftaran siswa ini telah selesai!"
      );
      router.push({
        name: "AdminPendaftaranProsesSatu",
        params: { id: id },
      });
    }
    dataDetail.value.tempatpkl.label = ` ${response.tempatpkl.nama} `;
    dataDetail.value.pembimbinglapangan.label = ` ${response.pembimbinglapangan.nama} `;
    dataDetail.value.pembimbingsekolah.label = ` ${response.pembimbingsekolah.nama} `;

    return response;
  } catch (error) {
    // Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
periksaId();

dataDetail.value.status = { label: "Menunggu", id: "Menunggu" };
const doStoreData = async (d, tglnow) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(
        `admin/pendaftaranprakerin/${id}/pendaftaranprakerin_detail/ubahstatus`,
        {
          status: dataDetail.value.status.id,
          tgl_konfirmasi: tglnow,
        }
      );

      Toast.success("Success", "Data Berhasil diupdate!");
      return response.data;
    }
    const response = await Api.post(
      `admin/pendaftaranprakerin/${id}/pendaftaranprakerin_detail/ubahstatus`,
      {
        status: dataDetail.value.status.id,
        tgl_konfirmasi: tglnow,
      }
    );

    Toast.success("Success", "Data Berhasil ditambahkan!");
    if (dataDetail.value.status.id == "Disetujui") {
      router.push({
        name: "AdminPendaftaranDisetujui",
        params: { id: dataDetail.value.siswa.id },
      });
    } else {
      router.push({
        name: "AdminPendaftaranProsesDaftar",
        params: { id: dataDetail.value.siswa.id },
      });
    }
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
function onSubmit() {
  // data.value = null;
  let err = 0;
  if (dataDetail.value.status == null) {
    Toast.danger("Warning", "Status belum dipilih");
    err++;
  }
  if (dataDetail.value.status.label == "Menunggu") {
    Toast.danger("Warning", "Status belum diubah");
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
    let tglnow = new Date().toISOString().slice(0, 10);
    const res = doStoreData(dataDetail.value, tglnow);
    // Toast.success("Success", "Berhasil disimpan");
  }
}
let embedSrc = ref();
function handleChange() {
  embedSrc.value = URL.createObjectURL(event.target.files[0]);
}
let pdfSource =
  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";
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
              <div class="px-4 py-2 font-semibold">Identitas Siswa</div>
              <div class="px-4 py-2">
                {{ dataDetail.siswa.label }}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Tempat PKL</div>
              <div class="px-4 py-2">
                {{ dataDetail.tempatpkl.label }}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pembimbing Sekolah</div>
              <div class="px-4 py-2">
                {{ dataDetail.pembimbingsekolah.label }}
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pembimbing Lapangan</div>
              <div class="px-4 py-2">
                {{ dataDetail.pembimbinglapangan.label }}
              </div>
            </div>
          </div>
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
              <div class="px-4 py-2 font-semibold">Status saat ini</div>
              <div class="px-4 py-2">
                <span
                  class="bg-green-400 py-2 px-2 rounded-lg text-white font-bold text-sm"
                  >Menunggu Acc</span
                >
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Update Status</div>
              <div class="px-4 py-2">
                <v-select :options="dataStatus" v-model="dataDetail.status"></v-select>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Upload Balasan</div>
              <div class="px-4 py-2">
                <input @change="handleChange" type="file" />
              </div>
            </div>
            <div class="grid grid-cols-1">
              <div class="px-4 py-2 font-semibold">Preview PDF</div>
              <vue-pdf-embed :source="embedSrc" v-if="embedSrc" />
              <div class="shadow shadow-lg h-48" id="previewpdf" v-else />
            </div>
          </div>
        </div>
        <button
          @click="onSubmit()"
          class="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
        >
          Simpan
        </button>
      </div>
      <!-- End of about section -->
    </div>
  </div>
</template>
<style>
/* body {
  padding: 16px;
  background-color: #ccc;
} */

.vue-pdf-embed > div {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}
</style>
