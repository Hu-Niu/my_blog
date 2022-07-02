<template>
  <div class="top-right-btn">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="hideSearch ? '显示搜索' : '隐藏搜索'" placement="bottom">
        <el-button circle icon="el-icon-search" @click="toggleSearch"/>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
        <el-button circle icon="el-icon-refresh" @click="refresh"/>
      </el-tooltip>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "RightToggleBar",
  props: {
    hideSearch: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    toggleSearch() {
      this.$emit('toggleSearch')
    },
    refresh() {
      this.$emit('refresh')
    },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.top-right-btn {
  float: right;
  margin-right: 20px;
  .el-button {
    padding: 5px !important;
  }
}
</style>
