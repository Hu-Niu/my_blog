<template>
  <div class="third-recommend-container">
    <h2>{{title}}</h2>
    <ul>
      <li
        v-for="item in list"
        :key="item.uid"
      >
        <el-image
          style="width: 100%;height: 100%;"
          :src="item.cover_url"
          :alt="item.blog_title"
        />
        <div class="content">
          <p>{{item.blog_title}}</p>
          <div @click="toArticleDetailHandle(item.uid)">阅读</div>
        </div>
        <div class="mask"></div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "ThirdRecommend",
  props: {
    title: {
      type: String,
      default: () => ''
    },
    list: {
      type: Array,
      default: () => []
    },
  },
  components: {},
  data() {
    return {

    }
  },
  methods: {
      toArticleDetailHandle(uid) {
          this.$emit('toArticleDetailHandle', uid)
      },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "ThirdRecommend";
</style>
