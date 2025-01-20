import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/performance',
      name: 'performance',
      component: () => import('../views/PerformanceView.vue'),
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('../views/CampaignsView.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/MessageView.vue'),
    },
    {
      path: '/sales',
      name: 'sales',
      component: () => import('../views/SalesView.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/DemoView.vue'),
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/FeedbackView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpView.vue'),
    },
  ],
})

export default router
