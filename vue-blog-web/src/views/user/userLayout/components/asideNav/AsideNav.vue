<template>
  <div class="aside-nav-container">
    <el-menu
        :default-active="$route.path"
    >
      <el-menu-item
          v-for="item in menuList"
          :key="item.name"
          @click="navigatorTo(item)"
          :index="item.url"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
<!--      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideNav",
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    navigatorTo(item) {
      this.$emit('navigatorTo', item)
    }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "AsideNav";
</style>
