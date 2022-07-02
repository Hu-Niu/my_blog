<template>
  <div id="app">
    <router-view/>

    <transition name="fade">
      <div class="back-top" v-show="isShowBackTop">
        <BackTop
            @backTopHandle="backTopHandle"
        />
      </div>
    </transition>

  </div>
</template>

<script>
import BackTop from "./components/BackTop/BackTop";
import {debounce} from '/src/lib/utilFn'

export default {
  name: 'App',
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backTopHandle() {
      window.scrollTo(0, 0)
    },
    // 当页面竖向滚动条 滚动 offset px时，显示返回顶部按钮
    showBackTopBtn() {
      let offset = 100;
      // 展示返回顶部按钮
      let scrollTop = document.documentElement.scrollTop; //当前的的位置
      scrollTop > offset ? this.isShowBackTop = true : this.isShowBackTop = false
    },
  },
  mounted() {
    window.addEventListener("scroll", debounce(() => {

      this.showBackTopBtn()

    }, 300));
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
