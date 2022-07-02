<template>
  <div class="comment-message" style="margin-top: 10px">
    <div v-if="commentsList.length === 0" class="empty-box">
      <svg-icon icon-class="empty"></svg-icon>
    </div>
    <div v-else class="message-container" v-for="(item,index) in commentsList" :key="item.uid">
      <!--   隐藏按钮   -->
      <div v-if="level>1" class="vertical-line" v-show="item.currentCommentIsShow">
        <a href="javascript:void(0)" onclick="return false" class="minus-box" @click="hiddenOrShowComment(item.uid,'hidden')">
          <svg-icon icon-class="minus"></svg-icon>
        </a>
      </div>

      <!--   显示按钮   -->
      <div v-if="level>1" class="vertical-line" v-show="!item.currentCommentIsShow">
        <a href="javascript:void(0)"  onclick="return false" class="minus-box" @click="hiddenOrShowComment(item.uid,'show')">
          <svg-icon icon-class="plus"></svg-icon>
        </a>
      </div>

      <!--   隐藏后的提示语   -->
      <div v-show="!item.currentCommentIsShow" class="text-tips" @click="hiddenOrShowComment(item.uid,'show')">展开隐藏的评论
      </div>


      <!--   内容区 开始  -->
      <div v-show="item.currentCommentIsShow" class="left-profile">
        <el-image
            :src="item.comment_person_profile"
            :alt="item.comment_person_id"
        />
      </div>
      <div v-show="item.currentCommentIsShow" class="right-content">
        <div class="nick-name">
          <span>{{ item.comment_person_name }}</span>
          <span class="label" v-if="item.comment_person_identity === -1">
            拥有者
            <div class="tooltip">该用户是 博客的创作者</div>
          </span>
          <span class="label xzz" v-if="item.comment_person_identity === -2">
            小噗哧
            <div class="tooltip">一只小可爱</div>
          </span>

          <span class="tip-time">{{ timeListStringRange[index] }}</span>
        </div>
        <div :class="[{'illegal': +(item.comment_status)===3},'message']">
          {{ item.comment_content }}
        </div>
        <div class="btns" v-if="+(item.comment_status) !==3">
          <span @click="showReplayBox(item)" v-if="level<maxReplyLevel">回复</span>
          <span @click="deleteComment(item)" v-if="isShowDeleteBtn(item)">删除</span>
          <span @click="reportComment(item)">举报</span>
          <!--     发表观点表情     -->
          <span
              class="standpoint"
              @mouseenter="mouseenterHandle(index)"
              @mouseleave="mouseleaveHandle(index)"
          >
            +<i><svg-icon icon-class="cute"></svg-icon></i>
            <div
                class="standpoint-box"
                :class="{isShow: item.currentStandpointIsShow}"
                ref="standpointBox">
              <StandpointEmoji
                  @chooseEmoji="chooseStandpointEmoji"
                  :belongIndex="index"
                  :commentUid="item.uid"
                  :standpointEmojis="standpointEmojis"
                  :myPitchOnEmojis="myPitchOnEmojis(item)"
              />
            </div>
          </span>
          <span>level：{{ level }}</span>
        </div>
        <ul class="reaction-list" v-if="+(item.comment_status)!==3">
          <el-tooltip
              v-for="(reaction,index) in item.reactions_count"
              :key="index"
              effect="light"
              :content="reaction.reaction_content | convertReaction('tooltip')"
          >
            <li
                :class="{'bg-dark': isYouPitchOn(item.reactions_person,reaction.reaction_content)}"
                @click="reactionHandle(item.reactions_person,reaction)"
            >
              {{ reaction.reaction_content | convertReaction('content') }} {{ reaction.total }}
            </li>
          </el-tooltip>

        </ul>
        <div class="replay-box" v-if="replyId === item.uid">
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
        </div>
        <div v-if="item.children.length > 0">
          <MessageList
              :comments="item.children"
              :level="level+1"

              :loginUserInfo="loginUserInfo"
              :isLogin="isLogin"

              :commentSource="form.commentSource"
              :sourceId="form.sourceId"
              @refreshCommentList="refreshCommentList"
              @deleteCommentsHandle="deleteCommentsHandle"
              @publishStandpointHandle="publishStandpointHandle"
          />
        </div>
      </div>
      <!--   内容区 结束  -->
    </div>

    <!--  只在第一层展示 测试数据用  -->
    <!--        <div v-if="level===1">

            </div>-->


    <div v-if="level===1 && hasMore" class="load-more-container">
      <span @click="loadMoreHandle">查看更多</span>
    </div>

    <!--  只在第一层展示  -->
    <div v-else-if="level===1 && !hasMore" class="no-more-container">
      <span>没有更多了</span>
    </div>

    <!--  举报框,只渲染一个就行  -->
    <div class="report-box" v-if="level===1 && waitToReportCommentId ">
      <el-dialog
          title="举报"
          :visible="true"
          custom-class="report-comment-dialog"
          :before-close="reportDialogBeforeClose"
      >
        <h3>请认真填写举报原因，尽可能描述详细。</h3>
        <el-form
            ref="reportRuleForm"
            :model="reportForm"
            :rules="reportRules"
            label-width="80px"
            label-position="left"
        >
          <el-form-item label="举报类型" required prop="informType">
            <el-select
                v-model="reportForm.informType"
                clearable
                placeholder="请选择举报类型"
                style="width: 300px;"
            >
              <el-option
                  v-for="item in informTypeList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="举报原因" required prop="informReason">
            <el-input
                type="textarea"
                v-model="reportForm.informReason"
                placeholder="请说明举报原因"
                maxlength="500"
                show-word-limit
                :autosize="{minRows: 6, maxRows: 6}"
                resize="none"
            ></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer">
          <el-button @click="cancelReport">取 消</el-button>
          <el-button type="primary" @click="confirmReport">发 送</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import CommentBox from "../CommentBox/CommentBox";
