<template>
      <div
        @click="toggleClick"
      >
        <svg-icon
          :class="{'is-collapse': isCollapse}"
          class="side-trigger"
          icon-class="menu"
        />
      </div>
</template>

<script>
export default {
  name: "SideTrigger",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.side-trigger {
  cursor: pointer;
  width: 20px;
  height: 20px;
  transition: .38s;
  transform-origin: 50% 50%;
  font-size: 20px;
  color: #000000;
  &.is-collapse {
    transform: rotate(90deg);
  }
}
</style>
