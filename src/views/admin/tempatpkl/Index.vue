<script setup>
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
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
moment.updateLocale("id", localization);
const router = useRouter();
const route = useRoute();
const data = ref("");
const dataDetail = ref({
  nama: "",
  tgl_mulai: moment().format("YYYY-MM-DD"),
  tgl_selesai: moment().add("days", 90).format("YYYY-MM-DD"),
});
let dataId = null;
// function Form and Validation
const getData = async () => {
  try {
    const response = await Api.get("admin/tempatpkl");
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
    label: "Kuota",
    field: "kuota",
    type: "String",
  },
  {
    label: "Desc",
    field: "desc",
    type: "String",
  },
  {
    label: "No. Telp",
    field: "telp",
    type: "String",
  },
  {
    label: "Penanggung jawab / Pembimbing Lapangan",
    field: "pembimbinglapangan_nama",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/tempatpkl/${dataId}`);
    dataDetail.value = response.data;
    inputPilihPembimbingLapangan.value = { label: response.data.pembimbinglapangan ? response.data.pembimbinglapangan.nama : null, id: response.data.pembimbinglapangan ? response.data.pembimbinglapangan.id : null };
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const doDeleteData = async (id) => {
  if (confirm("Do you really want to delete?")) {
    try {
      const response = await Api.delete(`admin/tempatpkl/${id}`);

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
  if (inputPilihPembimbingLapangan.value) {
    data.value = null;
    const res = doStoreData(dataDetail.value);
    getData();
    // console.log("tes");
    resetForm();
  } else {
    Toast.danger("Error", "Penanggung Jawab/Pembimbing Lapangan belum dipilih!");
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
      const response = await Api.put(`admin/tempatpkl/${dataId}`, {
        nama: d.nama,
        alamat: d.alamat,
        telp: d.telp,
        penanggungjawab: inputPilihPembimbingLapangan.value.id,
        kuota: d.kuota,
        tgl_mulai: d.tgl_mulai,
        tgl_selesai: d.tgl_selesai,
        desc: d.desc,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post("admin/tempatpkl/store", {
      nama: d.nama,
      alamat: d.alamat,
      telp: d.telp,
      penanggungjawab: inputPilihPembimbingLapangan.value.id,
      kuota: d.kuota,
      tgl_mulai: d.tgl_mulai,
      tgl_selesai: d.tgl_selesai,
      desc: d.desc,
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
  inputPilihPembimbingLapangan.value = null;
}



const dataPembimbingLapangan = ref([]);
const inputPilihPembimbingLapangan = ref();

let pilihPembimbingLapangan = ref([
  // {
  //   label: "Belum masuk Kelas",
  //   id: "Belum masuk Kelas",
  // },
]);
// get Kelas
const getDataPembimbingLapangan = async () => {
  try {
    const response = await Api.get(`admin/pembimbinglapangan`);
    // console.log(response);
    dataPembimbingLapangan.value = response.data;
    dataPembimbingLapangan.value.forEach(element => {
      // console.log(element);
      let temp = {
        label: element.nama,
        id: element.id,
      }
      pilihPembimbingLapangan.value.push(temp);
    })
    // console.log(pilihKepalaJurusan.value);
    return true;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataPembimbingLapangan();
const file = ref(null);
let formData = new FormData();
const doStoreDataImport = async (d) => {
  // console.log(data);
  try {
    Toast.babeng("Info", "Upload sedang diproses");
    // const response = await Api.post("testing/apiprobk/upload", formData);
    const response = await Api.post(`admin/proses/import/tempatpkl`, formData, {
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
    <template v-slot:content> Tempat Prakerin
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Tempat Prakerin</span>
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
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.nama }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Alamat</label>
                    <Field v-model="dataDetail.alamat" :rules="validateData" type="text" name="alamat" ref="alamat"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.alamat }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="desc" class="text-sm font-medium text-gray-900 block mb-2">Deskripsi</label>
                    <Field v-model="dataDetail.desc" :rules="validateData" type="text" name="desc" ref="desc"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.desc }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Telp</label>
                    <Field v-model="dataDetail.telp" :rules="validateData" type="text" name="telp" ref="telp"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.telp }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penanggung Jawab / Pembimbing
                      Lapangan</label>
                    <!-- <Field v-model="dataDetail.penanggungjawab" :rules="validateData" type="text" name="penanggungjawab"
                      ref="penanggungjawab"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required /> -->

                    <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihPembimbingLapangan"
                      v-model="inputPilihPembimbingLapangan" v-bind:class="{ disabled: false }"></v-select>
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.penanggungjawab }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Kuota</label>
                    <Field v-model="dataDetail.kuota" :rules="validateData" type="number" name="kuota" ref="kuota"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.kuota }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal Mulai
                      Prakerin</label>
                    <Datepicker v-model="dataDetail.tgl_mulai" format="yyyy/MM/dd" value-format="yyyy-MM-dd">
                      <template #calendar-header="{ index, day }">
                        <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                          {{ day }}
                        </div>
                      </template>
                    </Datepicker>

                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.tgl_mulai }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tanggal Selesai
                      Prakerin</label>
                    <Datepicker v-model="dataDetail.tgl_selesai" format="yyyy/MM/dd" value-format="yyyy-MM-dd">
                      <template #calendar-header="{ index, day }">
                        <div :class="index === 5 || index === 6 ? 'red-color' : ''">
                          {{ day }}
                        </div>
                      </template>
                    </Datepicker>

                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.tgl_selesai }}
                    </div>
                  </div>
                </div>
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
