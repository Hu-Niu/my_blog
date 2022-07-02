<template>
    <div class="fourth-recommend-container">
        <h2>{{ title }}</h2>
        <div class="top" @click="toArticleDetailHandle(list[0].uid)">
            <el-image
                style="width: 100%;height: 100%;"
                :src="list[0]?list[0].cover_url:''"
                :alt="list[0]?list[0].blog_title:''"
            ></el-image>
            <h2>{{ list[0] ? list[0].blog_title : '' }}</h2>
        </div>

        <ul>
            <li
                v-for="item in list2"
                :key="item.uid"
            >
                <div
                    class="left-img"
                    @click="toArticleDetailHandle(item.uid)"
                >
                    <el-image
                        style="width: 100%;height: 100%;"
                        :src="item?item.cover_url:''"
                        :alt="item?item.blog_title:''"
                    ></el-image>
                </div>
                <div class="right-info">
                    <p @click="toArticleDetailHandle(item.uid)">{{ item ? item.blog_title : '' }}</p>
                    <div>{{ item ? item.create_time : '' }}</div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>


export default {
    name: "FourthRecommend",
    props: {
        title: {
            type: String,
            default: () => ''
        },
        list: {
            type: Array,
            default: () => []
        },
    },
    components: {},
    data() {
        return {}
    },
    methods: {
        toArticleDetailHandle(uid) {
            this.$emit('toArticleDetailHandle', uid)
        },
    },
    computed: {
        list2() {
            return this.list.filter((item, index) => {
                if (index !== 0) {
                    return item
                }
            })
        },
    },
    watch: {},
    mounted() {

    }
}
</script>

<style scoped lang="scss">
@import "FourthRecommend";
</style>
