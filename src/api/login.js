//导入 request.js 中的 axios 实例,  下面的 request 名字可以随便换
import request from '@/utils/request'

//获取验证码图片
export function getCondeImg() {
  //发送请求，使用 request.js 中的 axios 实例
  return request({
    // url 不进行覆盖，进行拼接
    //访问的就是 localhost:8081/dev-api/captchaImage
    url: '/captchaImage',
    method: 'get',
    //这个不设置的话，用的就是 request 中，可以覆盖
    //请求的超时时间
    timeout: 20000,
    headers: {
      isToken: false
    },
  })
}

//进行登录的验证
export function login(username, password, code, uuid) {
  //类似 数组（集合） 的意思
  const data = {
    username,
    password,
    code,
    uuid
  }
  //发送请求，使用 request.js 中的 axios 实例
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}
