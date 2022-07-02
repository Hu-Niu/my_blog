<template>
    <div class="my-article-catalogue-container">
        <ul>
            <li
                :title="item.title"
                v-for="(item,index) in catalogueTitleList"
                :key="index"
                @click="activeAnchor(index)"
                :class="['item',`catalogue-title-${index}`]"
            >
            <span
                :class="['title',{'active': current === index}]"
                :style="{'margin-left': computeHeadMarginLeft(item.level-1)+'px'}"
            >
                {{ item.title }}
            </span>
            </li>
        </ul>
    </div>

</template>

<script>
import {debounce} from '/src/lib/utilFn'

export default {
    name: "MyArticleCatalogue",
    props: {
        container: {
            type: String,
            require: true
        },
        htmlContent: {
            type: String,
            default: '',
        },
        levelList: {
            type: Array,
            default() {
                return ["h2", "h3", "h4", "h5"];
            }
        },
        isFollowScroll: {
            type: Boolean,
            default: false
        },
    },
    components: {},
    data() {
        return {
            catalogueTitleList: [], // 存放目录的tile
            catalogueDomMap: new Map(), // 存放目录每个title的dom, key-item格式的，key是catalogueTitleList的索引
            catalogueDomList: [], // 存放目录每个title的dom，与catalogueTitleList一一对应
            current: 0,
            isShow: true
        }
    },
    methods: {
        computeHeadMarginLeft(level) {
            return level * 15
        },
        // 点击了标题
        activeAnchor(index) {
            const headDom = this.catalogueDomMap.get(index)
            headDom.scrollIntoView()
            this.current = index
        },
        // 处理标题的层级
        headLevelHandle() {
            let headLevel = {}
            this.levelList.forEach((item, index) => {
                headLevel[item] = index + 1
            })

            return headLevel
        },
        /**
         * 1、获得页面卷进去的高度 scrollTop
         * 2、获得所有标题的距离页面顶部的高度 headBoxTopList
         *  - 注意数值都增加 131（页面导航栏的高度）
         * 3、遍历 headBoxTopList 中的值 headBoxTop，与 scrollTop 比较
         *  3.1 当第一个headBoxTop 大于 scrollTop 时，说明页面连第一个title都没到，这时 current 默认为0
         *  3.2 当最后一个headBoxTop 小于 scrollTop 时，说明页面已经滑动到了最后，这时 current 默认为最后一个title
         *  3.3 当页面滑动到了中间，取最接近 scrollTop 的 两个值 headBoxTop，
         *      3.3.1 如果其中的一个值 headBoxTop 与 scrollTop 相差精度不到2px，那么current就是这个值的索引（是直接点击滑动过来的，会很接近）
         *      3.3.2 如果其中一个值 headBoxTop 减去 scrollTop 小于0，说明这个标题被卷到了屏幕上面，所以就是这个索引（是滑动到了中间的某个地方，在两个标题之间）
         *
         * */
        calculateHighlightHead() {
            // 1、
            let scrollTop = document.documentElement.scrollTop; //当前的的位置
            // 2、
            const headBoxTopList = []
            this.catalogueDomList.forEach(item => {
                headBoxTopList.push(item.offsetTop + 131)
            })
            let length = headBoxTopList.length
            if (length > 1) {
                // 3.1
                if (headBoxTopList[0] > scrollTop) {
                    this.current = 0
                    // 3.2
                } else if (headBoxTopList[length - 1] < scrollTop) {
                    this.current = length - 1
                } else {
                    // 找到最接近 scrollTop 的 两个值的索引
                    let nearlyTwoTop = this.getNearlyTwoNumber(headBoxTopList, scrollTop)
                    let top1 = headBoxTopList[nearlyTwoTop[0]] - scrollTop
                    let top2 = headBoxTopList[nearlyTwoTop[1]] - scrollTop
                    // 3.3.1
                    if (Math.abs(top1) < 3) {
                        this.current = nearlyTwoTop[0]
                        // 3.3.1
                    } else if (Math.abs(top2) < 3) {
                        this.current = nearlyTwoTop[1]
                        // 3.3.2
                    } else if (top1 < 0) {
                        this.current = nearlyTwoTop[0]
                        // 3.3.2
                    } else if (top2 < 0) {
                        this.current = nearlyTwoTop[1]
                    }
                }
            }

            if (this.isFollowScroll) {
                // 将标题滚动到标题栏对应位置处
                const titleDom = document.querySelector(`.catalogue-title-${this.current}`)
                const scrollBox = document.querySelector(`.my-article-catalogue-container`)
                scrollBox.scrollTo({
                    top: titleDom.offsetTop - 200,
                    behavior: 'auto'
                })
            }


        },
        // 二分查找 找到最接近 scrollTop 的两个值的索引
        getNearlyTwoNumber(numberList, target) {
            let length = numberList.length

            // 若果是空数组或者只有一位 直接返回0
            if (length < 0 || length === 1) return 0

            let left = 0
            let right = length - 1
            let mid = -1

            while (left < right) {

                mid = left + Math.floor((right - left) / 2)

                if (numberList[mid] === target) {
                    if (numberList[mid] === numberList[0]) {
                        return [mid, mid + 1]
                    }
                    return [mid - 1, mid]
                } else if (numberList[mid] < target) {
                    left = mid + 1
                } else {
                    right = mid
                }
            }
            if (left === right) {
                return [left - 1, left]
            }

        }
    },
    computed: {},
    watch: {
        /**
         * 解析html，将标题都解析出来渲染至列表上
         * topForDom
         * 1、查找容器里所有的html标签
         * 2、获取标签中的标题
         *  - 保存一份title
         *  - 保存一份dom
         */
        htmlContent: {
            handler: function (val, oldVal) {
                if (val) {
                    // 获取标题的层级
                    const headLevel = this.headLevelHandle()

                    // 1、
                    const childrenList = Array.from(
                        document.querySelectorAll(`${this.container} > *`)
                    );
                    let arrKey = 0 // 建立一个一一对应关系，方便点击标题时直接取到对应标题的dom
                    childrenList.forEach((item, index) => {
                        const nodeName = item.nodeName.toLowerCase()
                        // 2、
                        if (this.levelList.includes(nodeName)) {
                            this.catalogueDomMap.set(arrKey, item)
                            this.catalogueDomList.push(item)

                            this.catalogueTitleList.push({
                                title: item.innerText,
                                level: headLevel[nodeName]
                            })
                            arrKey++
                        }
                    })


                }
            },
            immediate: true
        }
    },
    mounted() {
        window.addEventListener('scroll', debounce(this.calculateHighlightHead, 300))
    }
}
</script>

<style scoped lang="scss">
@import "MyArticleCatalogue";
</style>
