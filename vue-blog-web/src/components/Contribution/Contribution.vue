<template>
  <div class="contribution-container">
    <header>
      <h3>
          贡献度
      </h3>
      <el-dropdown trigger="click" @command="changeYear">
        <span class="el-dropdown-link">
          2021<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="2021">2021</el-dropdown-item>
          <el-dropdown-item command="2020">2020</el-dropdown-item>
          <el-dropdown-item command="2019">2019</el-dropdown-item>
          <el-dropdown-item command="2018">2018</el-dropdown-item>
          <el-dropdown-item command="2017">2017</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>

    <!--  贡献度内容  -->
    <section>
      <div class="contribution-box">
        <div class="left-side">
          <div class="box">周一</div>
          <div class="box">周四</div>
          <div class="box">周日</div>
        </div>
        <div class="right-side">
          <!--
            fragment标签是vue-fragment插件，循环不会出现多余的标签，类似于小程序里的block标签
          -->
          <fragment v-for="(item, index)  in contributionList" :key="item.formatDate">
            <!--     补充的，用来占位的空白小方格     -->
            <div class="box placeholder-box" v-if="index===0" v-for=" key in placeholderDivNum"
                 :key="key+'placeholder'"></div>

            <div class="box"
                 :data-content="item.content"
                 :class="{'less': item.count===0,'little': item.count===1,'some': item.count===2,'many': item.count===3,'much': item.count>3}"
                 @mouseenter="mouseenterHandle(index)"
                 @mouseleave="mouseleaveHandle(index)"
                 @click="clickGrid(item.formatDate)"
            >
              <div class="tip" v-show="item.isShowTip">{{ item.content }}</div>
            </div>

            <!-- 每次循环到15号 增加一个div表示月份  -->
            <div v-if="item.date === 15">
              <div class="month">
                {{ item.month }}
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
import contributionList from './data'
/*
  占位div的个数映射
  索引为0时，代表是星期日，需要6个div占位
  索引为1时，代表是星期一，需要0个div占位
  ...
 */
const placeholderDivMap = [6, 0, 1, 2, 3, 4, 5];

/*
  性能优化：
   如果鼠标每次经过小方块都触发一次mouseenter、mouseleave事件的话，会频繁的更新数据，更改虚拟dom
   所以，增加一个全局的定时器拦截一下，如果，是快速的经过，就不执行更新操作
 */
let timer = null; // 全局唯一定时器，控制何时弹出tip提示框
let isChange = false; // 控制状态是否改变，当isShowTip变为true时，tip提示框显示，表示此时状态改变

export default {
  name: "Contribution",
  props: {},
  components: {},
  data() {
    return {
      contributionList,
      // 贡献度最开始占位的空白div数量
      placeholderDivNum: placeholderDivMap[contributionList[0].week],
    }
  },
  methods: {
    // 鼠标进入时触发
    mouseenterHandle(index) {
      timer = setTimeout(() => {
        let item = this.contributionList[index]
        item['isShowTip'] = true
        this.$set(this.contributionList, index, item)

        isChange = true; // 状态改变了

      }, 150)
    },
    // 鼠标离开时触发
    mouseleaveHandle(index) {
      clearTimeout(timer)
      // 如果状态改变了，鼠标离开的时候把显示状态再改变为隐藏
      if (isChange) {
        let item = this.contributionList[index]
        item['isShowTip'] = false
        this.$set(this.contributionList, index, item)

        // 再次改变状态为false
        isChange = false
      }

    },
    // 处理一下传进来的数据，增加 isShowTip 字段，控制是否显示弹出提示框
    handleData() {
      this.contributionList = contributionList.map(item => {
        item['isShowTip'] = false
        return item
      })
    },
    clickGrid(date) {
      this.$emit('clickGrid', date)
    },
    changeYear(year){
      this.$emit('changeYear', year)
    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.handleData()
  },
  created() {
  },
}
</script>

<style scoped lang="scss">
@import "Contribution";
</style>
