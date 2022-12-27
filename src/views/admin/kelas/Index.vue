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
    const response = await Api.get("admin/kelas");
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
    label: "Tagihan",
    field: "tagihan",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/kelas/${dataId}`);
    dataDetail.value = response.data;
    // console.log(response);
    inputPilihJurusan.value = { label: response.data.jurusan_table ? response.data.jurusan_table.nama : null, id: response.data.jurusan_table ? response.data.jurusan_table.id : null };
    return response;
  } catch (error) {
    console.error(error);
  }
};

const doDeleteData = async (id) => {
  if (confirm("Do you really want to delete?")) {
    try {
      const response = await Api.delete(`admin/kelas/${id}`);

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
  if (inputPilihJurusan.value) {

    const res = doStoreData(dataDetail.value);
    getData();
    // console.log("tes");
    resetForm();
  } else {
    Toast.danger("Error", "Jurusan belum dipilih!")
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
      const response = await Api.put(`admin/kelas/${dataId}`, {
        tingkatan: d.tingkatan,
        jurusan: inputPilihJurusan.value.id,
        suffix: d.suffix,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post("admin/kelas/store", {
      tingkatan: d.tingkatan,
      jurusan: inputPilihJurusan.value.id,
      suffix: d.suffix,
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
    tingkatan: "",
    jurusan: "",
    suffix: "",
  };
  inputPilihJurusan.value = null;
  dataId = null;
}
const dataJurusan = ref([]);
const inputPilihJurusan = ref();

let pilihJurusan = ref([
  // {
  //   label: "Belum masuk Kelas",
  //   id: "Belum masuk Kelas",
  // },
]);
// get Kelas
const getDataJurusan = async () => {
  try {
    const response = await Api.get(`admin/jurusan`);
    // console.log(response);
    dataJurusan.value = response.data;
    dataJurusan.value.forEach(element => {
      // console.log(element);
      let temp = {
        label: element.nama,
        id: element.id,
      }
      pilihJurusan.value.push(temp);
    })
    // console.log(pilihKepalaJurusan.value);
    return true;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataJurusan();

const formTagihan = ref(false);
const dataFormTagihan = ref({
  kelas_id: null
})
const doOpenFormTagihan = (kelas_id) => {
  formTagihan.value = true;
  dataFormTagihan.value.kelas_id = kelas_id;
  dataFormTagihan.value.total_tagihan = 0;
}

const onSubmitFormTagihan = async () => {
  if (dataFormTagihan.value.total_tagihan > 0) {
    console.log(dataFormTagihan.value);
    const response = await Api.post(`admin/tagihan/add/${dataFormTagihan.value.kelas_id}`, {
      total_tagihan: dataFormTagihan.value.total_tagihan,
    });

    Toast.success("Success", "Data Berhasil diupdate!");
  } else {
    Toast.danger("Error", "Tagihan tidak boleh kosong!")
  }
}
const doCloseFormTagihan = (kelas_id) => {
  formTagihan.value = false;
  dataFormTagihan.kelas_id = null;
  dataFormTagihan.total_tagihan = 0;
}
</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Kelas
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Kelas</span>
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

            <span v-else-if="props.column.field == 'nama'">
              {{ props.row.tingkatan }} {{ props.row.jurusan_table ? props.row.jurusan_table.nama : "-" }} {{
    props.row.suffix
}}
            </span>

            <span v-else-if="props.column.field == 'tagihan'">
              <button class="btn btn-sm btn-primary" @click="doOpenFormTagihan(props.row.id)">Atur</button>
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
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Tingkatan</label>
                    <Field v-model="dataDetail.tingkatan" :rules="validateData" type="text" name="tingkatan"
                      ref="tingkatan"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.tingkatan }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jurusan</label>
                    <!-- <Field v-model="dataDetail.jurusan" :rules="validateData" type="text" name="jurusan" ref="jurusan"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required /> -->
                    <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihJurusan" v-model="inputPilihJurusan"
                      v-bind:class="{ disabled: false }"></v-select>
                    <div class="text-xs text-red-600 mt-1">{{ errors.jurusan }}</div>
                  </div>

                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Suffix</label>
                    <Field v-model="dataDetail.suffix" :rules="validateData" type="text" name="suffix" ref="suffix"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.suffix }}</div>
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

    <div class="wfull lg:w-4/12 mx-4" v-if="formTagihan">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <button
          class="text-base font-normal text-gray-800 hover:text-gray-400 hover:bg-gray-100 bg-gray-300 border-2 px-2 py-2 rounded-md mb-2"
          @click="resetForm()" v-if="dataDetail.nama">
          Reset
        </button>
        <div class="pt-0 px-0">
          <div class="w-full mx-0">
            <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
              <div class="grid grid-cols-1 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="name" class="text-sm font-medium text-gray-900 block mb-2">TOTAL TAGIHAN</label>
                  <input v-model="dataFormTagihan.total_tagihan" type="text" name="total_tagihan" ref="total_tagihan"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    required />
                </div>
              </div>
              <div class="w-full flex justify-end mt-4 space-x-2">
                <span class="btn btn-dark" @click="doCloseFormTagihan()">Batal</span>
                <Button title="Simpan" @click="onSubmitFormTagihan()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
