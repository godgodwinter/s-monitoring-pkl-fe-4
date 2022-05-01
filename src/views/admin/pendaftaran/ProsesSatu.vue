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
import CardStepPendaftaran from "../../../components/organismes/pendaftaran/CardStepPendaftaran.vue";
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
        <CardStepPendaftaran></CardStepPendaftaran>
        <!-- <CardDetailPendaftaran></CardDetailPendaftaran> -->
        <!-- <div class="my-4"></div> -->
        <FormPendaftaranBaru></FormPendaftaranBaru>
        <!-- <div class="my-4"></div> -->
        <!-- <CardInformasiPersiswa></CardInformasiPersiswa> -->
        <!-- <div class="my-4"></div> -->
      </div>
    </div>
  </div>
</template>
