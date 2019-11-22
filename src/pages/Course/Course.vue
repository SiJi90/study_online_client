<template>
  <div>
    <el-col span="18" offset="4">
      <!--新增或删除-->
      <el-card align="left" style="margin-top: 20px">
        <el-button type="danger" size="small" @click="delAll"><i class="el-icon-delete-solid"></i>全部删除</el-button>
        <el-button type="primary" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
      </el-card>
      <!--表格信息-->
      <el-card style="margin-top: 20px">
        <el-table
          :data="courseList"
          max-height="400px">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column type="index" label="序号" width="100px"></el-table-column>
          <el-table-column prop="courseName" label="课程名"></el-table-column>
          <el-table-column prop="courseCode" label="课程代码"></el-table-column>
          <el-table-column prop="courseCredit" label="学分"></el-table-column>
          <el-table-column prop="courseStatus" label="状态">
            <template slot-scope="{row,$index}">
              {{row.courseStatus == 0 ? '关闭' : '开启'}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="200px" label="操作">
            <template slot-scope="{row, $index}">
              <el-tooltip content="查看详情" placement="top">
                <el-button type="info" size="small" @click="viewCourse(row)"><i class="el-icon-view"></i></el-button>
              </el-tooltip>
              <el-tooltip content="编辑" placement="top">
                <el-button type="primary" size="small"><i class="el-icon-edit"></i></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button type="danger" size="small" @click="delOne(row.courseId)"><i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--查看课程的详细信息-->
    <el-dialog align="left" fullscreen="true" title="课程详细信息" :visible="showDetail" @close="showDetail = false" width="90%">
      <el-divider content-position="left">这是一条咸鱼分割线</el-divider>
      <div style="position: relative">
        <el-image style="width: 400px; height: 200px"
                  src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
        <div style="position: absolute; left: 50%; top: 0; color: red; font-size: 25px">
          <p>【课程名称】《{{course.courseName}}》</p>
          <p>【课程代码】{{course.courseCode}}</p>
          <p>【课程学分】{{course.courseCredit}} 分</p>
        </div>
      </div>
      <el-divider>课件内容</el-divider>

      <!--显示该课程的所有课件-->
      <div>
        <el-card align="left" v-for="(courseware, index) in coursewareList"
                 style="width: 230px; height: 120px; margin-left: 30px; float: left;"
                 :key="index" shadow="hover">

          <p>【标题】：{{courseware.cwName}}</p>
          <p>【内容简介】：{{courseware.cwInfo}}</p>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import DelAndAdd from '@/components/DelAndAdd/DelAndAdd'
  import axios from 'axios'

  export default {
    name: "Course",
    mounted() {
      this.getCourseList()
    },
    data() {
      return {
        //  课程列表信息
        courseList: [],
        // 是否显示课程详细信息
        showDetail: false,
        // 课程详细信息
        course: {},
        // 该课程所有课件信息
        coursewareList: []
      }
    },
    methods: {
      // 获取所有课程
      getCourseList() {
        axios.get('api/course/list').then(
          res => {
            this.courseList = res.data.extend.list
          }
        )
      },
      // 单个删除
      delOne(id) {
        this.$confirm('该操作会删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.delete('api/course', {
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
                  this.getCourseList()
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
      // 查看课程的详细信息
      viewCourse(data) {
        this.showDetail = true
        this.course = data

        // 查询该课程的所有课件
        axios.get('api/course/courseware', {
          params: {
            courseId: data.courseId
          }
        }).then(
          res => {
            this.coursewareList = res.data.extend.list
          }
        )
      }
    },
    components: {
      DelAndAdd,
    }
  }
</script>

<style scoped>

</style>
