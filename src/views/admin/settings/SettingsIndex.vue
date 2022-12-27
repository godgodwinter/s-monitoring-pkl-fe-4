<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import Toast from "@/components/lib/Toast";
import { useRouter } from "vue-router";
import moment from "moment/min/moment-with-locales";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);
const router = useRouter();
const dataDetail = ref({
    content: "-"
});
const dataForm = ref({
    min_pembayaran: 0
});
const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        bataswaktu: inputBatasWaktu.value.hours + ":" + inputBatasWaktu.value.minutes + ":00",
        min_pembayaran: dataForm.value.min_pembayaran,
        // content: dataDetail.value.content,
        // desc: dataDetail.value.desc,
    };
    // console.log(dataStore);
    try {
        const response = await Api.put(`admin/settings/bataswaktu`, dataStore);
        // console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil diupdate!");
        // router.push({ name:"admin-settings" });
        getDataBatasWaktu();

        return true;
    } catch (error) {
        console.error(error);
    }
};

const inputBatasWaktu = ref({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes()
});
const hour = ref("14")
const minute = ref("00")
const second = ref("00")

const getDataBatasWaktu = async () => {
    try {
        const response = await Api.get("guest/settings/bataswaktu");
        hour.value = response.data.jam;
        minute.value = response.data.menit;
        second.value = response.data.detik;
        dataForm.value.min_pembayaran = response.data.min_pembayaran;
        waktuObj.value = { 'hour': hour.value, 'minute': minute.value, 'second': second.value };
        inputBatasWaktu.value = {
            hours: hour.value,
            minutes: minute.value
        }

        return response;
    } catch (error) {
        Toast.danger("Warning", "Data gagal dimuat");
        console.error(error);
    }
};

getDataBatasWaktu();

const waktuObj = ref({ 'hour': hour.value, 'minute': minute.value, 'second': second.value });
</script>
<template>

    <div class="p-2">
        <BreadCrumb />
    </div>

    <div class="px-4">

    </div>
    <div class="p-4">
        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label class="text-sm font-medium text-gray-900 block mb-2">
                            Batas Waktu Absen dan Isi Jurnal : {{ waktuObj.hour }}:{{ waktuObj.minute }}:{{
        waktuObj.second
}}
                        </label>
                        <!-- <Field v-model="dataDetail.title" :rules="fnValidasi.validateData" type="text" name="title"
                            ref="title" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.title }}
                        </div> -->

                        <Datepicker v-model="inputBatasWaktu" time-picker mode-height="120"></Datepicker>
                    </div>
                    <div class="flex flex-col">
                        <label class="text-sm font-medium text-gray-900 block mb-2">
                            Minimum Pembayaran : {{ dataForm.min_pembayaran }} %
                        </label>
                        <Field :rules="fnValidasi.validateDataNumber" v-model="dataForm.min_pembayaran"
                            name="min_pembayaran" type="text" max="100" min="0" class="input input-bordered w-11/12" />

                    </div>

                </div>


            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary">Simpan</button>
            </div>
        </Form>
    </div>
    <div class="divider"></div>
</template>