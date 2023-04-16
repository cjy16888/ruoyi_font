<template>
  <div class="navbar">
    <!--隐藏菜单栏-->
    <hamburger
      class="hamburger-container"
      @toggleClick="toggleSideBar"
      :is-active="sidebar.opened" >
    </hamburger>
    <!--面包屑-->
    <breadcrumb></breadcrumb>
    <!--右边的菜单-->
    <div class="right-menu">
      <template>
        <header-search class="right-menu-item hover-effect"></header-search>

        <el-tooltip content="源码地址" effect="dark" placement="bottom">
          <ruo-yi-git class="right-menu-item hover-effect"/>
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip>

        <screenfull class="right-menu-item hover-effect"></screenfull>

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect"></size-select>
        </el-tooltip>
      </template>

      <!--头像-->
      <!--以及点击头像之后，显示的  下拉框-->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--用户头像地址 src, 因为 avatar 头像获取错误，导致页面连 navbar 都显示，所以删除了 src-->
          <!--自己去检查 avatar 的地址，以及debug校验-->
          <!--<img :src="avatar" class="user-avatar">-->
          <img class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--<router-link to="/user/profile">-->
            <el-dropdown-item>个人中心</el-dropdown-item>
          <!--</router-link>-->
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import breadcrumb from '@/components/Breadcrumb'
import HeaderSearch from '@/components/HeaderSearch'
import RuoYiDoc from '@/components/RuoYi/Doc'
import RuoYiGit from '@/components/RuoYi/Git'
import Screenfull from '@/components/Screenfull'
import sizeSelect from '@/components/SizeSelect'

export default {
  components: {
    Screenfull,
    RuoYiGit,
    RuoYiDoc,
    HeaderSearch,
    Hamburger,
    breadcrumb,
    sizeSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      }).catch(() => {});
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      //右边的菜单
      //展示成 一行，不是 一列
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
