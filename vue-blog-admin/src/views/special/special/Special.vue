<template>
    <div class="special-container">
        <!--  筛选框  -->
        <div class="filter-container" v-show="!isHideSearch" :style="{height:`${filterContainerHeight}px`}">
            <el-form :inline="true">
                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.specialName"
                    placeholder="请输入专题名"
                    @keyup.enter.native="handleFind"
                />

                <el-select
                    v-model="searchParam.isPrivate"
                    clearable
                    placeholder="是否私密专题"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in isPrivateList"
                        :key="item.uid"
                        :label="item.isPrivate"
                        :value="item.uid"
                    ></el-option>
                </el-select>

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.specialSummary"
                    placeholder="请输入专题的概述"
                    @keyup.enter.native="handleFind"
                />

                <el-select
                    v-model="searchParam.specialSortId"
                    clearable
                    placeholder="请选择专题所属分类"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in specialSortList"
                        :key="item.uid"
                        :label="item.special_sort_name"
                        :value="item.uid"
                    ></el-option>
                </el-select>

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.orderNum"
                    placeholder="请输入排序"
                    @keyup.enter.native="handleFind"
                    type="number"
                />


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
                    >添加
                    </el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button class="filter-item" type="danger" @click="handleDeleteSelected" icon="el-icon-delete"
                    >删除选中
                    </el-button>
                </el-col>

                <RightToggleBar
                    :hide-search="isHideSearch"
                    @refresh="resetTableList"
                    @toggleSearch="toggleSearchStatus"
                />

            </el-row>
        </div>

        <!-- 内容展示表格 -->
        <div class="table-container" :style="{height: `calc(100% - ${calcTableHeight}px)`}">
            <el-table
                :data="tableData"
                height="100%"
                :header-cell-style="{background:'#f0efef',color:'#333'}"
                style="width: 100%"
                @selection-change="selectHandle"
                ref="table"
            >
                <el-table-column type="selection"></el-table-column>

                <el-table-column label="序号" width="60" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="专题所属分类" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.special_sort_name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="专题名" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.special_name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="是否私密" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.is_private==1" type="success">私密</el-tag>
                        <el-tag v-if="scope.row.is_private==2" type="info">公开</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="专题的概述" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.special_summary }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="专题封面" min-width="160" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.cover_url" style="width: 130px;height: 70px;"/>
                    </template>
                </el-table-column>


                <el-table-column label="专题的点击量" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.clicks }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="排序" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.order_num }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="创建时间" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time }}</span>
                    </template>
                </el-table-column>


                <el-table-column label="操作" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑
                        </el-button>
                        <el-button @click="handleSingleDelete(scope.row,scope.$index+1)" type="danger" size="small">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
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

        <!-- 添加或修改对话框 -->
        <el-dialog :title="isUpdate ? '编辑':'增加'" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="专题名" label-width="120px" prop="specialName">
                            <el-input v-model="form.specialName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="专题的概述" label-width="120px" prop="specialSummary">
                            <el-input v-model="form.specialSummary" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="专题封面" label-width="120px" prop="coverUrl">
                            <ChooseImg
                                @chooseImgHandle="chooseImgHandle"
                                @removeCoverHandle="removeCoverHandle"
                                :currentCoverUrl="form.coverUrl"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="专题所属分类" label-width="120px" prop="specialSortId">
                            <el-select
                                v-model="form.specialSortId"
                                clearable
                                placeholder="请选择专题所属分类"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="item in specialSortList"
                                    :key="item.uid"
                                    :label="item.special_sort_name"
                                    :value="item.uid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="排序" label-width="120px" prop="orderNum">
                            <el-input type="number" v-model="form.orderNum" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="是否为私密专题" label-width="120px">
                            <el-switch
                                v-model="form.isPrivate"
                                active-text="是"
                                inactive-text="否">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>




            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">确 定</el-button>
            </div>

            <!-- 选择封面图 -->
            <el-dialog
                title="双击图片选择封面"
                :visible.sync="chooseImgDialogVisible"
                :fullscreen="true"
                append-to-body
                custom-class="choose-img-dialog"
            >
                <!--  筛选框  -->
                <div class="filter-container" :style="{height:`${filterContainerHeight}px`}">
                    <el-form :inline="true">
                        <el-date-picker
                            v-model="chooseImgSearchParam.createTime"
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
                            @click="handleChooseImgFind"
                        >
                            查找
                        </el-button>

                        <el-button
                            style="margin-left: 10px;"
                            type="text"
                            class="filter-item"
                            icon="el-icon-refresh"
                            @click="resetChooseImgList"
                        >
                            刷新
                        </el-button>

                    </el-form>
                </div>
                <ChooseImgPannel
                    @sortChange="sortChange"
                    @handleChangeImgSizeChange="handleChangeImgSizeChange"
                    @handleChangeImgCurrentPageChange="handleChangeImgCurrentPageChange"
                    @chooseThisImgHandle="chooseThisImgHandle"
                    :pictureSortList="pictureSortList"
                    :currentSort="currentSort"
                    :pictureList="pictureList"
                    :chooseImgSearchParam="chooseImgSearchParam"
                    :isDone="isDone"
                    :chooseImgTotal="chooseImgTotal"
                />
            </el-dialog>
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
                        <div v-for="item in selectIndex" :key="item" style="font-size: 14px;">
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
import {appMutation} from "/src/store/mutation-types";
import RightToggleBar from "/src/components/RightToggleBar/RightToggleBar";

