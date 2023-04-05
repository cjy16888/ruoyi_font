import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    //'' 空就代表的是 '/'
    path: '',
    name: 'Layout',
    //这是 layout 下面的 index.vue
    component: layout
  }
]

const router = new VueRouter({
  routes
})

export default router
