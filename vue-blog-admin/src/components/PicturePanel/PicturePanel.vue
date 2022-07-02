<template>
  <div class="picture-panel-container">
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
                <el-checkbox
                  class="check-box"
                  v-model="selectIds"
                  :label="file.fileId"
                />
                <el-image
                  :src="file.fileUrl"
                  style="cursor:pointer"
                  fit="scale-down"
                />
                <div>
                  <span class="picture-title">{{ file.fileName }}</span>
                </div>
                <div style="margin-bottom: 14px;">
                  <el-button-group>
                    <el-tooltip effect="dark" content="复制图片地址" placement="bottom" style="margin-right: 2px">
                      <el-button
                        size="mini"
                        icon="el-icon-copy-document"
                        @click="copyUrl(file.fileUrl)"
                      />
                    </el-tooltip>

                    <el-tooltip effect="dark" content="复制Markdown格式图片地址" placement="bottom"
                                style="margin-right: 2px">
                      <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-document-copy"
                        @click="copyUrl(file.fileMarkDown)"
                      >
                      </el-button>
                    </el-tooltip>

                    <el-tooltip effect="dark" content="删除图片" placement="bottom" style="margin-right: 2px">
                      <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="handleSingleDelete(file)"
                      />
                    </el-tooltip>

                  </el-button-group>
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
          :current-page="this.searchParam.currentPage"
          :page-sizes="[30, 60, 90, 120]"
          :page-size="this.searchParam.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </el-main>
  </div>
</template>

<script>
export default {
  name: "PicturePanel",
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
    searchParam: {
      type: Object,
      default: () => {
      }
    },
    pictureList: {
      type: Array,
      default: () => []
    },
    total: {
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
      selectIds: [], // 当前选中的id
    }
  },
  methods: {
    sortChange(sort) {
      this.clearSelect()
      this.$emit('sortChange', sort)
    },
    // 分页 pageSize 改变时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.clearSelect()
      this.$emit('handleSizeChange', val)
    },
    // 分页 currentPage 改变时触发
    handleCurrentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.clearSelect()
      this.$emit('handleCurrentPageChange', val)
    },
    copyUrl(url) {
      console.log(url, 'url')
    },
    // 单个删除
    handleSingleDelete(file) {
      this.$emit('handleSingleDelete', file)
    },
    // 选择全部
    selectAll() {
      let tempArr = []
      for (const item of this.pictureList) {
        if (item.files) {
          item.files.map(file => {
            tempArr.push(file.fileId)
          })
        }
      }
      if(JSON.stringify(this.selectIds) === JSON.stringify(tempArr)){
        this.selectIds = []
      }else {
        this.selectIds = tempArr
      }
    },
    // 取消选中
    clearSelect(){
      this.selectIds = []
    },

  },
  computed: {},
  watch: {
    selectIds(newVal, oldVal) {
      // 根据拿到的id，获得对应的文件名
      let selectNames = []
      for (const item of this.pictureList) {
        if (item.files) {
          item.files.map(file => {
            if(newVal.includes(file.fileId)){
              selectNames.push(file.fileName)
            }
          })
        }
      }
      this.$emit('selectHandle', {ids:newVal,names:selectNames})
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "PicturePanel";
</style>
