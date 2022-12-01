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
// function Form and Validation
const getData = async () => {
  try {
    const response = await Api.get("admin/penilaian");
    // console.log(response);
    dataAsli.value = response.data;
    data.value = dataAsli.value;
    // data.value = dataAsli.value.map((item) => {
    //   let dk = null;
    //   if (item.kelasdetail) {
    //     dk = `${item.kelasdetail.kelas.tingkatan} ${item.kelasdetail.kelas.jurusan} ${item.kelasdetail.kelas.suffix}`;
    //   }
    //   return {
    //     id: item.id,
    //     nama: item.nama,
    //     kelas_nama: item.kelas_nama,
    //     status_login: item.status_login,
    //     kelas: dk,
    //   };
    // });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getData();

// const getDataKelas = async () => {
//   try {
//     const response = await Api.get("admin/kelas");
//     // console.log(response);
//     let tempKelas = response.data;
//     dataKelas.value = tempKelas.map((item) => {
//       return {
//         label: `${item.tingkatan} ${item.jurusan_nama} ${item.suffix}`,
//         id: item.id,
//       };
//     });
//     // console.log(dataKelas.value);
//     return response;
//   } catch (error) {
//     Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
//     console.error(error);
//   }
// };

// getDataKelas();

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
    label: "Penilaian Guru",
    field: "penilaian_guru",
    type: "String",
  },
  {
    label: "Penilaian Pembimbing Lapangan",
    field: "penilaian_pembimbinglapangan",
    type: "String",
  },
  {
    label: "Absensi",
    field: "absensi",
    type: "String",
  },
  {
    label: "Jurnal",
    field: "jurnal",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/penilaian/${dataId}`);
    dataDetail.value = response.data;
    // dataTemp.value.agama = { label: dataDetail.value.agama };
    // dataTemp.value.jk = { label: dataDetail.value.jk };
    // dataTemp.value.kelasdetail = { label: dataDetail.value.kelasdetail };
    // dataTemp.value.kelas_id = {
    //   label: dataDetail.value.kelasdetail
    //     ? `${dataDetail.value.kelas_nama}`
    //     : null,
    //   id: dataDetail.value.kelasdetail.kelas_id,
    // };
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
      const response = await Api.delete(`admin/penilaian/${id}`);

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
  // data.value = null;
  // let err = 0;
  // if (dataTemp.value.agama == null) {
  //   Toast.danger("Warning", "Agama tidak boleh kosong");
  //   err++;
  // } else {
  //   if (dataTemp.value.agama.label == null) {
  //     Toast.danger("Warning", "Agama tidak boleh kosong");
  //     err++;
  //   }
  // }
  // if (dataTemp.value.jk == null) {
  //   Toast.danger("Warning", "Jenis kelamin tidak boleh kosong");
  //   err++;
  // } else {
  //   if (dataTemp.value.jk.label == null) {
  //     Toast.danger("Warning", "Jenis kelamin tidak boleh kosong");
  //     err++;
  //   }
  // }

  // if (dataTemp.value.kelas_id == null) {
  //   Toast.danger("Warning", "Kelas tidak boleh kosong");
  //   err++;
  // } else {
  //   if (dataTemp.value.kelas_id.label == null) {
  //     Toast.danger("Warning", "Kelas tidak boleh kosong");
  //     err++;
  //   }
  // }

  // if (err < 1) {
  //   dataDetail.value.agama = dataTemp.value.agama.label;
  //   dataDetail.value.jk = dataTemp.value.jk.label;
  //   dataDetail.value.kelas_id = dataTemp.value.kelas_id.id;
  //   // console.log(dataTemp.value.agama.label);
  //   // console.log(dataTemp.value.kelas_id);
  const res = doStoreData(dataDetail.value, dataTemp.value);
  getData();
  //   // console.log("tes");
  resetForm();
  // }
}
const doEditData = async (id) => {
  dataId = id;
  getDataId();
};

const doStoreData = async (d) => {
  // console.log(data);
  try {
    if (dataId) {
      const response = await Api.put(`admin/penilaian/${dataId}`, {
        penilaian_guru: d.penilaian_guru,
        penilaian_pembimbinglapangan: d.penilaian_pembimbinglapangan,
        jurnal: d.jurnal,
        absensi: d.absensi,
        jurusan_id: d.jurusan_id,
      });

      Toast.success("Success", "Data Berhasil diupdate!");
      getData();
      return response.data;
    }
    const response = await Api.post("admin/penilaian", {
      penilaian_guru: d.penilaian_guru,
      penilaian_pembimbinglapangan: d.penilaian_pembimbinglapangan,
      jurnal: d.jurnal,
      absensi: d.absensi,
      jurusan_id: d.jurusan_id,
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
  // dataTemp.value.agama = null;
  // dataTemp.value.jk = null;
}

// let dataAgama = [
//   { label: "Islam" },
//   { label: "Protestan" },
//   { label: "Katolik" },
//   { label: "Hindu" },
//   { label: "Buddha" },
//   { label: "Khonghucu" },
// ];

// let dataJk = [{ label: "Laki-laki" }, { label: "Perempuan" }];
</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Setting Penilaian
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Setting Penilaian</span>
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

                <!-- <Popper content="Detail Data">
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
                </Popper> -->
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
          @click="resetForm()" v-if="dataDetail.penilaian_guru">
          Reset
        </button>
        <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
          <div class="pt-0 px-0">
            <div class="w-full mx-0">
              <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penilaian Guru</label>
                    <Field v-model="dataDetail.penilaian_guru" :rules="validateData" type="number" name="penilaian_guru"
                      ref="penilaian_guru"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">{{ errors.penilaian_guru }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Penilaian Pembimbing
                      Lapangan</label>
                    <Field v-model="dataDetail.penilaian_pembimbinglapangan" :rules="validateData" type="number"
                      name="penilaian_pembimbinglapangan" ref="penilaian_pembimbinglapangan"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.penilaian_pembimbinglapangan }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Absensi
                    </label>
                    <Field v-model="dataDetail.absensi" :rules="validateData" type="number" name="absensi" ref="absensi"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.absensi }}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jurnal
                    </label>
                    <Field v-model="dataDetail.jurnal" :rules="validateData" type="number" name="jurnal" ref="jurnal"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.jurnal }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jurusan
                    </label>
                    <Field v-model="dataDetail.jurusan_id" :rules="validateData" type="number" name="jurusan_id"
                      ref="jurusan_id"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.jurusan_id }}
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
</template>
