import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import VueRouter from 'vue-router'
/* Layout */
// eslint-disable-next-line no-unused-vars
import Layout from '@/layout'
import Router from 'vue-router'

Vue.use(VueRouter)

//公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
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
    hidden: false,
    //这是 layout 下面的 index.vue
    component: Layout,
    //访问界面的时候，直接跳转到 index，而不是上面的 ‘’
    redirect: '/index',
    //在 Layout 的界面下，单独的刷新 /index 请求，到 app-main 中
    children: [
      {
        //显示 左菜单栏的 ‘首页’  title
        path: '/index',
        name: 'Index',
        //隐藏，看 template 的渲染，默认是 false，不会触发隐藏
        //true,就隐藏 首页，默认也是 false
        hidden: false,
        component: () => import('@/views/index'),
        //展示的内容
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      },
    ]
  },
  //这样单独写的话，点击首页会跳转到新的页面，我们需要在 app-main 中更换界面就行了，sidebar这些不需要进行更新
  // {
  //   //显示 左菜单栏的 ‘首页’  title
  //   path: '/index',
  //   name: 'Index',
  //   //隐藏，看 template 的渲染，默认是 false，不会触发隐藏
  //   //true,就隐藏 首页，默认也是 false
  //   hidden: false,
  //   //这是 layout 下面的 index.vue
  //   component: () => import('@/views/index'),
  //   //展示的内容
  //   meta: {
  //     title: '首页',
  //     icon: 'dashboard'
  //   }
  // },
]


// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [

]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: constantRoutes,
  mode: 'history', // 去掉url中的#
})

export default router

