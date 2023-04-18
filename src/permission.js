import router from '@/router'
import { getToken } from '@/utils/auth'
import store from './store'
import { Message } from 'element-ui'
import { isRelogin } from '@/utils/request'

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
        isRelogin.show = true
        console.log("getInfo", "获取用户信息")
        //访问 user.js 中的 getInfo 方法，对后端进行获取用户的详细的信息
        store.dispatch('GetInfo').then(() => {
          isRelogin.show = false
          //访问后端的接口，getRoutes，获取 菜单栏数据
          store.dispatch('GenerateRoutes').then(accessRoutes => {
            console.log("getInfo 路由", accessRoutes)
            //为了直接在 当前页面请求，相当于 children 页面，sidebar 那些不动
            //更换 app-main 的页面的内容
            // 根据roles权限生成可访问的路由表
            //异步请求，add成功之后，马上进行访问
            // router.addRoutes(accessRoutes)
            // accessRoutes.forEach(res=>{ // 动态添加可访问路由表
            //   router.addRoute(res);
            // })
            //会进行多次 beforeEach 死循环，等到获取到了 role ，就会调到下面的 else 语句中，执行 next() 结束
            // next({...to})  //保证动态路由加载完成，不然刷新页面会白屏
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
