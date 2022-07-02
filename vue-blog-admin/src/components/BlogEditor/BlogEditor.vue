<template>
    <div class="blog-editor-container">
        <!-- 添加或修改对话框 -->
        <el-dialog
            :visible="true"
            :fullscreen="true"
            custom-class="blog-editor-markdown-dialog"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <div slot="title">
                <div class="blog-title-box">
                    <div class="label">博客标题：</div>
                    <div class="input-box">
                        <el-input placeholder="请在此处输入文章标题" :value="blogTitle" @input="blogTitleInputHandle"></el-input>
                    </div>
                    <div class="feature-btn">
                        <el-button type="info" round @click="saveBlogHandle('draft')" :disabled="isDemoVersion">保存草稿
                        </el-button>
                        <el-button
                            type="success"
                            round
                            @click="showBlogExtraDialogHandle"
                        >
                            发布博客
                        </el-button>
                    </div>
                    <div class="close-icon">
                        <el-button type="text" @click="closeEditorHandle">
                            <svg-icon icon-class="delete"></svg-icon>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="editor-container">
                <MarkdownEdit
                    @blogContentInputHandle="blogContentInputHandle"
                    :blogContent="blogContent"
                />
            </div>

            <!--   二级弹出框  点击发布博客弹出 用来填写博客的另外的信息     -->
            <div v-if="isShowBlogExtraDialog">
                <el-dialog
                    title="发布博客"
                    append-to-body
                    custom-class="choose-blog-extra-dialog"
                    :visible="true"
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :show-close="false"
                >
                    <div slot="title">
                        <div class="blog-title-box">
                            <div class="label">发布博客：</div>
                            <div class="close-icon">
                                <el-button type="text" @click="closeBlogExtraDialogHandle">
                                    <svg-icon icon-class="delete"></svg-icon>
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <el-form>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="展示封面" label-width="120px">
                                    <el-upload
                                        v-if="!currentCoverUrl"
                                        class="choose-img"
                                        :action="action"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        accept=".jpg,.png,.gif,.jpeg,.ico"
                                    >
                                        <svg-icon icon-class="plus"/>
                                    </el-upload>
                                    <div
                                        class="img-box"
                                        v-else
                                        @mouseenter="deleteIconIsShow = true"
                                        @mouseleave="deleteIconIsShow = false"
                                    >
                                        <div
                                            class="delete-icon"
                                            v-show="deleteIconIsShow"
                                            @click="removeCoverHandle"
                                        >
                                            <svg-icon icon-class="delete"/>
                                        </div>
                                        <el-image
                                            style="width: 100%; height: 100%"
                                            :src="currentCoverUrl"
                                        />
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="摘要" label-width="120px">
                                    <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入摘要"
                                        v-model="blogSummary2">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="博客分类" label-width="120px">
                                    <el-select v-model="blogSort2" placeholder="请选择" clearable>
                                        <el-option
                                            v-for="item in blogSortList"
                                            :key="item.uid"
                                            :label="item.sort_name"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="博客状态" label-width="120px">
                                    <el-select v-model="blogStatus2" placeholder="请选择" clearable>
                                        <el-option
                                            v-for="item in blogStatusList"
                                            :key="item.uid"
                                            :label="item.blogStatus"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否原创" label-width="120px">
                                    <el-select v-model="isOriginal2" placeholder="请选择" clearable>
                                        <el-option
                                            v-for="item in isOriginalList"
                                            :key="item.uid"
                                            :label="item.isOriginal"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="isShowOriginAddressInputBox">
                                <el-form-item label="参考来源" label-width="120px">
                                    <el-input v-model="originAddress2" placeholder="请输入参考来源"
                                              style="width: 217px" clearable></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="推荐等级" label-width="120px">
                                    <el-select v-model="recommendLevel2" placeholder="请选择" clearable>
                                        <el-option
                                            v-for="item in recommendLevelList"
                                            :key="item.uid"
                                            :label="item.recommendLevel"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="排序" label-width="120px">
                                    <el-input type="number" v-model="orderNum2" placeholder="请输入排序数字"
                                              style="width: 217px" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否开启评论" label-width="120px">
                                    <el-select v-model="isOpenComment2" placeholder="请选择" clearable>
                                        <el-option
                                            v-for="item in isOpenCommentList"
                                            :key="item.uid"
                                            :label="item.isOpenComment"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="博客标签" label-width="120px">
                                    <el-select v-model="blogTag2" placeholder="请选择" style="width: 100%" multiple
                                               clearable>
                                        <el-option
                                            v-for="item in blogTagList"
                                            :key="item.uid"
                                            :label="item.tag_name"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="是否为私密文章" label-width="120px">
                                    <el-switch
                                        v-model="isPrivate2"
                                        active-text="是"
                                        inactive-text="否">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>

                    <div slot="footer">
                        <el-button type="text" style="color: #8c92a4" @click="closeBlogExtraDialogHandle">取消</el-button>
                        <el-button v-if="!uid" type="text" @click="saveBlogHandle('draft')" :disabled="isDemoVersion">
                            保存为草稿
                        </el-button>
                        <el-button type="danger" @click="saveBlogHandle" :disabled="isDemoVersion">发布文章</el-button>
                    </div>
                </el-dialog>
            </div>


        </el-dialog>

    </div>
</template>

<script>
import MarkdownEdit from "../MarkdownEdit/MarkdownEdit";
import dayjs from "dayjs"

