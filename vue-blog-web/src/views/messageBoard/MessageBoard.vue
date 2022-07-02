<template>
  <div class="message-board-container">
    <!--  座右铭  -->
    <p class="motto">你，我生命中一个重要的过客，我们之所以是过客，因为你未曾会为我停留。</p>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :before-leave="beforeLeaveHandle">
      <el-tab-pane label="网站首页" name="home" class="home-btn"/>

      <el-tab-pane label="留言板" name="messageBoard">
        <CommentBox
            :loginUserInfo="loginUserInfo"
            :isLogin="isLogin"
            :content="form.commentContent"

            :commentSource="form.commentSource"
            :sourceId="form.sourceId"


            @goToLogin="goToLogin"
            @commentInputHandle="commentInputHandle"
            @sendMessageHandle="sendMessageHandle"
            @cancelMessageHandle="cancelMessageHandle"
            @insertEmoji="insertEmoji"

        />
        <h3>留言（{{ total }}）</h3>
        <div class="comment-message-list">
          <CommentMessageList
              ref="commentMessageList"
              :comments="commentList"

              :loginUserInfo="loginUserInfo"
              :isLogin="isLogin"

              :commentSource="form.commentSource"
              :sourceId="form.sourceId"

              :hasMore="hasMore"
              @loadMoreHandle="loadMoreHandle"
              @refreshCommentList="refreshCommentList"
              @deleteCommentsHandle="deleteCommentsHandle"
              @publishStandpointHandle="publishStandpointHandle"
              @reportCommentHandle="reportCommentHandle"

          />
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "MessageBoard",
  mixins: [mixin],
  props: {},
  components: {},
  data() {
    return {
      activeName: 'messageBoard',
    }
  },
  methods: {
    handleClick(e) {
      console.log(e.name, 'e.name')
    },
    beforeLeaveHandle(activeName, oldActiveName) {
      if (activeName === 'home') {
        this.$router.push('/')
        return false
      }
    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCommentList()
  }
}
</script>

<style scoped lang="scss">
@import "MessageBoard";
</style>
