<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import SubSidebarPendaftaranPkl from "@/components/organismes/pendaftaran/SubSidebarPendaftaranPkl.vue";
</script>
<template>
  <BreadCrumb>
    <template v-slot:content>
      <router-link :to="{ name: 'AdminSiswa' }"><button class="underline rounded rounded-md hover:bg-gray-200">
          Pendaftaran
        </button></router-link>
      <BreadCrumbSpace /> Index
    </template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm">Pendaftaran Prakerin</span>
  </div>

  <div class="container mx-auto lg:mx-0 my-5 p-5">
    <div class="lg:flex no-wrap lg:-mx-2">
      <!-- Left Side -->
      <div class="w-full lg:w-3/12 lg:mx-2">
        <SubSidebarPendaftaranPkl></SubSidebarPendaftaranPkl>
      </div>
      <!-- Right Side -->
      <div class="w-full lg:w-9/12 mx-2 h-64 pt-10 lg:pt-0">
        <router-view />
      </div>
    </div>
  </div>
</template>
