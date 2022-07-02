<template>
  <div class="choose-img-container">
    <div
      class="choose-img"
      v-if="!currentCoverUrl"
      @click="chooseImgHandle"
    >
      <svg-icon icon-class="plus"/>
    </div>
    <div
      class="img-box"
      v-else
      @mouseenter="deleteIconIsShow = true"
      @mouseleave="deleteIconIsShow = false"
    >
      <div
        class="delete-icon"
        v-show="deleteIconIsShow"
        @click="removeCoverHandle"
      >
        <svg-icon icon-class="delete"/>
      </div>
      <el-image
        style="width: 100%; height: 100%"
        :src="currentCoverUrl"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChooseImg",
  props: {
    currentCoverUrl: {
      type: String,
      default: () => ''
    }
  },
  components: {},
  data() {
    return {
      deleteIconIsShow: false,
    }
  },
  methods: {
    removeCoverHandle() {
      this.$emit('removeCoverHandle')
    },
    chooseImgHandle() {
      this.$emit('chooseImgHandle')
    },
  },
  computed: {},
  watch: {},
  mounted() {
  },
  created() {
  },
}
</script>

<style scoped lang="scss">
@import "ChooseImg";
</style>
