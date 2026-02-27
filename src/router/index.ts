import CartPage from '@/components/products/CartPage.vue'
import HomeView from '@/views/HomeView.vue'
import Upload from '@/views/Upload.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
  
  ]
})

export default router
