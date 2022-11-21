<script setup>
import Popper from "../../../components/atoms/Popper.vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import { Field, Form } from "vee-validate";
const router = useRouter();
const dataAsli = ref("");
const data = ref("");
const getData = async () => {
  try {
    const response = await Api.get("admin/pendaftaranpkl/list/disetujui");
    // console.log(response);
    dataAsli.value = response.data;
    data.value = dataAsli.value.map((item) => {
      let dk = null;
      if (item.siswa) {
        dk = `${item.siswa.nama}`;
      } else {
        dk = "Belum Daftar";
      }
      return {
        ...item,
        id: item.id,
        siswa_id: item.siswa_id,
        nomeridentitas: item.siswa.nomeridentitas,
        nama: dk,
        status: item.status,
      };
    });
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
    label: "NIS",
    field: "nomeridentitas",
    type: "String",
  },
  {
    label: "Status PKL", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
    field: "status",
    type: "String",
  },
  {
    label: "Pembimbing Sekolah", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
    field: "pembimbingsekolah_nama",
    type: "String",
  },
];
function doLanjutkanProses(id) {
  router.push({
    name: "AdminPendaftaranProsesTiga",
    params: { id: id },
  });
}

const dataForm = ref(null);
const pilihPembimbingSekolah = ref([
  // {
  //   id: 1,
  //   label: "Pembimbing Sekolah 1",
  // },
  // {
  //   id: 2,
  //   label: "Pembimbing Sekolah 2",
  // }
]);
const inputpilihPembimbingSekolah = ref(null);
const getPembimbingSekolah = async () => {
  try {
    const response = await Api.get(`admin/pembimbingsekolah`);
    // dataDetail.value = response.data;
    // console.log(response);
    response.data.forEach(item => {
      let tempData = {
        id: item.id,
        label: item.nama,
        nama: item.nama,
      }
      // 
      pilihPembimbingSekolah.value.push(tempData);

    });
    console.log(pilihPembimbingSekolah.value);
    return response;
  } catch (error) {
    console.error(error);
  }
};
getPembimbingSekolah();
</script>
<template>
  <div>
    <div>
      <h2>Form add Pembimbing Sekolah</h2>
    </div>
    <div class="w-1/2 flex justify-center">

      <Form v-slot="{ errors }" @submit="onSubmit">
        <div class="pt-0 px-0">
          <div class="w-full mx-0">
            <div class="bg-white rounded-lg p-0 sm:p-6 xl:p-0">
              <div class="grid grid-cols-1 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Jurusan</label>
                  <!-- <Field v-model="dataDetail.jurusan" :rules="validateData" type="text" name="jurusan" ref="jurusan"
                      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      required /> -->
                  <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihPembimbingSekolah"
                    v-model="inputpilihPembimbingSekolah" v-bind:class="{ disabled: false }"></v-select>
                  <div class="text-xs text-red-600 mt-1">{{ errors.jurusan }}</div>
                </div>

              </div>
              <div class="w-full flex justify-end mt-4">
                <button class="btn btn-info"> SIMPAN</button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
  <div class="bg-white p-3 shadow-sm rounded-sm">
    <!-- About Section -->
    <div class="bg-white p-3 shadow-sm rounded-sm">
      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span clas="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </span>
        <span class="tracking-wide">Data Siswa Disetujui</span>
      </div>
      <div class="text-gray-700">
        <!-- table -->

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
                  <!-- <Popper
                    content="Hapus Proses"
                    @click="doLanjutkanProses(props.row.siswa_id)"
                  >
                    <template #content>
                      <ButtonDelete></ButtonDelete>
                    </template>
                  </Popper> -->
                  <router-link :to="{
                    name: 'AdminSiswaProfile',
                    params: { id: props.row.siswa_id },
                  }">
                    <Popper content="Detail Data">
                      <template #content>
                        <button
                          class="text-sky-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </template>
                    </Popper>
                  </router-link>
                  <button class="btn btn-sm btn-warning tooltip" data-tip="Edit Pembimbing Sekolah">E</button>
                </div>
              </span>

              <span v-else-if="props.column.field == 'no'">
                <div class="text-center">{{ props.index + 1 }}</div>
              </span>

              <span v-else-if="props.column.field == 'status'">
                <div class="text-center">
                  <span class="text-green-500"> {{ props.row.status }}</span>
                </div>
              </span>

              <!-- <span v-else-if="props.column.field == 'nama'">
                <div class="text-center">
                  <span class="text-green-500"> {{ props.row.siswa.nama }}</span>
                </div>
              </span> -->

              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
    <!-- End of about section -->
  </div>
</template>
