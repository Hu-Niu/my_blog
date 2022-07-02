<template>
    <div class="picture-container">
        <!--  筛选框  -->
        <div class="filter-container" v-show="!isHideSearch" :style="{height:`${filterContainerHeight}px`}">
            <el-form :inline="true">

                <el-date-picker
                    v-model="searchParam.createTime"
                    style="width: 150px;"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>


                <el-button
                    style="margin-left: 10px;"
                    class="filter-item"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleFind"
                >
                    查找
                </el-button>

            </el-form>
        </div>

        <!--  功能按钮  -->
        <div class="feature-btns" :style="{height: `${featureBtnsHeight}px`}">
            <el-row :gutter="10">

                <el-col :span="1.5">
                    <el-button class="filter-item" type="primary" @click="handleAdd" icon="el-icon-edit"
                    >添加图片
                    </el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button class="filter-item" type="warning" @click="handleCheckAll" icon="el-icon-check"
                    >全选
                    </el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button class="filter-item" type="danger" @click="handleDeleteSelected" icon="el-icon-delete"
                    >删除选中
                    </el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button class="filter-item" type="success" @click="handleChangeGroup" icon="el-icon-toilet-paper"
                    >更换分类
                    </el-button>
                </el-col>

                <RightToggleBar
                    :hide-search="isHideSearch"
                    @refresh="resetTableList"
                    @toggleSearch="toggleSearchStatus"
                />

            </el-row>
        </div>

        <!--  内容展示  -->
        <div class="table-container" :style="{height: `calc(100% - ${calcTableHeight}px)`}">
            <PicturePanel
                ref="PicturePanel"
                @handleSingleDelete="handleSingleDelete"
                @sortChange="sortChange"
                @handleSizeChange="handleSizeChange"
                @handleCurrentPageChange="handleCurrentPageChange"
                @selectHandle="selectHandle"
                :pictureSortList="pictureSortList"
                :currentSort="currentSort"
                :pictureList="pictureList"
                :total="total"
                :searchParam="searchParam"
                :isDone="isDone"
            />
        </div>

        <!-- 添加或修改对话框 -->
        <el-dialog title="图片上传" :visible.sync="dialogFormVisible" :before-close="addBeforeCloseHandle">
            <div slot="title">
                <span style="padding-right: 100px">图片上传</span> <span>当前分类：{{ currentSort.sort_name }}</span>
            </div>
            <el-upload
                drag
                :action="action"
                :on-success="fileSuccess"
                :on-error="fileError"
                :data="currentSort"
                :before-upload="beforeUpload"
                ref="fileUpload"
                accept=".jpg,.png,.gif,.jpeg,.ico"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传图片，且不超过5MB</div>
            </el-upload>

        </el-dialog>

        <!-- 更换分类 -->
        <el-dialog title="更换分类" :visible.sync="dialogChangeSortVisible" :before-close="changeSortBeforeCloseHandle">
            <div slot="title">
                <span style="padding-right: 100px">更换分类</span> <span>当前分类：{{ currentSort.sort_name }}</span>
            </div>
            <el-form>
                <el-form-item label="请选择需要更换的分类">
                    <el-select v-model="theChangeSortId" placeholder="请选择需要更换的分类" clearable>
                        <el-option
                            v-for="item in pictureSortList"
                            :key="item.uid"
                            :label="item.sort_name"
                            :value="item.uid"
                        />
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="theChangeSortCancelHandle">取 消</el-button>
                <el-button type="danger" @click="theChangeSortConfirmHandle">确定</el-button>
            </div>

        </el-dialog>

        <!-- 批量删除对话框 -->
        <el-dialog title="批量删除" :visible.sync="batchDeleteDialogVisible" width="500px"
                   :before-close="deleteBeforeClose">
            <el-form>
                <el-form-item>
                    <h3 style="color: #ed4014;">确定要删除以下数据吗</h3>
                </el-form-item>

                <el-form-item label="删除数据" label-width="80px">
                    <el-card style="height: 300px;overflow-y: auto;" :body-style="{padding: '5px 10px'}">
                        <div v-for="(item,index) in currentSelectPictureNames" :key="index" style="font-size: 14px;">
                            <span style="color: #ed4014;">*</span>
                            <span>{{ item }}</span>
                        </div>
                    </el-card>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="deleteCancelHandle">取 消</el-button>
                <el-button type="danger" @click="deleteConfirmHandle" :disabled="isDemoVersion">确定删除</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script>
