<template>
  <div class="dynamic-container">
    <!--  座右铭  -->
    <p class="motto"> <strong>本页是静态页面，功能正在开发中...</strong> </p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :before-leave="beforeLeaveHandle">
      <el-tab-pane label="网站首页" name="home" class="home-btn"/>
      <el-tab-pane label="动态" name="dynamic">

        <!--   贡献度     -->
        <div class="contribution">
          <Contribution
            @clickGrid="clickGrid"
            @changeYear="changeYear"
          />
        </div>

        <!--    贡献度详情    -->
        <div class="contribution-desc" v-if="time">
          <ContributionDesc/>
        </div>

        <!--    动态列表    -->
        <div class="dynamic-list" v-else>
          <DynamicList/>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Contribution from "../../components/Contribution/Contribution";
import ContributionDesc from "../../components/ContributionDesc/ContributionDesc";
import DynamicList from "../../components/DynamicList/DynamicList";

export default {
  name: "Dynamic",
  props: {},
  components: {
    Contribution,
    ContributionDesc,
    DynamicList,
  },
  data() {
    return {
      activeName: 'dynamic',
      time: '',
    }
  },
  methods: {
    handleClick(e) {
      console.log(e.name, 'e.name')
    },
    beforeLeaveHandle(activeName, oldActiveName) {
      if (activeName === 'home') {
        this.$router.push('/')
        return false
      }
    },
    clickGrid(val) {
      this.time = val
    },
    changeYear(val) {
      console.log(val)
    },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "Dynamic";
</style>
