<template>
    <div class="about-me-container">
        <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName" class="tabs-container">

            <el-tab-pane name="two">
                <span slot="label"><i class="el-icon-date"></i>个人履历</span>
                <div class="editor-container" v-if="isShowEdit">
                    <div style="padding: 20px 0;height: 100%">
                        <MarkdownEdit
                            @blogContentInputHandle="blogContentInputHandle"
                            :blogContent="blogContent"
                        />
                    </div>
                    <!--          <Ckeditor></Ckeditor>-->
                </div>

                <div>
                    <el-button type="primary" @click="saveInfoHandle" :disabled="isDemoVersion">保 存</el-button>
                </div>

            </el-tab-pane>


            <el-tab-pane name="three">
                <span slot="label"><i class="el-icon-date"></i> 修改密码</span>
                <el-form
                    label-position="left"
                    :model="form"
                    label-width="90px"
                >
                    <el-form-item label="旧密码" prop="oldPwd">
                        <el-input type="password" v-model="changePwdForm.oldPwd" style="width: 400px"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPwd1">
                        <el-input type="password" v-model="changePwdForm.newPwd1" style="width: 400px"></el-input>
                    </el-form-item>

                    <el-form-item label="重复输入" prop="newPwd2">
                        <el-input type="password" v-model="changePwdForm.newPwd2" style="width: 400px"></el-input>
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
import MarkdownEdit from "../../../components/MarkdownEdit/MarkdownEdit";
import Ckeditor from "../../../components/Ckeditor/Ckeditor";

import {aboutMeApi} from '/src/api/aboutMe'

export default {
    name: "AboutMe",
    props: {},
    components: {
        MarkdownEdit,
        Ckeditor,
    },
    data() {
        return {
            activeName: 'two',

            form: {},
            changePwdForm: {
                oldPwd: "",
                newPwd1: "",
                newPwd2: ""
            },

            blogContent: '',
            uid: '',
            isUpdate: null,
            isShowEdit: false,

        }
    },
    methods: {
        async saveInfoHandle() {
            let params = {
                adminUserId: this.loginUserInfo.uid,
                introDetail: this.blogContent,
            }

            let result;

            if (this.isUpdate) { // 说明有之前的记录，执行更新操作
                params.uid = this.uid
                result = await aboutMeApi.updateAboutMeByUid(params)
            } else { // 说明没有之前的记录，执行保存操作
                result = await aboutMeApi.saveAboutMe(params)
            }

            if (result.data.code === 1) {
                this.$message({
                    message: this.isUpdate ? '关于我修改成功' : '关于我添加成功',
                    type: 'success',
                    duration: 1500,
                })
            } else {
                this.$message({
                    message: result.data.extendInfo ? result.data.extendInfo : result.data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },
        blogContentInputHandle(val) {
            console.log(val, 'blogContentInputHandle')
            this.blogContent = val
        },

        handleClick(tab, event) {
            console.log(tab, 'tab')
        },

        submitForm() {
            console.log('submitForm')
        },

        async getInfo() {
            let {data} = await aboutMeApi.queryAboutMeByAdminUserId({adminUserId: this.loginUserInfo.uid})
            this.isUpdate = data.data.length > 0
            if (this.isUpdate) {
                this.blogContent = data.data[0].intro_detail
                this.uid = data.data[0].uid
                this.isShowEdit = true
            }
        },
    },
    computed: {
        loginUserInfo() {
            return this.$store.state.user.loginUserInfo
        },
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        }
    },
    watch: {},
    mounted() {
        this.getInfo()
    }
}
</script>

<style scoped lang="scss">
@import "AboutMe";
</style>
