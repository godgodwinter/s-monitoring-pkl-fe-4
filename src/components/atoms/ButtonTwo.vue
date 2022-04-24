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
    href="https://github.com/godgodwinter"
    target="_blank"
    data-aos="fade-right"
    data-aos-duration="1000"
    class="transition hover:duration-100 transition-all border-double border-4 hover:border-white border-sky-600 inline-flex items-center h-16 px-8 text-sky-100 transition-colors duration-150 bg-sky-600 rounded-lg focus:shadow-outline hover:bg-sky-800"
  >
    <span class="text-white"> {{ props.title }} </span>
    <svg
      class="animate-wiggle w-10 h-10 ml-3 fill-current text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12l-4.5 4.5 1.527 1.5 5.973-6-5.973-6-1.527 1.5 4.5 4.5z"
      />
    </svg>
  </button>
</template>
