import { createRouter, createWebHistory } from 'vue-router';
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayoutTwo.vue';
// pages
import NotFound from '../views/NotFound.vue';
import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingSiswa from '../views/landing/LandingSiswa.vue';
import LandingLogin from '../views/landing/LandingLogin.vue';
import LandingPengawasLapangan from '../views/landing/LandingPengawasLapangan.vue';
import LandingPengawasSekolah from '../views/landing/LandingPengawasSekolah.vue';

//admin
import SiswaDashboard from '../views/admin/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingLayout,
    redirect: '/',
    children: [
      {
        path: '/', 
        name: 'LandingIndex',
        component: LandingLogin,
      },
      {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
      },
    ],
  },
  {
    path: '/siswapages',
    name: 'PagesSiswa',
    component: AdminLayout,
    redirect: '/',
    children: [
      {
        path: '/pages/siswa', 
        name: 'PagesSiswaIndex',
        component: SiswaDashboard,
      },
    ],
  },
  {
    path: '/:catchAll(.*)', redirect: '/404',
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
