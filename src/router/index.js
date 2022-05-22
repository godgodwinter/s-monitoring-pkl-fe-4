import { createRouter, createWebHistory } from 'vue-router';
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayoutTwo.vue';
// sub layouts
import SubPendaftaranLayout from '../layouts/pendaftaran/SubPendaftaranLayout.vue';
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
import AdminPendaftaranExample from '../views/admin/pendaftaran/Pendaftaran_nodata2.vue'
// sub pendaftaran
import SubPendaftaranIndex from '@/views/admin/pendaftaran/SubPendaftaranIndex.vue';
// List Pendaftaran
import SubPendaftaranBelumDaftar from '@/views/admin/pendaftaran/SubPendaftaranBelumDaftar.vue';
import ListProsesPengajuanTempatPKL from '@/views/admin/pendaftaran/list/ListProsesPengajuanTempatPKL.vue';
import ListProsesPenempatanPKL from '@/views/admin/pendaftaran/list/ListProsesPenempatanPKL.vue';
import ListProsesPemberkasan from '@/views/admin/pendaftaran/list/ListProsesPemberkasan.vue';
import ListProsesPersetujuan from '@/views/admin/pendaftaran/list/ListProsesPersetujuan.vue';
// List Pendaftaran
// Proses Pendaftaran
import ProsesTempatPKL from '@/views/admin/pendaftaran/proses/ProsesTempatPKL.vue';
// Proses Pendaftaran

import SubPendaftaranMenunggu from '@/views/admin/pendaftaran/SubPendaftaranMenunggu.vue';
import SubPendaftaranProsesDaftar from '@/views/admin/pendaftaran/SubPendaftaranProsesDaftar.vue';
import SubPendaftaranDisetujui from '@/views/admin/pendaftaran/SubPendaftaranDisetujui.vue';
import SubProsesSatu from '@/views/admin/pendaftaran/SubProsesSatu.vue';
import SubProsesDua from '@/views/admin/pendaftaran/SubProsesDua.vue';
import SubProsesDuaId from '@/views/admin/pendaftaran/SubProsesDuaId.vue';
import SubProsesTiga from '@/views/admin/pendaftaran/SubProsesTiga.vue';

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
        path: '/pages/admin/siswa/profile/:id?', 
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
      // {
      //   path: '/pages/admin/pendaftaranpkl', //getall
      //   name: 'AdminPendaftaran',
      //   component: AdminPendaftaran,
      // },
      // {
      //   path: '/pages/admin/pendaftaranpkl/disetujui', //disetujui
      //   name: 'AdminPendaftaranDisetujui',
      //   component: AdminPendaftaranDisetujui,
      // },
      // {
      //   path: '/pages/admin/pendaftaranpkl/proses/satu', //proses
      //   name: 'AdminPendaftaranProsesSatu',
      //   component: AdminPendaftaranProsesSatu,
      // },
      {
        path: '/pages/admin/pendaftaranpkl/proses/zero', //proses layout
        name: 'AdminPendaftaranProsesZero',
        component: SubPendaftaranLayout,
        children: [
          {
            path: '/pages/admin/pendaftaranpkl', //getall
            name: 'AdminPendaftaran',
            component: SubPendaftaranIndex,
          },
          // LIST PENDAFTARAN
          {
              path: '/pages/admin/pendaftaranpkl/belumdaftar', //belumdaftar
              name: 'AdminPendaftaranBelumDaftar',
            component: SubPendaftaranBelumDaftar,
          },
          {
              path: '/pages/admin/pendaftaranpkl/list/prosespengajuan',
              name: 'ListProsesPengajuanTempatPKL',
            component: ListProsesPengajuanTempatPKL,
          },
          {
              path: '/pages/admin/pendaftaranpkl/list/prosespenempatan',
              name: 'ListProsesPenempatanPKL',
            component: ListProsesPenempatanPKL,
          },
          {
              path: '/pages/admin/pendaftaranpkl/list/prosespemberkasan', 
              name: 'ListProsesPemberkasan',
            component: ListProsesPemberkasan,
          },
          {
              path: '/pages/admin/pendaftaranpkl/list/prosespersetujuan', 
              name: 'ListProsesPersetujuan',
            component: ListProsesPersetujuan,
          },

          // LIST PENDAFTARAN
          // PROSES PENDAFTARAN
          {
            path: '/pages/admin/pendaftaranpkl/proses/tempatpkl', 
            name: 'ProsesTempatPKL',
          component: ProsesTempatPKL,
        },
          // PROSES PENDAFTARAN
          {
              path: '/pages/admin/pendaftaranpkl/prosesdaftar', //prosesdaftar
              name: 'AdminPendaftaranProsesDaftar',
            component: SubPendaftaranProsesDaftar,
          },
          {
              path: '/pages/admin/pendaftaranpkl/menunggu', //menunggu
              name: 'AdminPendaftaranMenunggu',
            component: SubPendaftaranMenunggu,
          },
          {
              path: '/pages/admin/pendaftaranpkl/disetujui', //disetujui
              name: 'AdminPendaftaranDisetujui',
            component: SubPendaftaranDisetujui,
          },
          {
            path: '/pages/admin/pendaftaranpkl/proses/satu/:id?', 
            name: 'AdminPendaftaranProsesSatu',
            component: SubProsesSatu,
          },
          {
            path: '/pages/admin/pendaftaranpkl/proses/dua', 
            name: 'AdminPendaftaranProsesDua',
            component: SubProsesDua,
          },
          {
            path: '/pages/admin/pendaftaranpkl/proses/dua/:id?', 
            name: 'AdminPendaftaranProsesDuaId',
            component: SubProsesDuaId,
          },
          {
            path: '/pages/admin/pendaftaranpkl/proses/tiga/:id?', 
            name: 'AdminPendaftaranProsesTiga',
            component: SubProsesTiga,
          },
        ]
      },
      {
        path: '/pages/admin/pendaftaranpkl/example', 
        name: 'AdminPendaftaranExample',
        component: AdminPendaftaranExample,
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
