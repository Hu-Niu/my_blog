<template>
  <div class="section-blog-tree-container">
    <el-input
        placeholder="输入关键字进行过滤"
        clearable
        v-model="filterText">
    </el-input>

    <el-tree
        class="filter-tree"
        :data="specialPartSectionTreeData"
        :props="defaultProps"
        accordion
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        ref="tree">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "SectionBlogTree",
  props: {
    specialPartSectionTreeData: {
      type: Array,
      default: () => []
    },
  },
  components: {},
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data){
      if(data.isSpecialPartSection){
        this.$emit('handleNodeClick',data)
      }
    },
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "SectionBlogTree";
</style>
