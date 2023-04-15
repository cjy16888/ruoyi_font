import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
//将 svgIcon 添加作为 vue 的组件（标签）
Vue.component('svg-icon', SvgIcon)

//将 svg 图标全部进行引出
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
