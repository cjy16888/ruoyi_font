import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  //相当于 pom 文件的 子模块导入
  modules: {
    User
  },
  getters
})


// const store = new Vuex.Store({
//   modules: {
//     user,
//   },
//   getters
// })
//
// export default store
