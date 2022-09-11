import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'
import CreateNewUser from '../views/CreateNewUser.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'create-new-user',
      component: CreateNewUser
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile 
    }
  ]
})

export default router
