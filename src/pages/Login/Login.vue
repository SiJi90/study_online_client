<template>
  <div style="margin: 0 auto; height: 100vh; background-color: red">
    <img src="../../assets/img/logo.png" height="200px" width="800px" style="margin-top: 30px">
    <el-card :class="styleObj" style="margin-top: 30px; height: 300px; width: 36%; margin-left: 32%">
      <el-form model="user" label-position="left">
        <el-form-item label="账号">
          <el-input clearable v-model="user.userAccount" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input @keyup.native.enter="login" clearable type="password" v-model="user.userPass" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="user= {}">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "Login",
    data() {
      return {
        user: {
          userAccount: '',
          userPass: '',

        },
        styleObj: ''
      }
    },
    methods: {
      login() {
        this.styleObj = ''
        let user = this.user
        axios.post('api/user', qs.stringify(user)).then(
          res => {
            // 登录成功并且是管理员
            if (res.data.code === 200) {
              let theUser = res.data.extend.user
              localStorage.setItem("theUser", JSON.stringify(theUser))
              if (theUser.userRoleId === 1) {
                this.$router.push("/index")
                this.$notify({
                  message: `欢迎回来!管理员【${theUser.userName}】`,
                  type: 'success',
                  offset: 80
                })
                // 登录成功, 不是管理员
              } else {
                this.$router.push("/student/index")
                this.$notify({
                  message: `欢迎回来!用户【${theUser.userName}】`,
                  type: 'success',
                  offset: 80
                })
              }
              // 登录失败
            } else {
              this.styleObj = 'animated shake'
              this.$message({
                message: '登录失败!',
                type: 'error'
              })
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
