import dayjs from "dayjs";

let contributionList = []
const mapMonth = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

/**
 * @param time1 {Number} 时间戳
 * @param time2 {Number} 时间戳
 * @returns {number} 间隔天数
 * @description 计算两个时间的间隔天数
 */
function getInterval(time1, time2) {
  return Math.floor(Math.abs((time1 - time2)) / 1000 / 3600 / 24)
}

function initData() {
  /*
    1、获取数据长度：
      2020-06-12到2021-06-12总共有多少天？
      因为一年有时候有365天，有时候有366天，所以计算一下更准确

      注意：2021-01-01 到 2021-12-31 是365天，所以要是展示到2022-01-01 应该再多加一天
   */
  let now = dayjs() // 今天
  // let now = dayjs().add(24,'h') // 今天
  let prevYearDate = now.subtract(1, 'year') // 去年的今天
  //   获取今天和去年的时间戳，通过时间戳计算时间间隔   相差多少天
  let intervalDays = getInterval(now.toDate().valueOf(), prevYearDate.toDate().valueOf())

  /*
    2、初始化数组数据
   */
  for (let i = 0; i <= intervalDays; i++) {
    let randomNum = Math.floor(Math.random() * 5) // [0,5)之间的整数
    let formatDate = prevYearDate.format('YYYY-MM-DD')
    contributionList.push({
      content: `${randomNum}个贡献：${formatDate}`, // 鼠标悬浮时显示的内容
      count: randomNum, // 几个贡献
      formatDate,
      week: prevYearDate.day(), // 星期几 范围是，0-6，0是星期日
      date: prevYearDate.date(), // 一个月的第几天，1到31的数字
      month: mapMonth[prevYearDate.month()], // prevYearDate.month() 第几个月，0到11的数字
    })
    // 每次让日期加1天
    prevYearDate = prevYearDate.add(24, 'h')
  }
}

initData();

export default contributionList


/*
仿写gitee贡献度组件：
1、首先造数据：造一年的数据，比如，
今天是 2021-06-12，那么一年的数据范围就是 2020-06-12到2021-06-12、使用dayjs的api：https://dayjs.fenxianglu.cn/
[
    {
    "content": "0个贡献：2020-05-01",
    "count": 0,
    "dateFormat": "2020-05-01",
    "week": 5
  },
  {
    "content": "0个贡献：2020-05-02",
    "count": 0,
    "dateFormat": "2020-05-02",
    "week": 6
  },
  ...
]
 */












