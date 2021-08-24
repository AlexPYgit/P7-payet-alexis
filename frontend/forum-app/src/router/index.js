import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Inscription.vue'
import Login from "@/views/testLogin.vue";
import Welcome from "@/views/Home.vue";
import Post from "@/views/Subject.vue";


const routes = [
  {
    path: '/',
    name: 'testLogin',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Welcome
  },
  {
    path: '/signup',
    name: 'Inscription',
    component:Signup
  },
  {
    path: '/subject',
    name: 'Subject',
    component: Post,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
