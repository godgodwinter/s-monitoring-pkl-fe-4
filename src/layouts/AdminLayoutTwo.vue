<script setup>
// library
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
// component
import NavBar from "../components/template/NavBarTwo.vue";
import SideBar from "../components/template/SideBarTwo.vue";
import Footer from "../components/template/Footer.vue";

const store = useStore();
const router = useRouter();

// const dataToken = computed(() => store.state.token);

// const dataIsLogin = computed(() => store.state.isLogin);

// function isLogin() {
//   if (dataIsLogin.value) {
//     // console.log('Anda sudah login!');
//   } else {
//     router.push({ name: "LandingIndex" });
//     // console.log('Anda belum login!');
//   }
// }
// console.log(dataToken.value,dataIsLogin.value);

// isLogin();
// periksa token asli/tidaknya(token expired) jika token tidak valid maka redirect ke landing page
</script>
<template>
  <!-- <div class="font-serif">
    <AdminHeader />
  </div> -->
  <div class="font-serif">
    <NavBar />
    <SideBar />

    <div class="flex overflow-hidden bg-white pt-16">
      <div
        class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      />
      <div
        id="main-content"
        class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-96"
      >
        <main>
          <router-view />
          <Footer />
        </main>
      </div>
    </div>
  </div>
  -
  <!-- <main class="container mx-w-6xl mx-auto font-serif">
    <router-view />
  </main> -->
</template>
