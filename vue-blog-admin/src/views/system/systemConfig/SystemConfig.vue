<template>
  <div class="system-config-container">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName" class="tabs-container">
      <!--   系统配置   -->
      <el-tab-pane name="first" class="content-box">
        <span slot="label"><i class="el-icon-edit"></i>系统配置</span>
        <el-form label-position="left" label-width="140px" :model="form">
          <aside>
            通过开关选择博客编辑时的文本编辑器，以及文件显示方式
          </aside>
          <el-form-item label="封面图片显示优先级">
            <el-radio v-for="item in picturePriorityDictList" :key="item.uid" v-model="form.picturePriority"
                      :label="item.dictValue" border size="medium">{{ item.dictLabel }}
            </el-radio>
          </el-form-item>

          <el-form-item label="详情图片显示优先级">
            <el-radio v-for="item in picturePriorityDictList" :key="item.uid" v-model="form.contentPicturePriority"
                      :label="item.dictValue" border size="medium">{{ item.dictLabel }}
            </el-radio>
          </el-form-item>

          <!--当有新的反馈，友链申请时进行通知，首先需要在系统管理处设置接收通知的邮箱 -->
          <el-form-item label="网站消息邮件通知">
            <el-radio v-for="item in openDictList" :key="item.uid" v-model="form.startEmailNotification"
                      :label="item.dictValue" border size="medium">{{ item.dictLabel }}
            </el-radio>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">保 存</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <!--  本地文件存储   -->
      <el-tab-pane name="second">
        <span slot="label">
          <i class="el-icon-date"></i> 本地文件存储
        </span>
        <el-form label-position="left" :model="form" label-width="120px">
          <aside>
            使用IO流将文件存储本地磁盘中
          </aside>

          <el-form-item label="本地文件域名">
            <el-input v-model="form.localPictureBaseUrl" auto-complete="new-password" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="文件上传本地">
            <el-radio v-for="item in yesNoDictList" :key="item.uid" v-model="form.uploadLocal" :label="item.dictValue"
                      border size="medium">{{ item.dictLabel }}
            </el-radio>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">保 存</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <!--  七牛云对象存储   -->
      <el-tab-pane name="third">
        <span slot="label">
          <i class="el-icon-date"></i> 七牛云对象存储
        </span>

        <el-form
          label-position="left"
          :model="form"
          label-width="120px"
        >
          <aside>
            使用<strong>七牛云</strong>构建对象存储服务
          </aside>

          <el-form-item label="七牛云文件域名">
            <el-input v-model="form.qiNiuPictureBaseUrl" auto-complete="new-password" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="七牛云公钥">
            <el-input v-model="form.qiNiuAccessKey" auto-complete="new-password" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="七牛云私钥">
            <el-input type="password" v-model="form.qiNiuSecretKey" auto-complete="new-password"
                      style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="上传空间">
            <el-input v-model="form.qiNiuBucket" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="存储区域">
            <el-select v-model="form.qiNiuArea" placeholder="请选择存储区域" clearable>
              <el-option v-for="item in areaDictList"
                         :key="item.dictValue"
                         :label="item.dictLabel"
                         :value="item.dictValue"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="文件上传七牛云">
            <el-radio v-for="item in yesNoDictList" :key="item.uid" v-model="form.uploadQiNiu" :label="item.dictValue"
                      border size="medium">{{ item.dictLabel }}
            </el-radio>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">保 存</el-button>
          </el-form-item>

        </el-form>
      </el-tab-pane>

      <!-- 邮箱配置   -->
      <el-tab-pane name="fifth">
        <span slot="label"><i class="el-icon-edit"></i> 邮箱配置</span>
        <el-form label-position="left" label-width="80px">

          <aside>
            邮箱配置主要用于配置网站消息的接收<br/>
            例如：友链申请、网站评论、网站反馈等，可以在系统配置处选择是否开启邮件通知
          </aside>

          <el-form-item label="邮箱">
            <el-input v-model="form.email" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="password" v-model="form.emailPassword" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="form.emailUserName" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="SMTP地址">
            <el-input v-model="form.smtpAddress" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="SMTP端口">
            <el-input v-model="form.smtpPort" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import {
  picturePriorityDictList,
  editorModalDictList,
  openDictList,
  yesNoDictList,
  areaDictList,
  dashboardNotification,
} from './data'
import MarkdownEdit from "../../../components/MarkdownEdit/MarkdownEdit";
import Ckeditor from "../../../components/Ckeditor/Ckeditor";

export default {
  name: "SystemConfig",
  props: {},
  components: {
    MarkdownEdit,
    Ckeditor,
  },
  data() {
    return {
      picturePriorityDictList,
      editorModalDictList,
      openDictList,
      yesNoDictList,
      areaDictList,

      form: {}, // 提交表单数据

      activeName: 'first', // 当前的tab索引
    }
  },
  methods: {
    // tabs切换
    handleClick(tab, event) {
      console.log(tab, 'tab')
    },
    // 表单提交
    submitForm() {
      console.log('submitForm')
    },
    cleanRedis(val) {
      console.log(val, 'val')
    },
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "SystemConfig";
</style>
