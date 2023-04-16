import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import getters from '@/store/getters'
import permission from '@/store/modules/permission'
import settings from '@/store/modules/settings'
import app from '@/store/modules/app'
import tagsView from '@/store/modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  //相当于 pom 文件的 子模块导入
  modules: {
    User,
    permission,
    settings,
    app,
    tagsView
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
