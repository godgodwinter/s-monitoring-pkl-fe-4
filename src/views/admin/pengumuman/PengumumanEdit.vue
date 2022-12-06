<script setup>
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { Form, Field } from "vee-validate";
import fnValidasi from "@/components/lib/babengValidasi";
import Toast from "@/components/lib/Toast";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const id = route.params.id;
const dataDetail = ref({
    content: null
});
const dataForm = ref({});
const getDataDetail = async () => {
    try {
        const response = await Api.get(`admin/pengumuman/${id}`);
        dataDetail.value = response.data;
        // dataDetail.value.content = response.data.content;
        // console.log(dataDetail.value.content);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
getDataDetail();
const onSubmit = async (values) => {
    // console.log(values);
    let dataStore = {
        title: dataDetail.value.title,
        content: dataDetail.value.content,
        // desc: dataDetail.value.desc,
    };
    // console.log(dataForm);
    try {
        const response = await Api.put(`admin/pengumuman/${id}`, dataStore);
        console.log(response);
        // data.id = response.id;
        Toast.success("Info", "Data berhasil ditambahkan!");
        router.push({ name: "admin-pengumuman-index" });

        return true;
    } catch (error) {
        console.error(error);
    }
};
const toolbar = ["bold", "italic", "underline"];
// const toolbarOptions = [['link', 'image'],
const toolbarOptions = [['image'],
["bold", "italic", "underline", "strike"], // toggled buttons
["blockquote", "code-block"],

[{ header: 1 }, { header: 2 }], // custom button values
[{ list: "ordered" }, { list: "bullet" }],
[{ script: "sub" }, { script: "super" }], // superscript/subscript
[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
[{ direction: "rtl" }], // text direction

[{ size: ["small", false, "large", "huge"] }], // custom dropdown
[{ header: [1, 2, 3, 4, 5, 6, false] }],

[{ color: [] }, { background: [] }], // dropdown with defaults from theme
[{ font: [] }],
[{ align: [] }],

["clean"], // remove formatting button
];

const editorPertanyaan = ref("<b>tes123</b>");
const pagesActive = ref("tulis");
</script>
<template>
    <div class="p-2">
        <BreadCrumb />
    </div>
    <div class="p-4">
        <Form v-slot="{ errors }" @submit="onSubmit">
            <div class="py-2 lg:py-4 px-4">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Judul</label>
                        <Field v-model="dataDetail.title" :rules="fnValidasi.validateData" type="text" name="title"
                            ref="title" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.title }}
                        </div>
                    </div>

                </div>
                <!-- <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2">Content
                        </label>
                        <Field v-model="dataDetail.content" :rules="fnValidasi.validateData" type="text" name="content"
                            ref="content" class="input input-bordered md:w-full max-w-2xl" required />
                        <div class="text-xs text-red-600 mt-1">
                            {{ errors.content }}
                        </div>
                    </div>

                </div> -->

                <div class="py-10 w-full bg-base-100 shadow-sm">
                    <div class="tabs">
                        <a class="tab tab-bordered" @click="pagesActive = 'tulis'"
                            :class="{ 'tab-active': pagesActive == 'tulis' }">Tulis</a>
                        <a class="tab tab-bordered" @click="pagesActive = 'preview'"
                            :class="{ 'tab-active': pagesActive == 'preview' }">Preview</a>
                    </div>
                </div>
                <div v-if="pagesActive == 'tulis'">
                    <label>Pertanyaan :</label>
                    <QuillEditor theme="snow" :toolbar="toolbarOptions" v-model:content="dataDetail.content"
                        contentType="html" class="ql-editor2" v-if="dataDetail.content">
                    </QuillEditor>
                </div>
                <div class="shadow-sm py-4 px-4 space-y-4" v-else>
                    <label for="" class="underline">Preview : </label>
                    <div class="w-full border-2 min-h-16 p-10" v-html="dataDetail.content"></div>
                </div>
            </div>

            <div class="w-full flex justify-end py-10 px-10 gap-4">
                <!-- <span class="btn btn-secondary">Batal</span> -->
                <button class="btn btn-primary">Simpan</button>
            </div>
        </Form>
    </div>
</template>