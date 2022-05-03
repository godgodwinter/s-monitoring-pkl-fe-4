<script setup>
const props = defineProps({
  title: String,
  default() {
    return "Default function";
  },
});
</script>
<template>
  <Popper
    arrow
    :content="props.title"
    :hover="true"
    class="text-sm font-serif font-light"
  >
    <div class="font-normal">
      <slot name="content"> test </slot>
    </div>
  </Popper>
</template>

<script>
import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default defineComponent({
  components: {
    Popper,
  },
});
</script>

<style scoped>
:deep(.popper) {
  background: #a7a4a5;
  padding: 20px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  /* text-transform: uppercase; */
}

:deep(.popper #arrow::before) {
  background: #a7a4a5;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: #a39a9d;
}
</style>
