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
const data = ref([]);
const dataIndex = ref(null);
const dataDetail = ref({
  nama: "",
});
let dataId = null;
// function Form and Validation
const getData = async () => {
  try {
    const response = await Api.get("admin/tapel");
    // console.log(response);
    data.value = response.data;
    // console.log(data.value);
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

getData();
// const dataSiswaTesting = [
//   {
//     id: 12,
//     iq: "UD Najmudin Putra",
//   },
//   {
//     id: 12,
//     iq: "UD Najmudin Putra2",
//   },
// ];
// console.log(dataSiswaTesting);

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
    label: "Status",
    field: "status",
    type: "String",
  },
];

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/tapel/${dataId}`);
    dataDetail.value = response.data;
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const doDeleteData = async (id, index) => {
  if (confirm("Do you really want to delete?")) {
    try {
      const response = await Api.delete(`admin/tapel/${id}`);
      data.value.splice(index, 1);
      Toast.success("Success", "Data Berhasil dihapus!");
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
  if (value.length < 2) {
    return "This Field must be at least 2 characters";
  }
  return true;
}
function onSubmit() {
  const res = doStoreData(dataDetail.value);
  // getData();
  // console.log("tes");
}
const doEditData = async (id, index) => {
  dataId = id;
  dataIndex.value = index;

  getDataId();
};

const doStoreData = async (d) => {
  let dataStore = {
    id: 0,
    nama: d.nama,
    status: d.status,
    created_at: null,
    deleted_at: null,
    updated_at: null,
  };
  try {
    if (dataId) {
      const response = await Api.put(`admin/tapel/${dataId}`, dataStore);

      let dataFilter = data.value.filter((item) => item.status == "Aktif");
      dataFilter.forEach((item) => {
        item.status = "Nonaktif";
      });
      data.value[dataIndex.value] = {
        nama: dataStore.nama,
        status: dataStore.status,
        id: dataId,
      };
      // console.log(dataIndex.value);
      Toast.success("Success", "Data Berhasil diupdate!");
      resetForm();
      return response.data;
    }
    const response = await Api.post("admin/tapel/store", dataStore);
    dataStore.id = response.id;
    if (dataStore.status == "Aktif") {
      let dataFilter = data.value.filter((item) => item.status == "Aktif");
      dataFilter.forEach((item) => {
        item.status = "Nonaktif";
      });
    }
    data.value.push(dataStore);
    Toast.success("Success", "Data Berhasil ditambahkan!");
    resetForm();

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
  dataIndex.value = null;
  dataId = null;
}
</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Tapel <BreadCrumbSpace /> Index</template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span
      class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >Tahun Pelajaran</span
    >
  </div>

  <div class="pt-6 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-7/12">
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
              <div class="text-sm font-medium text-center flex justify-center">
                <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                <ButtonDelete
                  @click="doDeleteData(props.row.id, props.index)"
                />
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

    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <button
          class="text-base font-normal text-gray-800 hover:text-gray-400 hover:bg-gray-100 bg-gray-300 border-2 px-2 py-2 rounded-md mb-2"
          @click="resetForm()"
          v-if="dataDetail.nama"
        >
          Reset
        </button>
        <Form v-slot="{ errors }" @submit="onSubmit" v-if="data">
          <div class="pt-0 px-0">
            <div class="w-full mx-0">
              <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
                <div class="grid grid-cols-1 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="name"
                      class="text-sm font-medium text-gray-900 block mb-2"
                      >Nama</label
                    >
                    <Field
                      v-model="dataDetail.nama"
                      :rules="validateData"
                      type="text"
                      name="nama"
                      ref="nama"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required
                    />
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.nama }}
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-6 mt-4">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="name"
                      class="text-sm font-medium text-gray-900 block mb-1"
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
                    <div class="text-xs text-red-600 mt-1">
                      {{ errors.status }}
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
