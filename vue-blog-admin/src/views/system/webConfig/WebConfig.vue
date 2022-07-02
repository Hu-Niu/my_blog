<template>
  <div class="web-config-container">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName"  class="tabs-container">
      <el-tab-pane name="one">
        <span slot="label"><i class="el-icon-date"></i> 网站信息</span>
        <el-form
          label-position="left"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="LOGO">
            <div class="upload-box">
              <el-upload
                v-if="!imageUrl"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div v-if="imageUrl" class="icon-box">
                <img :src="imageUrl" class="avatar">
                <i class="el-icon-error del-img" @click="deleteIcon"></i>
              </div>
            </div>

          </el-form-item>

          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="网站名称">
                <el-input v-model="form.name" style="width: 400px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="标题">
                <el-input v-model="form.title" style="width: 400px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="关键字">
                <el-input v-model="form.keyword" style="width: 400px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="描述">
                <el-input v-model="form.summary" style="width: 400px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="作者">
                <el-input v-model="form.author" style="width: 400px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备案号">
                <el-input v-model="form.recordNum" style="width: 400px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="10">
              <el-form-item label="登录方式">
                <el-checkbox-group v-model="form.loginTypeList">
                  <el-checkbox label="1" style="margin-left: 10px">账号密码</el-checkbox>
                  <el-checkbox label="2" style="margin-left: 10px">码云</el-checkbox>
                  <el-checkbox label="3" style="margin-left: 10px">Github</el-checkbox>
                  <el-checkbox label="4" style="margin-left: 10px">QQ</el-checkbox>
                  <el-checkbox label="5" style="margin-left: 10px">微信</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">保 存</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <el-tab-pane name="two">
        <span slot="label"><i class="el-icon-date"></i> 评论&打赏</span>
        <el-form
          label-position="left"
          :model="form"
          label-width="90px"
        >
          <el-row :gutter="24">
            <el-col :span="4">
              <el-form-item label="支付宝">
                <div class="upload-box">
                  <el-upload
                    v-if="!imageUrl"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div v-if="imageUrl" class="icon-box">
                    <img :src="imageUrl" class="avatar">
                    <i class="el-icon-error del-img" @click="deleteIcon"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="微信">
                <div class="upload-box">
                  <el-upload
                    v-if="!imageUrl"
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div v-if="imageUrl" class="icon-box">
                    <img :src="imageUrl" class="avatar">
                    <i class="el-icon-error del-img" @click="deleteIcon"></i>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="网站评论">
                <el-radio v-for="item in openDictList" :key="item.uid" v-model="form.openComment"
                          :label="item.dictValue" border size="medium">{{ item.dictLabel }}
                </el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="网站打赏">
                <el-radio v-for="item in openDictList" :key="item.uid" v-model="form.openComment"
                          :label="item.dictValue" border size="medium">{{ item.dictLabel }}
                </el-radio>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="移动端评论">
                <el-radio v-for="item in openDictList" :key="item.uid" v-model="form.openComment"
                          :label="item.dictValue" border size="medium">{{ item.dictLabel }}
                </el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="移动端打赏">
                <el-radio v-for="item in openDictList" :key="item.uid" v-model="form.openComment"
                          :label="item.dictValue" border size="medium">{{ item.dictLabel }}
                </el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">保 存</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { openDictList } from './data'
export default {
  name: "WebConfig",
  props: {},
  components: {},
  data() {
    return {
      activeName: 'one',
      imageUrl: '',
      isShowDelIcon: false,
      openDictList,


      form: {
        name: "",
        title: "",
        keyword: "",
        summary: "",
        author: "",
        logo: "",
        recordNum: "",
        openComment: "1",
        aliPay: "",
        weixinPay: "",
        aliPayPhoto: "",
        weixinPayPhoto: "",
        showList: [],
        loginTypeList: []
      },
    }
  },
  methods: {
    deleteIcon() {
      this.imageUrl = ''
    },
    handleClick(tab, event) {
      console.log(tab, 'tab')
    },

    submitForm() {
      console.log('submitForm')
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      return true;
    }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "WebConfig";
</style>
