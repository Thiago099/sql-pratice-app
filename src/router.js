import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Action',
    component:  import('./components/action.vue')
  },
  {
    path: '/entity',
    name: 'Entity',
    component: () => import(/* webpackChunkName: "entity" */ './components/entity.vue')
  },
  {
    path: '/verb',
    name: 'Verb',
    component: () => import(/* webpackChunkName: "entity" */ './components/verb.vue')
  }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router