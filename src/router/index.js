import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path : '/', name : 'HomePage', component : () => import('@/components/HomePage.vue')  },
  { path : '/about', name : 'AboutPage', component : () => import('@/components/AboutPage.vue')  },
  { path : '/basin', name : 'GangaBasin', component : () => import('@/Dashboards/GangaBasin.vue')  },
  { path : '/quality', name : 'WaterQuality', component : () => import('@/Dashboards/WaterQuality.vue')  },
  { path : '/flood', name : 'FloodHazard', component : () => import('@/Dashboards/FloodHazard.vue') },
  { path : '/solid', name : 'SolidWaste', component : () => import('@/Dashboards/SolidWaste.vue')  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router;
