//获取我们需要的信息
const getters = {
  //注意，这个 User 大小写一定要和 store 下面的 index.js 中的 module 中导入的名字一致
  //不然的获取不到值，但是不会报错
  roles: state => state.User.roles,
  sidebarRouters:state => state.permission.sidebarRouters,
  sidebar: state => state.app.sidebar,
  //获取用户头像的地址
  avatar: state => state.user.avatar,
  permissions: state => state.user.permissions,
}


export default getters