import {specialApi} from '/src/api/special'
import {specialSortApi} from '/src/api/specialSort'

import ChooseImg from "../../../components/ChooseImg/ChooseImg";
import ChooseImgPannel from "../../../components/ChooseImgPannel/ChooseImgPannel";
import {fileApi} from "../../../api/file";

export default {
    name: "Special",
    props: {},
    components: {
        RightToggleBar,
        ChooseImg,
        ChooseImgPannel,
    },
    data() {
        return {

            tableData: [],

            filterContainerHeight: 40, // 筛选框的高度
            featureBtnsHeight: 25, // 功能按钮的高度
            paginationBoxHeight: 50, // 分页栏的高度

            isUpdate: true, // 控制编辑框是用来删除的还是用来修改的
            dialogFormVisible: false, //控制增加（编辑）数据弹出框
            batchDeleteDialogVisible: false, //控制批量删除提示弹出框

            form: {
                specialName: null,
                isPrivate: null,
                specialSummary: null,
                coverUrl: null,
                specialSortId: null,
                orderNum: null
            },

            searchParam: {
                currentPage: 1, // 当前页
                pageSize: 30, // 列表总条数
                specialName: null,
                isPrivate: null,
                specialSummary: null,
                specialSortId: null,
                orderNum: null
            },
            total: null, // 列表总条数
            selectIds: [], // 等待删除数据的id
            selectIndex: [], // 等待删除数据的索引

            specialSortList: [], // 专题分类列表

            /*=============================== 从图床中选择照片 start =======================================*/
            // 选择图片封面相关参数
            chooseImgDialogVisible: false, //控制选择封面图弹出框
            pictureSortList: [], // 图片的类别列表
            currentSort: {}, // 当前选中的分类
            pictureList: [], // 图片列表
            /**
             * 引入isDone 解决Bug
             *
             * Error in nextTick: "NotFoundError: Failed to execute 'removeChild' on 'Node':
             * The node to be removed is not a child of this node."
             */
            isDone: false, // 数据是否更新完
            chooseImgSearchParam: {
                createTime: null, // 时间
                fileSortId: null, // 文件类别的id
                currentPage: 1, // 当前页
                pageSize: 30, // 列表总条数
            },
            chooseImgTotal: null, // 列表总条数
            /*=============================== 从图床中选择照片 end =======================================*/

            isPrivateList: [
                {
                    uid: '1',
                    isPrivate: '私密',
                }, {
                    uid: '2',
                    isPrivate: '公开',
                },
            ],

        }
    },
    methods: {

        /*=============================== 从图床中选择照片 start =======================================*/
        // 点击当前封面图片分类所触发得事件
        sortChange(val) {
            this.currentSort = val
            this.chooseImgSearchParam.fileSortId = val.uid
            this.chooseImgSearchParam.currentPage = 1
            this.getPictureList()
        },
        chooseImgHandle() {
            console.log('chooseImgHandle')
            this.getPictureSortList()
            this.chooseImgDialogVisible = true
        },
        chooseThisImgHandle(val) {
            this.form.coverUrl = val
            this.chooseImgDialogVisible = false
        },
        removeCoverHandle() {
            console.log('1111')
            this.form.coverUrl = ''
        },
        // 刷新封面图片数据
        resetChooseImgList() {
            this.chooseImgSearchParam.createTime = null
            this.chooseImgSearchParam.currentPage = 1
            this.chooseImgSearchParam.pageSize = 30

            this.getPictureList()
        },
        // 条件搜索选择封面
        handleChooseImgFind() {
            this.getPictureList()
        },
        // 选择封面图片 分页 pageSize 改变时触发
        handleChangeImgSizeChange(val) {
            this.chooseImgSearchParam.pageSize = val
            this.chooseImgSearchParam.currentPage = 1
            this.getPictureList()
        },
        // 选择封面图片 分页 currentPage 改变时触发
        handleChangeImgCurrentPageChange(val) {
            this.chooseImgSearchParam.currentPage = val
            this.getPictureList()
        },
        // 获取所有可选的封面图片
        async getPictureList() {
            let {data} = await fileApi.queryAllFilePage(this.chooseImgSearchParam)
            if (data.code === 1) {
                this.isDone = false
                this.pictureList = data.data.result
                this.chooseImgTotal = data.data.total
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
        // 获取所有可选封面的所有分类
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
        /*=============================== 从图床中选择照片 end =======================================*/

        async getSpecialSortList() {
            const {data} = await specialSortApi.querySpecialSortAll()
            this.specialSortList = data.data
        },
        // 条件搜索
        handleFind() {
            this.getList()
            console.log('handleFind')
        },
        // 刷新表格数据
        resetTableList() {
            this.getList()
            console.log('resetTableList')
        },
        selectHandle(rows) {
            this.selectIds = rows.map(item => {
                return item.uid
            })
            let tempIndex = []
            this.tableData.map((item, index) => {
                if (this.selectIds.includes(item.uid)) {
                    tempIndex.push(index + 1)
                }
            })
            this.selectIndex = tempIndex
        },
        // 添加
        handleAdd() {
            this.isUpdate = false
            this.form = {
                specialName: null,
                isPrivate: null,
                specialSummary: null,
                coverUrl: null,
                specialSortId: null,
                orderNum: null
            }

            this.dialogFormVisible = true
            console.log('handleAdd')
        },
        // 编辑
        handleEdit(row) {
            this.isUpdate = true
            this.form = {
                uid: row.uid,
                specialName: row.special_name,
                isPrivate: row.is_private === 1,
                specialSummary: row.special_summary,
                coverUrl: row.cover_url,
                specialSortId: row.special_sort_id,
                orderNum: row.order_num
            }
            this.dialogFormVisible = true
            console.log(row, 'handleEdit')
        },
        // 单个删除
        handleSingleDelete(row, index) {
            this.selectIndex.push(index)
            this.selectIds.push(row.uid)
            this.batchDeleteDialogVisible = true
            console.log(row, index, 'handleSingleDelete')
        },
        deleteBeforeClose(done) {
            console.log('关闭弹出层前，清空数据')
            this.selectIndex = []
            this.selectIds = []
            this.$refs.table.clearSelection()
            done()
        },
        deleteCancelHandle() {
            this.selectIndex = []
            this.selectIds = []
            this.$refs.table.clearSelection()
            this.batchDeleteDialogVisible = false
        },
        // 删除选中
        handleDeleteSelected() {
            if (this.selectIds.length === 0) {
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

        // 确认删除
        async deleteConfirmHandle() {
            let {data} = await specialApi.deleteSpecialByUid(this.selectIds)
            if (data.code === 1) {
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1500,
                })
                await this.getList()
                this.selectIds = []
                this.selectIndex = []
                this.batchDeleteDialogVisible = false
            } else {
                this.$message({
                    message: data.extendInfo ? data.extendInfo : data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },
        // 切换搜索框显示隐藏
        toggleSearchStatus() {
            this.$store.commit(appMutation.TOGGLE_SEARCHBAR)
        },
        // 分页 pageSize 改变时触发
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.searchParam.pageSize = val
            this.searchParam.currentPage = 1
            this.getList()

        },
        // 分页 currentPage 改变时触发
        handleCurrentPageChange(val) {
            console.log(`当前页 ${val}`);
            this.searchParam.currentPage = val
            this.getList()
        },

        // 提交
        async submitForm() {
            let data;
            if (!this.isUpdate) { //若果是新增
                data = await specialApi.saveSpecial(this.form)
            } else { // 如果是编辑
                data = await specialApi.updateSpecialByUid(this.form)
            }
            console.log(data, 'data')
            if (data.data.code === 1) {
                this.$message({
                    message: this.isUpdate ? '修改成功' : '添加成功',
                    type: 'success',
                    duration: 1500,
                })
                this.dialogFormVisible = false
                await this.getList()
            } else {
                this.$message({
                    message: data.data.extendInfo ? data.data.extendInfo : data.data.msg,
                    type: 'error',
                    duration: 1500,
                })
            }
        },


        async getList() {
            let {data} = await specialApi.querySpecialPage(this.searchParam)
            this.tableData = data.data.result
            this.total = data.data.total
        },
    },
    computed: {
        // 是否隐藏搜索框
        isHideSearch() {
            return this.$store.state.app.isHiddenSearch
        },
        // 表格的默认减去的高度
        calcTableHeight() {
            if (this.$store.state.app.isHiddenSearch) {
                return this.featureBtnsHeight + this.paginationBoxHeight
            } else {
                return this.filterContainerHeight + this.featureBtnsHeight + this.paginationBoxHeight
            }
        },
        // 是否是演示版本
        isDemoVersion() {
            return isDemoVersion // 加载到了全局，直接获取
        },
    },
    watch: {},
    mounted() {
        this.getList()
        this.getSpecialSortList()
    }
}
</script>


<style scoped lang="scss">
@import "Special";

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
