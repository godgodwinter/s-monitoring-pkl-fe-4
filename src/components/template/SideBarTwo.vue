<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isSideBarActive = computed(() => store.state.isSideBarActive);
console.log(isSideBarActive.value);
</script>
<template>
  <aside
    :class="{ hidden: !isSideBarActive }"
    id="sidebar"
    class="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 lg:w-96 transition-width duration-75"
    aria-label="Sidebar"
  >
    <div
      class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0"
    >
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 bg-white divide-y space-y-1">
          <ul class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-2 justify-center">
            <li class="bg-white lg:w-full">
              <div class="flex gap-2 items-center justify-center">
                <img
                  src="@/assets/img/avatar/baemon-ava-2.jpg"
                  alt=""
                  class="rounded-full w-20 h-20 object-cover"
                />
                <div>
                  <p class="text-gray-500 text-md font-semibold">PAIJO</p>
                  <p class="text-gray-500 text-sm font-medium">123</p>
                  <p class="text-gray-500 text-xs font-light mt-2">SISWA</p>
                </div>
              </div>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'LandingIndex' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M6 23h-3v-5.486c-1.827-.518-3-2.24-3-3.988 0-.585.129-1.172.407-1.716-.323-1.661.657-3.344 2.356-3.881l.018-.005c.773-1.102 2.057-1.826 3.535-1.898l5.666-5.026 12.018 10.661-1.33 1.493-10.688-9.482-3.274 2.905c.305.162.591.358.849.589l2.415-2.142 9.026 7.989v9.987h-2.998v-7h-5l-.008 7h-5.992v-6.061c.546-.125 1.034-.463 1.317-1.044 2.096.786 3.746-2.273 1.82-3.562 1.073-1.237.188-2.747-1.208-2.525-.673-2.384-4.178-2.384-4.851 0-1.31-.235-2.295 1.094-1.385 2.291-1.654 1.38-.162 4.084 1.872 3.473.214.74.794 1.2 1.435 1.362v6.066zm.451-10.678c1.493-1.023 3.242.768 2.303 2.226.002-1.473-.853-2.282-2.303-2.226m-2.119 1.191c-.668-1.002-.34-2.366.705-2.968.589-.338 1.33-.369 1.953-.07 1.06.507-2.743-.678-2.658 3.038"
                  />
                </svg>
                <span class="ml-3 text-sm">Logout </span>
              </router-link>
            </li>
          </ul>
          <ul class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between">
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'LandingIndex' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M6 23h-3v-5.486c-1.827-.518-3-2.24-3-3.988 0-.585.129-1.172.407-1.716-.323-1.661.657-3.344 2.356-3.881l.018-.005c.773-1.102 2.057-1.826 3.535-1.898l5.666-5.026 12.018 10.661-1.33 1.493-10.688-9.482-3.274 2.905c.305.162.591.358.849.589l2.415-2.142 9.026 7.989v9.987h-2.998v-7h-5l-.008 7h-5.992v-6.061c.546-.125 1.034-.463 1.317-1.044 2.096.786 3.746-2.273 1.82-3.562 1.073-1.237.188-2.747-1.208-2.525-.673-2.384-4.178-2.384-4.851 0-1.31-.235-2.295 1.094-1.385 2.291-1.654 1.38-.162 4.084 1.872 3.473.214.74.794 1.2 1.435 1.362v6.066zm.451-10.678c1.493-1.023 3.242.768 2.303 2.226.002-1.473-.853-2.282-2.303-2.226m-2.119 1.191c-.668-1.002-.34-2.366.705-2.968.589-.338 1.33-.369 1.953-.07 1.06.507-2.743-.678-2.658 3.038"
                  />
                </svg>
                <span class="ml-3">Absensi </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'LandingIndex' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M6 23h-3v-5.486c-1.827-.518-3-2.24-3-3.988 0-.585.129-1.172.407-1.716-.323-1.661.657-3.344 2.356-3.881l.018-.005c.773-1.102 2.057-1.826 3.535-1.898l5.666-5.026 12.018 10.661-1.33 1.493-10.688-9.482-3.274 2.905c.305.162.591.358.849.589l2.415-2.142 9.026 7.989v9.987h-2.998v-7h-5l-.008 7h-5.992v-6.061c.546-.125 1.034-.463 1.317-1.044 2.096.786 3.746-2.273 1.82-3.562 1.073-1.237.188-2.747-1.208-2.525-.673-2.384-4.178-2.384-4.851 0-1.31-.235-2.295 1.094-1.385 2.291-1.654 1.38-.162 4.084 1.872 3.473.214.74.794 1.2 1.435 1.362v6.066zm.451-10.678c1.493-1.023 3.242.768 2.303 2.226.002-1.473-.853-2.282-2.303-2.226m-2.119 1.191c-.668-1.002-.34-2.366.705-2.968.589-.338 1.33-.369 1.953-.07 1.06.507-2.743-.678-2.658 3.038"
                  />
                </svg>
                <span class="ml-3">PKL </span>
              </router-link>
            </li>
            <li class="bg-white lg:w-1/2">
              <router-link
                :to="{ name: 'LandingIndex' }"
                class="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path
                    d="M6 23h-3v-5.486c-1.827-.518-3-2.24-3-3.988 0-.585.129-1.172.407-1.716-.323-1.661.657-3.344 2.356-3.881l.018-.005c.773-1.102 2.057-1.826 3.535-1.898l5.666-5.026 12.018 10.661-1.33 1.493-10.688-9.482-3.274 2.905c.305.162.591.358.849.589l2.415-2.142 9.026 7.989v9.987h-2.998v-7h-5l-.008 7h-5.992v-6.061c.546-.125 1.034-.463 1.317-1.044 2.096.786 3.746-2.273 1.82-3.562 1.073-1.237.188-2.747-1.208-2.525-.673-2.384-4.178-2.384-4.851 0-1.31-.235-2.295 1.094-1.385 2.291-1.654 1.38-.162 4.084 1.872 3.473.214.74.794 1.2 1.435 1.362v6.066zm.451-10.678c1.493-1.023 3.242.768 2.303 2.226.002-1.473-.853-2.282-2.303-2.226m-2.119 1.191c-.668-1.002-.34-2.366.705-2.968.589-.338 1.33-.369 1.953-.07 1.06.507-2.743-.678-2.658 3.038"
                  />
                </svg>
                <span class="ml-3">Pemberitahuan </span>
              </router-link>
            </li>
          </ul>
          <div class="space-y-2 pt-10">
            <Link
              to="/about"
              class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path
                  d="M1.999 1v7.269l-2 1.456v13.275h24.001v-13.275l-2.001-1.453v-7.272h-20zm1 11.234v-10.234h18v10.233l-9 5.766-9-5.765zm19 .54v-3.17l1.001.764v11.632h-22.001v-11.641l1-.707.063 3.134 9.937 6.413 10-6.425zm-14.305-6.752l-2.694.496 1.888 1.986-.361 2.716 2.472-1.182 2.473 1.182-.361-2.716 1.888-1.986-2.695-.496-1.305-2.41-1.305 2.41zm.248 2.139l-.945-.994 1.349-.249.653-1.206.654 1.206 1.349.249-.945.994.18 1.36-1.238-.591-1.238.591.181-1.36zm6.058-3.078h4.999v-1h-4.999v1zm0 2h4.999v-1h-4.999v1zm0 2h4.999v-1h-4.999v1zm0 2h3v-1h-3v1z"
                />
              </svg>
              <span class="ml-3">Documentation</span>
            </Link>
            <a
              href="#"
              class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
            >
              <svg
                class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                />
              </svg>
              <span class="ml-3">Components</span>
            </a>
            <a
              href="#"
              class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
            >
              <svg
                class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="ml-3">Help</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
