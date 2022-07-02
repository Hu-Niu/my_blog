<template>
    <div class="first-recommend-container">
        <el-carousel indicator-position="outside" :autoplay="false" trigger="click">
            <el-carousel-item
                v-for="(item, index) in list"
                :key="index"
            >
                <div style="width: 100%;height: 100%;cursor: pointer;" @click="toArticleDetailHandle(item.uid)">
                    <el-image
                        style="width: 100%;height: 100%;"
                        fit="fill"
                        :src="item.cover_url"
                        :alt="item.blog_title"
                    />
                    <div class="carousel-title">
                        <span>{{ item.blog_title }}</span>
                    </div>
                </div>

            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>

export default {
    name: "FirstRecommend",
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
    computed: {},
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "FirstRecommend";
</style>
