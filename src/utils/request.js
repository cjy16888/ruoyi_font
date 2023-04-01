//导入依赖中的包 axios，进行发送请求使用
import axios from 'axios'

// 创建axios实例,类似 java 中的封装，工具类
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //从文件， .env.development 中进行获取值
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间,10s
  timeout: 10000
})

//响应拦截器（优先级最高,拦截 service 的 axios 实例 发送的所有请求响应），对返回的 res 进行处理，这里只返回 data 给前端的方法
service.interceptors.response.use(res => {
  return res.data
})

//将 service 导出去，给其他文件进行使用
export default service
