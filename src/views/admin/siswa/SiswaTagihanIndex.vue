<script setup>
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import Toast from "@/components/lib/Toast.js";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import ButtonDelete from "@/components/atoms/ButtonDel.vue";
import Fungsi from "@/components/lib/FungsiCampur";
import Button from "@/components/atoms/ButtonFour.vue";
const store = useStore();
moment.updateLocale("id", localization);
const router = useRouter();
const route = useRoute();
const id = route.params.id;
const dataId = null;
const dataSiswa = ref([]);
const dataAsli = ref([]);
const tempatpkl = ref([]);
const anggota = ref([]);
const pembimbinglapangan = ref([]);
const pembimbingsekolah = ref([]);
const status = ref([]);
const dataDetail = ref({
  siswa: { label: "-", id: id },
  tempatpkl: { label: "-", id: id, tgl_pengajuan: "" },
  pembimbinglapangan: { label: "-", id: id },
  pembimbingsekolah: { label: "-", id: id },
});

const dataPembayaran = ref(null);

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
    label: "Nominal",
    field: "nominal_bayar",
    type: "String",
  },
  {
    label: "Tanggal Pembayaran",
    field: "tgl",
    type: "String",
  },
];


const dataFormPembayaran = ref({
  kelas_id: null,
  nominal_bayar: 0
})

