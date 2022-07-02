<template>
    <div class="follow-us-container">
        <h2>{{ title }}</h2>
        <ul>
            <li
                v-for="item in list"
                :key="item.uid"
                :style="{border:`1px solid ${item.icon_color}`}"
                @click="contactMeHandle(item)"
            >
        <span
            class="icon-box"
            :style="{color: item.icon_color}"
        >
          <svg-icon :icon-class="item.way_icon_name"></svg-icon>
        </span>

                <span class="content">{{ item.way_num }}</span>
                <span
                    class="label"
                    :style="{background: item.icon_color}"
                >
          {{ item.contact_way }}
        </span>

            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "FollowUs",
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
        contactMeHandle(item) {
            switch (item.way_icon_name) {
                case 'qq-group':
                    window.open('https://qm.qq.com/cgi-bin/qm/qr?k=NuYR8Xp_Y9u-7hBdPt0qa_V6Pb4NvA0E&jump_from=webapi', '_blank')
                    break
                default:
                    if(item.link_address){
                        window.open(item.link_address, '_blank')
                    }
            }
        },
    },
    computed: {},
    watch: {},
    mounted() {
    }
}
</script>

<style scoped lang="scss">
@import "FollowUs";
</style>
