import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import VueRouter from 'vue-router'
/* Layout */
// eslint-disable-next-line no-unused-vars
import Layout from '@/layout'

Vue.use(VueRouter)

//公共路由
export const constantRoutes = [
  {
    //URL 上面直接打的地址
    path: '/login',
    name: 'login',
    //隐藏，看 template 的渲染，默认是 false，不会触发隐藏
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    //'' 空就代表的是 '/'  或者
    path: '',
    name: 'Layout',
    //隐藏，看 template 的渲染，默认是 false，不会触发隐藏
    hidden: true,
    //这是 layout 下面的 index.vue
    component: Layout
  },
  {
    //显示 左菜单栏的 ‘首页’  title
    path: '/index',
    name: 'Index',
    //隐藏，看 template 的渲染，默认是 false，不会触发隐藏
    //true,就隐藏 首页，默认也是 false
    hidden: false,
    //这是 layout 下面的 index.vue
    component: () => import('@/views/index'),
    //展示的内容
    meta: {
      title: '首页',
      icon: 'dashboard'
    }
  },
]

const router = new VueRouter({
  routes: constantRoutes,
  mode: 'history', // 去掉url中的#
})

export default router

