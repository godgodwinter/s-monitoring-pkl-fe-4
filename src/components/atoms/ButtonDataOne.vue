<script setup>
const props = defineProps({
  title: String,
  default() {
    return "Button";
  },
  titleShort: String,
  default() {
    return "Bu";
  },
});
</script>
<template>
  <div>
    <div class="text-center my-2">
      <div
        class="h-16 w-16 rounded-full mx-auto bg-sky-500 hover:text-white flex text-xl font-bold items-center justify-center text-sky-200 hover:bg-sky-800"
      >
        {{ props.titleShort }}
      </div>
      <p class="text-main-color text-sm text-slate-600 font-semibold">
        {{ props.title }}
      </p>
    </div>
  </div>
</template>
