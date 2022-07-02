<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons' // echarts theme
import {debounce} from '/src/utils'


export default {
  name: "LineChart",
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      chart: null
    }
  },
  methods: {
    initChart() {
      var that = this;
      that.chart = echarts.init(this.$el, 'macarons')

      that.chart.setOption({
        xAxis: {
          data: that.chartData.date,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            rotate: 10,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['访问量(PV)', '独立用户(UV)']
        },
        series: [{
          name: '访问量(PV)', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: that.chartData.expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
          {
            name: '独立用户(UV)',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: that.chartData.actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }]
      })

    },

  },
  computed: {},
  watch: {},
  mounted() {
    this.initChart()
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
