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
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminTapel from '../views/admin/tapel/Index.vue'
import AdminKelas from '../views/admin/kelas/Index.vue'
import AdminSiswa from '../views/admin/siswa/Index.vue'
import AdminSiswaProfile from '../views/admin/siswa/ProfileSiswa.vue'
import AdminTempatPkl from '../views/admin/tempatpkl/Index.vue'
import AdminPembimbingLapangan from '../views/admin/pembimbinglapangan/Index.vue'
import AdminPembimbingSekolah from '../views/admin/pembimbingsekolah/Index.vue'

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
    path: '/adminpages',
    name: 'PagesAdmin',
    component: AdminLayout,
    redirect: '/',
    children: [
      {
        path: '/pages/admin', 
        name: 'AdminDashboard',
        component: AdminDashboard,
      },
      {
        path: '/pages/admin/tapel', 
        name: 'AdminTapel',
        component: AdminTapel,
      },
      {
        path: '/pages/admin/kelas', 
        name: 'AdminKelas',
        component: AdminKelas,
      },
      {
        path: '/pages/admin/siswa', 
        name: 'AdminSiswa',
        component: AdminSiswa,
      },
      {
        path: '/pages/admin/siswa/profile', 
        name: 'AdminSiswaProfile',
        component: AdminSiswaProfile,
      },
      {
        path: '/pages/admin/tempatpkl', 
        name: 'AdminTempatPkl',
        component: AdminTempatPkl,
      },
      {
        path: '/pages/admin/pembimbimbinglapangan', 
        name: 'AdminPembimbingLapangan',
        component: AdminPembimbingLapangan,
      },
      {
        path: '/pages/admin/pembimbingsekolah', 
        name: 'AdminPembimbingSekolah',
        component: AdminPembimbingSekolah,
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
