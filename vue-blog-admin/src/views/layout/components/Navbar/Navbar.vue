<template>
  <div class="navbar-container">
    <!--  侧边栏切换按钮 控制侧边栏显示、隐藏    -->
    <SideTrigger
        :is-collapse="isCollapse"
        @toggleClick="toggleClick"
        class="side-trigger-container"
    />

    <!--  面包屑导航，显示当前页面  -->
    <Breadcrumb class="breadcrumb-container" :breadList="breadList"/>

    <!--  右侧的功能菜单，门户网站、gitee源码、全屏显示、我的  -->
    <ul class="right-menu">
      <li>
        <el-tooltip content="门户页面" effect="dark" placement="bottom">
          <svg-icon icon-class="website"/>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip content="Gitee源码" effect="dark" placement="bottom">
          <svg-icon icon-class="gitee"/>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <svg-icon icon-class="doc"/>
        </el-tooltip>
      </li>
      <li @click="fullScreenHandel">
        <el-tooltip content="全屏" effect="dark" placement="bottom">
          <svg-icon icon-class="fullscreen"/>
        </el-tooltip>
      </li>
      <li>
        <el-dropdown
            trigger="click"
            class="profile-container"
        >
          <div class="profile-wrapper">
            <img
                style="width: 30px;height: 30px"
                :src="loginUser.user_profile" alt="">
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toPathHandle('/system/aboutMe')">关于我</el-dropdown-item>
            <el-dropdown-item divided @click.native="logoutHandle">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>

  </div>
</template>

<script>
import SideTrigger from '/src/components/SideTrigger/SideTrigger'
import Breadcrumb from '/src/components/Breadcrumb/Breadcrumb'
import screenfull from 'screenfull'

import {mapMutations} from 'vuex'
import {appMutation, userMutation} from "../../../../store/mutation-types";

export default {
  name: "Navbar",
  props: {
    breadList: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    SideTrigger,
    Breadcrumb,
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations([
      appMutation.TOGGLE_SIDEBAR,
      userMutation.CLEAR_TOKEN,
      appMutation.REMOVE_ALL_TAGS,
    ]),


    toPathHandle(url) {
      this.$router.push(url)
    },

    async logoutHandle() {
      /**
       * 1、清除所有本地缓存中的信息 token、userInfo等等
       * 3、跳转到登录页
       */
      console.log('退出登录')
      await this.$store.dispatch('clearAll')
      await this.$router.push('/login')
    },

    /**
     * @description 切换侧边导航显示或隐藏
     */
    toggleClick() {
      this[appMutation.TOGGLE_SIDEBAR]()
    },

    fullScreenHandel() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.sidebar.isCollapse
    },
    loginUser() {
      return this.$store.state.user.loginUserInfo
    },
  },
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "./Navbar";
</style>
