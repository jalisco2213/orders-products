import { createRouter, createWebHistory } from 'vue-router';
import OrdersView from '../views/OrdersView.vue';
import ProductsView from '../views/ProductsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders',
      component: OrdersView
    },
    {
      path: '/group',
      name: 'group',
      component: ProductsView
    }
  ]
})

export default router
