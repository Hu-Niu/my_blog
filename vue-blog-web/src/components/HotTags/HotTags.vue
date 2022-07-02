<template>
  <div class="hot-tags-container">
    <h2>{{title}}</h2>
    <ul>
      <li
        v-for="item in list"
        :key="item.uid"
        @click="toArticleListHandle(item.uid,'blogTag')"
      >{{ item.tag_name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "HotTags",
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
      toArticleListHandle(uid,type) {
          this.$emit('toArticleListHandle', {uid,type})
      },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "HotTags";
</style>
