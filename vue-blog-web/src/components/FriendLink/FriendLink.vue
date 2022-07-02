<template>
  <div class="friend-link-container">
    <h2>{{title}}</h2>
    <ul>
      <li
        v-for="item in list"
        :key="item.uid"
        @click="toFriendLinkHandle(item.link_address)"
      >{{item.link_name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FriendLink",
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
      toFriendLinkHandle(url) {
          this.$emit('toFriendLinkHandle',url)
      }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "FriendLink";
</style>
