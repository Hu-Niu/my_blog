<template>
    <!--
      模式 $Vue文件class类名占位符替换$
      替换方式：模块名变为连字符类型
        blogSort -> blog-sort
    -->
    <div class="web-user-container">
        <!--  筛选框  -->
        <div class="filter-container" v-show="!isHideSearch" :style="{height:`${filterContainerHeight}px`}">
            <el-form :inline="true">
                <!--  筛选框
                      模式 $Vue文件筛选条件输入框占位符替换$
                      替换方式：拼接筛选条件的按钮代码
                          数据表中有默认值、且默认值不为null的的字段，排除uid、create_time、update_time
                  -->

                <el-select
                    v-model="searchParam.dataAuditStatus"
                    clearable
                    placeholder="请选择资料审核状态"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in dataAuditStatusList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-select
                    v-model="searchParam.accountSource"
                    clearable
                    placeholder="请选择账号来源"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in accountSourceList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-select
                    v-model="searchParam.accountStatus"
                    clearable
                    placeholder="请选择账号状态"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in accountStatusList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-select
                    v-model="searchParam.gender"
                    clearable
                    placeholder="请选择性别"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in genderList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>

                <el-select
                    v-model="searchParam.userIdentity"
                    clearable
                    placeholder="请选择用户身份"
                    style="width: 150px;"
                >
                    <el-option
                        v-for="item in userIdentityList"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    ></el-option>
                </el-select>


                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userTel"
                    placeholder="请输入手机号"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userWechat"
                    placeholder="请输入微信号"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userMicroblog"
                    placeholder="请输入新郎微博"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userGitee"
                    placeholder="请输入Gitee"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userGithub"
                    placeholder="请输入GitHub"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userQq"
                    placeholder="请输入QQ"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userEmail"
                    placeholder="请输入邮箱"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.nickName"
                    placeholder="请输入昵称"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userPosition"
                    placeholder="请输入职位"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userCompany"
                    placeholder="请输入公司"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userWebsite"
                    placeholder="请输入个人主页"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.userIntro"
                    placeholder="请输入个人简介"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.loginIpAddress"
                    placeholder="请输入登录IP"
                    @keyup.enter.native="handleFind"
                />

                <el-input
                    clearable
                    style="width: 150px;"
                    v-model="searchParam.lastLoginTime"
                    placeholder="请输入最后登录时间"
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
                <el-table-column label="手机号" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_tel }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="头像" min-width="120" align="center">
                    <template slot-scope="scope">
                        <el-image
                            :src="scope.row.user_profile"
                            style="width: 100px;height: 100px;"
                        ></el-image>
                    </template>
                </el-table-column>

                <el-table-column label="微信号" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_wechat }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="新郎微博" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_microblog }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Gitee" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_gitee }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="GitHub" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_github }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="QQ" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_qq }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="邮箱" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_email }}</span>
                    </template>
                </el-table-column>

                <!--        <el-table-column label="登录密码" min-width="100" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.user_password }}</span>
                          </template>
                        </el-table-column>-->

                <el-table-column label="昵称" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.nick_name }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="职位" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_position }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="公司" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_company }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="个人主页" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_website }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="个人简介" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.user_intro }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="性别" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.gender === 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="用户身份" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.user_identity === 1">普通用户</span>
                        <span v-if="scope.row.user_identity === -1">小陈</span>
                        <span v-if="scope.row.user_identity === -2">小噗哧</span>
                    </template>
                </el-table-column>


                <el-table-column label="登录IP" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.login_ip_address }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="最后登录时间" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.last_login_time }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="账号状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.account_status === 1">正常</span>
                        <span v-if="scope.row.account_status === 2">禁言</span>
                        <span v-if="scope.row.account_status === 3">禁止修改资料</span>
                        <span v-if="scope.row.account_status === 4">封停</span>
                    </template>
                </el-table-column>

                <el-table-column label="资料审核状态" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.data_audit_status === 1">审核通过</span>
                        <span v-if="scope.row.data_audit_status === 2">审核中</span>
                        <span v-if="scope.row.data_audit_status === 3">驳回</span>
                    </template>
                </el-table-column>

                <el-table-column label="账号来源" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.account_source }}</span>
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
                        <el-form-item label="手机号" label-width="100px" prop="userTel">
                            <el-input v-model="form.userTel" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="头像" label-width="100px" prop="userProfile">
                            <el-input v-model="form.userProfile" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="微信号" label-width="100px" prop="userWechat">
                            <el-input v-model="form.userWechat" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="新郎微博" label-width="100px" prop="userMicroblog">
                            <el-input v-model="form.userMicroblog" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Gitee" label-width="100px" prop="userGitee">
                            <el-input v-model="form.userGitee" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="GitHub" label-width="100px" prop="userGithub">
                            <el-input v-model="form.userGithub" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="QQ" label-width="100px" prop="userQq">
                            <el-input v-model="form.userQq" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="邮箱" label-width="100px" prop="userEmail">
                            <el-input v-model="form.userEmail" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <!--          <el-col :span="12">
                                <el-form-item label="登录密码" label-width="100px" prop="userPassword">
                                  <el-input v-model="form.userPassword" auto-complete="off"></el-input>
                                </el-form-item>
                              </el-col>-->

                    <el-col :span="12">
                        <el-form-item label="昵称" label-width="100px" prop="nickName">
                            <el-input v-model="form.nickName" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="职位" label-width="100px" prop="userPosition">
                            <el-input v-model="form.userPosition" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="公司" label-width="100px" prop="userCompany">
                            <el-input v-model="form.userCompany" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="个人主页" label-width="100px" prop="userWebsite">
                            <el-input v-model="form.userWebsite" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="个人简介" label-width="100px" prop="userIntro">
                            <el-input v-model="form.userIntro" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="性别" label-width="100px" prop="gender">
                            <el-select
                                v-model="form.gender"
                                clearable
                                placeholder="请选择性别"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in genderList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="用户身份" label-width="100px" prop="userIdentity">
                            <el-select
                                v-model="form.userIdentity"
                                clearable
                                placeholder="请选择性别"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in userIdentityList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>


                    <el-col :span="12">
                        <el-form-item label="登录IP" label-width="100px" prop="loginIpAddress">
                            <el-input v-model="form.loginIpAddress" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="最后登录时间" label-width="100px" prop="lastLoginTime">
                            <el-input v-model="form.lastLoginTime" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="账号状态" label-width="100px" prop="accountStatus">
                            <el-select
                                v-model="form.accountStatus"
                                clearable
                                placeholder="请选择账号状态"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in accountStatusList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="资料审核状态" label-width="100px" prop="dataAuditStatus">
                            <el-select
                                v-model="form.dataAuditStatus"
                                clearable
                                placeholder="请选择资料审核状态"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in dataAuditStatusList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="账号来源" label-width="100px" prop="dataAuditStatus">
                            <el-select
                                v-model="form.accountSource"
                                clearable
                                placeholder="请选择账号来源"
                                style="width: 100%;"
                            >
                                <el-option
                                    v-for="item in accountSourceList"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id"
                                ></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="排序" label-width="100px" prop="orderNum">
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
import {webUserApi} from '/src/api/webUser'

