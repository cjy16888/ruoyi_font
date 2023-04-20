//导入依赖中的包 axios，进行发送请求使用
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { tansParams } from '@/utils/ruoyi'

// 是否显示重新登录（token过期）
export let isRelogin = { show: false };

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
  // get请求映射params参数
  // 如果是一个 get 请求，并且携带有 params 参数，那么进行 url 重新拼接
  if (config.method === 'get' && config.params) {
    //url 重新组装
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

//响应拦截器（优先级最高,拦截 service 的 axios 实例 发送的所有请求响应），对返回的 res 进行处理，这里只返回 data 给前端的方法
service.interceptors.response.use(res => {
  const code = res.data.code
  const msg = res.data.msg

  //前端访问后台的时候，加入没携带 token 的话，那么就会报错 401，需要进行重新 login
  if (code === 401) {
    if (!isRelogin.show) {
      //设置成为 true，避免请求出现多个 401 报错，那么每一个都会执行到这里，会出现多个请求重新登录的弹窗
      //避免重复弹出窗口
      isRelogin.show = true;
      //MessageBox和Message不一样，可以显示按钮
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //点击 重新登录 按钮成功之后，走的这个逻辑
        isRelogin.show = false;
        store.dispatch('LogOut').then(() => {
          //重定向到首页，但是因为已经 logout 了，token 被删除了，那么就会被 security 拦截，进行重新login
          location.href = '/index';
        })
      }).catch(() => {
        //出现异常，要把这个改为 false ，避免之后的 401 都捕获不到
        isRelogin.show = false;
      });
    }
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
}, //请求后端的时候，接口api发生异常的的时候，前端进行的处理方式，以及如何进行显示提示用户
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

//将 service 导出去，给其他文件进行使用
export default service
