import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Music from '../pages/Music.vue'
import Portfolio from '../pages/Portfolio.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/music', name: 'music', component: Music },
  { path: '/portfolio', name: 'portfolio', component: Portfolio },
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
