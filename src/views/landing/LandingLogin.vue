<script setup>
import { Field, Form } from "vee-validate";
import ButtonThree from "@/components/atoms/ButtonThree.vue";

import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Toast from "@/components/lib/Toast.js";
import Api from "@/axios/axios";
import jwt_decode from "jwt-decode";

const store = useStore();
const router = useRouter();

const baseUrl = computed(function () {
  return store.state.baseUrl;
});

const dataToken = computed(function () {
  return store.state.token;
});

const dataIsLogin = computed(function () {
  return store.state.isLogin;
});

//login

const doLogin = async (username, password) => {
  try {
    const response = await Api.post("admin/auth/login", {
      email: username,
      password,
    });
    // console.log(response);
    if (response.code === 200) {
      const { token } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("isLogin", true);
      console.log("Login berhasil");
      store.commit("setToken", token);
      store.commit("setIsLogin", true);
      router.push({ name: "AdminDashboard" });
      Toast.success("Success", "Login Berhasil!");
      let decoded = jwt_decode(token);
      store.commit("setDataAuth", decoded);
      // console.log(decoded);
    } else {
      Toast.danger("Warning", "Login gagal!");
    }
    return response.data;
  } catch (error) {
    // console.error(error);
    Toast.danger("Warning", "Login gagal!");
  }
};

function onSubmit(values) {
  // console.log('testing submit');
  // console.log(values.username, values.password);
  // console.log(`${baseUrl.value}api/admin/auth/login`);
  doLogin(values.username, values.password);
}

//validasi
function validateUsername(value) {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 3) {
    return "Username must be at least 3 characters";
  }
  return true;
}
function ValidatePassword(value) {
  if (!value) {
    return "This field is required";
  }
  if (value.length < 3) {
    return "Password must be at least 3 characters";
  }
  return true;
}
//validasi

function isLogin() {
  if (dataIsLogin.value) {
    // console.log("Anda sudah login!");
    router.push({ name: "AdminDashboard" });
  } else {
    // router.push({ name: "LandingIndex" });
    // console.log("Anda belum login!");
  }
}
// console.log(dataToken.value, dataIsLogin.value);

isLogin();
</script>
<template>
  <div class="bg-white flex flex-col justify-center sm:py-32">
    <div class="relative py-0 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-2 sm:skew-y-0 sm:-rotate-2 sm:rounded-3xl">
      </div>
      <div class="relative px-4 py-10 bg-white shadow-2xl sm:rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <!-- <div>
            <img
              src="@/assets/img/avatar/baemon-ava-1.jpg"
              class="object-cover h-52 w-full"
            />
          </div> -->

          <div class="w-full flex justify-center">
            <div class="avatar">
              <div class="w-24 rounded">
                <img src="@/assets/logo_smk.png" />
              </div>
            </div>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="flex flex-col bg-white shadow-sm px-10 py-4 rounded-3xl w-50">
              <div class="font-medium self-center  text-center text-xl sm:text-3xl text-gray-800">
                SISTEM INFORMASI PRAKERIN
                <!-- {{dataToken}}
                                {{dataIsLogin}} -->
              </div>
              <div class="mt-4 self-center text-xl sm:text-sm text-gray-800 text-center">
                Masuk sebagai Administrator
              </div>

              <Form v-slot="{ errors }" @submit="onSubmit">
                <div class="mt-10">
                  <div class="flex flex-col mb-5">
                    <label for="email" class="mb-1 text-xs tracking-wide text-gray-600">Username or Email:</label>
                    <div class="relative">
                      <div
                        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <i class="fas fa-at text-sky-500"></i>
                      </div>

                      <Field name="username" type="email" :rules="validateUsername"
                        class="w-full border-gray-300 border px-4 py-2 rounded focus:border focus:border-sky-500 focus:shadow-outline outline-none" />
                    </div>
                  </div>
                  <div class="flex flex-col mb-6">
                    <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                    <div class="relative">
                      <div
                        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <span>
                          <i class="fas fa-lock text-sky-500"></i>
                        </span>
                      </div>

                      <Field name="password" type="password" :rules="ValidatePassword"
                        class="w-full border-gray-300 border px-4 py-2 rounded focus:border focus:border-sky-500 focus:shadow-outline outline-none" />
                    </div>
                  </div>
                  <!-- <router-link :to="{ name: 'AdminDashboard' }"> -->
                  <ButtonThree title="Sign In"></ButtonThree>
                  <!-- </router-link> -->
                </div>
              </Form>
            </div>

            <!-- <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <div class="flex justify-center items-center mt-6">
                <a href="#" target="_blank"
                  class="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                  <span class="ml-2">Lupa Username / Email / Password ?
                    <a href="#" class="text-xs ml-2 text-sky-500 font-semibold">Hub Admin</a></span>
                </a>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
