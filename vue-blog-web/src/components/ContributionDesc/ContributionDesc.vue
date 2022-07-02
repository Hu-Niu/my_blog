<template>
  <div class="contribution-desc-container">
    <header>
      <h3>动态</h3>
    </header>
    <section>
      <div class="no-activity" v-if="isEmpty">
        <svg-icon icon-class="empty"/>
      </div>
      <div class="has-activity" v-else>
        <div class="time">06-13</div>
        <ul class="content">
          <li
            v-for="item in list"
            :key="item.uid"
          >
            <!--     图标       -->
            <div class="time-line-icon commit"
                 :class="{'commit': item.type==='commit','edit': item.type==='edit','remove': item.type==='remove'}">
              <svg-icon :icon-class="item.iconName"/>
            </div>
            <!--     摘要       -->
            <div class="summary">{{ item.actionName }} {{ item.count }} 篇博客</div>
            <!--     详情       -->
            <ul class="detail">
              <li class="article-list"
                  v-for="article in item.articles"
                  :key="article.uid"
              >
                <div class="title">
                  <span>{{ article.author.nickName }}</span>/<span>{{ article.title }}</span>
                </div>
                <div class="tags">
                  <fragment v-for="(tag, index) in article.tags" :key="tag.uid">
                    <span class="tag">{{ tag.label }}</span>
                    <span class="split-line" v-if="index !== article.tags.length-1">/</span>
                  </fragment>
                </div>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {list} from './data'

export default {
  name: "ContributionDesc",
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
  },
  created() {
  },
}
</script>

<style scoped lang="scss">
@import "ContributionDesc";
</style>
