import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
// import Music from '../pages/Music.vue'        // added in Task 2
// import Portfolio from '../pages/Portfolio.vue' // added in Task 3

const routes = [
  { path: '/', name: 'home', component: Home },
  // { path: '/music', name: 'music', component: Music },           // added in Task 2
  // { path: '/portfolio', name: 'portfolio', component: Portfolio }, // added in Task 3
  { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