const getDataId = async () => {
  try {
    const response = await Api.get(`admin/datasiswa/profile/${id}`);
    // console.log(response.data);
    dataSiswa.value = response.data.siswa;
    tempatpkl.value = response.data.tempatpkl;
    anggota.value = response.data.anggota;
    status.value = response.data.status;
    dataAsli.value = response.data;
    dataPembayaran.value = response.data.siswa.tagihan ? response.data.siswa.tagihan.pembayaran : null;
    // console.log(dataSiswa.value, tempatpkl.value, anggota.value, status.value);
    // dataDetail.value.siswa.label = ` ${dataAsli.value.nama} `;
    // dataSiswa.value.kelas = ` ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix} `;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
getDataId();

const doDeleteData = async (pembayaran_id) => {
  if (confirm("Do you really want to delete?")) {
    try {
      // console.log(pembayaran_id);
      const response = await Api.delete(`admin/tagihan/null/bayar/${pembayaran_id}`);

      Toast.success("Success", "Data Berhasil dihapus!");
      getDataId();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const onSubmitFormTagihan = async () => {
  if (dataFormPembayaran.value.nominal_bayar > 0) {
    const response = await Api.post(`admin/tagihan/null/bayar/siswa/${id}`, {
      nominal_bayar: dataFormPembayaran.value.nominal_bayar,
    });

    Toast.success("Success", "Data Berhasil ditambahkan!");
    getDataId();
  } else {
    Toast.danger("Error", "Nominal bayar tidak boleh kosong!")
  }
}
</script>
<template>
  <BreadCrumb>
    <template v-slot:content>
      <router-link :to="{ name: 'AdminSiswa' }"><button class="underline rounded rounded-md hover:bg-gray-200">
          Siswa
        </button></router-link>
      <BreadCrumbSpace /> Profile
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Tagihan Siswa</span>
  </div>

  <div class="container mx-auto my-5 p-5">
    <div class="md:flex no-wrap md:-mx-2">
      <!-- Left Side -->
      <div class="w-full md:w-3/12 md:mx-2">
        <!-- Profile Card -->
        <div class="bg-white p-3 border-t-4 border-green-400">
          <div class="image overflow-hidden">
            <img class="h-auto w-full mx-auto" src="@/assets/img/flat/reading.png" alt="" />
          </div>
          <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
            {{ dataSiswa.nama }}
          </h1>
          <h3 class="text-gray-600 font-lg text-semibold leading-6">
            NIS : {{ dataSiswa.nomeridentitas }}
          </h3>
          <!-- <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
            eligendi dolorum sequi illum qui unde aspernatur non deserunt
          </p> -->
          <ul
            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li class="flex items-center py-3">
              <span>Status Akun</span>
              <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
            </li>
            <li class="flex items-center py-3">
              <span>Status PKL</span>
              <span class="ml-auto"><span class="bg-orange-500 py-1 px-2 rounded text-white text-sm">{{ status
}}</span></span>
            </li>
            <li class="flex items-center py-3">
              <span>Total Tagihan</span>
              <span class="ml-auto">
                <span class=" py-1 px-2 rounded  text-sm">{{
    dataSiswa.total_tagihan ? Fungsi.rupiah(dataSiswa.total_tagihan) : "Rp 0,00"
}} </span></span>

            </li>
            <li class="flex items-center py-3">
              <span>Terbayar</span>
              <span class="ml-auto">
                <span class=" py-1 px-2 rounded  text-sm">{{
    dataSiswa.pembayaran_total ? Fungsi.rupiah(dataSiswa.pembayaran_total) : "Rp 0,00"
}} </span></span>

            </li>
            <li class="flex items-center py-3">
              <span>Minimum Pembayaran</span>
              <span class="ml-auto">
                <span class=" py-1 px-2 rounded  text-sm">{{
    dataSiswa.min_pembayaran
}} %</span></span>

            </li>
            <li class="flex items-center py-3">
              <span>Persentase Pembayaran</span>
              <span class="ml-auto">
                <span class="bg-success py-1 px-2 rounded text-white text-sm"
                  v-if="dataSiswa.pembayaran_persen >= dataSiswa.min_pembayaran">{{
    dataSiswa.pembayaran_persen
}} %</span>
                <span class="bg-warning py-1 px-2 rounded text-white text-sm" v-else>{{
    dataSiswa.pembayaran_persen
}} %</span></span>
            </li>
            <li class="flex items-center py-3">
              <span>Status Pembayaran</span>
              <span class="ml-auto">
                <span class="badge badge-info py-1 px-2 rounded text-white text-sm">{{
    dataSiswa.pembayaran_persen >= dataSiswa.min_pembayaran ? "Disetujui" : "Belum"
}} </span></span>

            </li>
            <!-- <li class="flex items-center py-3">
              <span>Member since</span>
              <span class="ml-auto">Nov 07, 2016</span>
            </li> -->
          </ul>
        </div>
        <!-- End of profile card -->
        <div class="my-4"></div>
        <!-- Friends card -->
        <div class="bg-white p-3 hover:shadow">
          <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
          </div>
        </div>
      </div>

      <div class="w-full md:w-9/12 mx-2 h-64">

        <div class="divider"></div>
        <div class="bg-white p-3 rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span class="tracking-wide">Form Pembayaran Tagihan</span>
          </div>
        </div>

        <div class="divider"></div>
        <div class="wfull lg:w-4/12 mx-4" v-if="dataSiswa">
          <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"
            v-if="dataSiswa.pembayaran_total < dataSiswa.total_tagihan">
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
                      <label for="name" class="text-sm font-medium text-gray-900 block mb-2">NOMINAL BAYAR</label>
                      <input v-model="dataFormPembayaran.nominal_bayar" type="text" name="nominal_bayar"
                        ref="nominal_bayar"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        required />
                    </div>
                  </div>
                  <div class="w-full flex justify-end mt-4 space-x-2">
                    <Button title="Simpan" @click="onSubmitFormTagihan()" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>

        <div class="w-full lg:w-full">
          <div v-if="dataPembayaran">
            <vue-good-table :columns="columns" :rows="dataPembayaran" :line-numbers="true" :search-options="{
  enabled: true,
}" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
              <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                  <div class="text-sm font-medium text-center flex justify-center">
                    <ButtonDelete @click="doDeleteData(props.row.id)" />
                  </div>
                </span>

                <span v-else-if="props.column.field == 'nominal_bayar'">
                  {{ Fungsi.rupiah(props.row.nominal_bayar) }}
                </span>
                <span v-else-if="props.column.field == 'tgl'">
                  {{ moment(props.row.tgl).format("DD MMMM YYYY") }}
                </span>


                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
