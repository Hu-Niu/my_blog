<template>
  <div class="standpoint-emoji-container">
    <h3>{{ tip }}</h3>
    <ul @mouseout="mouseoutHandle">
      <li
          v-for="(item, index) in standpointEmojis"
          :key="item.id"
          @mouseover="mouseoverHandle(index)"
          @click="chooseEmoji(item)"
          :class="{'bg-dark': isSelected(item.id)}"
      >
        {{ item.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "StandpointEmoji",
  props: {
    standpointEmojis: {
      type: Array,
      default: () => []
    },
    // 登录人选过的emojis
    myPitchOnEmojis: {
      type: Array,
      default: () => []
    },

    // 这个组件所在的索引位置
    belongIndex: {
      type: Number
    },
    // 这个组件所对应评论的id
    commentUid: {
      type: String
    },

  },
  components: {},
  data() {
    return {
      tip: '选择你的观点~',
    }
  },
  methods: {
    // 这个emoji是否已经选中过了
    isSelected(id) {
      let index = this.myPitchOnEmojis.findIndex(item => +(item.reaction_content) === id)
      return index !== -1;
    },
    getSelectEmojisUid(id) {
      return this.myPitchOnEmojis.find(item => +(item.reaction_content) === id)
    },
    mouseoutHandle() {
      this.tip = '选择你的观点~'
    },
    mouseoverHandle(index) {
      this.tip = this.standpointEmojis[index].msg
    },
    chooseEmoji(item) {
      this.$emit('chooseEmoji', {
        emoji: item,
        belongIndex: this.belongIndex,
        uid: this.commentUid,
        isSelected: this.isSelected(item.id), // 这个表情是否已经选过
        currentSelectEmojiUid: this.getSelectEmojisUid(item.id), // 如果选过的话，这条记录的uid回传回去
      })
    },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "StandpointEmoji";
</style>
