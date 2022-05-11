<script setup>
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
import { ref } from "vue";
import Toast from "@/components/lib/Toast.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
let id = route.params.id ? route.params.id : null;
const dataDetail = ref({
  siswa: null,
  tempatpkl: null,
  tempatpkl: null,
  pembimbinglapangan: null,
  pembimbingsekolah: null,
});
console.log(id);

let dataId = null;
// getDataSiswa yang belum daftar
let dataSiswa = ref([]);
// let dataSiswa = [
//   { label: "Canada", id: "ca" },
//   { label: "Afrika", id: "af" },
//   { label: "Indonesia", id: "id" },
// ];
let status = ref("Menunggu");
const periksaId = async () => {
  try {
    const response = await Api.get(`admin/pendaftaranpkl/list/periksaid/${id}`);
    // console.log(response);
    status.value = response.data;
    if (response.data != "Belum Daftar" && response.data != "Disetujui") {
      Toast.danger("Warning", "Sudah Daftar Prakerin, Lanjut ke Proses selanjutnya");
      router.push({
        name: "AdminPendaftaranProsesDuaId",
        params: { id: id },
      });
    }
    if (status.value != "Disetujui") {
      getDataId();
    }

    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
let dataAsli = ref([]);
const getDataId = async () => {
  try {
    const response = await Api.get(`admin/siswa/${id}`);
    // console.log(response);
    dataAsli.value = response.data;
    dataDetail.value.siswa = {
      label: ` ${dataAsli.value.nama} - ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix}`,
      id,
    };
    return response;
  } catch (error) {
    Toast.danger(
      "Warning",
      "Data tidak ditemukan / Token anda kadaluarsa! Silahkan login kembali"
    );
    console.error(error);
  }
};

if (id) {
  periksaId();
}
const getData = async () => {
  try {
    const response = await Api.get("admin/pendaftaranpkl/list/belumdaftar");
    console.log(response.data);
    dataAsli.value = response.data;
    dataSiswa.value = dataAsli.value.map((item) => {
      let dk = null;
      if (item.kelasdetail) {
        dk = `${item.kelasdetail.kelas.tingkatan} ${item.kelasdetail.kelas.jurusan} ${item.kelasdetail.kelas.suffix}`;
      }
      return {
        label: `${item.nama} - ${dk}`,
        id: item.id,
      };
    });
    // console.log(dataSiswa.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
if (status.value != "Disetujui") {
  getData();
}

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

const doStoreData = async (d, tglnow) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(`admin/pendaftaranprakerin/store`, {
        siswa_id: dataDetail.value.siswa.id,
        tgl_daftar: tglnow,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      // getData();
      return response.data;
    }
    const response = await Api.post("admin/pendaftaranprakerin/store", {
      siswa_id: dataDetail.value.siswa.id,
      tgl_daftar: tglnow,
    });

    // getData();
    Toast.success("Success", "Data Berhasil ditambahkan!");
    localStorage.setItem("setSiswaSelected", dataDetail.value.siswa);
    router.push({
      name: "AdminPendaftaranProsesDuaId",
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
    // console.log(dataDetail.value.siswa.id);
    let tglnow = new Date().toISOString().slice(0, 10);
    // console.log(tglnow);
    const res = doStoreData(dataDetail.value, tglnow);
    // Toast.success("Success", "Simpan dan lanjutkan");
    // router.push({ name: "AdminPendaftaranProsesDua" });
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
                  >Belum Daftar</span
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
