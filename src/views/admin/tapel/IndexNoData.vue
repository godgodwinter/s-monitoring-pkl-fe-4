<script setup>
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
</script>
<template>
  <BreadCrumb>
    <template v-slot:content> Tapel <BreadCrumbSpace /> Index</template>
  </BreadCrumb>
  <div class="pt-4 px-10">
    <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-700 shadow-sm"
      >Tahun Pelajaran</span
    >
  </div>

  <div class="pt-6 px-4 lg:flex">
    <div class="w-full lg:w-4/12 mx-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <p class="text-base font-normal text-gray-500 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat minus
          quibusdam dolore, vitae expedita ipsam quisquam hic in possimus eveniet eos
          explicabo dolorum aspernat ur qui magnam. Deleniti ipsa at aliquid.
        </p>
      </div>
    </div>
  </div>
</template>
