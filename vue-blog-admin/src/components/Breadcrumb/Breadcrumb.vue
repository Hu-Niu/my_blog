<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">

    <el-breadcrumb-item
      v-for="(item, index) in breadList"
      :key="item.path"
    >
      <span v-if="index === breadList.length-1" class="current-page">{{ item.meta.title }}</span>
      <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    breadList: {
      type: Array,
      default: () => [],
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;

  .current-page {
    color: #97a8be;
    cursor: text;
  }
}
</style>
