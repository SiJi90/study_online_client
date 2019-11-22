<template>
  <div>
    <el-col span="18" offset="4">
      <!--新增或删除-->
      <el-card align="left" style="margin-top: 20px">
        <el-button type="danger" size="small" @click="delAll"><i class="el-icon-delete-solid"></i>全部删除</el-button>
        <el-button type="primary" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
      </el-card>

      <!--批次表格详细信息-->
      <el-card style="margin-top: 20px">
        <el-table :data="batchList" max-height="400px">
          <el-table-column type="index" label="序号" width="100px"></el-table-column>
          <el-table-column prop="batchName" label="批次名称"></el-table-column>
          <el-table-column prop="batchStartTime" label="开始时间"></el-table-column>
          <el-table-column prop="batchEndTime" label="结束时间"></el-table-column>
          <el-table-column prop="batchCredit" label="资格学分"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row, $index}">
              <el-tooltip content="查看详情" placement="top">
                <el-button type="info" size="small" @click="viewDetail(row)"><i class="el-icon-view"></i></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="small" @click="addStudent(row)"><i class="el-icon-edit"></i></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="small" @click="delOne(row.batchId)"><i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--为批次添加学员-->
    <el-dialog title="编辑批次相关信息" align="left" :visible="addStudentShow" @close="addStudentShow = false">
      <el-form v-model="batch">
        <el-input v-show="false" v-model="batch.batchId"></el-input>
        <el-form-item label="批次名称">
          <el-input clearable v-model="batch.batchName"></el-input>
        </el-form-item>
        <el-form-item label="批次学员">
          <el-select placeholder="请选择" clearable multiple v-model="selected">
            <el-option v-for="item in students" :key="item.userId" :label="item.userName"
                       :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-footer style="margin-top: 30px" align="right">
        <el-button type="info" @click="addStudentShow = false">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </el-footer>
    </el-dialog>

    <!--详情展示框-->
    <el-dialog title="批次详情" align="left" :visible="showDetail" @close="showDetail = false">
      <el-card>
        <div>【批次名称】: {{batch.batchName}}</div>
        <p></p>
        <div>
          【批次人员】:
          <el-tag hit style="margin-left: 10px; margin-top: 20px" :type="item % 2 == 0 ? 'success' : 'danger'"
                  v-for="item in studentNames">
            {{name(item)}}
          </el-tag>
        </div>

      </el-card>
    </el-dialog>
  </div>
</template>

<script>
  import DelAndAdd from '@/components/DelAndAdd/DelAndAdd'
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "Batch",
    data() {
      return {
        // 所有批次信息
        batchList: [],
        // 是否打开为批次添加学员窗口
        addStudentShow: false,
        // 单个批次相关信息
        batch: {},
        // 所有学生信息
        students: [],
        // 所有学生姓名
        studentNames: [],
        // 所有选中的学生
        selected: [],
        // 是否显示详情框
        showDetail: false
      }
    },
    mounted() {
      this.getBatchList()
    },
    methods: {
      // 获取批次列表
      getBatchList() {
        axios.get('api/stuBatch').then(
          res => {
            this.batchList = res.data.extend.batchList
          }
        )
      },
      // 删除批次
      delOne(id) {
        this.$confirm('该操作会删除该批次, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.delete('api/stuBatch', {
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
                  this.getBatchList()
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
      // 为批次添加学员
      addStudent(batch) {
        // 打开模态框
        this.addStudentShow = true
        this.batch = batch
        // 获取所有学员
        axios.get('api/user/students').then(
          res => {

            this.students = res.data.extend.students
            // map 方法根据条件过滤数组
            // this.students = res.data.extend.students.map( x => x.userName)
          }
        )
      },
      // 提交添加学员信息
      save() {

        axios.post('api/userBatch', qs.stringify({
          batchId: this.batch.batchId,
          ids: this.selected.join("-")
        })).then(
          res => {
            if (res.data.code === 200) {
              // 提示信息
              this.$message({
                message: '提交成功!',
                type: 'success',
                offset: 80
              })

              // 关闭模态框
              this.addStudentShow = false
              // 刷新页面
              this.getBatchList()
            } else {
              // 提示信息
              this.$message({
                message: '提交失败,请重试!',
                type: 'error',
                offset: 80
              })
            }
          }
        )
      },
      // 查看详情信息
      viewDetail(row) {
        this.showDetail = true
        this.batch = row

        axios.get('api/userBatch', {
          params: {
            batchId: row.batchId
          }
        }).then(
          res => {
            this.studentNames = res.data.extend.batchList.map(x => x.userId)
            // 获取所有学员
            axios.get('api/user/students').then(
              res => {

                this.students = res.data.extend.students
                // map 方法根据条件过滤数组
                // this.students = res.data.extend.students.map( x => x.userName)
              }
            )

          }
        )
      }
    },
    computed: {
      name() {
        return (val) => {
          for (let i in this.students) {
            if (this.students[i].userId === val) {
              return this.students[i].userName
            }
          }
        }
      }
    },
    components: {
      DelAndAdd,
    }
  }
</script>

<style scoped>

</style>
