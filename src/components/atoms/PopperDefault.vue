<template>
  <Popper arrow content="This is the Popper content 🍿">
    <Button>Demo</Button>
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
  text-transform: uppercase;
}

:deep(.popper #arrow::before) {
  background: #e92791;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  background: #e92791;
}
</style>
