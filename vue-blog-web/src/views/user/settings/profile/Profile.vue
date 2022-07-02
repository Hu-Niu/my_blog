<template>
  <div class="profile-container">
    <h3>个人资料</h3>

    <main class="info-box">
      <div class="left-info">
        <el-form
            ref="form"
            :model="form"
            label-width="80px"
            label-position="left"
        >
          <el-form-item label="用户名">
            <el-input
                v-model="form.name"
                placeholder="请输入内容"
                maxlength="20"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="职位">
            <el-input
                v-model="form.name"
                placeholder="请输入内容"
                maxlength="50"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="公司">
            <el-input
                v-model="form.name2"
                placeholder="请输入内容"
                maxlength="50"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="个人主页">
            <el-input
                v-model="form.name"
                placeholder="请输入内容"
                maxlength="100"
                show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="个人介绍">
            <el-input
                type="textarea"
                v-model="form.desc"
                placeholder="请输入内容"
                maxlength="100"
                show-word-limit
                :autosize="{minRows: 4, maxRows: 4 }"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="right-profile">
        <UploadProfile/>
      </div>
    </main>

  </div>
</template>

<script>
import UploadProfile from "../../../../components/UploadProfile/UploadProfile";
export default {
  name: "Profile",
  props: {},
  components: {
    UploadProfile
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "Profile";
</style>
