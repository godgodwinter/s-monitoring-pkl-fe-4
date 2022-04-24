<script setup>
import ButtonThree from "@/components/atoms/ButtonThree.vue";
</script>
<template>
  <div class="bg-white flex flex-col justify-center sm:py-32">
    <div class="relative py-0 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-2 sm:skew-y-0 sm:-rotate-2 sm:rounded-3xl"
      ></div>
      <div class="relative px-4 py-10 bg-white shadow-2xl sm:rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <!-- <div>
            <img
              src="@/assets/img/avatar/baemon-ava-1.jpg"
              class="object-cover h-52 w-full"
            />
          </div> -->
          <div class="divide-y divide-gray-200">
            <div class="flex flex-col bg-white shadow-sm px-10 py-4 rounded-3xl w-50">
              <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
                LOGIN
                <!-- {{dataToken}}
                                {{dataIsLogin}} -->
              </div>
              <div class="mt-4 self-center text-xl sm:text-sm text-gray-800 text-center">
                Masuk sebagai Siswa
              </div>

              <div>
                <div class="mt-10">
                  <div class="flex flex-col mb-5">
                    <label for="email" class="mb-1 text-xs tracking-wide text-gray-600"
                      >Username or Email:</label
                    >
                    <div class="relative">
                      <div
                        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                      >
                        <i class="fas fa-at text-sky-500"></i>
                      </div>

                      <input
                        name="username"
                        type="email"
                        class="w-full border-gray-300 border px-4 py-2 rounded focus:border focus:border-sky-500 focus:shadow-outline outline-none"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col mb-6">
                    <label
                      for="password"
                      class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                      >Password:</label
                    >
                    <div class="relative">
                      <div
                        class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                      >
                        <span>
                          <i class="fas fa-lock text-sky-500"></i>
                        </span>
                      </div>

                      <input
                        name="password"
                        type="password"
                        class="w-full border-gray-300 border px-4 py-2 rounded focus:border focus:border-sky-500 focus:shadow-outline outline-none"
                      />
                    </div>
                  </div>
                  <router-link :to="{ name: 'PagesSiswaIndex' }">
                    <ButtonThree title="Sign In"></ButtonThree
                  ></router-link>
                </div>
              </div>
            </div>

            <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <div class="flex justify-center items-center mt-6">
                <a
                  href="#"
                  target="_blank"
                  class="inline-flex items-center text-gray-700 font-medium text-xs text-center"
                >
                  <span class="ml-2"
                    >Lupa Username / Email / Password ?
                    <a href="#" class="text-xs ml-2 text-sky-500 font-semibold"
                      >Hub Admin</a
                    ></span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
