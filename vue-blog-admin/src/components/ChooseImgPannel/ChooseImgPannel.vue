<template>
  <div class="choose-img-pannel-container">
    <el-aside>
      <div class="title">分类</div>
      <div
        v-for="item in pictureSortList"
        :key="item.uid"
        class="item"
        :class="currentSort.uid === item.uid ? 'active' : '' "
        @click="sortChange(item)"
      >
        <span>{{ item.sort_name }}</span>
      </div>
    </el-aside>
    <el-main>
      <!-- 内容展示表格 -->
      <div class="picture-box" v-if="isDone" :style="{height: `calc(100% - ${paginationBoxHeight}px)`}">
        <fragment v-for="(item, index) in pictureList" :key="index">
          <div class="time">{{ item.uploadTime }}</div>
          <el-row>
            <el-col
              v-for="file in item.files" :key="file.fileId"
              style="padding: 6px"
              :xs="24"
              :sm="12"
              :md="12"
              :lg="6"
              :xl="4"
            >

              <el-card
                class="card-box"
                shadow="always"
                :body-style="{ padding: '0px'}"
              >
                <el-image
                  :src="file.fileUrl"
                  style="cursor:pointer"
                  fit="scale-down"
                  @dblclick="chooseThisImgHandle(file.fileUrl)"
                />
                <div>
                  <span class="picture-title">{{ file.fileName }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </fragment>
      </div>

      <!--  分页  -->
      <div class="pagination-box" :style="{height: `${paginationBoxHeight}px`}">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="this.chooseImgSearchParam.currentPage"
          :page-sizes="[30, 60, 90, 120]"
          :page-size="this.chooseImgSearchParam.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="chooseImgTotal">
        </el-pagination>
      </div>

    </el-main>
  </div>
</template>

<script>
export default {
  name: "ChooseImgPannel",
  props: {
    pictureSortList: {
      type: Array,
      default: () => []
    },
    currentSort: {
      type: Object,
      default: () => {
      }
    },
    chooseImgSearchParam: {
      type: Object,
      default: () => {
      }
    },
    pictureList: {
      type: Array,
      default: () => []
    },
    chooseImgTotal: {
      type: Number,
      default: () => 0
    },
    // 数据是否更新完
    isDone: {
      type: Boolean,
      default: () => true
    },
  },
  components: {},
  data() {
    return {
      paginationBoxHeight: 60, // 分页栏的高度
    }
  },
  methods: {
    chooseThisImgHandle(fileUrl){
      this.$emit('chooseThisImgHandle', fileUrl)
    },
    sortChange(sort) {
      this.$emit('sortChange', sort)
    },
    // 分页 pageSize 改变时触发
    handleSizeChange(val) {
      this.$emit('handleChangeImgSizeChange', val)
    },
    // 分页 currentPage 改变时触发
    handleCurrentPageChange(val) {
      this.$emit('handleChangeImgCurrentPageChange', val)
    },


  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "ChooseImgPannel";
</style>
