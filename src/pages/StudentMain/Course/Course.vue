<template>
  <el-col span="20" offset="2" style="margin-top: 30px" align="left">
    <!--循环展示所有课程-->
    <div v-for="item in courseList" :key="item.courseId"  @click="viewCourse(item)">
      <el-card shadow="hover" style="float: left; margin: 20px; width: 250px; height: 150px"
               >
        <el-card style="height: 100px; width: 200px" shadow="hover">
          < {{item.courseName}}>
        </el-card>
      </el-card>
    </div>

    <!--查看课程的详细信息-->
    <el-dialog align="left" fullscreen="true" title="课程详细信息" :visible="showDetail" @close="showDetail = false" width="90%">
      <el-divider content-position="left">课程详细信息查看</el-divider>
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

  </el-col>


</template>

<script>
  import axios from 'axios'

  export default {
    name: "Course",
    data() {
      return {
        // 所有课程信息
        courseList: [],
        // 是否显示课程详细信息
        showDetail: false,
        // 课程详细信息
        course: {},
        // 该课程所有课件信息
        coursewareList: []

      }
    },
    mounted() {
      this.getCourseList()
    },
    methods: {
      // 获取所有课程
      getCourseList() {
        axios.get('/api/course/list').then(
          res => {
            this.courseList = res.data.extend.list
          }
        )
      },
      // 查看课程的详细信息
      viewCourse(data) {
        this.showDetail = true
        this.course = data

        // 查询该课程的所有课件
        axios.get('/api/course/courseware', {
          params: {
            courseId: data.courseId
          }
        }).then(
          res => {
            this.coursewareList = res.data.extend.list
          }
        )
      }

    }
  }
</script>

<style scoped>

</style>
