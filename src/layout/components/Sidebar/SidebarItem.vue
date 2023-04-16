<template>
  <div v-if="!item.hidden">
    <!--这里的是  ‘首页’  的设置，只有一个 children 的时候，进行展示-->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!--点击菜单目录的路由地址，以及跳转到对应的地址-->
      <!--这个 resolvePath 为了页面返回的时候，能正常进行回到之前的路由，并且展示数据-->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <!--index 取值是为了避免每一个目录都是一样的，因为点击展开的时候，index 一样的话，会全部进行展开-->
        <!--展示 菜单栏目录的 menu-item-->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" >
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!--index 取值是为了避免每一个目录都是一样的，因为点击展开的时候，index 一样的话，会全部进行展开-->
    <!--index 不一样的话，只会展开我们点击的 index 那个的菜单-->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <!--展示的是 父级目录-->
        <!--通过 item.vue （item标签） 进行数据的 vo 展示的修改-->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!--进行递归遍历子目录-->
      <!--resolvePath  路径拼接-->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  //接收 sidebar 下的 index.vue 传递过来的 左侧菜单栏 数据，进行展示
  props: {
    // route object
    item: {
      //左侧的每一个目录都是一个对象 VO
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    //如果直接是  父目录，没有child的话，直接展示当前的 目录的路由的内容
    //如果还有child的话，就展开目录，并且进行 hidden，不会页面展示的内容不会发生更改
    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    //进行跳转的路径的拼接
    resolvePath(routePath, routeQuery) {
      //isExternal，校验路径是否正确
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      if (routeQuery) {
        let query = JSON.parse(routeQuery);
        return { path: path.resolve(this.basePath, routePath), query: query }
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

