<script setup>
/* eslint-disable */
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const params = route.params;
// console.log(route.meta);
// console.log(route.matched);
// console.log(route.params);
const dataBreadcrumb = route.matched.map((item) => {
  return {
    data: item.meta.breadcrumb,
  };
});
const doGoto = (name, params) => {
  //   console.log(params);
  if (params) {
    router.push({ name, params });
  }
  router.push({ name });



};
</script>

<template>
  <!-- <div>{{ dataBreadcrumb }}</div>
  <div v-for="(item, index) in dataBreadcrumb" :key="index">
    {{ index }} - {{ item.data.name }} {{ item.data.goto }}
    {{ item.params?.id }}
  </div> -->
  <!-- <div class="q-pa-md q-gutter-md">
    <q-breadcrumbs class="text-grey" active-color="purple">
      <template v-slot:separator>
        <q-icon size="1.2em" name="arrow_forward" color="purple" />
      </template>
      <q-breadcrumbs-el v-for="(item, index) in dataBreadcrumb" @click="doGoto(item.data.goto, item.params)"
        :key="index" :label="item.data.name" :icon="item.data.icon ? item.data.icon : 'widgets'" to="#" />
    </q-breadcrumbs>
  </div> -->
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(item, index) in dataBreadcrumb" @click="doGoto(item.data.goto, params)" :key="index">

        <!-- <RouterLink :to="item.data.goto"> -->
        <label class="capitalize font-medium pb-2"> {{ item.data.name }}
          <!-- {{ item.data.goto }} -->
          <!-- {{ item.params }} -->
          <!-- {{ params }} -->
          <!-- {{ item.data.params }} -->
          <!-- {{ item }} -->
        </label>
        <!-- </RouterLink> -->
      </li>
    </ul>
  </div>
</template>