export default {
    /*
      模式：$Vue文件组件名称占位符替换$
      替换方式：取模块名，大驼峰格式
    */
    name: "WebUser",
    props: {},
    components: {
        RightToggleBar,
    },
    data() {
        return {

            tableData: [],

            filterContainerHeight: 80, // 筛选框的高度
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
                userTel: null,
                userProfile: null,
                userWechat: null,
                userMicroblog: null,
                userGitee: null,
                userGithub: null,
                userQq: null,
                userEmail: null,
                userPassword: null,
                nickName: null,
                userPosition: null,
                userCompany: null,
                userWebsite: null,
                userIntro: null,
                gender: null,
                userIdentity: null,
                loginIpAddress: null,
                lastLoginTime: null,
                accountStatus: null,
                dataAuditStatus: null,
                accountSource: null,
                orderNum: null
            },

            /*
             模式：$Vue文件searchParam内容数据占位符替换$
             替换方式：排除uid、create_time、update_time，小驼峰，有默认值且，默认值不为空的字段
           */
            searchParam: {
                currentPage: 1, // 当前页
                pageSize: 30, // 列表总条数
                userTel: null,
                userWechat: null,
                userMicroblog: null,
                userGitee: null,
                userGithub: null,
                userQq: null,
                userEmail: null,
                userPassword: null,
                nickName: null,
                userPosition: null,
                userCompany: null,
                userWebsite: null,
                userIntro: null,
                gender: null,
                userIdentity: null,
                loginIpAddress: null,
                lastLoginTime: null,
                accountStatus: null,
                dataAuditStatus: null,
                accountSource: null,
                orderNum: null
            },
            total: null, // 列表总条数
            selectIds: [], // 等待删除数据的id
            selectIndex: [], // 等待删除数据的索引

            genderList: [
                {
                    id: 1,
                    label: '男'
                },
                {
                    id: 2,
                    label: '女'
                },


            ],
            userIdentityList: [
                {
                    id: 1,
                    label: '普通用户'
                },
                {
                    id: -1,
                    label: '小陈'
                },
                {
                    id: -2,
                    label: '小噗哧'
                },
            ],

            // 账号状态
            accountStatusList: [
                {
                    id: 1,
                    label: '正常'
                },
                {
                    id: 2,
                    label: '禁言'
                },
                {
                    id: 3,
                    label: '禁止修改资料'
                },
                {
                    id: 4,
                    label: '封停'
                },
            ],
            // 资料审核状态
            dataAuditStatusList: [
                {
                    id: 1,
                    label: '审核通过'
                },
                {
                    id: 2,
                    label: '审核中'
                },
                {
                    id: 3,
                    label: '驳回'
                },
            ],
            // 账号来源
            accountSourceList: [
                {
                    id: 'Gitee',
                    label: 'Gitee'
                },
                {
                    id: 'Github',
                    label: 'Github'
                },
                {
                    id: 'Microblog',
                    label: 'Microblog'
                },
                {
                    id: 'QQ',
                    label: 'QQ'
                },
            ],


        }
    },
    methods: {
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
                userTel: null,
                userProfile: null,
                userWechat: null,
                userMicroblog: null,
                userGitee: null,
                userGithub: null,
                userQq: null,
                userEmail: null,
                userPassword: null,
                nickName: null,
                userPosition: null,
                userCompany: null,
                userWebsite: null,
                userIntro: null,
                gender: null,
                userIdentity: null,
                loginIpAddress: null,
                lastLoginTime: null,
                accountStatus: null,
                dataAuditStatus: null,
                accountSource: null,
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
                userTel: row.user_tel,
                userProfile: row.user_profile,
                userWechat: row.user_wechat,
                userMicroblog: row.user_microblog,
                userGitee: row.user_gitee,
                userGithub: row.user_github,
                userQq: row.user_qq,
                userEmail: row.user_email,
                userPassword: row.user_password,
                nickName: row.nick_name,
                userPosition: row.user_position,
                userCompany: row.user_company,
                userWebsite: row.user_website,
                userIntro: row.user_intro,
                gender: row.gender,
                userIdentity: row.user_identity,
                loginIpAddress: row.login_ip_address,
                lastLoginTime: row.last_login_time,
                accountStatus: row.account_status,
                dataAuditStatus: row.data_audit_status,
                accountSource: row.account_source,
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
            let {data} = await webUserApi.deleteWebUserByUid(this.selectIds)
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
                data = await webUserApi.saveWebUser(this.form)
            } else { // 如果是编辑
                data = await webUserApi.updateWebUserByUid(this.form)
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
            let {data} = await webUserApi.queryWebUserPage(this.searchParam)
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
    }
}
</script>


<style scoped lang="scss">
@import "WebUser";
</style>
