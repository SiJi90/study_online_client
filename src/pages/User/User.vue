<template>
  <div>
    <el-col span="18" offset="4">
      <!--<el-divider content-position="left">用户管理</el-divider>-->
      <!--标签页-->
      <el-tabs v-model="activeName" @tab-click="handTabClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="未审核" name="unreviewed"></el-tab-pane>
        <el-tab-pane label="已激活" name="actived"></el-tab-pane>
        <el-tab-pane label="已禁用" name="disabled"></el-tab-pane>
        <el-tab-pane label="审核未通过" name="Unapprove"></el-tab-pane>
      </el-tabs>
      <!--基础操作-->
      <DelAndAdd
        :selection="selection"
        :activeName="activeName"
        :pageNum="userPageInfo.pageNum"
        :pageSize="userPageInfo.pageSize"/>

      <!--用户基本信息表-->
      <el-card style="margin-top: 10px">
        <el-table
          max-height="340px"
          empty-text="没有找到相关信息"
          :data="userPageInfo.list"
          @selection-change="handSelectionChange"
          style="width: 100%">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="expand">
            <template slot-scope="{row, $index}">
              <div>
                【找回密码问题】:{{row.userFindQuestion | questionFilter}}
              </div>
              <div>
                【答案】: {{row.userFindAnswer |questionFilter}}
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="100px" :index="tableIndex"></el-table-column>
          <el-table-column prop="userName" align="center" width="120px" label="姓名"></el-table-column>
          <el-table-column prop="userAccount" align="center" label="账号"></el-table-column>
          <el-table-column prop="userRoleId" align="center" label="用户角色">
            <template slot-scope="{row, $index}">
              <el-tag :type='row.userRoleId | tagFilter'>
                {{roleName(row)}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户状态">
            <template slot-scope="{row, $index}">
              <el-tag :type="row.userStatus | tagFilter">
                {{row.userStatus | statusFilter}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="210px" align="center">
            <template slot="header" slot-scope="scope">
              <el-input
                autofocus="true"
                v-model="value"
                size="small"
                prefix-icon="el-icon-search"
                @input="getUserList"
                placeholder="输入姓名或账号搜索">
              </el-input>
            </template>
            <template slot-scope="{row, $index}">
              <el-tooltip placement="top" content="编辑">
                <el-button size="small">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip placement="top" content="删除">
                <el-button size="small" type="danger" @click="delOne(row, $index)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!--分页组件-->
      <Pagination :pageInfo="userPageInfo" :activeName="activeName"></Pagination>
    </el-col>
    <!--新增用户框-->
    <el-dialog
      @close="close"
      title="新增用户"
      top="10vh"
      width="30%"
      :visible.sync="isShow">
      <el-form v-model="user" label-width="auto">
        <el-form-item label="姓名">
          <el-input type="text" v-model="user.userName" clearable placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input type="text" placeholder="请输入用户登录账号" clearable v-model="user.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="角色" align="left">
          <el-select v-model="user.userRoleId" clearable>
            <el-option v-for="(item, index) in roleList" :key="index" :value="item.roleId"
                       :label="item.roleName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-footer style="margin-top: 50px">
        <el-button type="primary" @click="addOneUser">提交</el-button>
        <el-button @click="close">取消</el-button>
      </el-footer>
    </el-dialog>
  </div>
</template>

<script>

  import {mapState, mapActions} from 'vuex'
  import {
    CHANGE_VALUE,
    IS_SHOW
  } from "../../store/mutation-types";
  import Pagination from '@/components/Pagination/Pagination'
  import DelAndAdd from '@/components/DelAndAdd/DelAndAdd'

  export default {
    name: "User",
    data() {
      return {
        // 默认激活 tab 页
        activeName: 'all',
        // tab 卡
        label: '',
        // 所有选中的记录
        selection: [],
        // 一个 user 对象
        user: {
          userName: '',
          userAccount: '',
          // userPass: this.user.userAccount,
          userRoleId: ''
        }
      }
    },
    mounted() {
      // 访问 Actions 里的方法, 获取用户相关分页信息
      this.$store.dispatch('getUserPageInfo', this.page)
      // 初始化 isShow 值
      this.$store.commit(IS_SHOW, false)
      // 获取所有用户角色
      this.$store.dispatch('getRoleList')

      const peng = 'xttzuikeaiofgeva, ixyuakzpxnfbega, jskakwbdvxgahwotbrcagsjxbdhshdgsjwapd. inbshfgshdkxbansoxuctebtngkajchevqkfurb'
      console.log()
    },
    computed: {
      // 获取 vuex state 里的 userPageInfo
      ...mapState(['userPageInfo', 'isShow', 'roleList']),
      // 表格序号连续
      tableIndex() {
        return (this.userPageInfo.pageNum - 1) * this.userPageInfo.pageSize + 1
      },
      // 模糊查找关键字
      value: {
        get() {
          return this.$store.state.value
        },
        set(newVal) {
          // 更改 state 里 value 值
          this.$store.commit(CHANGE_VALUE, newVal)
        }
      },
      // 动态角色名称
      roleName() {
        return ({userRoleId}) => {
          for (let index in this.roleList) {
            if (userRoleId === this.roleList[index].roleId) {
              return this.roleList[index].roleName
            }
          }
        }
      },
      // 默认分页
      page() {
        return {
          pageNum: 1,
          pageSize: 5,
          activeName: this.activeName
        }
      }
    },
    watch: {},
    methods: {
      ...mapActions(['getUserPageInfo']),
      // 根据条件查询用户
      getUserList() {
        const page = {
          pageNum: this.userPageInfo.pageNum,
          pageSize: this.userPageInfo.pageSize,
          activeName: this.activeName
        };
        this.getUserPageInfo(page)
      },
      handSelectionChange(selection) {
        this.selection = selection.flatMap(user => user.userId)
        console.log(this.selection)
      },
      // 删除一个用户方法
      delOne({userId}) {
        this.$confirm('该操作会删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$store.dispatch('delUser', userId);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 刷新页面
            this.getUserList()
          }
        ).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        );

      },
      // 关闭新增用户框
      close() {
        this.$store.commit(IS_SHOW, false)
      },
      // 添加新用户
      addOneUser() {
        // 添加密码, 密码默认为账号
        Object.assign(this.user, {userPass: this.user.userAccount})
        // 发送请求
        this.$store.dispatch('addOneUser', this.user).then(
          this.$notify.success({
            title: '添加成功',
            message: '默认密码为账号, 请牢记!'
          })
        )
        // 刷新页面, 到最后一页
        const page = {
          pageNum: this.userPageInfo.total,
          pageSize: this.userPageInfo.pageSize,
          activeName: this.activeName
        };
        this.getUserPageInfo(page)
        // 关闭模态框
        this.close()
        this.user = {}
      },
      // 切换 tab 选项卡
      handTabClick(tab, event) {
        // 访问 Actions 里的方法, 获取用户相关分页信息
        this.$store.dispatch('getUserPageInfo', this.page)
        if (tab.name === 'all') {
        } else if (tab.name === 'unreviewed') {
        } else if (tab.name === 'actived') {
        } else if (tab.name === 'disabled') {
        } else {
        }
      }
    },
    filters: {
      // 问题答案过滤器
      questionFilter(val) {
        if (val) {
          return val
        } else {
          return '无'
        }
      },
      // tag 颜色过滤器
      tagFilter(val) {
        if (val === 1) {
          return 'success'
        } else if (val === 2) {
          return 'primary'
        } else if (val === 0) {
          return 'info'
        } else {
          return 'danger'
        }
      },
      // 用户账号状态过滤器
      statusFilter(val) {
        if (val === 0) {
          return '未审核'
        } else if (val === 1) {
          return '已激活'
        } else if (val === 2) {
          return '已禁用'
        } else {
          return '审核未通过'
        }
      }
    },
    components: {
      Pagination,
      DelAndAdd
    }

  }
</script>

<style scoped>

</style>
