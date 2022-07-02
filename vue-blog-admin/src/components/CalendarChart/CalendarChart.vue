<template>
  <div id="calendar-container" style=" width: 100%; height: 300px;"></div>
</template>

<script>
import {contributeDate, blogContributeCount} from './data'
import echarts from 'echarts'
import {debounce} from '@/utils'
export default {
  name: "CalendarChart",
  props: {},
  components: {},
  data() {
    return {
      contributeDate: contributeDate,
      blogContributeCount: blogContributeCount,
      chart: null,
    }
  },
  methods: {
    initDate: function () {
      var contributeDate = JSON.parse(this.contributeDate)

      var blogContributeCount = JSON.parse(this.blogContributeCount)

      this.chart = echarts.init(document.getElementById('calendar-container'))

      let option = {

        //设置背景
        // backgroundColor: '#d0d0d0',

        title: {
          top: 30,
          text: '文章贡献度',
          subtext: '一年内博客提交的数量',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return (params.data[0] + '<br>文章数：' + params.data[1])
          }
        },
        legend: {
          top: '30',
          left: '100',
          data: ['文章数', 'Top 12'],
          textStyle: {
            // 设置字体颜色
            color: '#000'
          }
        },
        calendar: [{
          top: 100,
          left: 'center',
          range: contributeDate,
          splitLine: {
            show: true,
            lineStyle: {
              // 设置月份分割线的颜色
              color: '#D3D3D3',
              width: 4,
              type: 'solid'
            }
          },
          yearLabel: {show: false},
          dayLabel: {
            nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], // 设置中文显示
            textStyle: {
              // 设置周显示颜色
              color: '#000'
            },
            firstDay: 1 // 从周一开始
          },
          monthLabel: {
            nameMap: 'cn', // 设置中文显示
            textStyle: {
              // 设置月显示颜色
              color: '#000'
            }
          },
          itemStyle: {
            normal: {
              // 设置背景颜色
              color: '#ffffff',
              borderWidth: 1,
              // 设置方块分割线段颜色
              borderColor: '#D3D3D3'
            }
          }
        }],
        series: [
          {
            name: '文章数',
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: blogContributeCount,
            // 根据值设置原点大小
            symbolSize: function (val) {
              if (val[1] == 0) {
                return val[1]
              } else {
                let size = 8 + val[1] * 2
                if (size > 18) {
                  size = 18
                }
                return size
              }
            },
            itemStyle: {
              normal: {
                // 设置圆点颜色
                color: '#2ec7c9'
              }
            }
          }
        ]
      }
      this.chart.setOption(option)
    }


  },
  computed: {},
  watch: {},
  mounted() {
    this.initDate();
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
}
</script>

<style scoped lang="scss">

</style>
