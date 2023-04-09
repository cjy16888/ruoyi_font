//导入依赖中的包 axios，进行发送请求使用
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// 创建axios实例,类似 java 中的封装，工具类
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //从文件， .env.development 中进行获取值
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间,10s
  timeout: 10000
})

//api中的js文件，就是对后端进行发送请求的
//请求拦截器
service.interceptors.request.use(config => {
  console.log("请求拦截器", config)
  //这个是用来辨别哪一个请求需要我们进行携带 token 的值，我们在对后端发送请求的时候，axios 进行自定义  headers
  //true 代表的是该请求需要进行携带 token
  const isToken = (config.headers || {}).notToken === false
  if (getToken() && !isToken) {
    //注意这个 ‘Bearer ’  r后面有一个空格，不能少
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
})

//响应拦截器（优先级最高,拦截 service 的 axios 实例 发送的所有请求响应），对返回的 res 进行处理，这里只返回 data 给前端的方法
service.interceptors.response.use(res => {
  const code = res.data.code
  const msg = res.data.msg

  //前端访问后台的时候，加入没携带 token 的话，那么就会报错 401，需要进行重新 login
  if (code === 401) {
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  }
  if (code === 500){
    //这个是 element-ui 组件提供的一个 api，可以直接在页面的顶部进行提示信息，message
    Message({
      message: msg,
      type: 'error'
    })
    //返回异常信息，显示到页面，promise 对象类似后端的  Result 对象
    return Promise.reject(new Error(msg))
  }else if (code !== 200){
    return Promise.reject(new Error(msg))
  }else {
    return res.data
  }
})

//将 service 导出去，给其他文件进行使用
export default service
