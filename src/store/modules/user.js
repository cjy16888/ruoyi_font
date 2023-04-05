import { login } from '@/api/login'
import { getToken, setToken, } from '@/utils/auth'

//类似 java定义一个实体对象，接受数据用的，vo 数据
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  //相当于是 get、set方法，给上面定义的属性进行赋值
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    //我们具体执行的逻辑
    // 登录，下面的是参数，api，固定的写法
    // userInfo 是传递过来的数据
    // actions 方法调用 mutations，使用的中介方法api是 commit
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      //promise 对象，给调用这个方法的对象返回结果，供给它进行下一步的处理
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
          //调用 mutations 方法
          commit('SET_TOKEN', res.token)
          //相当于 return 返回结果,() 表示返回的数据
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(res => {
    //       const user = res.user
    //       const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
    //       if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', res.roles)
    //         commit('SET_PERMISSIONS', res.permissions)
    //       } else {
    //         commit('SET_ROLES', ['ROLE_DEFAULT'])
    //       }
    //       commit('SET_NAME', user.userName)
    //       commit('SET_AVATAR', avatar)
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // 退出系统
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       commit('SET_PERMISSIONS', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        // removeToken()
        resolve()
      })
    }
  }
}

//导出去，不然别人使用不了
export default user
