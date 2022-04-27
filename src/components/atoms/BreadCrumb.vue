<script setup>
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
</script>
<template>
  <div class="w-full px-4 pt-4">
    <!-- <span>Logo</span> > <span>Menu Utama</span> > <span>Submenu</span> -->
    <nav class="font-medium" aria-label="breadcrumb">
      <ol class="flex gap-2">
        <li>
          <router-link :to="{ name: 'AdminDashboard' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              /></svg
          ></router-link>
        </li>
        <BreadCrumbSpace />

        <slot name="content">
          <li><a href="#">Menu</a></li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li><a href="Link">Sub Menu</a></li>
        </slot>
      </ol>
    </nav>
  </div>
</template>
