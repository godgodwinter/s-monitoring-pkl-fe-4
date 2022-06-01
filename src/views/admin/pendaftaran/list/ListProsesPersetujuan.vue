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
  ketarangan: "",
});
let dataId = null;
const getData = async () => {
  try {
    const response = await Api.get(
      "admin/pendaftaranpkl/list/prosespersetujuan"
    );
    dataAsli.value = response.data;
    data.value = dataAsli.value.map((item) => {
      let dk = null;
      return {
        ...item,
        id: item.id,
        siswa_id: item.siswa_id,
        nama: item.siswa ? item.siswa.nama : "",
        nomeridentitas: item.siswa ? item.siswa.nomeridentitas : "",
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
    label: "NIS",
    field: "nomeridentitas",
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

const getDataModal = async () => {
  try {
    const response = await Api.get(
      `admin/pendaftaranpkl/list/periksaidbaru/${siswa_id.value}`
    );
    dataModal.value.anggota = response.anggota;
    dataModal.value.tempatpkl = response.tempatpkl;
    dataModal.value.file = response.file;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

const dataModal = ref({
  anggota: [],
  tempatpkl: [],
  file: "",
});
const siswa_id = ref(null);
const onCickModal = (idModal) => {
  siswa_id.value = idModal;
  getDataModal();
};

const doStorePersetujuan = async (status) => {
  try {
    const response = await Api.post(
      `admin/pendaftaranprakerin/proses/persetujuanbaru/${dataModal.value.tempatpkl.id}`,
      {
        status: status,
        keterangan: dataDetail.value.keterangan,
      }
    );
    console.log(response.data);
    Toast.success("Info", "Proses berhasil");
    router.push({ name: "AdminPendaftaranDisetujui" });
    return response;
  } catch (error) {
    Toast.danger("Warning", "Proses Gagal");
    console.error(error);
  }
};

const doSubmitPersetujuan = (status) => {
  if (confirm("Apakah anda yakin melanjutkan proses ini?")) {
    doStorePersetujuan(status);
  }
};
</script>
<template>
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
        <span class="tracking-wide">Data Siswa dalam Proses Persetujuan</span>
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
                <div
                  class="text-sm font-medium text-center flex justify-center gap-1"
                >
                  <label
                    for="my-modal-detail"
                    data-tip="Proses Persetujuan"
                    class="btn modal-button btn-sm"
                    @click="onCickModal(props.row.siswa_id)"
                  >
                    Detail
                  </label>
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

  <input type="checkbox" id="my-modal-detail" class="modal-toggle" />
  <label for="my-modal-detail" class="modal cursor-pointer">
    <label class="modal-box relative w-full lg:w-8/12 max-w-5xl" for="">
      <h3 class="text-lg font-bold">Form Persetujuan PKL!</h3>
      <div class="flex flex-wrap py-4 w-full">
        <div class="w-full lg:w-5/12 py-6 md:px-6">
          <div class="card w-full bg-base-100 shadow-xl mx-auto">
            <figure>
              <img src="@/assets/img/photo/company-1.jpg" alt="Tempat PKL" />
              <!-- <img
              src="https://api.lorem.space/image/shoes?w=400&h=225"
              alt="Shoes"
            /> -->
            </figure>
            <div class="card-body">
              <h2 class="card-title">
                {{ dataModal.tempatpkl.nama }}
                <!-- <div class="badge badge-secondary">NEW</div> -->
              </h2>
              <p>{{ dataModal.tempatpkl.alamat }}</p>
              <!-- <div class="card-actions justify-end">
              <div class="badge badge-outline">Tersedia</div>
              <div class="badge badge-outline">Tidak Tersedia</div>
              <div class="badge badge-outline">cccc</div>
            </div> -->
            </div>
          </div>
        </div>
        <div class="w-full md:w-6/12">
          <div class="card-actions lg:px-6 py-2">
            <h2 class="font-bold">Anggota ({{ dataModal.anggota.length }})</h2>
            <a target="_blank" :href="dataModal.file">
              <button
                data-tip="Download file Balasan"
                class="tooltip btn btn-sm"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg></button
            ></a>

            <div class="overflow-x-auto w-full">
              <table class="table w-full">
                <!-- head -->
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Kelas</th>
                    <th>Jurusan</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr v-for="(item, index) in dataModal.anggota">
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div class="font-bold">{{ item.nama }}</div>
                          <div class="text-sm opacity-50">
                            {{ item.nomeridentitas }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {{ item.kelas }}
                    </td>
                    <td>
                      {{ item.jurusan }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="py-4 px-4">
              <p class="font-bold text-sm py-2">
                Isi keterangan jika proses ditolak!
              </p>
              <textarea
                v-model="dataDetail.keterangan"
                class="textarea textarea-error w-96 h-32"
                placeholder="Keterangan jika ditolak "
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center">
        <div class="card w-96 bg-base-100 shadow-sm">
          <div class="card-body">
            <div class="card-actions justify-end">
              <button
                class="btn btn-primary"
                @click="doSubmitPersetujuan('Disetujui')"
              >
                Setujui
              </button>
              <button
                class="btn btn-danger"
                @click="doSubmitPersetujuan('Ditolak')"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      </div>
    </label>
  </label>
</template>
