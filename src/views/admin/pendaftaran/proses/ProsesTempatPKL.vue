<script setup>
import Api from "@/axios/axios.js";
import { ref } from "vue";
import CardCompany from "@/components/atoms/CardCompanySatu.vue";
import Toast from "@/components/lib/Toast.js";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
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
  if (confirm("Apakah anda yakin menyimpan data ini?")) {
    doStoreData();
  }
};

const doStoreData = async (d) => {
  // get dataSiswa from localstorage
  let dataSiswaLocal = JSON.parse(localStorage.getItem("dataSiswa"));
  let dataStore = {
    siswa: dataSiswaLocal,
  };
  // console.log(dataStore);
  try {
    const response = await Api.post(
      `admin/pendaftaranprakerin/proses/penempatan/${tempatPklTerpilih.value.id}`,
      dataStore
    );
    Toast.success("Success", "Data Berhasil update!");

    router.push({ name: "ListProsesPemberkasan" });
    // resetForm();
    // router.push({ name: "AdminSekolahDetailSiswa", params: { id: id } });
    // router.go();

    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

let statusPerusahaan = [
  {
    label: "Semua Data",
    id: "Semua Data",
  },
  {
    label: "Tersedia",
    id: "Tersedia",
  },
  {
    label: "Tidak Tersedia",
    id: "Tidak Tersedia",
  },
];

let inputTersedia = ref({
  label: "Tersedia",
  id: "Tersedia",
});

let inputCari = ref("");
let tempatPKLAsli = ref([]);
let tempatPKL = ref([]);
// 1. loadPilihanTempatPKL
const getPilihanTempatPKL = async () => {
  try {
    const response = await Api.get(
      `admin/pendaftaranpkl/getdatatempatpkl?cari=${inputCari.value}&tersedia=${
        inputTersedia.value ? inputTersedia.value.label : ""
      }`
    );
    // data.value = response.data;
    tempatPKLAsli.value = response.data;
    tempatPKL.value = response.data;
    // console.log(response.data);
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};
getPilihanTempatPKL();
const doCari = async () => {
  getPilihanTempatPKL();
};

const setSiswa = (item) => {
  localStorage.setItem("dataSiswa", JSON.stringify(item));
};

//
const tempatPklTerpilih = ref();
const setTempatPkl = (
  index,
  id,
  nama,
  alamat,
  tersedia,
  terisi,
  kuota,
  status
) => {
  if (status !== "Tersedia") {
    Toast.danger("Warning", "Tempat PKL tidak tersedia!");
  } else {
    let dataTempatPkl = {
      id: id,
      nama: nama,
      alamat: alamat,
      tersedia: tersedia,
      terisi: terisi,
      kuota: kuota,
    };

    localStorage.setItem("dataTempatPkl", JSON.stringify(dataTempatPkl));
    getTempatPkl();
    Toast.success("Info", "Data berhasil disimpan");
    getDataId();
    container.value = "siswa";
    doCariSiswa();
  }
};

const getTempatPkl = () => {
  tempatPklTerpilih.value = JSON.parse(localStorage.getItem("dataTempatPkl"))
    ? JSON.parse(localStorage.getItem("dataTempatPkl"))
    : "";
};

const removeTempatPkl = () => {
  localStorage.removeItem("dataTempatPkl");
  data.value = [];
  setSiswa(data.value);
  getTempatPkl();
  container.value = "tempatPKL";
};
getTempatPkl();

const doResetAll = () => {
  removeTempatPkl();
  data.value = [];
  Toast.success("Info", "Data berhasil diReset");
  container.value = "tempatPKL";
};
const data = ref([]);
const columns = [
  {
    label: "No",
    field: "no",
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "Actions",
    field: "actions",
    sortable: false,
    width: "50px",
    tdClass: "text-center",
    thClass: "text-center",
  },
  {
    label: "Nama",
    field: "nama",
    type: "String",
  },
  {
    label: "Kelas",
    field: "kelas",
    type: "String",
  },
];

const dataTempatPkl = ref();
const dataSiswa = ref();
// idsekolah
const getDataId = async () => {
  try {
    const response = await Api.post(
      `admin/pendaftaranprakerin/proses/datapenempatan/getsiswa`,
      {
        tempatpkl_id: tempatPklTerpilih.value.id,
      }
    );
    dataTempatPkl.value = response.data;
    dataSiswa.value = response.siswa;
    if (dataSiswa.value.length > 0) {
      data.value = dataSiswa.value.map((item, index) => {
        return {
          ...item,
          id: item.siswa.id,
          nama: item.siswa.nama,
          kelas: `${item.siswa.kelasdetail.kelas.tingkatan} ${item.siswa.kelasdetail.kelas.jurusan} ${item.siswa.kelasdetail.kelas.suffix}`,
        };
      });
      setSiswa(data.value);
    } else {
      data.value = [];
      setSiswa(data.value);
      Toast.warning("Info", "Belum ada siswa yang terdaftar");
    }
    // console.log(dataSiswa.value);
    return response;
  } catch (error) {
    console.error(error);
  }
};
const doDelSiswa = (index) => {
  data.value.splice(index, 1);
  setSiswa(data.value);
};

let statusSiswa = [
  {
    label: "Semua Data",
    id: "Semua Data",
  },
  {
    label: "Memilih Tempat Ini",
    id: "Memilih Tempat Ini",
  },
];

let inputStatusSiswa = ref({
  label: "Memilih Tempat Ini",
  id: "Memilih Tempat Ini",
});

let inputCariSiswa = ref("");

const dataSiswaAsli = ref([]);
const dataSiswaCari = ref([]);
const getPilihanSiswa = async () => {
  try {
    const response = await Api.get(
      `admin/pendaftaranpkl/getdatasiswa?cari=${
        inputCariSiswa.value
      }&tersedia=${
        inputStatusSiswa.value ? inputStatusSiswa.value.label : ""
      }&tempatpkl_id=${tempatPklTerpilih.value.id}`
    );
    // data.value = response.data;
    dataSiswaAsli.value = response.data;
    dataSiswaCari.value = dataSiswaAsli.value.map((item, index) => {
      return {
        ...item,
        nama: item.nama,
        kelas: `${item.kelasdetail.kelas.tingkatan} ${item.kelasdetail.kelas.jurusan} ${item.kelasdetail.kelas.suffix}`,
      };
    });
    // console.log(response.data);
  } catch (error) {
    Toast.danger("Warning", "Data gagal dimuat");
    console.error(error);
  }
};
const doCariSiswa = async () => {
  getPilihanSiswa();
};

const setSiswaLocal = async (index, id, nama, kelas) => {
  let dataSiswa = JSON.parse(localStorage.getItem("dataSiswa"));
  // check if dataSiswa.length > tempatPklTerpilih.tersedia
  if (dataSiswa.length + 1 > tempatPklTerpilih.value.kuota) {
    Toast.warning("Warning", "Kuota tempat prakerin sudah penuh");
  } else {
    // check if dataSiswa already on local
    if (dataSiswa) {
      // check if dataSiswa already on local
      if (dataSiswa.length > 0) {
        // check if dataSiswa already on local
        if (dataSiswa.find((item) => item.id === id)) {
          Toast.warning("Warning", "Siswa sudah terdaftar");
        } else {
          dataSiswa.push({
            id: id,
            nama: nama,
            kelas: kelas,
          });
          localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
          Toast.success("Info", "Data berhasil disimpan");
        }
      } else {
        dataSiswa.push({
          id: id,
          nama: nama,
          kelas: kelas,
        });
        localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
        Toast.success("Info", "Data berhasil disimpan");
      }
    } else {
      let dataSiswa = [];
      dataSiswa.push({
        id: id,
        nama: nama,
        kelas: kelas,
      });
      localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
      Toast.success("Info", "Data berhasil disimpan");
    }
  }

  data.value = dataSiswa;
  setSiswa(data.value);
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
        @click="doResetAll()"
        class="bg-orange-200 text-gray-500 px-4 py-2 rounded-lg shadow-sm hover:bg-orange-500 hover:text-white border border-slate-500"
      >
        RESET
      </button>
    </div>
    <div class="flex flex-wrap py-4 w-full">
      <div class="w-full 2xl:w-1/2 py-2 px-2">
        <div class="card w-96 bg-base-100 shadow-xl" v-if="tempatPklTerpilih">
          <figure>
            <img src="@/assets/img/photo/company-1.jpg" alt="Tempat PKL" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ tempatPklTerpilih.nama }}
              <!-- <div class="badge badge-secondary">NEW</div> -->
            </h2>
            <p>{{ tempatPklTerpilih.alamat }}</p>
            <div class="card-actions justify-end">
              <div
                class="badge badge-outline"
                v-if="tempatPklTerpilih.tersedia > 0"
              >
                Tersedia
              </div>
              <div
                class="badge badge-outline"
                v-else="tempatPklTerpilih.tersedia < 1"
              >
                Tidak Tersedia
              </div>
              <div class="badge badge-outline">
                {{ tempatPklTerpilih.terisi }}/ {{ tempatPklTerpilih.kuota }}
              </div>
            </div>
            <div class="card-actions justify-end">
              <button
                class="btn btn-warning btn-warning-content"
                @click="removeTempatPkl()"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500 text-lg">Belum memilih tempat PKL!</p>
        </div>
        <!-- <CardCompany></CardCompany> -->
      </div>
      <div class="w-full md:w-1/2">
        <div class="w-full py-2 px-2">
          <div v-if="data">
            <vue-good-table
              :columns="columns"
              :rows="data"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                perPageDropdown: [10, 20, 50],
              }"
              styleClass="vgt-table striped bordered condensed"
              class="py-0"
            >
              <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                  <div
                    class="text-sm font-medium text-center flex justify-center"
                  >
                    <ButtonDelete @click="doDelSiswa(index)" />
                  </div>
                </span>

                <span v-else-if="props.column.field == 'no'">
                  <div class="text-center">{{ props.index + 1 }}</div>
                </span>

                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>
          <div v-else>
            <p class="text-gray-500 text-lg">Belum memilih tempat PKL!</p>
            <p class="text-gray-500 text-lg">Tabel!</p>
          </div>
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
        <div
          class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
        >
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
        <div
          id="bodyHeader"
          class="flex flex-col md:flex-row justify-center gap-2"
        >
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
          <div
            class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-2 text-sm"
          >
            <!-- <img src="@/assets/img/photo/company-1.jpg" alt="company-1.jpg" /> -->
            <div class="" v-for="(item, index) in tempatPKL">
              <div
                class="card card-side bg-base-100 shadow-xl h-72"
                :key="item.id"
              >
                <figure>
                  <img
                    src="@/assets/img/photo/company-1.jpg"
                    class="object-cover h-full w-32"
                    alt="Tempat PKL"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">{{ item.nama }}</h2>
                  <p class="text-ellipsis overflow-hidden">{{ item.alamat }}</p>
                  <div class="card-actions justify-end">
                    <div
                      class="badge badge-outline tooltip"
                      data-tip="Status Tempat PKL"
                    >
                      {{ item.status }}
                    </div>
                    <div
                      class="badge badge-outline tooltip"
                      data-tip="Terisi / Kuota"
                    >
                      {{ item.terisi }}/{{ item.kuota }}
                    </div>
                  </div>
                  <div class="card-actions justify-end">
                    <button
                      class="btn btn-primary btn-primary-content"
                      @click="
                        setTempatPkl(
                          index,
                          item.id,
                          item.nama,
                          item.alamat,
                          item.tersedia,
                          item.terisi,
                          item.kuota,
                          item.status
                        )
                      "
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-for="(item, index) in tempatPKL" :key="item.id">
              <CardCompany
                :id="item.id"
                :title="item.nama"
                :alamat="item.alamat"
                :tersedia="item.tersedia"
                :jmlTersedia="item.terisi + '/' + item.kuota"
              ></CardCompany>
            </div> -->
            <!-- <div v-for="n in 10">
              <CardCompany
                title="Nama Tempat Prakerin"
                :tersedia="randomAngka()"
                :jmlTersedia="randomAngka()"
              ></CardCompany>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div id="containerTempatPrakerin" v-if="container == 'siswa'">
      <div id="headTitle">
        <div
          class="flex items-center space-x-2 font-semibold text-gray-900 leading-8"
        >
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
        <div
          id="bodyHeader"
          class="flex flex-col md:flex-row justify-center gap-2"
        >
          <v-select
            class="py-2 px-3 w-72 mx-auto md:mx-0"
            :options="statusSiswa"
            v-model="inputStatusSiswa"
            v-bind:class="{ disabled: false }"
          ></v-select>
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
                  v-model="inputCariSiswa"
                  @keyup="doCariSiswa()"
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
            @click="doCariSiswa()"
          >
            Pencarian
          </button>
        </div>
        <div id="bodyContent" class="text-gray-700">
          <div
            class="grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 text-sm"
          >
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
            <!-- <div v-for="n in 10">
              <CardCompany
                title="Nama Tempat Prakerin"
                :tersedia="randomAngka()"
                :jmlTersedia="randomAngka()"
              ></CardCompany>
            </div> -->
            <div class="" v-for="(item, index) in dataSiswaCari">
              <div
                class="card card-side bg-base-100 shadow-xl h-72"
                :key="item.id"
              >
                <figure>
                  <img
                    src="@/assets/img/avatar/profile-2.svg"
                    alt="Siswa"
                    class="w-32"
                  />
                  <!-- <img src="@/assets/img/avatar/bighead-1.svg" alt="Siswa" /> -->
                </figure>
                <div class="card-body">
                  <h2 class="card-title">{{ item.nama }}</h2>
                  <p class="text-ellipsis overflow-hidden">
                    {{ item.nomeridentitas }} - {{ item.kelas }}
                  </p>
                  <div class="card-actions justify-end">
                    <!-- <div
                      class="badge badge-outline tooltip"
                      data-tip="Status Tempat PKL"
                    >
                      Tersedia
                    </div>
                    <div
                      class="badge badge-outline tooltip"
                      data-tip="Terisi / Kuota"
                    >
                      0/4
                    </div> -->
                  </div>
                  <div class="card-actions justify-end">
                    <button
                      class="btn btn-primary btn-primary-content"
                      @click="
                        setSiswaLocal(index, item.id, item.nama, item.kelas)
                      "
                    >
                      Pilih
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
