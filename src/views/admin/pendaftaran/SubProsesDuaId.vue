<script setup>
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import FormPendaftaranBaru from "../../../components/organismes/pendaftaran/FormPendaftaranBaru.vue";
import CardStepPendaftaran from "../../../components/organismes/pendaftaran/CardStepPendaftaran.vue";
import Popper from "../../../components/atoms/Popper.vue";
const router = useRouter();
const route = useRoute();
const id = route.params.id;
let dataId = null;
const dataDetail = ref({
  siswa: { label: "-", id: id },
  tempatpkl: null,
  tempatpkl: null,
  pembimbinglapangan: null,
  pembimbingsekolah: null,
});
let dataSiswa = ref([]);
let dataAsli = ref([]);
let dataAsliTempatPkl = ref([]);
let dataAsliPembimbingLapangan = ref([]);
let dataAsliPembimbingSekolah = ref([]);
let status = ref("Menunggu");
const periksaId = async () => {
  try {
    const response = await Api.get(`admin/pendaftaranpkl/list/periksaid/${id}`);
    // console.log(response);
    status.value = response.data;
    if (response.data == "Belum Daftar") {
      Toast.danger("Warning", "Belum Daftar Prakerin, Daftar lebih dahulu");
      router.push({
        name: "AdminPendaftaranProsesSatu",
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
    } else if (response.data == "Menunggu") {
      Toast.danger("Warning", "Data ditemukan, Lanjut ke proses selanjutnya");
      router.push({
        name: "AdminPendaftaranProsesTiga",
        params: { id: id },
      });
    }
    getData();

    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
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
periksaId();

let dataTempatPrakerin = ref([]);
let dataPembimbingLapangan = ref([]);
let dataPembimbingSekolah = ref([]);
const getDataLangkah2 = async () => {
  try {
    const response = await Api.get(`admin/pendaftaranpkl/list/getpilihanlankah2`);
    // console.log(response);
    dataAsliTempatPkl.value = response.data.tempatpkl;
    dataTempatPrakerin.value = dataAsliTempatPkl.value.map((item) => {
      return {
        id: item.id,
        label: `${item.nama} - ${item.alamat}`,
      };
    });

    dataAsliPembimbingLapangan.value = response.data.pembimbinglapangan;
    dataPembimbingLapangan.value = dataAsliPembimbingLapangan.value.map((item) => {
      return {
        id: item.id,
        label: `${item.nama} - ${item.nomeridentitas}`,
      };
    });

    dataAsliPembimbingSekolah.value = response.data.pembimbingsekolah;
    dataPembimbingSekolah.value = dataAsliPembimbingSekolah.value.map((item) => {
      return {
        id: item.id,
        label: `${item.nama} - ${item.nomeridentitas}`,
      };
    });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
getDataLangkah2();
const doStoreData = async (d, tglnow) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(
        `admin/pendaftaranprakerin/${id}/pendaftaranprakerin_detail/store`,
        {
          tempatpkl_id: dataDetail.value.tempatpkl.id,
          pembimbinglapangan_id: dataDetail.value.pembimbinglapangan.id,
          pembimbingsekolah_id: dataDetail.value.pembimbingsekolah.id,
          tgl_pengajuan: tglnow,
          // keterangan: dataDetail.value.keterangan.id,
        }
      );

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post(
      `admin/pendaftaranprakerin/${id}/pendaftaranprakerin_detail/store`,
      {
        tempatpkl_id: dataDetail.value.tempatpkl.id,
        pembimbinglapangan_id: dataDetail.value.pembimbinglapangan.id,
        pembimbingsekolah_id: dataDetail.value.pembimbingsekolah.id,
        tgl_pengajuan: tglnow,
        // keterangan: dataDetail.value.keterangan.id,
      }
    );

    getData();
    Toast.success("Success", "Data Berhasil ditambahkan!");
    localStorage.setItem("setSiswaSelected", dataDetail.value.siswa);
    router.push({
      name: "AdminPendaftaranProsesTiga",
      params: { id: dataDetail.value.siswa.id },
    });
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
function onSubmit() {
  // data.value = null;
  // const res = doStoreData(dataDetail.value);
  // getData();
  let err = 0;
  // if (dataDetail.value.siswa == null) {
  //   Toast.danger("Warning", "Siswa belum dipilih");
  //   err++;
  // }
  if (dataDetail.value.tempatpkl == null) {
    Toast.danger("Warning", "Tempat Prakerin belum dipilih");
    err++;
  }
  if (dataDetail.value.pembimbinglapangan == null) {
    Toast.danger("Warning", "Pembimbing Lapangan belum dipilih");
    err++;
  }
  if (dataDetail.value.pembimbingsekolah == null) {
    Toast.danger("Warning", "Pembimbing Sekolah belum dipilih");
    err++;
  }
  if (err == 0) {
    let tglnow = new Date().toISOString().slice(0, 10);
    const res = doStoreData(dataDetail.value, tglnow);
    // console.log(dataDetail.value);
    // Toast.success("Success", "Simpan dan lanjutkan");
    // router.push({ name: "AdminPendaftaranProsesTiga" });
    // console.log(dataDetail.value);
  }
}
</script>
<template>
  <CardStepPendaftaran :step="2"></CardStepPendaftaran>

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
          <span class="tracking-wide">Form Data PKL dan Pembimbing</span>
        </div>
        <div class="text-gray-700">
          <div class="grid md:grid-cols-1 text-sm">
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Siswa</div>
              <div class="px-4 py-2">
                <v-select
                  :options="dataSiswa"
                  v-model="dataDetail.siswa"
                  v-bind:class="{ disabled: true }"
                ></v-select>
              </div>
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Pilih Tempat Prakerin</div>
              <div class="px-4 py-2">
                <v-select
                  :options="dataTempatPrakerin"
                  v-model="dataDetail.tempatpkl"
                ></v-select>
              </div>
            </div>
            <div class="grid grid-cols-2">
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
            </div>
            <div class="grid grid-cols-2">
              <div class="px-4 py-2 font-semibold">Status</div>
              <div class="px-4 py-2">
                <span
                  class="bg-orange-400 py-2 px-2 rounded-lg text-white font-bold text-sm"
                  >{{ status }}</span
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
      </div>
      <!-- End of about section -->
    </div>
  </div>
  <!-- <H1>Proses langkah ke dua</H1> -->

  <!-- <Popper content="This is the Popper content">
    <template #content>
      <router-link
        :to="{ name: 'AdminPendaftaranProsesTiga' }"
        class="bg-gray-300 py-1 px-1"
        >Langkah ke tiga</router-link
      ></template
    >
  </Popper> -->
  <!-- <FormPendaftaranBaru></FormPendaftaranBaru> -->
</template>
<style>
.disabled {
  pointer-events: none;
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
</style>
