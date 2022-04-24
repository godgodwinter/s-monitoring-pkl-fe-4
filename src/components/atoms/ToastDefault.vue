<script lang='ts'>
import { defineComponent } from 'vue';
// import the library
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css';

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const toast = () => {
      createToast(
        'Some text',
        {
          type: 'warning',
          transition: 'bounce',
          position: 'top-right',
        },
      );
    };
    return { toast };
  },
});
</script>

<template>
  <button @click="toast">Toast it!</button>
</template>
