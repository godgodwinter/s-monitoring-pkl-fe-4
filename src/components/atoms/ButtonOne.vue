<script setup>
const props = defineProps({
  title: String,
  default() {
    return "Button";
  },
});
</script>
<template>
  <button
    class="bg-slate-100 border-2 text-slate-500 border-slate-500 hover:border-slate-900 hover:bg-slate-400 hover:text-white rounded-lg py-4 px-2"
  >
    {{ props.title }}
  </button>
</template>
