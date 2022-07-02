<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item>
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="loginForm.username"
          clearable
        >
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
          clearable
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.isRememberMe" style="margin:0 0 25px 0;">
        <span style="color: #eee">七天免登录</span>
      </el-checkbox>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <!--引入粒子特效-->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
  </div>
</template>

<script>
import {
  userMutation
} from '/src/store/mutation-types'
import {userApi} from "../../api/user";
import {adminUserApi} from "../../api/adminUser";

export default {
  name: "login",
  props: {},
  components: {},
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        isRememberMe: false
      },
      loading: false,
    }
  },
  methods: {
    async handleLogin() {
      let {data} = await adminUserApi.adminLogin(this.loginForm)
      if (data.code === 1) {
        // 登录成功后，把token存到vuex中
        this.$store.commit(userMutation.SET_TOKEN, data.data)
        await this.$router.push('/')
      } else {
        this.$message({
          message: data.extendInfo ? data.extendInfo : data.msg,
          type: 'error',
          duration: 1500,
        });
      }


    }
  },
  computed: {},
  watch: {},
  mounted() {
  }
}
</script>

<style scoped lang="scss">
@import "Login";
</style>
<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      color: $light_gray;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
