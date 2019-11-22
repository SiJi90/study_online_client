<template>
  <div>
    <el-col span="18" offset="4">
      <!--新增或删除-->
      <el-card align="left"  style="margin-top: 20px">
        <el-button type="danger" size="small" @click="delAll"><i class="el-icon-delete-solid"></i>全部删除</el-button>
        <el-button type="primary" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
      </el-card>

      <el-card style="margin-top: 20px;">
        <el-table :data="roleList" height="400px">
          <el-table-column type="index" label="序号" width="100px"></el-table-column>
          <el-table-column prop="roleName" label="角色名称"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row, $index}">
              <el-tooltip content="查看详情" placement="top">
                <el-button type="info" size="small" @click="viewDetail(row)"><i class="el-icon-view"></i></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="small" @click="delOne(row.roleId)"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--添加角色框-->
    <el-dialog :visible="showAdd" @close="showAdd = false">
        <el-form>
          <el-form-item label="角色名称">
            <el-input v-model="roleName" @keyup.native.enter="save" placeholder="请输入角色名称" clearable></el-input>
          </el-form-item>
        </el-form>
      <el-footer align="right" style="margin-top: 30px">
        <el-button type="info" @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </el-footer>
    </el-dialog>

    <!--查看详情框-->
    <el-dialog title="角色相关信息" align="left" :visible="showDetail" @close="showDetail = false">
      【角色名称】: {{role.roleName}}
      <p></p>
      <div v-show="role.roleId == 1">
        【相关权限】:
        <el-tag type="success">
          主页
        </el-tag>
        <el-tag type="success">
          用户管理
        </el-tag>
        <el-tag type="success">
          角色管理
        </el-tag>
        <el-tag type="success">
          批次管理
        </el-tag>
        <el-tag type="success">
          课程管理
        </el-tag>
        <el-tag type="success">
          课件管理
        </el-tag>
      </div>
      <div v-show="role.roleId != 1">
        【相关权限】:
        <el-tag type="danger">
          首页
        </el-tag>
        <el-tag type="danger">
          我的培训
        </el-tag>
        <el-tag type="danger">
          我的课程
        </el-tag>
        <el-tag type="danger">
          学习记录
        </el-tag>
        <el-tag type="danger">
          消息中心
        </el-tag>
        <el-tag type="danger">
          个人中心
        </el-tag>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DelAndAdd from '@/components/DelAndAdd/DelAndAdd'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "Role",
    data() {
      return {
        // 角色列表
        roleList: [],
        showAdd: false,
        roleName: '',
        showDetail: false,
        role: {}
      }
    },
    mounted() {
      this.getRoleList()
    },
    methods: {
      // 获取所有列表
      getRoleList() {
        axios.get('api/role/list').then(
          res => {
            this.roleList = res.data.extend.roleList
          }
        )
      },
      // 单个删除
      delOne(id) {
        this.$confirm('该操作会删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.delete('api/role', {
              params: {
                id
              }
            }).then(
              res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  // 刷新页面
                  this.getRoleList()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  });
                }
              }
            )
          }
        ).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        );
      },
      // 添加角色
      add() {
        this.showAdd = true

      },
      save() {
        axios.post('api/role', qs.stringify({
          roleName: this.roleName
        })).then(
          res => {
            this.showAdd = false
            this.getRoleList()
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }
        )
      },
      viewDetail(row) {
        this.showDetail = true
        this.role = row
      }
    },
    components: {
      DelAndAdd,
    }
  }
</script>

<style scoped>

</style>
