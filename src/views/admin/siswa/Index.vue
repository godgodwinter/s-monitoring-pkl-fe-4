<script setup>
import { ref } from "vue";
import { Field, Form } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import Button from "@/components/atoms/ButtonFour.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import Popper from "../../../components/atoms/Popper.vue";
import Fungsi from "@/components/lib/FungsiCampur";
const router = useRouter();
const route = useRoute();
const dataAsli = ref("");
const data = ref("");
const dataKelas = ref("");
const dataDetail = ref({
  nama: "",
});
const dataTemp = ref({});
let dataId = null;

const min_pembayaran = ref(0);
const getDataSettings = async () => {
  try {
    const response = await Api.get("admin/settings/get");
    // console.log(response.data);
    min_pembayaran.value = response.data.min_pembayaran;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getDataSettings();


// function Form and Validation
const getData = async () => {
  try {
    const response = await Api.get("admin/siswa");
    // console.log(response.data);
    dataAsli.value = response.data;
    data.value = dataAsli.value.map((item) => {
      let dk = null;
      if (item.kelasdetail) {
        dk = `${item.kelasdetail.kelas.tingkatan} ${item.kelasdetail.kelas.jurusan} ${item.kelasdetail.kelas.suffix}`;
      }
      return {
        id: item.id,
        nama: item.nama,
        kelas_nama: item.kelas_nama,
        status_login: item.status_login,
        kelas: dk,
        total_tagihan: Fungsi.rupiah(item.total_tagihan),
        pembayaran_total: item.pembayaran_total ? Fungsi.rupiah(item.pembayaran_total) : "Rp 0,00",
        pembayaran_persen: item.pembayaran_persen ? item.pembayaran_persen + " %" : "0 %",
      };
    });
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getData();

const getDataKelas = async () => {
  try {
    const response = await Api.get("admin/kelas");
    // console.log(response);
    let tempKelas = response.data;
    dataKelas.value = tempKelas.map((item) => {
      return {
        label: `${item.tingkatan} ${item.jurusan_nama} ${item.suffix}`,
        id: item.id,
      };
    });
    // console.log(dataKelas.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getDataKelas();

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
    field: "kelas_nama",
    type: "String",
  },
  {
    label: "Tagihan",
    field: "total_tagihan",
    type: "String",
  },
  {
    label: "Telah dibayar",
    field: "pembayaran_total",
    type: "String",
  },
  {
    label: "Persen",
    field: "pembayaran_persen",
    type: "String",
  },
  {
    label: "Status", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
    field: "status_pembayaran",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/siswa/${dataId}`);
    dataDetail.value = response.data;
    dataTemp.value.agama = { label: dataDetail.value.agama };
    dataTemp.value.jk = { label: dataDetail.value.jk };
    dataTemp.value.kelasdetail = { label: dataDetail.value.kelasdetail };
    dataTemp.value.kelas_id = {
      label: dataDetail.value.kelasdetail
        ? `${dataDetail.value.kelas_nama}`
        : null,
      id: dataDetail.value.kelasdetail.kelas_id,
    };
    // console.log(dataDetail.value.kelasdetail);
    // dataTemp.value.kelas_id = {
    //   label: dataDetail.value.kelas
    //     ? `${dataDetail.value.kelas.tingkatan} ${dataDetail.value.kelas.jurusan} ${dataDetail.value.kelas.suffix}`
    //     : null,
    //   id: dataDetail.value.kelas.id,
    // };
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const doDeleteData = async (id) => {
  if (confirm("Do you really want to delete?")) {
    try {
      const response = await Api.delete(`admin/siswa/${id}`);

      Toast.success("Success", "Data Berhasil dihapus!");
      getData();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const doResetPassword = async (id) => {
  if (confirm("Do you really want to Reset Password Siswa?")) {
    try {
      const response = await Api.put(`admin/siswa/${id}/generatepassword`);

      Toast.success(
        "Success",
        `Reset Password  Berhasil ! Password Baru :  ${response.password}`
      );
      getData();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
// validasi
function validateData(value) {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 1) {
    return "This Field must be at least 2 characters";
  }
  return true;
}
function onSubmit() {
  // data.value = null;
  let err = 0;
  if (dataTemp.value.agama == null) {
    Toast.danger("Warning", "Agama tidak boleh kosong");
    err++;
  } else {
    if (dataTemp.value.agama.label == null) {
      Toast.danger("Warning", "Agama tidak boleh kosong");
      err++;
    }
  }
  if (dataTemp.value.jk == null) {
    Toast.danger("Warning", "Jenis kelamin tidak boleh kosong");
    err++;
  } else {
    if (dataTemp.value.jk.label == null) {
      Toast.danger("Warning", "Jenis kelamin tidak boleh kosong");
      err++;
    }
  }

  if (dataTemp.value.kelas_id == null) {
    Toast.danger("Warning", "Kelas tidak boleh kosong");
    err++;
  } else {
    if (dataTemp.value.kelas_id.label == null) {
      Toast.danger("Warning", "Kelas tidak boleh kosong");
      err++;
    }
  }

  if (err < 1) {
    dataDetail.value.agama = dataTemp.value.agama.label;
    dataDetail.value.jk = dataTemp.value.jk.label;
    dataDetail.value.kelas_id = dataTemp.value.kelas_id.id;
    // console.log(dataTemp.value.agama.label);
    // console.log(dataTemp.value.kelas_id);
    const res = doStoreData(dataDetail.value, dataTemp.value);
    getData();
    // console.log("tes");
    // resetForm();
  }
}
const doEditData = async (id) => {
  dataId = id;
  getDataId();
};

const doStoreData = async (d) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(`admin/siswa/${dataId}`, {
        nama: d.nama,
        nomeridentitas: d.nomeridentitas,
        agama: d.agama,
        tempatlahir: d.tempatlahir,
        tgllahir: d.tgllahir,
        alamat: d.alamat,
        jk: d.jk,
        telp: d.telp,
        kelas_id: d.kelas_id,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post("admin/siswa/store", {
      nama: d.nama,
      nomeridentitas: d.nomeridentitas,
      agama: d.agama,
      tempatlahir: d.tempatlahir,
      tgllahir: d.tgllahir,
      alamat: d.alamat,
      jk: d.jk,
      telp: d.telp,
      kelas_id: d.kelas_id,
    });

    getData();
    Toast.success("Success", "Data Berhasil ditambahkan!");
    return response.data;
  } catch (error) {
    Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};

function resetForm() {
  dataDetail.value = {
    nama: "",
  };
  dataId = null;
  dataTemp.value.agama = null;
  dataTemp.value.jk = null;
}

let dataAgama = [
  { label: "Islam" },
  { label: "Protestan" },
  { label: "Katolik" },
  { label: "Hindu" },
  { label: "Buddha" },
  { label: "Khonghucu" },
];

let dataJk = [{ label: "Laki-laki" }, { label: "Perempuan" }];
const goTagihan = (siswa_id) => {
  router.push({
    name: 'admin.siswa.tagihan', params: { id: siswa_id }
  })
}

const file = ref(null);
let formData = new FormData();
const doStoreDataImport = async (d) => {
  // console.log(data);
  try {
    Toast.babeng("Info", "Upload sedang diproses");
    // const response = await Api.post("testing/apiprobk/upload", formData);
    const response = await Api.post(`admin/proses/import/siswa`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    Toast.babeng("Info", "Proses Upload berhasil!");
    // console.log(response.data);
    // Toast.success("Success", "Data Berhasil ditambahkan!");
    getData();
    return response.data;
  } catch (error) {
    // Toast.danger("Warning", "Data gagal ditambahkan!");
    console.error(error);
  }
};
const doSubmitFile = async () => {
  formData.append("file", file.value.files[0]);
  doStoreDataImport();
};
</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Siswa
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Siswa</span>
  </div>
  <div class="p-4">
    <div class="space-x-1 space-y-1 pt-1 md:pt-0">
      <label for="modalImport"
        class="btn modal-button btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Import
      </label>
      <!-- <button class="btn btn-info hover:shadow-lg shadow text-white hover:text-gray-100 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        Export
      </button> -->
    </div>
  </div>

  <div class="pt-6 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-7/12">
      <div v-if="data">
        <vue-good-table :columns="columns" :rows="data" :search-options="{
          enabled: true,
        }" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
          <template #table-row="props">
            <span v-if="props.column.field == 'actions'">
              <div class="text-sm font-medium text-center flex justify-center">
                <ButtonEdit @click="doEditData(props.row.id)" />
                <ButtonDelete @click="doDeleteData(props.row.id)" />
                <!-- <Popper content="Reset Password" @click="doResetPassword(props.row.id)">
                  <template #content>
                    <button
                      class="text-orange-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-orange-300 bg-orange-400 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </template>
                </Popper> -->

                <Popper content="Detail Data">
                  <template #content>
                    <router-link :to="{ name: 'AdminSiswaProfile', params: { id: props.row.id } }">
                      <button
                        class="text-sky-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </router-link>
                  </template>
                </Popper>
                <button class="btn btn-sm tooltip" data-tip="Tagihan" @click="goTagihan(props.row.id)"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </span>

            <span v-else-if="props.column.field == 'no'">
              <div class="text-center">{{ props.index + 1 }}</div>
            </span>

            <span v-else-if="props.column.field == 'status_pembayaran'">
              <!-- {{ min_pembayaran }}

              {{ props.row.pembayaran_persen }} -->
              <div class="text-center"
                v-if="parseInt(props.row.pembayaran_persen) < 100 && parseInt(props.row.pembayaran_persen) > parseInt(min_pembayaran)">
                <span class="text-yellow-500">CUKUP</span>
              </div>
              <div class="text-center" v-else-if="parseInt(props.row.pembayaran_persen) >= 100">
                <span class="text-green-500">LUNAS</span>
              </div>
              <div class="text-center" v-else>
                <span class="text-yellow-500">BELUM CUKUP</span>
              </div>
            </span>

            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <div class="wfull lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <button
          class="text-base font-normal text-gray-800 hover:text-gray-400 hover:bg-gray-100 bg-gray-300 border-2 px-2 py-2 rounded-md mb-2"
          @click="resetForm()" v-if="dataDetail.nama">
          Reset
        </button>
        <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
          <div class="pt-0 px-0">
            <div class="w-full mx-0">
              <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Nama</label>
                    <Field v-model="dataDetail.nama" :rules="validateData" type="text" name="nama" ref="nama"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.nama }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">NISN</label>
                    <Field v-model="dataDetail.nomeridentitas" :rules="validateData" type="number" name="nomeridentitas"
                      ref="nomeridentitas"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.nomeridentitas }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Agama</label>

                    <v-select :options="dataAgama" v-model="dataTemp.agama"></v-select>
                    <div class="text-xs text-red-600 mt-1">{{ errors.agama }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tempat Lahir</label>
                    <Field v-model="dataDetail.tempatlahir" :rules="validateData" type="text" name="tempatlahir"
                      ref="tempatlahir"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.tempatlahir }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal Lahir</label>
                    <Datepicker v-model="dataDetail.tgllahir" format="yyyy/MM/dd" value-format="yyyy-MM-dd"
                      :rules="validateData" required>
                      <template #calendar-header="{ index, day }">
                        <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                          {{ day }}
                        </div>
                      </template>
                    </Datepicker>

                    <div class="text-xs text-red-600 mt-1">{{ errors.tgllahir }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Alamat Lengkap</label>
                    <Field v-model="dataDetail.alamat" :rules="validateData" type="text" name="alamat" ref="alamat"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.alamat }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jenis Kelamin</label>
                    <v-select :options="dataJk" v-model="dataTemp.jk"></v-select>
                    <!-- <Field
                      v-model="dataDetail.jk"
                      :rules="validateData"
                      type="text"
                      name="jk"
                      ref="jk"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    /> -->
                    <div class="text-xs text-red-600 mt-1">{{ errors.jk }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">No Telp</label>
                    <Field v-model="dataDetail.telp" :rules="validateData" type="text" name="telp" ref="telp"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.telp }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Kelas</label>
                    <v-select :options="dataKelas" v-model="dataTemp.kelas_id"></v-select>
                    <!-- <Field
                      v-model="dataDetail.kelas_id"
                      :rules="validateData"
                      type="text"
                      name="kelas_id"
                      ref="kelas_id"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    /> -->
                    <div class="text-xs text-red-600 mt-1">{{ errors.kelas_id }}</div>
                  </div>
                </div>
                <!-- <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2"
                      >Email</label
                    >
                    <Field
                      v-model="dataDetail.email"
                      :rules="validateData"
                      type="email"
                      name="email"
                      ref="email"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                    <div class="text-xs text-red-600 mt-1">{{ errors.email }}</div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2"
                      >Username</label
                    >
                    <Field
                      v-model="dataDetail.username"
                      :rules="validateData"
                      type="text"
                      name="username"
                      ref="username"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                    <div class="text-xs text-red-600 mt-1">{{ errors.username }}</div>
                  </div>
                </div> -->
                <!-- <div class="grid grid-cols-1 gap-6 mt-4">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-1"
                      >Status</label
                    >
                    <div class="w-full flex gap-4">
                      <label class="inline-flex items-center mt-3">
                        <Field
                          v-model="dataDetail.status"
                          value="Aktif"
                          type="radio"
                          name="status"
                          ref="status"
                          class="form-radio h-5 w-5 text-gray-600"
                          checked
                        /><span class="ml-2 text-gray-700">Aktif</span>
                      </label>

                      <label class="inline-flex items-center mt-3">
                        <Field
                          v-model="dataDetail.status"
                          value="Nonaktif"
                          type="radio"
                          name="status"
                          ref="status"
                          class="form-radio h-5 w-5 text-red-600"
                        /><span class="ml-2 text-gray-700">Nonaktif</span>
                      </label>
                    </div>
                    <div class="text-xs text-red-600 mt-1">{{ errors.status }}</div>
                  </div>
                </div> -->
                <div class="w-full flex justify-end mt-4">
                  <Button title="Simpan" />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>


  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="modalImport" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <label for="modalImport" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="font-bold text-lg">Import data menggunakan .xlx / .xlxs !</h3>
      <div class="py-4">
        <input type="file" ref="file" />
        <button class="btn btn-info text-gray-100" @click="doSubmitFile()">
          Upload
        </button>
      </div>
      <div class="modal-action">
        <!-- <label for="modalImport" class="btn">Done!</label> -->
      </div>
    </div>
  </div>
</template>
