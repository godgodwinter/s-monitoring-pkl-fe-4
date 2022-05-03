<script setup>
import FormPendaftaranBaru from "../../../components/organismes/pendaftaran/FormPendaftaranBaru.vue";
import CardStepPendaftaran from "../../../components/organismes/pendaftaran/CardStepPendaftaran.vue";
import Popper from "../../../components/atoms/Popper.vue";
</script>
<template>
  <CardStepPendaftaran :step="2"></CardStepPendaftaran>
  <H1>Proses langkah ke dua</H1>

  <Popper content="This is the Popper content">
    <template #content>
      <router-link
        :to="{ name: 'AdminPendaftaranProsesTiga' }"
        class="bg-gray-300 py-1 px-1"
        >Langkah ke tiga</router-link
      ></template
    >
  </Popper>
  <!-- <FormPendaftaranBaru></FormPendaftaranBaru> -->
</template>
