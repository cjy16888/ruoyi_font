// main.js: 入口 js 文件，影响全局，作用是引入全局使用的库、公共的样式和方法、设置路由等。
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
//需要将 permission.js 手动引进到 main.js 实现全局配置，不然不会进行生效的
import './permission' // permission control
import plugins from '@/plugins'

import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import '@/assets/icons'
import rightToolbar from '@/components/RightToolbar'


import resetForm from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination";
// 字典数据组件
import DictData from '@/components/DictData'

import { addDateRange } from '@/utils/ruoyi'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(plugins)
Vue.component('RightToolbar',rightToolbar)
//全局使用  字典数据
DictData.install()

// 全局方法挂载
Vue.prototype.addDateRange = addDateRange
Vue.component('Pagination', Pagination)
Vue.prototype.resetForm = resetForm

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
