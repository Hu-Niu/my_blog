<template>
    <ul class="second-recommend-container">
        <li v-for="item in list2" :key="item.uid" @click="toArticleDetailHandle(item.uid)">
            <div class="mask"></div>
            <el-image
                style="width: 100%; height: 100%;"
                :src="item.cover_url"
                :alt="item.blog_title"
            />
            <span class="label">{{ item.sort_name }}</span>
            <h2>{{ item.blog_summary }}</h2>
        </li>
    </ul>
</template>

<script>
export default {
    name: "SecondRecommend",
    props: {
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
            if (this.list.length > 0) {
                return this.list.slice(0, 2)
            }else {
                return []
            }
        }
    },
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "SecondRecommend";
</style>
