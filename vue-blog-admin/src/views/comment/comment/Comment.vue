<template>
    <!--
      模式 $Vue文件class类名占位符替换$
      替换方式：模块名变为连字符类型
        blogSort -> blog-sort
    -->
    <div class="comment-container">
        <!--  筛选框  -->
        <div class="filter-container" v-show="!isHideSearch" :style="{height:`${filterContainerHeight}px`}">
            <el-form :inline="true">
                <!--  筛选框
                      模式 $Vue文件筛选条件输入框占位符替换$
                      替换方式：拼接筛选条件的按钮代码
                          数据表中有默认值、且默认值不为null的的字段，排除uid、create_time、update_time
                  -->

                <el-select
                    v-model="searchParam.commentStatus"
                    clearable
                    placeholder="请选择评论状态"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in commentStatusList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-select
                    v-model="searchParam.commentSource"
                    clearable
                    placeholder="请选择评论来源"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in commentSourceList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.sourceId"
                    placeholder="请输入来源的id"
                    @keyup.enter.native="handleFind"
                />

                <el-select
                    v-model="searchParam.commentLayer"
                    clearable
                    placeholder="请选择评论层级"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in commentLayerList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>


                <el-select
                    v-model="searchParam.commentPersonId"
                    clearable
                    placeholder="请选择评论人"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in commentPersonList"
                        :key="item.uid"
                        :label="item.nick_name"
                        :value="item.uid"
                    ></el-option>
                </el-select>


                <el-select
                    v-model="searchParam.commentedPersonId"
                    clearable
                    placeholder="请选择被评论人"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in commentPersonList"
                        :key="item.uid"
                        :label="item.nick_name"
                        :value="item.uid"
                    ></el-option>
                </el-select>

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.commentContent"
                    placeholder="请输入评论内容"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.toCommentId"
                    placeholder="请输入回复的哪条评论"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.rootCommentId"
                    placeholder="请输入根评论"
                    @keyup.enter.native="handleFind"
                />

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
                    <el-button class="filter-item" type="danger" @click="handleDeleteSelected('delete')"
                               icon="el-icon-delete"
                    >删除选中
                    </el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button class="filter-item" type="success" @click="handlePassSelected('pass')"
                               icon="el-icon-delete"
                    >一键通过
                    </el-button>
                </el-col>

                <el-col :span="1.5">
                    <el-button class="filter-item" type="warning" @click="handleRejectSelected('reject')"
                               icon="el-icon-delete"
                    >一键驳回
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
                <!--
                        模式 $Vue文件数据表内容替换$
                          替换方式：拼接数据表中所有字段，排除uid
                     -->
                <el-table-column label="评论内容" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.comment_content }}</span>
                    </template>
                </el-table-column>


                <el-table-column label="评论来源" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.comment_source === 1">留言板</span>
                        <span v-if="scope.row.comment_source === 2">专题</span>
                        <span v-if="scope.row.comment_source === 3">文章</span>
                    </template>
                </el-table-column>

                <el-table-column label="评论层级" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.comment_layer }}</span>
                    </template>
                </el-table-column>


                <el-table-column label="来源的id" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.source_id }}</span>
                    </template>
                </el-table-column>


                <el-table-column label="评论状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.comment_status === 1">待审核</span>
                        <span v-if="scope.row.comment_status === 2">通过</span>
                        <span v-if="scope.row.comment_status === 3">违规评论</span>
                    </template>
                </el-table-column>


                <el-table-column label="评论人" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.comment_person_id }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="被评论人" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.commented_person_id }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="回复的哪条评论" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.to_comment_id }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="根评论" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.root_comment_id }}</span>
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

        <!--
          模式：$Vue文件添加或修改对话框内容替换$
          替换方式：label标签可以从注释里取，名字列名取，排除uid、create_time、update_time
        -->

        <!-- 添加或修改对话框 -->
        <el-dialog :title="isUpdate ? '编辑':'增加'" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="评论内容" label-width="120px" prop="commentContent">
                            <el-input v-model="form.commentContent" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="评论来源" label-width="120px" prop="commentSource">
                            <el-select
                                v-model="form.commentSource"
                                clearable
                                placeholder="请选择评论来源"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in commentSourceList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="评论层级" label-width="120px" prop="commentLayer">
                            <el-select
                                v-model="form.commentLayer"
                                clearable
                                placeholder="请选择评论层级"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in commentLayerList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="来源的id" label-width="120px" prop="sourceId">
                            <el-input v-model="form.sourceId" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="评论状态" label-width="120px" prop="commentStatus">
                            <el-select
                                v-model="form.commentStatus"
                                clearable
                                placeholder="请选择评论状态"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in commentStatusList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="评论人" label-width="120px" prop="commentPersonId">
                            <el-select
                                v-model="form.commentPersonId"
                                clearable
                                placeholder="请选择评论人"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in commentPersonList"
                                    :key="item.uid"
                                    :label="item.nick_name"
                                    :value="item.uid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="被评论人" label-width="120px" prop="commentedPersonId">

                            <el-select
                                v-model="form.commentedPersonId"
                                clearable
                                placeholder="请选择被评论人"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in commentPersonList"
                                    :key="item.uid"
                                    :label="item.nick_name"
                                    :value="item.uid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="回复的哪条评论" label-width="120px" prop="toCommentId">
                            <el-input v-model="form.toCommentId" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="根评论" label-width="120px" prop="rootCommentId">
                            <el-input v-model="form.rootCommentId" auto-complete="off"></el-input>
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


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm" :disabled="isDemoVersion">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 批量删除对话框 -->
        <el-dialog :title="'批量'+ deleteDialogTitle "
                   :visible.sync="batchDeleteDialogVisible" width="500px" :before-close="deleteBeforeClose">
            <el-form>
                <el-form-item>
                    <h3 style="color: #ed4014;">确定要{{ deleteDialogTitle }}以下数据吗</h3>
                </el-form-item>

                <el-form-item :label="deleteDialogTitle +'数据'" label-width="80px">
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
                <el-button type="danger" @click="deleteConfirmHandle" :disabled="isDemoVersion">确定{{ deleteDialogTitle }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {appMutation} from "/src/store/mutation-types";
import RightToggleBar from "/src/components/RightToggleBar/RightToggleBar";

/*
	模式：$Vue文件声明API接口内容替换$
	替换方式：取模块名，直接拼接语句，小驼峰替换
*/
import {commentApi} from '/src/api/comment'
import {webUserApi} from '/src/api/webUser'

export default {
    /*
      模式：$Vue文件组件名称占位符替换$
      替换方式：取模块名，大驼峰格式
    */
    name: "Comment",
    props: {},
    components: {
        RightToggleBar,
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

            flagDeleteDialog: '', // 删除框显示title的标识，delete、pass、reject

            /*
              模式：$Vue文件form内容数据占位符替换$
              替换方式：排除uid、create_time、update_time，小驼峰
            */
            form: {
                commentContent: null,
                commentSource: null,
                sourceId: null,
                commentStatus: null,
                commentPersonId: null,
                commentedPersonId: null,
                toCommentId: null,
                rootCommentId: null,
                commentLayer: null,
                orderNum: null
            },

            /*
             模式：$Vue文件searchParam内容数据占位符替换$
             替换方式：排除uid、create_time、update_time，小驼峰，有默认值且，默认值不为空的字段
           */
            searchParam: {
                currentPage: 1, // 当前页
                pageSize: 30, // 列表总条数
                commentContent: null,
                commentSource: null,
                sourceId: null,
                commentStatus: null,
                commentPersonId: null,
                commentedPersonId: null,
                toCommentId: null,
                rootCommentId: null,
                commentLayer: null,
                orderNum: null
            },
            total: null, // 列表总条数
            selectIds: [], // 等待删除数据的id
            selectIndex: [], // 等待删除数据的索引


            // 评论来源
            commentSourceList: [
                {
                    id: 1,
                    label: '留言板'
                },
                {
                    id: 2,
                    label: '专题'
                },
                {
                    id: 3,
                    label: '文章'
                },
            ],
            // 评论状态
            commentStatusList: [
                {
                    id: 1,
                    label: '待审核'
                },
                {
                    id: 2,
                    label: '通过'
                },
                {
                    id: 3,
                    label: '违规评论'
                },
            ],
            // 评论层级
            commentLayerList: [
                {
                    id: 1,
                    label: 1
                },
                {
                    id: 2,
                    label: 2
                },
                {
                    id: 3,
                    label: 3
                },
                {
                    id: 4,
                    label: 4
                },
                {
                    id: 5,
                    label: 5
                },

            ],

            // 评论人
            commentPersonList: [],

        }
    },
    methods: {
        // 获取评论人列表
        async getAllCommentPerson() {
            let {data} = await webUserApi.queryWebUserAll()
            this.commentPersonList = data.data
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
            /*
             模式：$Vue文件添加事件form数据初始化占位符替换$
             替换方式：排除uid、create_time、update_time，小驼峰，有默认值且，默认值不为空的字段
           */
            this.form = {
                commentContent: null,
                commentSource: null,
                sourceId: null,
                commentStatus: null,
                commentPersonId: null,
                commentedPersonId: null,
                toCommentId: null,
                rootCommentId: null,
                commentLayer: null,
                orderNum: null
            }

            this.dialogFormVisible = true
            console.log('handleAdd')
        },
        // 编辑
        handleEdit(row) {
            this.isUpdate = true
            /*
              模式：$Vue文件编辑方法form内容数据占位符替换$
              替换方式：排除uid、create_time、update_time，小驼峰，后面row中的参数取原值
            */
            this.form = {
                uid: row.uid,
                commentContent: row.comment_content,
                commentSource: row.comment_source,
                sourceId: row.source_id,
                commentStatus: row.comment_status,
                commentPersonId: row.comment_person_id,
                commentedPersonId: row.commented_person_id,
                toCommentId: row.to_comment_id,
                rootCommentId: row.root_comment_id,
                commentLayer: row.comment_layer,
                orderNum: row.order_num
            }
            this.dialogFormVisible = true
            console.log(row, 'handleEdit')
        },
        // 单个删除
        handleSingleDelete(row, index) {
            this.selectIndex.push(index)
            this.selectIds.push(row.uid)
            this.flagDeleteDialog = 'delete'
            this.batchDeleteDialogVisible = true
            console.log(row, index, 'handleSingleDelete')
        },
        deleteBeforeClose(done) {
            console.log('关闭弹出层前，清空数据')
            this.selectIndex = []
            this.selectIds = []
            this.flagDeleteDialog = ''
            this.$refs.table.clearSelection()
            done()
        },
        deleteCancelHandle() {
            this.selectIndex = []
            this.selectIds = []
            this.flagDeleteDialog = ''
            this.$refs.table.clearSelection()
            this.batchDeleteDialogVisible = false
        },
        // 删除选中
        handleDeleteSelected(flag) {
            if (this.selectIds.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一项',
                    duration: 1500
                })
            } else {
                this.flagDeleteDialog = flag
                this.batchDeleteDialogVisible = true
                console.log('handleDeleteSelected')
            }

        },
        // 一键通过
        handlePassSelected(flag) {
            if (this.selectIds.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一项',
                    duration: 1500
                })
            } else {
                this.flagDeleteDialog = flag
                this.batchDeleteDialogVisible = true
                console.log('handleDeleteSelected')
            }

        },
        // 一键驳回
        handleRejectSelected(flag) {
            if (this.selectIds.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '至少选择一项',
                    duration: 1500
                })
            } else {
                this.flagDeleteDialog = flag
                this.batchDeleteDialogVisible = true
                console.log('handleDeleteSelected')
            }

        },

        // 确认删除
        async deleteConfirmHandle() {
            let data
            switch (this.flagDeleteDialog) {
                case 'delete':
                    data = await commentApi.deleteCommentByUid(this.selectIds)
                    break
                case 'pass':
                    data = await commentApi.passOrRejectCommentByUid(2, this.selectIds)
                    break
                case 'reject':
                    data = await commentApi.passOrRejectCommentByUid(3, this.selectIds)
                    break

            }
            if (data.data.code === 1) {
                this.$message({
                    message: `${this.deleteDialogTitle}成功`,
                    type: 'success',
                    duration: 1500,
                })
                await this.getList()
                this.selectIds = []
                this.selectIndex = []
                this.flagDeleteDialog = ''
                this.batchDeleteDialogVisible = false
            } else {
                this.$message({
                    message: data.data.extendInfo ? data.data.extendInfo : data.data.msg,
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
                data = await commentApi.saveComment(this.form)
            } else { // 如果是编辑
                data = await commentApi.updateCommentByUid(this.form)
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
            let {data} = await commentApi.queryCommentPage(this.searchParam)
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
        deleteDialogTitle() {
            return this.flagDeleteDialog === 'delete' ? '删除' : (this.flagDeleteDialog === 'pass' ? '通过' : '驳回')
        },
    },
    watch: {},
    mounted() {
        this.getList()
        this.getAllCommentPerson()
    }
}
</script>


<style scoped lang="scss">
@import "Comment";
</style>