import StandpointEmoji from "../StandpointEmoji/StandpointEmoji";
import {indexMutation, messageBoardMutation} from "../../store/mutation-types";
import {commentApi} from "../../api/comment";
import dayjs from "dayjs";

// https://dayjs.fenxianglu.cn/category/i18n.html#%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%AD%E5%8A%A0%E8%BD%BD%E8%AF%AD%E8%A8%80
// dayjs默认的为英国(美国)的时区，转换为中国的时区，不转换的话就会显示 one hour ago 转换为中国的就变成了 一小时前
import zhCn from 'dayjs/locale/zh-cn'
// 加载dayjs插件，返回时间范围，比如一小时前，一天前等等
// https://dayjs.fenxianglu.cn/category/display.html#%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E4%BB%A5%E5%89%8D
import relativeTime from 'dayjs/plugin/relativeTime' // 加载dayjs插件，
dayjs.locale(zhCn)
dayjs.extend(relativeTime)

let timer = null; // 本层唯一定时器，监控鼠标停留在当前div块上的秒数 为了延迟显示观点框
let isChange = false; // 是否改变状态了,当显示观点框时，表明状态改变了

let that = null; // filter过滤器拿不到data的对象，再初始化组件的时候，保存一个this

export default {
  name: "MessageList",
  props: {
    // 父级组件传过来的评论列表
    comments: {
      type: Array,
      default: () => []
    },
    // 递归组件的嵌套层级，递归了1层、2层、3层、4层、5层，在最后一层可以禁止回复，拒绝无休止的评论
    level: {
      type: Number,
      default: 1,
    },

    // 当前登录人的信息 https://cn.vuejs.org/v2/guide/components-props.html
    // 设置多种数据类型
    loginUserInfo: [String, Object],
    // 是否登录
    isLogin: {
      type: Boolean,
      default: () => false
    },
    // 是否还有更多消息
    hasMore: {
      type: Boolean,
      default: () => true
    },


    // 评论来源：-1，关于我；1，留言板；2，专题；3，文章
    commentSource: [String, Number],
    // 来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我得id默认给个-1
    sourceId: [String, Number],
  },
  components: {
    CommentBox,
    StandpointEmoji,
  },
  filters: {
    convertReaction: (val, arg1) => {
      const findEmoji = that.standpointEmojis.find(item => item.id === +val)
      if (arg1 === 'tooltip') {
        return findEmoji.msg
      }
      return findEmoji.content
    },
  },
  data() {
    return {
      replyId: '', // 回复评论的id，控制展示哪一个评论下的评论框
      maxReplyLevel: 5, // 控制最大评论层级
      commentsList: [], // 处理后的评论列表，增加了一个显示隐藏字段，currentCommentIsShow
      timeList: [], // 每一层数据对应的时间
      timeListStringRange: [], // 每一层数据对应的时间，转换后的，，setInterval()每隔一分钟刷新一次这个数组

      // 观点表情
      standpointEmojis: [
        {
          id: 1,
          msg: '赞！',
          content: '👍',
        }, {
          id: 2,
          msg: '不敢苟同',
          content: '👎',
        }, {
          id: 3,
          msg: 'hhhhh',
          content: '😄',
        }, {
          id: 4,
          msg: '厉害啦！！！',
          content: '👏',
        }, {
          id: 5,
          msg: '还是不理解呢',
          content: '😕',
        }, {
          id: 6,
          msg: '奈你奈你',
          content: '❤️',
        }, {
          id: 7,
          msg: '哇哦~~~',
          content: '🎉',
        }, {
          id: 8,
          msg: '我就看看不说话~',
          content: '👀',
        },
      ],


      form: {
        commentContent: '',
        commentSource: this.commentSource, // 评论来源：-1，关于我；1，留言板；2，专题；3，文章
        sourceId: this.sourceId, // 来源的id：存放对应来源的id，专题有专题uid，文章有文章uid，留言板uid给个默认值1，关于我id默认值给个-1
        commentStatus: 1, // 评论状态：1，待审核；2，通过；3，违规评论
        commentPersonId: null, // 评论人：评论人的id
        commentLayer: '', // 评论的层级，总共有五层，1，2，3，4，5
      },

      commentedPersonId: '', // 被评论人：被评论人的id，可以为空，第一条评论没有被评论人
      toCommentId: '', // 回复的哪条评论：存放评论的id，可以为空，为空说明这条评论没有回复任何人，是第一条评论
      rootCommentId: '', // 根评论：存放根评论的id，这条评论链是从哪条评论发散出来的，即评论的源头，可以为空，为空说明这条评论就是根


      intervalTimer: null, // 本层唯一的一个interval定时器，每隔一分钟刷新一次本层数据的时间数组，达到一分钟一刷新的效果，组件销毁时清空这个定时器

      // 举报信息
      reportForm: {
        informType: null,
        informReason: null,
      },
      reportRules: {
        informType: [
          {required: true, message: '请选择举报类型', trigger: 'change'}
        ],
        informReason: [
          {required: true, message: '请说明举报原因', trigger: 'blur'}
        ],
      },

      // 举报类型
      informTypeList: [
        {
          id: 1,
          label: '内容包含钓鱼欺诈信息'
        },
        {
          id: 2,
          label: '内容包含色情信息'
        },
        {
          id: 3,
          label: '推广广告'
        },
      ],
    }
  },
  methods: {
    cancelReport() {
      this.emptyReportCommentIdFromVuex()
    },
    reportCommentHandle() {
      this.$emit('reportCommentHandle', this.reportForm)
    },
    confirmReport() {
      this.$refs['reportRuleForm'].validate((valid) => {
        if (valid) {
          this.reportCommentHandle()
        } else {
          return false;
        }
      })
    },
    emptyReportCommentIdFromVuex() {
      this.reportForm = {
        informType: null,
        informReason: null,
      }
      this.$store.commit(messageBoardMutation.CHANGE_REPORTED_COMMENT_ID, '')
    },
    reportDialogBeforeClose(done) {
      // 举报框关闭前，先从vuex清空一下待举报评论id
      this.emptyReportCommentIdFromVuex()
      done()
    },

    reportComment(comment) {
      if (!this.isLogin) {
        this.goToLogin()
      } else {
        this.emptyReportCommentIdFromVuex()
        // 获得当前等待被举报评论的uid，设置在全局vuex中
        this.$store.commit(messageBoardMutation.CHANGE_REPORTED_COMMENT_ID, comment.uid)
      }
    },


    // 判断是否显示删除按钮
    isShowDeleteBtn(comment) {
      /**
       * 1、必须登录
       * 2、必须是自己的评论
       * 3、管理员除外
       */

      // 如果没有登录，直接返回false
      if (!this.isLogin) return false

      // 如果是超级管理员，直接返回 true
      if (+(this.loginUserInfo.user_identity) === -1) return true


      // 如果是自己的评论，返回true，不是自己的评论，返回false
      return comment.comment_person_id === this.loginUserInfo.uid
    },

    // 判断自己是否已经选中了这个观点
    myPitchOnEmojis(comment) {
      let result = []
      if (comment.reactions_person) {
        result = comment.reactions_person.filter(item => {
          if (item.reaction_person_id === this.loginUserInfo.uid) {
            return item
          }
        })
      }
      return result
    },
    // 判断自己是否已经选中了这个观点
    isYouPitchOn(reactionPerson, reactionContent) {
      const index = reactionPerson.findIndex(item => item.reaction_person_id === this.loginUserInfo.uid && item.reaction_content === reactionContent)
      return index !== -1;
    },
    // 获取你选中的这个观点
    getYouPitchOn(reactionPerson, reactionContent) {
      return reactionPerson.find(item => item.reaction_person_id === this.loginUserInfo.uid && item.reaction_content === reactionContent)
    },


    refreshCommentList() {
      this.$emit('refreshCommentList')
    },

    // 将时间转换为时间段 1小时前 1天前 1年前等等
    changeTimeToStringRange() {
      this.timeListStringRange = this.timeList.map(item => dayjs(item).fromNow())
    },

    loadMoreHandle() {
      this.$emit('loadMoreHandle')
    },

    cancelMessageHandle() {
      // 清空评论内容
      this.clearCommentData()


    },

    insertEmoji(emoji) {
      if (!this.form.commentContent) {
        this.form.commentContent = emoji
      } else {
        this.form.commentContent += emoji
      }
    },

    commentInputHandle(val) {
      this.form.commentContent = val
    },


    async sendMessageHandle() {
      this.form.commentPersonId = this.loginUserInfo.uid
      this.form.commentLayer = this.level + 1 // 评论层级，自己的层级肯定是当前组件层级再加1

      this.form.commentedPersonId = this.commentedPersonId
      this.form.toCommentId = this.toCommentId
      this.form.rootCommentId = this.rootCommentId

      let {data} = await commentApi.saveComment(this.form)
      if (data.code === 1) {
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 1000,
        })

        this.clearCommentData()
        this.refreshCommentList()
      }
    },

    // 留言成功后,初始化表单数据
    clearCommentData() {
      this.form.commentContent = ''
      this.form.commentLayer = ''

      this.commentedPersonId = ''
      this.toCommentId = ''
      this.rootCommentId = ''

      // 隐藏评论框
      this.replyId = ''
    },


    // 观点框弹出
    mouseenterHandle(index) {
      timer = setTimeout(() => {
        let item = this.commentsList[index]
        item['currentStandpointIsShow'] = true
        this.$set(this.commentsList, index, item)

        isChange = true
      }, 150)

    },
    // 观点框隐藏
    mouseleaveHandle(index) {
      clearTimeout(timer)
      // 如果状态改变了，才去更新数据
      if (isChange) {
        let item = this.commentsList[index]
        item['currentStandpointIsShow'] = false
        this.$set(this.commentsList, index, item)

        isChange = false
      }

    },

    // 发布观点
    publishStandpointHandle(data) {
      this.$emit('publishStandpointHandle', data)
    },

    // 选择观点表情
    chooseStandpointEmoji(data) {
      if (!this.isLogin) {
        this.goToLogin()
      } else {
        // 先隐藏观点框
        let {
          belongIndex,
        } = data
        // 隐藏观点框
        this.mouseleaveHandle(belongIndex)
        // 发布观点
        this.publishStandpointHandle(data)
      }
    },
    reactionHandle(reactionsPerson, reaction) {
      if (!this.isLogin) {
        this.goToLogin()
      } else {
        // 拼接参数，
        let data = {
          emoji: {id: reaction.reaction_content}, // 这个表情的内容，主要就是这个id，存数据库的就是这个字段
          uid: reaction.comment_id, // 回复评论的id
          isSelected: this.isYouPitchOn(reactionsPerson, reaction.reaction_content), // 这个表情是否已经选过
          currentSelectEmojiUid: this.getYouPitchOn(reactionsPerson, reaction.reaction_content) // 如果选过的话，这条记录的uid回传回去
        }

        // 发布观点
        this.publishStandpointHandle(data)
      }
    },
    showReplayBox(item) {
      // 没有登录就先去登录
      if (!this.isLogin) {
        this.goToLogin()
      } else { // 如果登录了,弹出评论框

        // 初始化当前回复框内容
        this.form.commentContent = null
        // 弹出评论框
        this.replyId = item.uid
        // 获取被评论人的id
        this.commentedPersonId = item.comment_person_id
        // 获取回复的哪条评论的id
        this.toCommentId = item.uid
        // 获取根评论的id
        this.rootCommentId = item.comment_layer === 1 ? item.uid : item.root_comment_id
      }
    },
    // 递归获取所有留言的id
    getAllCommentIds(comments, resultArr = []) {
      comments.map(item => {
        resultArr.push(item.uid)
        if (item.children.length > 0) {
          this.getAllCommentIds(item.children, resultArr)
        }
      })
      return resultArr
    },

    deleteComment(item) {
      if (!this.isLogin) {
        this.goToLogin()
      } else {
        // 修改全局vuex中等待删除评论的ids
        let ids = this.getAllCommentIds([item])
        this.$store.commit(messageBoardMutation.CHANGE_WAIT_DELETE_COMMENTS_IDS, ids)
        this.deleteCommentsHandle()
      }
    },
    deleteCommentsHandle() {
      this.$emit('deleteCommentsHandle')
    },

    goToLogin() {
      this.$store.commit(indexMutation.SHOW_LOGIN_DIALOG)
    },

    /**
     * @param uid {String} 传过来的评论id
     * @param flag {String} hidden 隐藏； show 显示
     * @description 更新当前评论显示隐藏状态字段： currentCommentIsShow
     *
     * 将显示和隐藏的uid存到vuex中，是为了分页加载数据的时候，仍然可以保持原来的数据状态
     */
    hiddenOrShowComment(uid, flag) {
      let indexTemp;
      let item = this.commentsList.find((item, index) => {
        if (item.uid === uid) {
          indexTemp = index
          return item
        }
      })

      if (flag === 'hidden') { // 隐藏
        item['currentCommentIsShow'] = false
        this.$set(this.commentsList, indexTemp, item)
        // 将隐藏的评论的uid存到vuex中
        this.$store.commit(messageBoardMutation.CHANGE_MESSAGE_HIDDEN_LIST,
            {flag: 'hidden', uid}
        )
        return;
      }
      // 显示
      item['currentCommentIsShow'] = true
      this.$set(this.commentsList, indexTemp, item)
      // 将需要显示的评论的uid从vuex中移除
      this.$store.commit(messageBoardMutation.CHANGE_MESSAGE_HIDDEN_LIST,
          {flag: 'show', uid}
      )

    },
  },
  computed: {
    // 被隐藏的评论数据的uid数组
    hiddenCommentsId() {
      return this.$store.state.messageBoard.hiddenCommentsId
    },
    waitToReportCommentId() {
      return this.$store.state.messageBoard.waitReportedCommentId
    },

  },
  watch: {
    /**
     * 监听传过来树形结构的评论列表，每次前端点击查看更多时，这个数据都会改变，当数据改变时做了下面几件事
     * 1、处理下数据，增加两个字段，currentCommentIsShow、currentStandpointIsShow
     *    - currentCommentIsShow：控制当前层级的评论框显示或者隐藏，true：显示；false：隐藏
     *    - currentStandpointIsShow：控制当前评论点赞框的显示或者隐藏，true：显示；false：隐藏
     * 2、维护一个每层评论发表时间的数组，为了基于这个时间显示 1分钟前、1小时前...这样的显示效果
     * 3、将时间数组的数据，使用dayjs转换为，1分钟前、1小时前...这样的显示效果
     *    - 使用setInterval定时器，每隔一分钟刷新一次这个数组，达到不刷新页面时间就能动态更新的效果
     */
    comments: {
      handler: function (val, oldVal) {
        if (val) {
          // 处理一下数据,
          // 增加一个显示隐藏评论字段 currentCommentIsShow；和全局vuex中的隐藏列表比对一下，如果在里面就隐藏
          // 一个显示隐藏观点输入框字段 currentStandpointIsShow
          let tempTimeArr = []
          this.commentsList = val.map(item => {
            this.hiddenCommentsId.includes(item.uid) ? item['currentCommentIsShow'] = false : item['currentCommentIsShow'] = true
            item['currentStandpointIsShow'] = false

            // 维护一个每层时间数组
            tempTimeArr.push(item.create_time)
            return item
          })
          this.timeList = tempTimeArr

          /**
           * 因为是循环组件，实际上每次都是循环一层数据，
           * 想实现网页动态刷新时间，1分钟前，2分钟前，3分钟前，不刷新页面也会实时刷新
           * 1、每一层单独维护一个时间数组，索引和数据的索引一样
           * 2、setInterval()每隔一分钟，重新刷新一下这个数组
           */

          // 将时间转换为时间段 1小时前 1天前 1年前等等
          // 首次先初始化一次
          this.changeTimeToStringRange()


          // 先清空一次定时器
          clearInterval(this.intervalTimer)

          // 开启定时器，一分钟刷新一次
          this.intervalTimer = setInterval(() => {
            // 将时间转换为时间段 1小时前 1天前 1年前等等
            this.changeTimeToStringRange()
          }, 1000 * 60)

        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    that = this
  },
  created() {

  },
  mounted() {

  },
  destroyed() {
    // 组件销毁时，清空定时器
    clearInterval(this.intervalTimer)
  }
}
</script>

<style scoped lang="scss">
@import "CommentMessageList";
</style>
