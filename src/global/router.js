import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Action',
    color:'orange',
    component:  import('../views/action.vue')
  },
  {
    path: '/instance',
    name: 'Instance',
    color: 'rgb(0,255,128)',
    component: () => import(/* webpackChunkName: "entity" */ '../views/instance.vue')
  },
  {
    path: '/process',
    name: 'Process',
    color: 'rgb(0, 128, 255)',
    component: () => import(/* webpackChunkName: "entity" */ '../views/process.vue')
  },
  {
    path: '/entity',
    name: 'Entity',
    color: 'cyan',
    component: () => import(/* webpackChunkName: "entity" */ '../views/entity.vue')
  },
  {
    path: '/verb',
    name: 'Verb',
    color: 'yellow',
    component: () => import(/* webpackChunkName: "entity" */ '../views/verb.vue')
  },
  {
    path: '/group',
    name: 'Group',
    color: 'red',
    component: () => import(/* webpackChunkName: "entity" */ '../views/group.vue')
  }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router