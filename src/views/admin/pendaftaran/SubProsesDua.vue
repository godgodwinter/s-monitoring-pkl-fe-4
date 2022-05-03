<script setup>
import FormPendaftaranBaru from "../../../components/organismes/pendaftaran/FormPendaftaranBaru.vue";
import CardStepPendaftaran from "../../../components/organismes/pendaftaran/CardStepPendaftaran.vue";
</script>
<template>
  <CardStepPendaftaran :step="2"></CardStepPendaftaran>
  <H1>Proses langkah ke dua</H1>
  <router-link :to="{ name: 'AdminPendaftaranProsesTiga' }" class="bg-gray-300 py-1 px-1"
    >Langkah ke tiga</router-link
  >
  <!-- <FormPendaftaranBaru></FormPendaftaranBaru> -->
</template>
