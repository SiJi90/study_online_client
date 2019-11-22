<template>
  <div>
    <el-col span="18" offset="4">
      <!--新增或删除-->
      <el-card align="left"  style="margin-top: 20px">
        <el-button type="danger" size="small" @click="delAll"><i class="el-icon-delete-solid"></i>全部删除</el-button>
        <el-button type="primary" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
      </el-card>

      <el-card style="margin-top: 20px">
        <el-table :data="list" max-height="450px">
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column label="所属课程名称">
            <template slot-scope="{row, $index}">
              {{courseName(1)}}
            </template>
          </el-table-column>
          <el-table-column prop="cwName" label="课件名称"></el-table-column>
          <el-table-column label="课件类型">
            <template slot-scope="{row, $index}">
              {{row.cwType == 0 ? '视频' : 'PPT'}}
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="{row, $index}">
              {{row.cwTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" fixed="right">
            <template slot-scope="{row, $index}">
              <el-tooltip content="查看详情" placement="top">
                <el-button type="info" size="small" @click="view(row)"><i class="el-icon-view"></i></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="small" @click="delOne(row.cwId)"><i class="el-icon-delete"></i></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--课件详情页-->
    <el-dialog title="课件详情" :visible="showDetail" @close="showDetail = false">
      <el-card align="left">
        <div>【课件名称】: {{coursewareDetail.cwName}}</div>
        <p></p>
        <div>【课件所属课程】: {{courseName(coursewareDetail.cwCourseId)}}</div>
        <p></p>
        <div>【课件类型】: {{coursewareDetail.cwType == 0? '视频' : 'PPT'}}</div>
        <p></p>
        <div>【课件地址】: {{coursewareDetail.cwAddr}}</div>
        <p></p>
        <div v-show="coursewareDetail.cwType == 0">【课件封面地址】: {{coursewareDetail.cwImgAddr}}</div>
        <p></p>
        <div>【创建时间】: {{coursewareDetail.cwTime}}</div>
        <p></p>
        <div>【课件简介】: {{coursewareDetail.cwInfo}}</div>
      </el-card>
    </el-dialog>

    <!--新增课件窗口-->
    <el-dialog align="left" title="添加课件" :visible="showAdd" :close-on-click-modal="false" @close="showAdd = false">
      <el-card>
        <el-form :model="courseware" label-position="right" size="small">
          <el-form-item label="课件名称">
            <el-input v-model="courseware.name"></el-input>
          </el-form-item>
          <el-form-item label="所属课程">
            <el-select v-model="courseware.course">
              <el-option v-for="(item, index) in courseList" :key="index" :value="item.courseName"></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label>选择课件</el-form-item>
          <el-button type="success"><el-upload v-model="courseware.attr">点击上传</el-upload></el-button>
          <el-form-item label>选择封面</el-form-item>
          <el-button type="success"><el-upload v-model="courseware.img">点击上传</el-upload></el-button>
        </el-form>
      </el-card>
      <el-footer style="margin-top: 30px" align="right">
        <el-button type="info" size="small" @click="showAdd = false">取消</el-button>
        <el-button type="primary" size="small">提交</el-button>
      </el-footer>
    </el-dialog>
  </div>
</template>

<script>
  import DelAndAdd from '@/components/DelAndAdd/DelAndAdd'
  import axios from 'axios'

  export default {
    name: "Role",
    data() {
      return {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // 课件列表信息
        list: [],
        // 所有课程信息
        courseList: [],
        // 是否显示详情
        showDetail: false,
        // 课件详情信息
        coursewareDetail: {},
        // 是否显示新增窗口
        showAdd: false,
        courseware: {}
      }
    },
    mounted(){
      // 获取所有课件
      this.getCourseWareList()
      // 获取所有课程
      this.getCourseList()
    },
    computed: {
      courseName() {
        return (id) => {
          for (let i in this.courseList) {
            if (this.courseList[i].courseId === id) {
              return this.courseList[i].courseName
            }
          }
        }
      }
    },
    methods: {
      // 获取所有课件列表
      getCourseWareList() {
        axios.get('/api/courseware').then(
          res => {
            this.list = res.data.extend.list
          }
        )
      },
      // 删除单个课件
      delOne(id) {
        this.$confirm('该操作会删除该批次, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.delete('api/courseware', {
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
                  this.getCourseWareList()
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

      // 获取所有课程
      getCourseList() {
        axios.get('api/course/list').then(
          res => {
            this.courseList = res.data.extend.list
          }
        )
      },
      // 查看课件详情
      view(data) {
        this.showDetail = true
        this.coursewareDetail = data
      },
      // 打开新增课件窗口
      add() {
        this.showAdd = true
      }
    },
    components: {
      DelAndAdd,
    }
  }
</script>

<style scoped>

</style>
