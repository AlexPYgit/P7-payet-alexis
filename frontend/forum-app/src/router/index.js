import { createRouter, createWebHistory } from 'vue-router'
// import Login from '../views/Home.vue'
import Signup from '../views/Inscription.vue'
import Login from "@/views/testLogin.vue";

const routes = [
  {
    path: '/',
    name: 'testLogin',
    component: Login
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Login
  // },
  {
    path: '/signup',
    name: 'Inscription',
    component:Signup
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
