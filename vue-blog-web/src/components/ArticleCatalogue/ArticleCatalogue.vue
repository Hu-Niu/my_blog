<template>
    <div class="side-catalog">
        <div class="side-catalog__list">
            <div style="width: 100%">
                <i class="side-catalog__list-line"></i>
                <div
                    v-for="(item,index) in topList"
                    :key="index"
                    :style="[
                        {'padding-left': iconLeft ? '0px' : getTitleMargin(item.level)},
                        active===item.ref ? {color: activeColor}: '']"
                    class="side-catalog__list-item"
                    @click="activeAnchor(item.ref)"
                    :class="{
                        'side-catalog__list-item--active': active===item.ref,
                        'side-catalog__list-item--child': isChildren(item.level)
                    }"
                >
                    <!-- 每行插槽 -->
                    <slot
                        name="row"
                        v-bind:level="item.level"
                        v-bind:isActive="active===item.ref"
                        v-bind:title="item.title"
                    >
                        <!-- 每行icon插槽 -->
                        <slot
                            name="default"
                            v-bind:level="item.level"
                            v-bind:isActive="active===item.ref"
                        >
                            <i
                                class="side-catalog__list-item-icon"
                                :class="{'side-catalog__list-item-icon--child': isChildren(item.level)}"
                                :style="active===item.ref ? {color: activeColor}: ''"
                            />
                        </slot>
                        <span
                            class="side-catalog__list-item-title"
                            :class="[`side-catalog__list-item-title--level${item.level || 1}`]"
                            :title="item.title"
                            :style="[
                                active===item.ref ? {color: activeColor}: '',
                                {'padding-left': iconLeft ?  getTitleMargin(item.level) : ''}]"
                        >{{ item.title }}</span>
                    </slot>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {debounce,throttle} from '/src/lib/utilFn'

