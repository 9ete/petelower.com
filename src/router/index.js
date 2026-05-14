import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Music from '../pages/Music.vue'
import Portfolio from '../pages/Portfolio.vue'
import Contact from '../pages/Contact.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/music', name: 'music', component: Music },
  { path: '/portfolio', name: 'portfolio', component: Portfolio },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
