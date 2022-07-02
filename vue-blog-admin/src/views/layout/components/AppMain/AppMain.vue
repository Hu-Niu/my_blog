<template>
  <section class="app-main">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="keepAliveIncludes">
        <router-view :key="key"/>
      </keep-alive>
<!--      <router-view/>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    key() {
      return this.$route.name;
    },
    keepAliveIncludes(){
      return this.$store.state.app.keepAliveIncludes
    },
  },
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "./AppMain";
</style>
