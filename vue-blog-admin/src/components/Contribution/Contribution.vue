<template>
  <div class="contribution-panel">
    <header>
      <h3>文章贡献度</h3>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          2021<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>2021</el-dropdown-item>
          <el-dropdown-item>2020</el-dropdown-item>
          <el-dropdown-item>2019</el-dropdown-item>
          <el-dropdown-item>2018</el-dropdown-item>
          <el-dropdown-item>2017</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <section>
      <!--   文章贡献度   -->
      <div class="contribution-box">
        <div class="left-side">
          <div class="box">周一</div>
          <div class="box">周四</div>
          <div class="box">周日</div>
        </div>
        <!--
          一列7个格 一年365天 按371天算 共有371/7=53列
          宽度是1128px/100%  100%/53=1.88679%
         -->
        <div class="right-side" ref="right-side">
          <!--
            fragment标签是vue-fragment插件，循环不会出现多余的标签，类似于小程序里的block标签
          -->
          <fragment v-for="(item, index) in contribution" :key="index">
            <div class="box" v-if="index===0" v-for=" key in placeholderDivNum" :key="key+'placeholder'"></div>
            <div
              class="box"
              :class="{'less': item.count===0,'little': item.count===1,'some': item.count===2,'many': item.count===3,'much': item.count>3,}"
              :data-content="item.content"
              @mouseout="mouseoutHandle(index)"
              @mouseover="mouseoverHandle(index)"
            >

              <div class="tip" v-show="item.isShowTip">{{ item.content }}</div>

            </div>
            <!-- 每次循环到15号 增加一个div表示月份  -->
            <div v-if="item.dataFormatArray[2] === '15'">
              <div class="month">
                {{ mapMonth.get(item.dataFormatArray[1]) }}
              </div>
            </div>
          </fragment>

        </div>
      </div>
      <!--   颜色说明   -->
      <div class="contribution-tip">
        <div class="word">少</div>
        <ul>
          <li class="less"></li>
          <li class="little"></li>
          <li class="some"></li>
          <li class="many"></li>
          <li class="much"></li>
        </ul>
        <div class="word">多</div>
      </div>
      <!--   文字说明   -->
      <div class="contribution-describe">
        <p>最近一年贡献：160 次</p>
        <p>最长连续贡献：23 日</p>
        <p>最近连续贡献：23 日</p>
        <p class="text-muted">
          贡献度的统计数据包括博客提交、修改和删除。
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import {contribution} from './data'

const mapDiv = [6, 0, 1, 2, 3, 4, 5];

let timer = null; // 全局唯一定时器，监控鼠标停留在当前div块上的秒数
let isChange = false; // 是否改变状态了
export default {
  name: "Contribution",
  props: {},
  components: {},
  data() {
    return {
      contribution: [],
      // 贡献度最开始占位的空白div数量
      placeholderDivNum: mapDiv[contribution[0].week],
      // 月份映射
      mapMonth: new Map([
        ['01', '一月'],
        ['02', '二月'],
        ['03', '三月'],
        ['04', '四月'],
        ['05', '五月'],
        ['06', '六月'],
        ['07', '七月'],
        ['08', '八月'],
        ['09', '九月'],
        ['10', '十月'],
        ['11', '十一月'],
        ['12', '十二月'],
      ]),
    }
  },
  methods: {

    /**
     * @desc 鼠标离开时触发，只触发一次，鼠标离开清除时定时器
     *
     */
    mouseoutHandle(index) {
      clearTimeout(timer);
      // 如果状态改变了，鼠标离开的时候把显示状态再改变为隐藏
      if (isChange) {
        let obj = this.contribution.slice(index, index + 1)[0];
        obj.isShowTip = false;
        this.contribution.splice(index, 1, obj);

        // 再次改变状态为false
        isChange = false;
      }
    },
    /**
     * @desc 鼠标进入时触发，只触发一次，鼠标进入时开始定时器
     */
    mouseoverHandle(index) {
      timer = setTimeout(() => {
        let obj = this.contribution.slice(index, index + 1)[0]
        obj.isShowTip = true
        this.contribution.splice(index, 1, obj)
        isChange = true; // 状态改变了
      }, 100);
    },
  },
  computed: {},
  watch: {},
  mounted() {
    let tempArr = []
    contribution.forEach((item, index) => {
      item.isShowTip = false;
      item.dataFormatArray = item.dateFormat.split('-');
      tempArr.push(item)
    })
    this.contribution = tempArr
  }
}
</script>

<style scoped lang="scss">
@import "Contribution";
</style>
