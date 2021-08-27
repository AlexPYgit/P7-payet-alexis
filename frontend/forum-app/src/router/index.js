import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import Welcome from "@/views/Home.vue";
import Post from "@/views/Subject.vue";


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Welcome
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
