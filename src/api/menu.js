import request from '@/utils/request'

// 获取路由
// 菜单目录的路由地址
// 获取左侧菜单栏的所有的信息
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}
