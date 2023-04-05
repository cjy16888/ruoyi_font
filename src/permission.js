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
      next('/login')
    }
  }
})
