<template>
    <!--
      模式 $Vue文件class类名占位符替换$
      替换方式：模块名变为连字符类型
        blogSort -> blog-sort
    -->
    <div class="admin-role-container">
        <!--  筛选框  -->
        <div class="filter-container" v-show="!isHideSearch" :style="{height:`${filterContainerHeight}px`}">
            <el-form :inline="true">
                <!--  筛选框
                      模式 $Vue文件筛选条件输入框占位符替换$
                      替换方式：拼接筛选条件的按钮代码
                          数据表中有默认值、且默认值不为null的的字段，排除uid、create_time、update_time
                  -->
                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.roleName"
                    placeholder="请输入角色名"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.roleIntro"
                    placeholder="请输入角色简介"
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
                <!--
                        模式 $Vue文件数据表内容替换$
                          替换方式：拼接数据表中所有字段，排除uid
                     -->
                <el-table-column label="角色名" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.role_name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="角色简介" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.role_intro }}</span>
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
                        <el-form-item label="角色名" label-width="120px" prop="roleName">
                            <el-input v-model="form.roleName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="角色简介" label-width="120px" prop="roleIntro">
                            <el-input v-model="form.roleIntro" auto-complete="off"></el-input>
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

/*
	模式：$Vue文件声明API接口内容替换$
	替换方式：取模块名，直接拼接语句，小驼峰替换
*/
import {adminRoleApi} from '/src/api/adminRole'

export default {
    /*
      模式：$Vue文件组件名称占位符替换$
      替换方式：取模块名，大驼峰格式
    */
    name: "AdminRole",
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

            /*
              模式：$Vue文件form内容数据占位符替换$
              替换方式：排除uid、create_time、update_time，小驼峰
            */
            form: {
                roleName: null,
                roleIntro: null,
                orderNum: null
            },

            /*
             模式：$Vue文件searchParam内容数据占位符替换$
             替换方式：排除uid、create_time、update_time，小驼峰，有默认值且，默认值不为空的字段
           */
            searchParam: {
                currentPage: 1, // 当前页
                pageSize: 30, // 列表总条数
                roleName: null,
                roleIntro: null,
                orderNum: null
            },
            total: null, // 列表总条数
            selectIds: [], // 等待删除数据的id
            selectIndex: [], // 等待删除数据的索引

        }
    },
    methods: {
        // 条件搜索
        handleFind() {
            this.getList()
        },
        // 刷新表格数据
        resetTableList() {
            this.getList()
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
                roleName: null,
                roleIntro: null,
                orderNum: null
            }

            this.dialogFormVisible = true
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
                roleName: row.role_name,
                roleIntro: row.role_intro,
                orderNum: row.order_num
            }
            this.dialogFormVisible = true
        },
        // 单个删除
        handleSingleDelete(row, index) {
            this.selectIndex.push(index)
            this.selectIds.push(row.uid)
            this.batchDeleteDialogVisible = true
        },
        deleteBeforeClose(done) {
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
            }

        },

        // 确认删除
        async deleteConfirmHandle() {
            let {data} = await adminRoleApi.deleteAdminRoleByUid(this.selectIds)
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
            this.searchParam.pageSize = val
            this.searchParam.currentPage = 1
            this.getList()

        },
        // 分页 currentPage 改变时触发
        handleCurrentPageChange(val) {
            this.searchParam.currentPage = val
            this.getList()
        },

        // 提交
        async submitForm() {
            let data;
            if (!this.isUpdate) { //若果是新增
                data = await adminRoleApi.saveAdminRole(this.form)
            } else { // 如果是编辑
                data = await adminRoleApi.updateAdminRoleByUid(this.form)
            }
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
            let {data} = await adminRoleApi.queryAdminRolePage(this.searchParam)
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
        }
    },
    watch: {},
    mounted() {
        this.getList()
    }
}
</script>


<style scoped lang="scss">
@import "AdminRole";
</style>
