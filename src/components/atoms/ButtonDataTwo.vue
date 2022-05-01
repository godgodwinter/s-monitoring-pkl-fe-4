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
        class="h-16 w-16 rounded-full mx-auto bg-slate-500 hover:text-white flex text-xl font-bold items-center justify-center text-slate-200 hover:bg-slate-800"
      >
        {{ props.titleShort }}
      </div>
      <p class="text-main-color text-sm text-slate-700">{{ props.title }}</p>
    </div>
  </div>
</template>
