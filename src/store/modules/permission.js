// import router, { constantRoutes, dynamicRoutes } from '@/router'
import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'


const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []   //封装路由到这里面，然后传递到 Sidebar index.vue
  },
  mutations: {
    // SET_ROUTES: (state, routes) => {
    //   state.addRoutes = routes
    //   state.routes = constantRoutes.concat(routes)
    // },
    // SET_DEFAULT_ROUTES: (state, routes) => {
    //   state.defaultRoutes = constantRoutes.concat(routes)
    // },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      //返回数据
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          // const sdata = JSON.parse(JSON.stringify(res.data))
          // const rdata = JSON.parse(JSON.stringify(res.data))
          // const sidebarRoutes = filterAsyncRouter(sdata)
          // const rewriteRoutes = filterAsyncRouter(rdata, false, true)
          // const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
          // rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
          // router.addRoutes(asyncRoutes);
          // commit('SET_ROUTES', rewriteRoutes)
          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(res.data))
          // commit('SET_DEFAULT_ROUTES', sidebarRoutes)
          // commit('SET_TOPBAR_ROUTES', sidebarRoutes)
          resolve(res)
        })
      })
    }
  }
}

export default permission
