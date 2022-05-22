<script setup>
import { ref } from "vue";
import { reactive, computed } from "vue";
import Toast from "../lib/Toast";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  index: { type: String, required: false, default: 0 },
  id: { type: String, required: false, default: 0 },
  title: { type: String, required: false, default: "Nama Perusahaan" },
  alamat: { type: String, required: false, default: "Alamat Perusahaan" },
  jmlTersedia: { type: String, required: false, default: "0/0" },
  tersedia: { type: String, required: false, default: 0 },
  type: { type: String, required: false, default: "pilihan" }, // preview, pilihan
});
const doKetTidakTersedia = () => {
  dataTempatPkl.id = "";
  dataTempatPkl.label = "";
  store.commit("seTempatPklSelected", dataTempatPkl);
  Toast.danger("Warning", "Perusahaan tidak tersedia!");
};
// console.log(dataTempatPklSelected.value.length);

const stateTempatPKlSelected = computed(function () {
  return store.state.tempatPklSelected;
});
const dataTempatPklSelectedLS = ref(stateTempatPKlSelected.value);

let dataTempatPkl = { id: "", label: "" };
const doPilih = (id, label, tersedia, jmlTersedia) => {
  if (stateTempatPKlSelected.value.length < 2) {
    // filter where id
    let countFiltered = dataTempatPklSelectedLS.value.filter(function (element) {
      return element.id == props.id;
    }).length;
    console.log(countFiltered);
    if (countFiltered < 1) {
      dataTempatPkl.id = id;
      dataTempatPkl.title = props.title;
      dataTempatPkl.alamat = props.alamat;
      dataTempatPkl.tersedia = tersedia;
      dataTempatPkl.jmlTersedia = jmlTersedia;
      dataTempatPklSelectedLS.value.push(dataTempatPkl);
      localStorage.setItem(
        "dataTempatPklSelected",
        JSON.stringify(dataTempatPklSelectedLS.value)
      );
      store.commit("setTempatPklSelected", dataTempatPklSelectedLS.value);
      Toast.success("Info", " Perusahaan berhasil dipilih!");
    } else {
      Toast.danger("Info", "Gagal, Data Sudah pernah di pilih!");
    }
  } else {
    Toast.danger(
      "Info",
      "Sudah memilih 2 tempat, Hapus Terlebih dahulu untuk dapat memilih lagi!"
    );
  }
};

const doHapus = (index) => {
  dataTempatPklSelectedLS.value.splice(index, 1);
  console.log(dataTempatPklSelectedLS.value, index);
  localStorage.setItem(
    "dataTempatPklSelected",
    JSON.stringify(dataTempatPklSelectedLS.value)
  );
  store.commit("setTempatPklSelected", dataTempatPklSelectedLS.value);
  Toast.warning("Info", " Perusahaan berhasil dibatalkan!");
};
</script>
<template>
  <div>
    <div class="py-6 flex justify-center px-2">
      <div
        class="flex w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl"
      >
        <div
          class="w-1/3 bg-cover"
          style="background-image: url('http://127.0.0.1:3000/img/photo/company-2.jpg')"
        ></div>
        <div class="w-2/3 p-4">
          <h1 class="text-gray-900 font-bold text-2xl">
            {{ props.title }}
          </h1>
          <p class="mt-2 text-gray-600 text-sm">
            {{ props.alamat }}
          </p>
          <div class="flex item-center mt-2">
            <div v-if="tersedia > 0" class="flex gap-1">
              <svg class="w-5 h-5 fill-current text-sky-700" viewBox="0 0 24 24">
                <path
                  d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                />
              </svg>
              <p class="text-sky-600">Tersedia</p>
            </div>

            <div v-else class="flex gap-1">
              <svg class="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
                <path
                  d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                />
              </svg>
              <p>Tidak Tersedia</p>
            </div>
          </div>
          <div class="flex item-center justify-between mt-3">
            <h1 class="text-gray-700 font-bold text-xl">{{ props.jmlTersedia }}</h1>
            <div v-if="type == 'preview'">
              <button
                @click="doHapus(props.index)"
                class="px-3 py-2 bg-red-400 text-gray-100 text-xs font-bold uppercase rounded"
              >
                Hapus
              </button>
            </div>

            <div v-if="type == 'previewNoBtn'">
              <!-- <button
                @click="doHapus(props.index)"
                class="px-3 py-2 bg-red-400 text-gray-100 text-xs font-bold uppercase rounded"
              >
                Hapus
              </button> -->
            </div>

            <div v-else>
              <button
                @click="doPilih(props.id, props.title, props.tersedia, props.jmlTersedia)"
                class="px-3 py-2 bg-sky-600 text-white text-xs font-bold uppercase rounded"
                v-if="tersedia > 0"
              >
                Pilih
              </button>
              <button
                @click="doKetTidakTersedia()"
                class="px-3 py-2 bg-gray-400 text-gray-100 text-xs font-bold uppercase rounded"
                v-else
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
