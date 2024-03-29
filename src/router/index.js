import { createRouter, createWebHistory } from "vue-router";
// layouts
import LandingLayout from "../layouts/LandingLayout.vue";
import AdminLayout from "../layouts/AdminLayoutTwo.vue";
// sub layouts
import SubPendaftaranLayout from "../layouts/pendaftaran/SubPendaftaranLayout.vue";
// pages
import NotFound from "../views/NotFound.vue";
import LandingIndex from "../views/landing/LandingIndex.vue";
import LandingSiswa from "../views/landing/LandingSiswa.vue";
import LandingLogin from "../views/landing/LandingLogin.vue";
import LandingPengawasLapangan from "../views/landing/LandingPengawasLapangan.vue";
import LandingPengawasSekolah from "../views/landing/LandingPengawasSekolah.vue";

//admin
import AdminDashboard from "../views/admin/Dashboard.vue";
import AdminTapel from "../views/admin/tapel/Index.vue";
import AdminKelas from "../views/admin/kelas/Index.vue";
import AdminSiswa from "../views/admin/siswa/Index.vue";
import AdminSiswaProfile from "../views/admin/siswa/ProfileSiswaBaru.vue";
import AdminTempatPkl from "../views/admin/tempatpkl/Index.vue";
import AdminPembimbingLapangan from "../views/admin/pembimbinglapangan/Index.vue";
import AdminPembimbingSekolah from "../views/admin/pembimbingsekolah/Index.vue";
import AdminPendaftaranExample from "../views/admin/pendaftaran/Pendaftaran_nodata2.vue";
// sub pendaftaran
import SubPendaftaranIndex from "@/views/admin/pendaftaran/SubPendaftaranIndex.vue";
// List Pendaftaran
import SubPendaftaranBelumDaftar from "@/views/admin/pendaftaran/SubPendaftaranBelumDaftar.vue";
import ListProsesPengajuanTempatPKL from "@/views/admin/pendaftaran/list/ListProsesPengajuanTempatPKL.vue";
import ListProsesPenempatanPKL from "@/views/admin/pendaftaran/list/ListProsesPenempatanPKL.vue";
import ListProsesPemberkasan from "@/views/admin/pendaftaran/list/ListProsesPemberkasan.vue";
import ListProsesPersetujuan from "@/views/admin/pendaftaran/list/ListProsesPersetujuan.vue";
// List Pendaftaran
// Proses Pendaftaran
import ProsesTempatPKL from "@/views/admin/pendaftaran/proses/ProsesTempatPKL.vue";
// Proses Pendaftaran

import SubPendaftaranMenunggu from "@/views/admin/pendaftaran/SubPendaftaranMenunggu.vue";
import SubPendaftaranProsesDaftar from "@/views/admin/pendaftaran/SubPendaftaranProsesDaftar.vue";
import SubPendaftaranDisetujui from "@/views/admin/pendaftaran/SubPendaftaranDisetujui.vue";
import SubProsesSatu from "@/views/admin/pendaftaran/SubProsesSatu.vue";
import SubProsesDua from "@/views/admin/pendaftaran/SubProsesDua.vue";
import SubProsesDuaId from "@/views/admin/pendaftaran/SubProsesDuaId.vue";
import SubProsesTiga from "@/views/admin/pendaftaran/SubProsesTiga.vue";
/* eslint-disable */
const prefix = "/pages/admin";
const prefixName = "admin-";


