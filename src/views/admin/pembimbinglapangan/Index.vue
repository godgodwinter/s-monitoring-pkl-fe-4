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
const router = useRouter();
const route = useRoute();
const data = ref("");
const dataDetail = ref({
  nama: "",
});
let dataId = null;
// function Form and Validation
const getData = async () => {
  try {
    const response = await Api.get("admin/pembimbinglapangan");
    // console.log(response);
    data.value = response.data;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getData();

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
    label: "Tempat PKL",
    field: "tempatpkl_nama",
    type: "String",
  },
  {
    label: "Status Akun", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
    field: "status_login",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/pembimbinglapangan/${dataId}`);
    dataDetail.value = response.data;
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const doDeleteData = async (id) => {
  if (confirm("Do you really want to delete?")) {
    try {
      const response = await Api.delete(`admin/pembimbinglapangan/${id}`);

      Toast.success("Success", "Data Berhasil dihapus!");
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
  data.value = null;
  const res = doStoreData(dataDetail.value);
  getData();
  // console.log("tes");
  resetForm();
}
const doEditData = async (id) => {
  dataId = id;
  getDataId();
};

const doStoreData = async (d) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(`admin/pembimbinglapangan/${dataId}`, {
        nama: d.nama,
        nomeridentitas: d.nomeridentitas,
        agama: d.agama,
        tempatlahir: d.tempatlahir,
        tgllahir: d.tgllahir,
        alamat: d.alamat,
        jk: d.jk,
        telp: d.telp,
        // kelas_id: d.kelas_id,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post("admin/pembimbinglapangan/store", {
      nama: d.nama,
      nomeridentitas: d.nomeridentitas,
      agama: d.agama,
      tempatlahir: d.tempatlahir,
      tgllahir: d.tgllahir,
      alamat: d.alamat,
      jk: d.jk,
      telp: d.telp,
      // kelas_id: d.kelas_id,
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
}
</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Pembimbing Lapangan
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Pembimbing Lapangan</span>
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
                <button
                  class="text-orange-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-orange-300 bg-orange-400 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>

                <router-link :to="{ name: 'admin-pembimbimbinglapangan-profile', params: { id: props.row.id } }">
                  <button
                    class="text-sky-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </router-link>
              </div>
            </span>

            <span v-else-if="props.column.field == 'no'">
              <div class="text-center">{{ props.index + 1 }}</div>
            </span>

            <span v-else-if="props.column.field == 'status_login'">
              <div class="text-center" v-if="props.row.status_login == 'Aktif'">
                <span class="text-green-500">Aktif</span>
                <!-- <div class="text-center" v-if="props.row.password">
                  <span class="text-green-500">Aktif</span>
                </div>
                <div class="text-center" v-else>
                  <span class="text-yellow-500">Belum Aktif</span>
                </div> -->
              </div>
              <div class="text-center" v-else>
                <span class="text-yellow-500">Disabled</span>
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
                    <Field v-model="dataDetail.agama" :rules="validateData" type="text" name="agama" ref="agama"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
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
                    <Field v-model="dataDetail.tgllahir" :rules="validateData" type="text" name="tgllahir"
                      ref="tgllahir"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
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
                    <Field v-model="dataDetail.jk" :rules="validateData" type="text" name="jk" ref="jk"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
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
                <!-- <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Kelas</label>
                    <Field v-model="dataDetail.kelas_id" :rules="validateData" type="text" name="kelas_id"
                      ref="kelas_id"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.kelas_id }}</div>
                  </div>
                </div> -->
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
</template>