export default {
    name: "ArticleCatalogue",
    props: {
        levelGap: {
            type: Number,
            default: 20
        },
        iconLeft: {
            type: Boolean,
            default: false
        },
        container: {
            type: String,
            require: true
        },
        levelList: {
            type: Array,
            default() {
                return ["h2", "h3", "h4", "h5"];
            }
        },
        activeColor: {
            type: String,
            default: "#006bff"
        },
        htmlContent: {
            type: String,
            default: '',
        },

        // 绑定scroll事件的dom的class
        // 该元素必须为定位元素或者最近的 table,td,th,body
        innerScroll: {
            type: Boolean,
            default: false
        },
        refList: {
            type: Array,
            default() {
                return [
                    // {
                    //   title: 'name',
                    //   ref: 'refname', //f
                    //   level: 1,  //默认为1
                    // },
                ];
            }
        },
        // 是否开启dom监听,dom有变化主动更新各个ref的offsetTop值
        watch: {
            type: Boolean,
            default: false
        },
    },
    components: {},
    data() {
        return {
            topList: [],
            refTopMap: {},
            active: '',

            reverseTopList: [],
            isBeforeDestroy: false,
            observer: null,
            itemClicking: false,
            debounceIntoView: null,
            throttleScroll: null,
        }
    },
    methods: {
        // 需要为scrollElement设置相对定位(offsetParent)
        // offsetParent(定位元素或者最近的 table,td,th,body)
        setOffsetParent() {
            if (!this.innerScroll) return;
            const ele = document.querySelector(this.container);
            if (ele.style.position) return;
            ele.style.position = "relative";
        },
        isChildren(level) {
            return level && level > 1;
        },
        getTitleMargin(level) {
            return level
                ? `${parseInt(level, 10) * this.levelGap}px`
                : this.levelGap + "px";
        },
        // 点击title
        activeAnchor(ref) {
            console.log(ref)
            if (this.active === ref) return;
            // 点击title 会触发scroll事件,在内容高度不够的情况下点击的title和active的title会有出入
            // 所以点击的时候先return掉scroll事件
            this.itemClicking = true;
            this.scrollToEle.scrollTop = this.refTopMap[ref];
            this.active = ref;
            this.debounceIntoView();
            // 等待页面滚动完成
            setTimeout(() => {
                this.itemClicking = false;
            }, 150);
            this.$emit("title-click", ref);
        },
        // 根据levelList获取catalogList
        topForDom() {
            let headlevel = {};
            this.levelList.forEach((item, index) => {
                headlevel[item] = index + 1;
            });
            const childrenList = Array.from(
                document.querySelectorAll(`${this.container} > *`)
            );
            childrenList.forEach((item, index) => {
                const nodeName = item.nodeName.toLowerCase();
                if (this.levelList.includes(nodeName)) {
                    this.topList.push({
                        ref: `${item.nodeName}-${index}`,
                        title: item.innerText,
                        offsetTop: item.offsetTop,
                        level: headlevel[nodeName]
                    });
                    this.refTopMap[`${item.nodeName}-${index}`] = item.offsetTop;
                }
            });
        },

        activeIntoView(edge) {
            // 等active元素改变后
            this.$nextTick(() => {
                const activeEl = document.querySelector(
                    ".side-catalog__list-item--active"
                );
                if (!activeEl) return;
                // 顶部或者底部 scrollIntoView为smooth时无效
                activeEl.scrollIntoView({
                    block: "center",
                    behavior: edge ? "auto" : "smooth"
                });
            });
        },

        // scroll事件
        scrollHandle() {
            // 点击title的滚动不触发
            if (this.itemClicking) return;
            const { scrollTop, clientHeight, scrollHeight } = this.scrollToEle;
            // 到达顶部
            if (scrollTop === 0) {
                this.initActive();
                return;
            }
            // 到达底部
            if (scrollTop + clientHeight >= scrollHeight) {
                this.initActive(true);
                return;
            }
            this.reverseTopList.some(item => {
                if (scrollTop >= item.offsetTop) {
                    this.active = item.ref;
                    this.debounceIntoView();
                    return true;
                }
                return false;
            });
        },

        initActive(last) {
            if (!this.topList.length) return;
            const index = last ? this.topList.length - 1 : 0;
            this.active = this.topList[index].ref;
            this.debounceIntoView(true);
        },
        // 获取ref offsetTop数组
        setTopList() {
            if (this.isBeforeDestroy) return;
            this.topList = [];
            if (this.refList.length) {
                this.topForList();
            } else {
                this.topForDom();
            }
            this.reverseTopList = JSON.parse(
                JSON.stringify(this.topList)
            ).reverse();
            // this.scrollHeight = this.scrollToEle.scrollHeight;
        },
        // ref 是vue还是dom
        vueOrDom(ref) {
            if (ref instanceof HTMLElement) return ref;
            if (ref._isVue) return ref.$el;
        },
        // 获取ref的dom
        getRefDom(_ref) {
            /**
             * 获取ref的dom元素有以下四种情况
             * 1. ref在循环中, ref是dom元素 => ref[0]
             * 2. ref在循环中, ref是vue实例 => ref[0].$el
             * 3. ref不在循环中, ref是dom元素 => ref
             * 4. ref不在循环中, ref不是vue实例 => ref.$el
             */
            const ref = this.$parent.$refs[_ref];
            if (Array.isArray(ref)) {
                return this.vueOrDom(ref[0]);
            }
            return this.vueOrDom(ref);
        },
        // 根据refList获取catalogList
        topForList() {
            this.refList.forEach(item => {
                const offsetTop = this.getRefDom(item.ref).offsetTop;
                const title = item.title || this.getRefDom(item.ref).innerText;
                this.topList.push({
                    ref: item.ref,
                    title,
                    offsetTop,
                    level: item.level
                });
                this.refTopMap[item.ref] = offsetTop;
            });
        },
        setWatcher() {
            // 设置dom监听
            this.observer = new MutationObserver(debounce(this.setTopList, 700));
            this.observer.observe(document.querySelector(this.container), {
                childList: true,
                subtree: true,
                attributes: true
            });
        },
    },
    computed: {
        scrollElement() {
            return this.innerScroll ? document.querySelector(this.container) : window;
        },
        scrollToEle() {
            return this.innerScroll ? this.scrollElement : document.documentElement;
        }
    },
    watch: {
        htmlContent: {
            handler: function (val, oldVal) {
                this.debounceIntoView = debounce(this.activeIntoView, 250);
                this.throttleScroll = throttle(this.scrollHandle, 200);
                this.setOffsetParent();
                this.setTopList();


                this.initActive();
                this.scrollElement.addEventListener("scroll", this.throttleScroll);
                if (!this.watch) return;
                // 等待dom渲染完成之后监听
                setTimeout(() => {
                    this.setWatcher();
                }, 200);

            },
            immediate: true,
        }
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
@import "ArticleCatalogue";
</style>
