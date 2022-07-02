<template>
  <!--
     动态组件，显示博客网站整体的动态，包括
     1、博客发布；2、博客修改；3、博客删除；4、留言；5、评论；6、点赞博客；
  -->
  <div class="dynamic-list-container">
    <header>
      <h3>动态</h3>
    </header>
    <section class="dong-tai">
      <div class="no-activity" v-if="isEmpty">
        <svg-icon icon-class="empty"/>
      </div>
      <div class="has-activity" v-else>
        <ul class="content">
          <li
            v-for="item in list"
            :key="item.uid"
          >
            <!--     时间       -->
            <div class="dynamic-time">
              <!--  时间轴上的小圆圈  -->
              <div class="time-line-icon"></div>
              <span>{{ item.dateTime }}</span>
            </div>
            <fragment
              v-for="item in item.actions"
              :key="item.uid"
            >
              <div class="action-title-box">
                <!--     图标       -->
                <div class="action-icon"
                     :class="{'commit': item.type==='commit','edit': item.type==='edit','remove': item.type==='remove','love': item.type==='love'}">
                  <svg-icon :icon-class="item.iconName"/>
                </div>
                <!--     评论、留言       -->
                <div class="action-title" v-if="item.type==='comment' || item.type==='message'">
                  {{ item.actionUser }} {{ item.actionName }}
                </div>
                <!--     发表、修改、删除、点赞      -->
                <div class="action-title" v-else>
                  {{ item.actionUser }} {{ item.actionName }} {{ item.count }} 篇博客
                </div>
              </div>
              <!--     详情       -->
              <ul class="dynamic-detail" v-if="item.type !== 'message'">
                <fragment
                  v-for="article in item.articles"
                  :key="article.uid"
                >
                  <li class="article-list">
                    <div class="title">
                      <span>{{ article.author.nickName }}</span>/<span>{{ article.title }}</span>
                    </div>
                    <div class="tags">
                      <fragment v-for="(tag, index) in article.tags" :key="tag.uid">
                        <span class="tag">{{ tag.label }}</span>
                        <span class="split-line" v-if="index !== article.tags.length-1">/</span>
                      </fragment>
                    </div>
                    <div class="about-time">
                      2 小时前
                    </div>
                  </li>
                  <li v-if="item.type === 'comment'" class="comment-msg">{{ article.msg }}</li>
                </fragment>
              </ul>
              <!--     留言       -->
              <ul class="dynamic-detail" v-else>
                <li class="comment-msg">
                  <div>{{ item.message }}</div>
                  <div class="about-time">
                    2 小时前
                  </div>
                </li>
              </ul>
            </fragment>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {list} from './data'

export default {
  name: "DynamicList",
  props: {},
  components: {},
  data() {
    return {
      isEmpty: false,
      list,
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
@import "DynamicList";
</style>