import PicturePanel from "/src/components/PicturePanel/PicturePanel";
import {appMutation} from "../../../store/mutation-types";
import RightToggleBar from "/src/components/RightToggleBar/RightToggleBar";
import {fileApi} from '/src/api/file'

export default {
    name: "Picture",
    props: {},
    components: {
        PicturePanel,
        RightToggleBar,
    },
    data() {
        return {
            searchParam: {
                createTime: null, // 时间
                fileSortId: null, // 文件类别的id
                currentPage: 1, // 当前页
                pageSize: 30, // 列表总条数
            },
            total: null, // 列表总条数

            featureBtnsHeight: 25, // 功能按钮的高度
            filterContainerHeight: 40, // 筛选框的高度

            dialogFormVisible: false, //控制图片上传弹出框显示隐藏
            batchDeleteDialogVisible: false, //控制批量删除提示弹出框
            dialogChangeSortVisible: false, //控制更换分类的弹出框


            pictureSortList: [], // 图片的类别列表
            currentSort: {}, // 当前选中的分类
            pictureList: [], // 图片列表
            currentSelectPictureIds: [], // 当前选中的图片的id
            currentSelectPictureNames: [], // 当前选中的图片的名字
            theChangeSortId: null, // 改变分类的id

            /**
             * 引入isDone 解决Bug
             *
             * Error in nextTick: "NotFoundError: Failed to execute 'removeChild' on 'Node':
             * The node to be removed is not a child of this node."
             */
            isDone: false, // 数据是否更新完


            imgQuality: 0.7,
        }
    },
    methods: {
        selectHandle(val) {
            this.currentSelectPictureIds = val.ids
            this.currentSelectPictureNames = val.names
        },
        // 分页 pageSize 改变时触发
        handleSizeChange(val) {
            this.searchParam.pageSize = val
            this.searchParam.currentPage = 1
            this.getPictureList()
        },
        // 分页 currentPage 改变时触发
        handleCurrentPageChange(val) {
            this.searchParam.currentPage = val
            this.getPictureList()
        },

        /*===================== 图片上传 start =======================*/
        dataURItoBlob(dataURI, type) {
            let binary = atob(dataURI.split(',')[1]);
            let array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: type});
        },
        readBlobAsDataURL(blob) {
            return new Promise((resolve, reject) => {
                let a = new FileReader()
                a.onload = function (e) {
                    resolve(e.target.result)
                }
                a.readAsDataURL(blob);
            })
        },
        blobToImg(blob) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.addEventListener('load', () => {
                    let img = new Image()
                    img.src = reader.result
                    img.addEventListener('load', () => resolve(img))
                })
                reader.readAsDataURL(blob)
            })
        },

        imgToCanvas(img) {
            let canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            return canvas
        },

        watermark(canvas, text, text2) {
            return new Promise((resolve, reject) => {
                let ctx = canvas.getContext('2d')
                // 设置字号和字体
                ctx.font = "14px 宋体"
                // 设置
                ctx.fillStyle = "#FFC82C"
                // 设置右对齐
                ctx.textAlign = 'right'
                // 在指定位置绘制文字
                ctx.fillText(text, canvas.width - 20, canvas.height - 10)
                ctx.fillText(text2, canvas.width - 45, canvas.height - 30)
                canvas.toBlob(blob => resolve(blob))
            })
        },

        compressImg(file) {
            return new Promise(resolve => {
                const reader = new FileReader()
                const image = new Image()
                image.onload = (imageEvent) => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const width = image.width * this.imgQuality
                    const height = image.height * this.imgQuality
                    canvas.width = width;
                    canvas.height = height;
                    context.clearRect(0, 0, width, height);
                    context.drawImage(image, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL(file.type);
                    const blobData = this.dataURItoBlob(dataUrl, file.type);
                    resolve(blobData)
                }
                reader.onload = (async e => {

                    let tempImgUrl = e.target.result

                    // 绘制 水印
                    let tempBlob = this.dataURItoBlob(tempImgUrl, file.type)
                    let img = await this.blobToImg(tempBlob)
                    let canvas = this.imgToCanvas(img)
                    let blob = await this.watermark(canvas, '最最最喜欢真真的小陈', 'bnbiye.com')
                    tempImgUrl = await this.readBlobAsDataURL(blob)

                    image.src = tempImgUrl;
                });
                reader.readAsDataURL(file);
            })
        },

        // 图片上传前的钩子，进行压缩，绘制水印
        // https://segmentfault.com/a/1190000021570950
        // https://blog.csdn.net/cuixiping/article/details/45932793
        // https://blog.csdn.net/qq_34149935/article/details/88353679
        // https://litongzero.blog.csdn.net/article/details/103228060
        // https://blog.csdn.net/liona_koukou/article/details/84860899
        async beforeUpload(file) {
            if (/gif/.test(file.type)) {
                return true
            } else {
                return await this.compressImg(file)
            }
        },
        /*===================== 图片上传 end =======================*/

        addBeforeCloseHandle(done) {
            console.log('关闭弹出层前，清空数据')
            this.$refs['fileUpload'].clearFiles()
            done()
        },
        changeSortBeforeCloseHandle(done) {
            console.log('关闭弹出层前，清空数据')
            this.currentSelectPictureIds = []
            this.currentSelectPictureNames = []
            this.theChangeSortId = null
            this.$refs['PicturePanel'].clearSelect()
            done()
        },
        deleteBeforeClose(done) {
            console.log('关闭弹出层前，清空数据')
            this.currentSelectPictureIds = []
            this.currentSelectPictureNames = []
            this.$refs['PicturePanel'].clearSelect()
            done()
        },
        // 点击分类触发事件
        sortChange(val) {
            this.currentSort = val ? val : {}
            this.searchParam.fileSortId = val ? val.uid : ''
            this.searchParam.currentPage = 1
            this.getPictureList()
        },
        // 获取所有图片
        async getPictureList() {
            let {data} = await fileApi.queryAllFilePage(this.searchParam)
            if (data.code === 1) {
                this.isDone = false
                this.pictureList = data.data.result
                this.total = data.data.total
                setTimeout(() => {
                    this.isDone = true
                }, 100)
                console.log(this.pictureList, 'this.pictureList')
            } else {
                this.$message({
                    message: data.extendInfo ? data.extendInfo : data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },
        // 获取图片所有分类
        async getPictureSortList() {
            let {data} = await fileApi.queryAllFileSort()
            if (data.code === 1) {
                this.pictureSortList = data.data
                this.sortChange(this.pictureSortList[0]) // 默认选中第一个
                console.log(this.currentSort, 'this.currentSort')
            } else {
                this.$message({
                    message: data.extendInfo ? data.extendInfo : data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },
        // 添加
        handleAdd() {
            this.dialogFormVisible = true
        },
        // 全选
        handleCheckAll() {
            this.$refs['PicturePanel'].selectAll()
        },
        // 单个删除
        handleSingleDelete(val) {
            this.currentSelectPictureIds = [val.fileId]
            this.currentSelectPictureNames = [val.fileName]
            this.batchDeleteDialogVisible = true
            console.log(val, 'handleSingleDelete')
        },
        // 删除选中
        handleDeleteSelected() {
            if (this.currentSelectPictureNames.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一项',
                    duration: 1500
                })
            } else {
                this.batchDeleteDialogVisible = true
                console.log('handleDeleteSelected')
            }

        },
        // 更换分类
        handleChangeGroup() {
            if (this.currentSelectPictureNames.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一项',
                    duration: 1500
                })
            } else {
                this.dialogChangeSortVisible = true
                console.log('handleDeleteSelected')
            }

        },
        // 取消删除
        deleteCancelHandle() {
            this.currentSelectPictureIds = []
            this.currentSelectPictureNames = []
            this.$refs['PicturePanel'].clearSelect()
            this.batchDeleteDialogVisible = false
        },
        // 取消更换
        theChangeSortCancelHandle() {
            this.currentSelectPictureIds = []
            this.currentSelectPictureNames = []
            this.theChangeSortId = null
            this.$refs['PicturePanel'].clearSelect()
            this.dialogChangeSortVisible = false
        },

        // 确认删除
        async deleteConfirmHandle() {
            let {data} = await fileApi.deleteFileByUid(this.currentSelectPictureIds)
            if (data.code === 1) {
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1500,
                })
                await this.getPictureList()
                this.currentSelectPictureIds = []
                this.currentSelectPictureNames = []
                this.batchDeleteDialogVisible = false
            } else {
                this.$message({
                    message: data.extendInfo ? data.extendInfo : data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },
        // 确认更换分类
        async theChangeSortConfirmHandle() {
            let param = {
                fileIds: this.currentSelectPictureIds, // 需要更换的文件的id，是个数组
                sortId: this.theChangeSortId // 分类的id
            }
            let {data} = await fileApi.updateFileSortByUid(param)
            if (data.code === 1) {
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1500,
                })
                await this.getPictureList()
                this.currentSelectPictureIds = []
                this.currentSelectPictureNames = []
                this.theChangeSortId = null
                this.dialogChangeSortVisible = false
            } else {
                this.$message({
                    message: data.extendInfo ? data.extendInfo : data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },
        // 刷新表格数据
        resetTableList() {
            this.searchParam.createTime = null
            this.searchParam.currentPage = 1
            this.searchParam.pageSize = 30

            this.getPictureList()
        },
        // 切换搜索框显示隐藏
        toggleSearchStatus() {
            this.$store.commit(appMutation.TOGGLE_SEARCHBAR)
        },
        // 条件搜索
        handleFind() {
            console.log(this.searchParam, 'handleFind')
            this.getPictureList()
        },
        submitForm() {
            this.dialogFormVisible = false
            console.log('提交')
        },
        fileSuccess(res) {
            if (res.code === 1) {
                this.$message({
                    message: '上传成功',
                    type: 'success',
                    duration: 1500,
                })
            } else {
                this.fileError(res)
            }
        },
        fileError(err) {
            this.$message({
                message: err.extendInfo ? err.extendInfo : err.msg,
                type: 'error',
                duration: 1500,
            })
        },
    },
    computed: {
        action() {
            let baseURL
            if(process.env.NODE_ENV === 'development'){ // 开发环境
                baseURL = myConfig.apiUrlDevelopment
            } else { // 生产环境
                if(this.isDemoVersion){
                    baseURL = myConfig.apiUrlDemo
                } else {
                    baseURL = myConfig.apiUrlProduction
                }
            }
            return `${baseURL}/file/uploadFile`
        },
        // 是否隐藏搜索框
        isHideSearch() {
            return this.$store.state.app.isHiddenSearch
        },
        // 表格的默认减去的高度
        calcTableHeight() {
            if (this.$store.state.app.isHiddenSearch) {
                return this.featureBtnsHeight
            } else {
                return this.filterContainerHeight + this.featureBtnsHeight
            }
        },
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        },
    },
    watch: {},
    mounted() {
        this.getPictureSortList()
    },
}
</script>

<style scoped lang="scss">
@import "Picture";
</style>
