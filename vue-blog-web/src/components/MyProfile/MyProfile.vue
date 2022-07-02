<template>
    <div class="my-profile-container">
        <h2>我的介绍</h2>
        <div class="avatar">
            <el-image
                :src="profileUrl"
            />
        </div>
        <p class="name">{{ myIntro.nick_name }}</p>
        <p class="position">{{ myIntro.user_profession }}</p>
        <p class="info">{{ myIntro.user_intro }}</p>
    </div>
</template>

<script>
export default {
    name: "MyProfile",
    props: {
    },
    components: {},
    data() {
        return {
            myIntro : {
                nick_name: "小胡",
                user_profession: "web前端工程师",
                user_intro: "一个对前端充满热爱的新手程序猿!",
            },
            profileUrl: "http://xyz.huniu1.top/wordpress/111.jpeg"
        }
    },
    methods: {},
    computed: {},
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "MyProfile";
</style>
