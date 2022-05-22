<script setup>
import Popper from "@/components/atoms/Popper.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import Api from "@/axios/axios.js";
import Toast from "@/components/lib/Toast.js";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
const data = ref("");
const dataAsli = ref("");
const dataDetail = ref({
  nama: "",
});
let dataId = null;
// function Form and Validation
const getData = async () => {
  try {
    const response = await Api.get("admin/pendaftaranpkl/list/prosespemberkasan");
    // console.log(response);
    // data.value = response.data;
    dataAsli.value = response.data;
    data.value = dataAsli.value.map((item) => {
      let dk = null;
      // if (item.pendaftaranprakerin) {
      //   dk = `${item.pendaftaranprakerin.status}`;
      // } else {
      //   dk = "Belum Daftar";
      // }
      return {
        id: item.id,
        nama: item.siswa ? item.siswa.nama : "",
        pendaftaranprakerin: item.status,
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
    label: "Status PKL", //aktif / nonaktif / disabled (telah lulus/keluar/dll)
    field: "pendaftaranprakerin",
    type: "String",
  },
];
function doLanjutkanProses(id) {
  router.push({
    name: "AdminPendaftaranProsesSatu",
    params: { id: id },
  });
}
</script>
<template>
  <div class="bg-white p-3 shadow-sm rounded-sm">
    <!-- About Section -->
    <div class="bg-white p-3 shadow-sm rounded-sm">
      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
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
        <span class="tracking-wide">Data Siswa dalam Proses Pemberkasan</span>
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
                  <Popper
                    content="Lanjutkan Proses"
                    @click="doLanjutkanProses(props.row.id)"
                  >
                    <template #content>
                      <button
                        class="text-blue-100 block rounded-sm font-bold py-1 px-1 mr-2 flex items-center hover:text-blue-300 bg-blue-400 rounded-lg"
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
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </template>
                  </Popper>
                  <router-link
                    :to="{ name: 'AdminSiswaProfile', params: { id: props.row.id } }"
                  >
                    <Popper content="Detail Data">
                      <template #content>
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
                      </template>
                    </Popper>
                  </router-link>
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
    </div>
    <!-- End of about section -->
  </div>
</template>
