<script setup>
import MenuInformasiPendaftaranPkl from "@/components/moleculars/MenuInformasiPendaftaranPkl.vue";
import ButtonDataOne from "@/components/atoms/ButtonDataOne.vue";
import Popper from "@/components/atoms/Popper.vue";
</script>
<template>
  <div>
    <!-- Profile Card -->
    <div class="bg-white p-3 border-t-4 border-green-400">
      <div class="image overflow-hidden">
        <img
          class="h-20 w-20 mx-auto"
          src="@/assets/img/flat/portfolio_2.png"
          alt=""
        />
      </div>
      <p
        class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-center pt-2"
      >
        Menu - menu pedaftaran Prakerin / PKL
      </p>
      <ul
        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm"
      >
        <li class="flex items-center py-3">
          <span>Status Pendaftaran</span>
          <span class="ml-auto">
            <div class="flex justify-center">
              <Popper content="Aktif">
                <template #content>
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckChecked"
                      checked
                    /></div
                ></template>
              </Popper>
            </div>
          </span>
        </li>
      </ul>
    </div>
    <!-- End of profile card -->
    <div class="my-4"></div>
    <!-- Friends card -->
    <div class="bg-white p-3 hover:shadow h-screen">
      <div
        class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8"
      >
        <span class="text-green-500">
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
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </span>
        <span>Menu Utama</span>
      </div>
      <div class="grid grid-cols-2 xl:grid-cols-3">
        <!-- <router-link :to="{ name: 'AdminPendaftaranProsesSatu' }">
          <ButtonDataOne title="Daftar Baru" titleShort="DB"></ButtonDataOne
        ></router-link> -->
        <router-link :to="{ name: 'ProsesTempatPKL' }">
          <ButtonDataOne title="Tempat PKL" titleShort="DB"></ButtonDataOne
        ></router-link>
      </div>
      <MenuInformasiPendaftaranPkl></MenuInformasiPendaftaranPkl>
    </div>
    <!-- End of Data Statistik card -->
  </div>
</template>
