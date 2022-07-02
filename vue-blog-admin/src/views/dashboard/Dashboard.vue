<template>
  <div class="dashboard-editor-container">
    <!--  右上角github图标  -->
    <el-tooltip content="Github源码" effect="dark" placement="bottom">
      <GithubCorner style="position: absolute; top: 0; border: 0; right: 0;"></GithubCorner>
    </el-tooltip>

    <!--  顶部内容  -->
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="panel-ico icon-ip">
            <svg-icon icon-class="eye" class-name="card-panel-icon"/>
          </div>
          <div class="panel-desc">
            <div class="card-panel-text">今日IP数：</div>
            <CountTo class="card-panel-num" :endVal="100" :duration="3200"></CountTo>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="panel-ico icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="panel-desc">
            <div class="card-panel-text">用户数：</div>
            <CountTo class="card-panel-num" :endVal="100" :duration="3000"></CountTo>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="panel-ico icon-comment">
            <svg-icon icon-class="message" class-name="card-panel-icon"/>
          </div>
          <div class="panel-desc">
            <div class="card-panel-text">评论数：</div>
            <CountTo class="card-panel-num" :endVal="100" :duration="3200"></CountTo>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="panel-ico icon-article">
            <svg-icon icon-class="form" class-name="card-panel-icon"/>
          </div>
          <div class="panel-desc">
            <div class="card-panel-text">文章数：</div>
            <CountTo class="card-panel-num" :endVal="100" :duration="3200"></CountTo>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--  仿gitee贡献度 文章贡献度 -->
    <el-row class="contribution-container" :gutter="40">
      <el-col :xs="24" :sm="24" :lg="17">
        <!--   贡献度     -->
        <Contribution></Contribution>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="7">
        <!--   动态     -->
        <Dynamic></Dynamic>
      </el-col>
    </el-row>

    <!--  分类饼图  -->
    <el-row :gutter="32" class="category-container">
      <!--   todo list   -->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <TodoList></TodoList>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart
            :value="blogCountByBlogSort"
            :tagName="blogSortNameArray"
          ></PieChart>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <PieChart
            :value="blogCountByTag"
            :tagName="tagNameArray"
          ></PieChart>
        </div>
      </el-col>
    </el-row>

    <!--  访问量统计  -->
    <el-row class="visit-container">
      <LineChart :chart-data="lineChartData"></LineChart>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from "../../components/GithubCorner/GithubCorner";
import CountTo from "vue-count-to";
import CalendarChart from "../../components/CalendarChart/CalendarChart";
import PieChart from "../../components/PieChart/PieChart";
import {blogCountByBlogSort, blogSortNameArray, blogCountByTag, tagNameArray} from "../../components/PieChart/data"
import TodoList from "../../components/TodoList/TodoList";
import Contribution from "../../components/Contribution/Contribution";
import Dynamic from "../../components/Dynamic/Dynamic";
import LineChart from "../../components/LineChart/LineChart";
import {chartData} from '/src/components/LineChart/data'


export default {
  name: "Dashboard",
  props: {},
  components: {
    GithubCorner,
    CountTo,
    CalendarChart,
    PieChart,
    TodoList,
    Contribution,
    Dynamic,
    LineChart,
  },
  data() {
    return {
      blogCountByBlogSort: JSON.parse(blogCountByBlogSort),
      blogSortNameArray: JSON.parse(blogSortNameArray),
      blogCountByTag: JSON.parse(blogCountByTag),
      tagNameArray: JSON.parse(tagNameArray),
      lineChartData: chartData.data
    }
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {}
}
</script>

<style scoped lang="scss">
@import "Dashboard";
</style>
