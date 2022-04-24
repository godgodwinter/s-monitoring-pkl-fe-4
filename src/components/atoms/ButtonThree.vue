<script setup>
const props = defineProps({
  title: String,
  default() {
    return "Button";
  },
});
</script>
<template>
  <button class="flex w-full">
    <span
      href="#"
      type="submit"
      class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-sky-500 hover:bg-sky-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
    >
      <span class="mr-2 uppercase">{{ props.title }}</span>
      <span>
        <svg
          class="h-6 w-6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </span>
  </button>
</template>
