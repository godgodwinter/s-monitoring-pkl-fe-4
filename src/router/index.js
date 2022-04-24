import { createRouter, createWebHistory } from 'vue-router';
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayoutTwo.vue';
// pages
import NotFound from '../views/NotFound.vue';
import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingSiswa from '../views/landing/LandingSiswa.vue';
import LandingSiswaLogin from '../views/landing/LandingSiswaLogin.vue';
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
        component: LandingIndex,
      },
      {
        path: '/siswa', 
        name: 'LandingSiswa',
        component: LandingSiswa,
      },
      {
        path: '/siswa/login', 
        name: 'LandingSiswaLogin',
        component: LandingSiswaLogin,
      },
      {
        path: '/pengawaslapangan', 
        name: 'LandingPengawasLapangan',
        component: LandingPengawasLapangan,
      },
      {
        path: '/pengawassekolah', 
        name: 'LandingPengawasSekolah',
        component: LandingPengawasSekolah,
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
