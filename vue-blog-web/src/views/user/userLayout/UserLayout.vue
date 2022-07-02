<template>
  <div class="user-layout-container">
    <header>返回个人主页</header>
    <main class="user-setting-box">
      <aside>
        <AsideNav
            :menuList="menuList"
            @navigatorTo="navigatorTo"
        />
      </aside>
      <main>
        <router-view/>
      </main>
    </main>
  </div>
</template>

<script>
import AsideNav from "./components/asideNav/AsideNav";
import router from "/src/router";

export default {
  name: "UserLayout",
  props: {},
  components: {
    AsideNav
  },
  data() {
    return {
      menuList: [], // 从router中解析侧边栏导航数据
    }
  },
  methods: {
    initSideMenu() {

      /**
       * 1、获取配置的所有路由文件
       * 2、找到设置模块下的配置的子路由，即 路径为 /user/settings 的子路由
       * 3、初始化侧边栏
       *   "name": meta.title,
       *   "icon": meta.icon,
       *   "url": path,
       *   "uid": name
       */
      let resultArr = []
      // 1、获取配置的所有路由文件
      const routers = router.options.routes[0].children
      // 2、找到设置模块下的配置的子路由
      const findRouterOfSetting = routers.find(item => item.path === '/user/settings')

      // 3、初始化侧边栏数据
      findRouterOfSetting.children.map(item => {
        resultArr.push({
          name: item.meta.title,
          icon: item.meta.icon,
          url: item.path,
          uid: item.name,
        })
      })
      this.menuList = resultArr
    },
    navigatorTo(item) {
      this.$router.push({path: item.url})
    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.initSideMenu()
  }
}
</script>

<style scoped lang="scss">
@import "UserLayout";
</style>