export default {
    name: "BlogEditor",
    props: {
        // 博客主键id
        uid: {
            type: String,
            default: () => ''
        },
        // 博客标题
        blogTitle: {
            type: String,
            default: () => ''
        },
        // 博客内容
        blogContent: {
            type: String,
            default: () => ''
        },
        // 博客当前封面
        currentCoverUrl: {
            type: String,
            default: () => ''
        },
        // 封面上传路径
        action: {
            type: String,
            default: () => ''
        },
        // 文章摘要
        blogSummary: {
            type: String,
            default: () => ''
        },
        // 文章分类列表
        blogSortList: {
            type: Array,
            default: () => []
        },
        // 文章标签列表
        blogTagList: {
            type: Array,
            default: () => []
        },

        // 文章状态列表
        blogStatusList: {
            type: Array,
            default: () => []
        },
        // 文章推荐等级列表
        recommendLevelList: {
            type: Array,
            default: () => []
        },
        // 文章是否允许评论列表
        isOpenCommentList: {
            type: Array,
            default: () => []
        },
        // 文章是否原创列表
        isOriginalList: {
            type: Array,
            default: () => []
        },

        // 文章状态
        blogStatus: {
            type: String,
            default: () => ''
        },
        // 文章推荐等级
        recommendLevel: {
            type: String,
            default: () => ''
        },
        // 文章是否打开评论
        isOpenComment: {
            type: String,
            default: () => ''
        },
        // 是否为私密文章 1是 2否
        isPrivate: {
            type: String,
            default: () => ''
        },

        // 文章是否原创
        isOriginal: {
            type: String,
            default: () => ''
        },


        // 文章分类
        blogSort: {
            type: String,
            default: () => ''
        },
        // 文章标签
        blogTag: {
            type: Array,
            default: () => []
        },
        // 博客排序
        orderNum: {
            type: String,
            default: () => ''
        },
        // 参考来源
        originAddress: {
            type: String,
            default: () => ''
        },



    },
    components: {
        MarkdownEdit,
    },
    data() {
        return {
            isShowBlogExtraDialog: false, // 是否显示添加博客额外信息弹出框

            deleteIconIsShow: false,
            blogSummary2: '',

            blogSort2: '',
            blogTag2: [],

            blogStatus2: '',
            isOriginal2: '',
            recommendLevel2: '',
            isOpenComment2: '',
            isPrivate2: '',
            originAddress2: '',

            orderNum2: '',

            isShowOriginAddressInputBox: false,
        }
    },
    methods: {
        blogTitleInputHandle(val) {
            this.$emit('blogTitleInputHandle', val)
        },
        saveBlogHandle(flag) {
            if (!this.blogTitle) {
                const title = dayjs().format('YYYY-MM-DD HH:mm:ss')
                this.blogTitleInputHandle(title)
            }
            setTimeout(() => {
                this.$emit('saveBlogHandle', flag)
            }, 100)
        },
        closeBlogExtraDialogHandle() {
            console.log('closeBlogExtraDialogHandle')
            this.isShowBlogExtraDialog = false
        },
        handleAvatarSuccess(res, file) {
            console.log(res, 'res')
            let {data} = res
            this.$emit('handleAvatarSuccess', data[0].url)
        },
        removeCoverHandle() {
            this.$emit('removeCoverHandle')
        },
        async showBlogExtraDialogHandle() {
            console.log('showBlogExtraDialogHandle')
            this.$emit('showBlogExtraDialogHandle')
        },
        blogContentInputHandle(val) {
            this.$emit('blogContentInputHandle', val)
        },
        showPublishEditor() {
            this.isShowBlogExtraDialog = true
        },

        closeEditorHandle() {
            this.$emit('closeEditorHandle')
        },
    },
    computed: {
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        },
    },
    watch: {
        blogSummary2(newVal) {
            this.$emit('blogSummaryInputHandle', newVal)
        },
        orderNum2(newVal) {
            this.$emit('orderNumInputHandle', newVal)
        },


        blogStatus2(newVal) {
            this.$emit('blogStatusChangeHandle', newVal)
        },
        isOriginal2(newVal) {
            console.log(newVal, 'isOriginal2')
            // newVal === 1 时，表示为原创，不显示来源地址输入框
            this.isShowOriginAddressInputBox = +newVal !== 1;
            this.$emit('isOriginalChangeHandle', newVal)
        },
        originAddress2(newVal) {
            console.log(newVal, 'isOriginal2')
            this.$emit('originAddressInputHandle', newVal)
        },

        recommendLevel2(newVal) {
            this.$emit('recommendLevelChangeHandle', newVal)
        },
        isOpenComment2(newVal) {
            this.$emit('isOpenCommentChangeHandle', newVal)
        },
        isPrivate2(newVal) {
            let val = newVal === true ? '1' : '2'
            this.$emit('isPrivateChangeHandle', val)
        },



        blogSort2(newVal) {
            this.$emit('blogSortChangeHandle', newVal)
        },
        'blogTag2.length': {
            handler() {
                this.$emit('blogTagChangeHandle', this.blogTag2)
            },
        },
    },
    mounted() {
        // 数据回显用
        this.blogSummary2 = this.blogSummary
        this.blogSort2 = this.blogSort
        this.blogTag2 = this.blogTag
        this.blogStatus2 = this.blogStatus
        this.isOriginal2 = this.isOriginal
        this.recommendLevel2 = this.recommendLevel
        this.isOpenComment2 = this.isOpenComment
        this.isPrivate2 = this.isPrivate === '1'
        this.orderNum2 = this.orderNum
        this.originAddress2 = this.originAddress
    }
}
</script>

<style scoped lang="scss">

</style>
