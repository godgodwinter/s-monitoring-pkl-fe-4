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
    class="text-sky-500 bg-transparent border border-solid border-sky-500 hover:bg-sky-500 hover:text-white active:bg-success-darker font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
    type="submit"
  >
    {{ props.title }}
  </button>
</template>
