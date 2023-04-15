<template>
  <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"

        :background-color="settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="settings.sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--遍历 SideBarItem 中 的获取的菜单目录，进行展示-->
        <!--遍历 sidebarRouters ，因为获取的 json 数据，有多个组合，类似集合list， route 相当于获取list集合的元素对象-->
        <!--这里的意思是：将下面的接受到的数据进行遍历，然后因为使用的是 sidebar-item ，所以讲数据传递到 sideBarItem 中-->
        <!--sideBarItem 通过 props 进行接受对应的参数就行了-->
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path  + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss"

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(["settings"]),
    //使用后端获取的数据，vuex的语法糖
    ...mapGetters(["sidebarRouters"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {

      return variables;
    },
    // isCollapse() {
    //   return !this.sidebar.opened;
    // }
  }
};
</script>
