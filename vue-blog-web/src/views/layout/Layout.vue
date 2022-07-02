<template>
  <div class="layout-container">
    <!--  头部导航  -->
    <header>
      <HeaderNav
        :navList="navList"
      >
        <div slot="logo" class="logo" @click="$router.push('/')">Hu-Niu' blog</div>
      </HeaderNav>
    </header>
    <!--  内容展示  -->
    <main>
      <router-view/>
    </main>
    <!--  网站底部  -->
    <footer>
      <FooterNav/>
    </footer>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav/HeaderNav";
import FooterNav from "./components/FooterNav/FooterNav";

import router from "../../router";

export default {
  name: "Layout",
  props: {},
  components: {
    HeaderNav,
    FooterNav,
  },
  data() {
    return {
      navList: [],
    }
  },
  methods: {
    initNavList() {
      /**
       * 1、找出 isNavigationBar: true
       * {
       *    path: '/home',
       *    name: 'Home',
       *    meta: {title: '首页'},
       *  },
       *
       */
      let resultArr = []

      router.options.routes[0].children.map(item => {

        if (item.isNavigationBar) { // 若果是
          let tempObj = {
            path: item.path,
            name: item.name,
            meta: item.meta,
          }
          resultArr.push(tempObj)
        }
      })

      this.navList = resultArr

    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.initNavList()
  }
}
</script>

<style scoped lang="scss">
@import "Layout";
</style>
