<template>
  <div class="back-top-container">
    <div class="back-top-box" @click="backTopHandle">
      <svg-icon icon-class="back-top"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {
    backTopHandle(){
      this.$emit('backTopHandle')
    },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "BackTop";
</style>
