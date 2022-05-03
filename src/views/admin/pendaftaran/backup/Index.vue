<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import SubSidebarPendaftaranPkl from "@/components/organismes/pendaftaran/SubSidebarPendaftaranPkl.vue";
import CardDetailPendaftaran from "../../../components/organismes/pendaftaran/CardDetailPendaftaran.vue";
import FormPendaftaranBaru from "../../../components/organismes/pendaftaran/FormPendaftaranBaru.vue";
import CardInformasiPersiswa from "../../../components/organismes/pendaftaran/CardInformasiPersiswa.vue";
import { ref } from "vue";
import { Field, Form } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
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
    const response = await Api.get("admin/pendaftaranpkl/list/getall");
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
    label: "Status PKL", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
    field: "pendaftaranprakerin",
    type: "String",
  },
];
</script>
<template>
  <BreadCrumb>
    <template v-slot:content>
      <router-link :to="{ name: 'AdminSiswa' }"
        ><button class="underline rounded rounded-md hover:bg-gray-200">
          Pendaftaran
        </button></router-link
      >
      <BreadCrumbSpace /> Index</template
    >
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >Pendaftaran Prakerin</span
    >
  </div>

  <div class="container mx-auto my-5 p-5">
    <div class="md:flex no-wrap md:-mx-2">
      <!-- Left Side -->
      <div class="w-full md:w-3/12 md:mx-2">
        <SubSidebarPendaftaranPkl></SubSidebarPendaftaranPkl>
      </div>
      <!-- Right Side -->
      <div class="w-full md:w-9/12 mx-2 h-64">
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <!-- About Section -->
          <div class="bg-white p-3 shadow-sm rounded-sm">
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
              <span class="tracking-wide">Data Siswa</span>
            </div>
            <div class="text-gray-700">
              <!-- table -->

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
                        <ButtonEdit />
                        <ButtonDelete />
                        <button
                          class="text-orange-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-orange-300 bg-orange-400 rounded-lg"
                        >
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
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </button>

                        <router-link :to="{ name: 'AdminSiswaProfile' }">
                          <button
                            class="text-sky-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-sky-300 bg-sky-400 rounded-lg"
                          >
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
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </router-link>
                      </div>
                    </span>

                    <span v-else-if="props.column.field == 'no'">
                      <div class="text-center">{{ props.index + 1 }}</div>
                    </span>

                    <span v-else-if="props.column.field == 'pendaftaranprakerin'">
                      <div
                        class="text-center"
                        v-if="props.row.pendaftaranprakerin.length > 0"
                      >
                        <span
                          class="text-green-500"
                          v-for="item in props.row.pendaftaranprakerin"
                          :key="item.id"
                        >
                          {{ item.status }}</span
                        >
                      </div>
                      <div class="text-center" v-else>
                        <span class="text-yellow-500">Belum Daftar</span>
                      </div>
                    </span>

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
        <!-- <CardDetailPendaftaran></CardDetailPendaftaran> -->
        <!-- <div class="my-4"></div> -->
        <!-- <FormPendaftaranBaru></FormPendaftaranBaru> -->
        <!-- <div class="my-4"></div> -->
        <!-- <CardInformasiPersiswa></CardInformasiPersiswa> -->
        <!-- <div class="my-4"></div> -->
      </div>
    </div>
  </div>
</template>
