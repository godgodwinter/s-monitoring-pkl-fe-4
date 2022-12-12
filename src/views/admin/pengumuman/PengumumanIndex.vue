<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import ButtonEdit from "@/components/Button/ButtonEdit.vue";
import ButtonDelete from "@/components/Button/ButtonDel.vue";
import Toast from "@/components/lib/Toast";
import { useRouter } from "vue-router";
const router = useRouter();

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
        label: "Judul",
        field: "title",
        type: "String",
    },
];

const dataAsli = ref([]);
const data = ref([]);
const getData = async () => {
    try {
        const response = await Api.get(`admin/pengumuman`);
        dataAsli.value = response.data;
        data.value = response.data;

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getData();
const doEditData = async (id, index) => {
    // Toast.warning("Info", "Menu belum tersedia")
    // console.log(id, index);
    router.push({
        name: "admin-pengumuman-edit",
        params: { id: id },
    });
};

const doDeleteData = async (id, index) => {
    if (confirm("Apakah anda yakin menghapus data ini?")) {
        // Toast.warning("Info", "Menu belum tersedia")
        try {
            const response = await Api.delete(`admin/pengumuman/${id}`);
            // data.value.splice(index, 1);
            Toast.success("Success", "Data Berhasil dihapus!");
            getData();
            // Toast.warning("Info", "Menu belum tersedia")
            // return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};
</script>
<template>
    <div class="px-2 py-2">
        <BreadCrumb />
    </div>
    <div class="px-4 py-4">

        <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
            enabled: true,
        }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-actions>
                <div class="space-x-1 space-y-1 gap-1">
                    <router-link :to="{ name: 'admin-pengumuman-tambah', }">
                        <button class="btn btn-sm btn-primary tooltip" data-tip="Tambah ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </router-link>
                </div>
            </template>
            <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                    <div class="text-sm font-medium text-center flex justify-center space-x-1">
                        <!-- <ButtonEdit @click="doEditData(props.row.id, props.index)" /> -->
                        <label class=" flex space-x-2">

                            <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                            <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />
                        </label>
                    </div>
                </span>


                <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                </span>
            </template>
        </vue-good-table>
    </div>
</template>