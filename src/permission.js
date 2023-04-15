import router from '@/router'
import { getToken } from '@/utils/auth'
import store from './store'
import { Message } from 'element-ui'

//自定义白名单
const whiteList =['/login']

//router 的钩子函数
router.beforeEach((to, from, next) => {
  //判断 登录凭证 token 是否存在
  if (getToken()){
    if (to.path === '/login'){
      //就算直接访问的 login，登录成功之后，再拦截，token 有了，就会跳到 /
      next('/')
    } else {
      //如果用户信息为 null，就访问后台获取用户信息，因为找到这里， token 已经有了
      //避免每一次请求新的路径都要进行请求一次 GetInfo，只需要访问一次一次得到用户信息进行存储起来就可以了
      if (store.getters.roles.length === 0){
        console.log("getInfo", "获取用户信息")
        //访问 user.js 中的 getInfo 方法，对后端进行获取用户的详细的信息
        store.dispatch('GetInfo').then(res => {
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            console.log("getInfo", res + accessRoutes)
            next()
          })
        }).catch(err => {
          Message.error(err)
        })
      }else {
        next()
      }
    }
  }else {
    //访问的路径位于白名单上
    if (whiteList.indexOf(to.path) !== -1){
      next()
    }else {
      //没有token，跳转到 login 登录
      // fullPath 是包括了我们访问路径携带的参数，get请求
      // 记录它为了我们重定向 login 并且登录通过之后，我们可以跳转到之前访问被拦截的页面
      // 注意，这个是 `` （ESC 下面的那个按键）,不是单引号
      //让 login.vue 里面的监听函数 watch 监听到 fullPath 路径
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})
