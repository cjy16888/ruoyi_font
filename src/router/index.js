import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import VueRouter from 'vue-router'
/* Layout */
// eslint-disable-next-line no-unused-vars
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    //URL 上面直接打的地址
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    //'' 空就代表的是 '/'  或者 ‘/index’
    path: '',
    name: 'Layout',
    //这是 layout 下面的 index.vue
    component: Layout
  }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history', // 去掉url中的#
})

export default router

