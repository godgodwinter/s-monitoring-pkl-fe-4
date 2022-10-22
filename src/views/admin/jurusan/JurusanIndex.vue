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
    const response = await Api.get("admin/jurusan");
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
    label: "Kepala Jurusaan",
    field: "kepalajurusan_nama",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/jurusan/${dataId}`);
    dataDetail.value = response.data;
    console.log(response);
    inputPilihKepalaJurusan.value = { label: response.data.guru ? response.data.guru.nama : null, id: response.data.guru ? response.data.guru.id : null };

    return response;
  } catch (error) {
    console.error(error);
  }
};

const doDeleteData = async (id) => {
  if (confirm("Do you really want to delete?")) {
    try {
      const response = await Api.delete(`admin/jurusan/${id}`);

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
  if (inputPilihKepalaJurusan.value) {
    const res = doStoreData(dataDetail.value);
    getData();
    resetForm()
  } else {
    Toast.danger("Error", "Kepala Jurusan belum dipilih!");
  }
  // console.log("tes");;
}
const doEditData = async (id) => {
  dataId = id;
  getDataId();
};

const doStoreData = async (d) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(`admin/jurusan/${dataId}`, {
        nama: d.nama,
        kepalajurusan_id: inputPilihKepalaJurusan.value.id,
        // kepalajurusan_id: d.kepalajurusan_id,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post("admin/jurusan", {
      nama: d.nama,
      kepalajurusan_id: inputPilihKepalaJurusan.value.id,
      // kepalajurusan_id: d.kepalajurusan_id,
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
    // kepalajurusan_id: "",
  };
  inputPilihKepalaJurusan.value = null;
  dataId = null;
}

const dataGuru = ref([]);
const inputPilihKepalaJurusan = ref();

let pilihKepalaJurusan = ref([
  // {
  //   label: "Belum masuk Kelas",
  //   id: "Belum masuk Kelas",
  // },
]);
// get Kelas
const getDataGuru = async () => {
  try {
    const response = await Api.get(`admin/pembimbingsekolah`);
    // console.log(response);
    dataGuru.value = response.data;
    dataGuru.value.forEach(element => {
      // console.log(element);
      let temp = {
        label: element.nama,
        id: element.id,
      }
      pilihKepalaJurusan.value.push(temp);
    })
    // console.log(pilihKepalaJurusan.value);
    return true;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataGuru();


</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Jurusan
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Jurusan</span>
  </div>

  <div class="pt-6 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-7/12">
      <div v-if="data">
        <vue-good-table :columns="columns" :rows="data" :line-numbers="true" :search-options="{
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
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Kepala Jurusan</label>
                    <!-- <Field v-model="dataDetail.kepalajurusan_id" :rules="validateData" type="text"
                      name="kepalajurusan_id" ref="kepalajurusan_id"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required /> -->
                    <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKepalaJurusan"
                      v-model="inputPilihKepalaJurusan" v-bind:class="{ disabled: false }"></v-select>
                    <div class="text-xs text-red-600 mt-1">{{ errors.kepalajurusan_id }}</div>
                  </div>
                </div>
                <!-- <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Kepala Jurusan</label>
                    <Field v-model="dataDetail.kepalajurusan_id" :rules="validateData" type="text"
                      name="kepalajurusan_id" ref="kepalajurusan_id"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.kepalajurusan_id }}</div>
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
