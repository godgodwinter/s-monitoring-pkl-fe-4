<script setup>
import Api from "@/axios/axios.js";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
import { ref } from "vue";
import Toast from "@/components/lib/Toast.js";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
const id = route.params.id;
let dataId = null;
let dataSiswa = ref([]);
let dataAsli = ref([]);
let status = ref([]);
const dataDetail = ref({
  siswa: { label: "-", id: id },
  tempatpkl: { label: "-", id: id, tgl_pengajuan: "" },
  pembimbinglapangan: { label: "-", id: id },
  pembimbingsekolah: { label: "-", id: id },
});
const getDataId = async () => {
  try {
    const response = await Api.get(`admin/siswa/${id}`);
    // console.log(response.data);
    dataAsli.value = response.data;
    dataSiswa.value = response.data;
    dataDetail.value.siswa.label = ` ${dataAsli.value.nama} `;
    dataSiswa.value.kelas = ` ${dataAsli.value.kelasdetail.kelas.tingkatan} ${dataAsli.value.kelasdetail.kelas.jurusan} ${dataAsli.value.kelasdetail.kelas.suffix} `;
    return response;
  } catch (error) {
    Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};

const periksaId = async () => {
  try {
    const response = await Api.get(`admin/pendaftaranpkl/list/periksaid/${id}`);
    status.value = response.data;
    if (response.data == "Belum Daftar") {
      Toast.danger("Warning", "Belum Daftar Prakerin, Daftar lebih dahulu");
    } else if (response.data == "Proses Daftar") {
      Toast.danger("Warning", "Data Prakerin ditemukan, Data belum lengkap!");
    } else if (response.data == "Menunggu") {
      Toast.success(
        "Success",
        "Data ditemukan, Proses pendaftaran siswa sedang menunggu Acc!"
      );
    } else if (response.data == "Disetujui") {
      Toast.success(
        "Success",
        "Data ditemukan, Proses pendaftaran siswa ini telah selesai!"
      );
    }
    dataDetail.value.tempatpkl.label = ` ${response.tempatpkl.nama} `;
    dataDetail.value.tempatpkl.tgl_pengajuan = ` ${response.tgl_pengajuan} `;
    dataDetail.value.pembimbinglapangan.label = ` ${response.pembimbinglapangan.nama} `;
    dataDetail.value.pembimbingsekolah.label = ` ${response.pembimbingsekolah.nama} `;

    return response;
  } catch (error) {
    // Toast.danger("Warning", "Token anda kadaluarsa! Silahkan login kembali");
    console.error(error);
  }
};
if (id == "") {
  Toast.danger("Warning", "Data siswa tidak ditemukan");
} else {
  getDataId();
  periksaId();
}
</script>
<template>
  <BreadCrumb>
    <template v-slot:content>
      <router-link :to="{ name: 'AdminSiswa' }"
        ><button class="underline rounded rounded-md hover:bg-gray-200">
          Siswa
        </button></router-link
      >
      <BreadCrumbSpace /> Profile</template
    >
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >Profile Siswa</span
    >
  </div>

  <div class="container mx-auto my-5 p-5">
    <div class="md:flex no-wrap md:-mx-2">
      <!-- Left Side -->
      <div class="w-full md:w-3/12 md:mx-2">
        <!-- Profile Card -->
        <div class="bg-white p-3 border-t-4 border-green-400">
          <div class="image overflow-hidden">
            <img
              class="h-auto w-full mx-auto"
              src="@/assets/img/flat/reading.png"
              alt=""
            />
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
            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
          >
            <li class="flex items-center py-3">
              <span>Status Akun</span>
              <span class="ml-auto"
                ><span class="bg-green-500 py-1 px-2 rounded text-white text-sm"
                  >Active</span
                ></span
              >
            </li>
            <li class="flex items-center py-3">
              <span>Status PKL</span>
              <span class="ml-auto"
                ><span class="bg-orange-500 py-1 px-2 rounded text-white text-sm">{{
                  status
                }}</span></span
              >
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
          <div
            class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
          >
            <!-- <span class="text-green-500">
              <svg
                class="h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            <span>Data Siswa</span> -->
          </div>
          <!-- <div class="grid grid-cols-2 xl:grid-cols-3">
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                2
              </div>
              <p class="text-main-color text-sm text-slate-700">Tidak Hadir</p>
            </div>
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                10
              </div>
              <p class="text-main-color text-sm text-slate-700">Tidak Mengisi Jurnal</p>
            </div>
            <div class="text-center my-2">
              <div
                class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
              >
                1
              </div>
              <p class="text-main-color text-sm text-slate-700">Pelanggaran</p>
            </div>
          </div> -->
        </div>
        <!-- End of Data Statistik card -->
      </div>
      <!-- Right Side -->
      <div class="w-full md:w-9/12 mx-2 h-64">
        <!-- Profile tab -->
        <!-- About Section -->
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                class="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span class="tracking-wide">Identitas</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Nama Lengkap</div>
                <div class="px-4 py-2">{{ dataSiswa.nama }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">NIS</div>
                <div class="px-4 py-2">{{ dataSiswa.nomeridentitas }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Jenis Kelamin</div>
                <div class="px-4 py-2">{{ dataSiswa.jk }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">No. Telp</div>
                <div class="px-4 py-2">{{ dataSiswa.telp }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Alamat Lengkap</div>
                <div class="px-4 py-2">{{ dataSiswa.alamat }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Agama</div>
                <div class="px-4 py-2">{{ dataSiswa.agama }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Kelas</div>
                <div class="px-4 py-2">{{ dataSiswa.kelas }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Tempat, Tanggal Lahir</div>
                <div class="px-4 py-2">
                  {{ dataSiswa.tempatlahir }}, {{ dataSiswa.tgllahir }}
                </div>
              </div>
            </div>
          </div>
          <!-- <button
            class="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
          >
            Update Data
          </button> -->

          <!-- <button
            class="block w-full text-red-900 text-sm font-semibold rounded-lg bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:shadow-outline focus:bg-yellow-100 hover:shadow-xs p-3 my-4"
          >
            Reset Password
          </button> -->
        </div>
        <!-- End of about section -->

        <!-- About Section -->
        <div class="bg-white p-3 shadow-sm rounded-sm" v-if="status == 'Disetujui'">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                class="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span class="tracking-wide">Prakerin</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Tempat PKL</div>
                <div class="px-4 py-2">{{ dataDetail.tempatpkl.label }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Tanggal Daftar</div>
                <div class="px-4 py-2">{{ dataDetail.tempatpkl.tgl_pengajuan }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Status Prakerin</div>
                <div class="px-4 py-2">
                  {{ status }}
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">No. Telp</div>
                <div class="px-4 py-2">+11 998001001</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Pembimbing Lapangan</div>
                <div class="px-4 py-2">
                  {{ dataDetail.pembimbinglapangan.label }} - +628512345678
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Pembimbing Sekolah</div>
                <div class="px-4 py-2">
                  {{ dataDetail.pembimbingsekolah.label }} - +628512345678
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white p-3 shadow-sm rounded-sm" v-else>
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg
                class="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span class="tracking-wide">Prakerin</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Tempat PKL</div>
                <div class="px-4 py-2">{{ dataDetail.tempatpkl.label }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Tanggal Daftar</div>
                <div class="px-4 py-2">{{ dataDetail.tempatpkl.tgl_pengajuan }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Status Prakerin</div>
                <div class="px-4 py-2">
                  {{ status }}
                </div>
              </div>
            </div>
          </div>
          <router-link :to="{ name: 'AdminPendaftaranProsesSatu', params: { id: id } }">
            <button
              class="block w-full text-blue-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
            >
              Daftar / Update Data Prakerin
            </button>
          </router-link>
        </div>
        <!-- End of about section -->
        <div class="my-4"></div>

        <!-- Experience and education -->
        <!-- <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="grid grid-cols-2">
            <div>
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
              >
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">Kehadiran</span>
              </div>
              <ul class="list-inside space-y-2">
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Hadir</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                    <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                  </div>
                  <div class="text-gray-500 text-xs">05 Januari 2022</div>
                </li>
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Hadir</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                    <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                    <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
                  </div>
                  <div class="text-gray-500 text-xs">04 Januari 2022</div>
                </li>
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Hadir</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                    <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                  </div>
                  <div class="text-gray-500 text-xs">03 Januari 2022</div>
                </li>
              </ul>
            </div>
            <div>
              <div
                class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
              >
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">Jurnal</span>
              </div>
              <ul class="list-inside space-y-2">
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Lihat Detail</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                    <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                  </div>
                  <div class="text-gray-500 text-xs">05 Januari 2022</div>
                </li>
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Lihat Detail</div>
                    <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
                    <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                    <img src="@/assets/img/flat/cancel.png" alt="" class="h-8 w-8" />
                  </div>
                  <div class="text-gray-500 text-xs">04 Januari 2022</div>
                </li>
                <li>
                  <div class="w-full flex gap-1">
                    <div class="text-teal-600 pt-1">Lihat Detail</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                    <div class="text-teal-600 pt-1">Konfirmasi Pembimbing</div>
                    <img
                      src="@/assets/img/flat/check-mark_2.png"
                      alt=""
                      class="h-8 w-8"
                    />
                  </div>
                  <div class="text-gray-500 text-xs">03 Januari 2022</div>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <!-- End of Experience and education grid -->
        <!-- End of profile tab -->
      </div>
    </div>
  </div>

  <!-- <div class="pt-6 px-4 lg:flex">
    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <h1>Profile</h1>
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat minus
          quibusdam dolore, vitae expedita ipsam quisquam hic in possimus eveniet eos
          explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at aliquid.
        </p>
      </div>
    </div>
    <div class="w-full lg:w-8/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <h1>Prakerin</h1>
        <h1>Jurnal dan Absensi</h1>
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat minus
          quibusdam dolore, vitae expedita ipsam quisquam hic in possimus eveniet eos
          explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at aliquid.
        </p>
      </div>
    </div>
  </div> -->
</template>