const authMiddleware=(to, from, next) =>{
  console.log('====================================');
  console.log('ini middleware');
  console.log('====================================');
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
  next();
}

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingLayout,
    redirect: "/",
    children: [
      {
        path: "/",
        name: "LandingIndex",
        component: LandingLogin,
      },
      {
        path: "/404",
        name: "NotFound",
        component: NotFound,
      },
    ],
  },
  {
    path: "/adminpages",
    name: "PagesAdmin",
    component: AdminLayout,
    redirect: "/",
    meta: {
      requireAuth: true,
      title: "Admin",
      icon: "mdi-home",
      breadcrumb: {
        name: "Home",
        path: "/pages/admin",
        goto: "AdminDashboard",
      },
    },
    children: [
      {
        path: "/pages/admin",
        name: "AdminDashboard",
        beforeEnter: [authMiddleware],
        component: AdminDashboard,
      },
      {
        path: "/pages/admin/tapel",
        name: "AdminTapel",
        component: AdminTapel,
      },
      {
        path: "/pages/admin/jurusan",
        name: "admin-jurusan",
        component: () => import("@/views/admin/jurusan/JurusanIndex.vue"),
      },
      {
        path: "/pages/admin/kelas",
        name: "AdminKelas",
        component: AdminKelas,
      },
      {
        path: "/pages/admin/siswa",
        name: "AdminSiswa",
        component: AdminSiswa,
      },
      {
        path: "/pages/admin/siswa/tagihan/:id?",
        name: "admin.siswa.tagihan",
        // component: AdminSiswaProfile,
        component: () =>
          import(
            "@/views/admin/siswa/SiswaTagihanIndex.vue"
          ),
      },
      {
        path: "/pages/admin/siswa/profile/:id?",
        name: "AdminSiswaProfile",
        component: AdminSiswaProfile,
      },
      {
        path: "/pages/admin/tempatpkl",
        name: "AdminTempatPkl",
        component: AdminTempatPkl,
      },
      {
        path: "/pages/admin/pembimbimbinglapangan",
        name: "AdminPembimbingLapangan",
        component: AdminPembimbingLapangan,
      },
      {
        path: "/pages/admin/pembimbimbinglapangan/profile/:id",
        name: "admin-pembimbimbinglapangan-profile",
        component: () =>
          import(
            "@/views/admin/pembimbinglapangan/ProfilePembimbingLapangan.vue"
          ),
      },
      {
        path: "/pages/admin/pembimbingsekolah",
        name: "AdminPembimbingSekolah",
        component: AdminPembimbingSekolah,
      },
      {
        path: "/pages/admin/pembimbingsekolah/profile/:id",
        name: "admin-pembimbingsekolah-profile",
        component: () =>
          import(
            "@/views/admin/pembimbingsekolah/ProfilePembimbingSekolah.vue"
          ),
      },
      {
        path: "/pages/admin/penilaian",
        name: "admin-penilaian",
        component: () => import("@/views/admin/penilaian/PenilaianIndex.vue"),
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
        path: "/pages/admin/pendaftaranpkl/proses/zero", //proses layout
        name: "AdminPendaftaranProsesZero",
        component: SubPendaftaranLayout,
        children: [
          {
            path: "/pages/admin/pendaftaranpkl", //getall
            name: "AdminPendaftaran",
            component: SubPendaftaranIndex,
          },
          // LIST PENDAFTARAN
          {
            path: "/pages/admin/pendaftaranpkl/belumdaftar", //belumdaftar
            name: "AdminPendaftaranBelumDaftar",
            component: SubPendaftaranBelumDaftar,
          },
          {
            path: "/pages/admin/pendaftaranpkl/list/prosespengajuan",
            name: "ListProsesPengajuanTempatPKL",
            component: ListProsesPengajuanTempatPKL,
          },
          {
            path: "/pages/admin/pendaftaranpkl/list/prosespenempatan",
            name: "ListProsesPenempatanPKL",
            component: ListProsesPenempatanPKL,
          },
          {
            path: "/pages/admin/pendaftaranpkl/list/prosespemberkasan",
            name: "ListProsesPemberkasan",
            component: ListProsesPemberkasan,
          },
          {
            path: "/pages/admin/pendaftaranpkl/list/prosespersetujuan",
            name: "ListProsesPersetujuan",
            component: ListProsesPersetujuan,
          },

          // LIST PENDAFTARAN
          // PROSES PENDAFTARAN
          {
            path: "/pages/admin/pendaftaranpkl/proses/tempatpkl",
            name: "ProsesTempatPKL",
            component: ProsesTempatPKL,
          },
          // PROSES PENDAFTARAN
          {
            path: "/pages/admin/pendaftaranpkl/prosesdaftar", //prosesdaftar
            name: "AdminPendaftaranProsesDaftar",
            component: SubPendaftaranProsesDaftar,
          },
          {
            path: "/pages/admin/pendaftaranpkl/menunggu", //menunggu
            name: "AdminPendaftaranMenunggu",
            component: SubPendaftaranMenunggu,
          },
          {
            path: "/pages/admin/pendaftaranpkl/disetujui", //disetujui
            name: "AdminPendaftaranDisetujui",
            component: SubPendaftaranDisetujui,
          },
          {
            path: "/pages/admin/pendaftaranpkl/proses/satu/:id?",
            name: "AdminPendaftaranProsesSatu",
            component: SubProsesSatu,
          },
          {
            path: "/pages/admin/pendaftaranpkl/proses/dua",
            name: "AdminPendaftaranProsesDua",
            component: SubProsesDua,
          },
          {
            path: "/pages/admin/pendaftaranpkl/proses/dua/:id?",
            name: "AdminPendaftaranProsesDuaId",
            component: SubProsesDuaId,
          },
          {
            path: "/pages/admin/pendaftaranpkl/proses/tiga/:id?",
            name: "AdminPendaftaranProsesTiga",
            component: SubProsesTiga,
          },
        ],
      },
      {
        path: "/pages/admin/pendaftaranpkl/example",
        name: "AdminPendaftaranExample",
        component: AdminPendaftaranExample,
      },

      {
        path: `${prefix}/pengumuman/index`,
        name: `${prefixName}pengumuman-index`,
        meta: {
          title: "Pengumuman ",
          icon: "mdi-home",
          breadcrumb: {
            name: "Pengumuman",
            path: `${prefix}/pengumuman/index`,
            goto: `${prefixName}pengumuman-index`,
            params: {
              id: `id`,
            },
          },
        },
        component: () => import("@/views/admin/pengumuman/PengumumanIndex.vue"),
      },

      {
        path: `${prefix}/pengumuman/layout`,
        name: `${prefixName}pengumuman-layout`,
        meta: {
          title: "Pengumuman",
          icon: "mdi-home",
          breadcrumb: {
            name: "Pengumuman",
            path: `${prefix}/pengumuman/layout`,
            goto: `${prefixName}pengumuman-layout`,
          },
        },
        component: () => import("@/views/admin/pengumuman/Layout.vue"),
        redirect: `${prefix}/pengumuman/index`,
        children: [
          {
            path: `${prefix}/pengumuman/tambah`,
            name: `${prefixName}pengumuman-tambah`,
            meta: {
              title: "tambah",
              icon: "mdi-home",
              breadcrumb: {
                name: "tambah",
                path: `${prefix}/pengumuman/tambah`,
                goto: `${prefixName}pengumuman-tambah`,
              },
            },
            component: () =>
              import("@/views/admin/pengumuman/PengumumanTambah.vue"),
          },
          {
            path: `${prefix}/pengumuman/edit/:id`,
            name: `${prefixName}pengumuman-edit`,
            meta: {
              title: "Edit",
              icon: "mdi-home",
              breadcrumb: {
                name: "edit",
                path: `${prefix}/pengumuman/edit/:id`,
                goto: `${prefixName}pengumuman-edit`,
                params: {
                  id: `id`,
                },
              },
            },
            component: () =>
              import("@/views/admin/pengumuman/PengumumanEdit.vue"),
          },
        ],
      },
      {
        path: `${prefix}/settings`,
        name: `${prefixName}settings`,
        meta: {
          title: "Pengaturan",
          icon: "mdi-home",
          breadcrumb: {
            name: "Pengaturan",
            path: `${prefix}/settings`,
            goto: `${prefixName}settings`,
          },
        },
        component: () => import("@/views/admin/settings/SettingsIndex.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
