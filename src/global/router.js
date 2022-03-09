import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Action',
    component:  import('../views/action.vue')
  },
  {
    path: '/entity',
    name: 'Entity',
    component: () => import(/* webpackChunkName: "entity" */ '../views/entity.vue')
  },
  {
    path: '/verb',
    name: 'Verb',
    component: () => import(/* webpackChunkName: "entity" */ '../views/verb.vue')
  },
  {
    path: '/group',
    name: 'group',
    component: () => import(/* webpackChunkName: "entity" */ '../views/group.vue')
  }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router