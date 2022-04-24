<script setup>
import { ref } from "vue";
const store = useStore();
import { computed } from "vue";
import { useStore } from "vuex  ";
import { useRouter, useRoute } from "vue-router";
let isMenuActive = ref(false);
const router = useRouter();
const isSideBarActive = computed(function () {
  return store.state.isSideBarActive;
});

let getDataAuth = ref();
// const dataAuth = computed(function () {
//   return store.state.dataAuth;
// });
function toggleMenu() {
  isMenuActive.value = !isMenuActive.value;
}
function toggleSideBar() {
  store.commit("setSideBar", !isSideBarActive.value);
}
// async function goLogout() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("isLogin");
//   router.go();
// }
</script>
<template>
  <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar"
            class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            @click="toggleSideBar()"
          >
            <svg
              id="toggleSidebarMobileHamburger"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              id="toggleSidebarMobileClose"
              class="w-6 h-6 hidden"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <a href="#" class="text-xl font-bold flex items-center lg:ml-2.5">
            <img
              src="../../assets/img/logo/tailwindcss-icon.svg"
              class="h-6 mr-2"
              alt="Windster Logo"
            />
            <span class="self-center whitespace-nowrap">Babeng</span>
          </a>
          <form action="#" method="GET" class="hidden lg:block lg:pl-32">
            <label for="topbar-search" class="sr-only">Search</label>
            <div class="mt-1 relative lg:w-64">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                autocomplete="off"
                type="text"
                name="email"
                id="topbar-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                placeholder="Search"
              />
            </div>
          </form>
        </div>
        <div class="flex items-center">
          <button
            @click="toggleSideBar()"
            id="toggleSidebarMobileSearch"
            type="button"
            class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
          >
            <span class="sr-only">Search</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div class="hidden lg:flex items-center">
            <span class="text-base font-normal text-gray-500 mr-5">Open source ❤️ </span>
            <div class="-mb-1">
              <div>
                <button
                  @click="
                    {
                      toggleMenu();
                    }
                  "
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  class="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
                  type="button"
                >
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"
                    />
                  </svg>
                  <p class="mx-2" v-if="dataAuth">{{ dataAuth.name }}</p>
                  <p class="mx-2" v-else>Name</p>
                  <svg
                    class="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <!-- Dropdown menu -->
                <div
                  v-if="isMenuActive"
                  class="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                >
                  <ul
                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefault"
                  >
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Dashboard</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Settings</a
                      >
                    </li>
                    <li>
                      <button
                        @click="goLogout()"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
