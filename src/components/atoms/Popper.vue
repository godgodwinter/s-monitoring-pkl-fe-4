<script setup>
const props = defineProps({
  title: String,
  default() {
    return "Default function";
  },
});
</script>
<template>
  <Popper arrow :content="props.title">
    <slot name="content"> test </slot>
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
  background: #e92791;
  padding: 20px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  /* text-transform: uppercase; */
}

:deep(.popper #arrow::before) {
  background: #e92791;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: #e92791;
}
</style>
