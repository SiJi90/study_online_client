<template>
  <el-row style="position: relative; margin-bottom: 60px">
    <el-col class="head">
      <div>
        <span class="logo"><img src="../../assets/img/logo.png" style="height: 40px;"></span>
      </div>
      <div v-if="activePage.includes('student')" style="width: 50%; margin-left: 20%">
        <el-menu
          :default-active="activePage"
          mode="horizontal"
          router
          background-color="#f00"
          text-color="#fff"
          active-text-color="green">
          <el-menu-item index="/student/index">首页</el-menu-item>
          <el-menu-item index="/student/batch">我的培训</el-menu-item>
          <el-menu-item index="/student/course">我的课程</el-menu-item>
          <el-menu-item index="/student/record">学习记录</el-menu-item>
          <el-menu-item index="/student/message">消息中心</el-menu-item>
          <el-menu-item index="/student/profile">个人中心</el-menu-item>
        </el-menu>

      </div>
      <div class="avatar">
        <el-dropdown>
          <el-avatar>{{userName}}</el-avatar>
          <el-dropdown-menu>
            <div @click="logOut">
              <el-dropdown-item><i class="el-icon-right">退出</i></el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Header",
    mounted() {
      this.userName = JSON.parse(localStorage.getItem("theUser")).userName
      this.valiateLogin()
      this.activePage = this.$route.path
    },
    data() {
      return {
        userName: '',
        activePage: ''
      }
    },
    methods: {
      logOut() {
        localStorage.removeItem("theUser")
        this.$router.replace("/")
      },
      valiateLogin() {
        let res = localStorage.getItem("username")
        if (!res) {
          this.$notify({
            title: '提示',
            type: 'error',
            message: '非法操作,请重新登录!!!'
          })
          this.$router.replace("/")
        }
      }
    }
  }
</script>

<style scoped>
  .head {
    position: fixed;
    width: 100%;
    background: red;
    height: 60px;
    box-sizing: border-box;
    margin-bottom: 60px;
  }

  .logo {
    position: absolute;
    left: 5%;
    top: 10px;
  }

  .avatar {
    position: absolute;
    top: 10px;
    right: 5%;
  }

  .el-avatar {
    color: #000;
    background: white;
  }
</style>
