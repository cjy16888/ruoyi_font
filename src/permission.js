import router from '@/router'
import { getToken } from '@/utils/auth'

//自定义白名单
const whiteList =['/login']

//router 的钩子函数
router.beforeEach((to, from, next) => {
  //判断 登录凭证 token 是否存在
  if (getToken()){
    next()
  }else {
    //访问的路径位于白名单上
    if (whiteList.indexOf(to.path) !== -1){
      next()
    }else {
      //没有token，跳转到 login 登录
      // fullPath 是包括了我们访问路径携带的参数，get请求
      // 记录它为了我们重定向 login 并且登录通过之后，我们可以跳转到之前访问被拦截的页面
      // 注意，这个是 `` （ESC 下面的那个按键）,不是单引号
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})
