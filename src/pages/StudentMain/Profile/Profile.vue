<template>
    <el-card align="left" shadow="hover" style="margin-top: 30px; width: 60%; margin-left: 20%; height: 550px">
      <el-form model="user" label-position="left">
        <el-form-item label="姓名">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="user.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input :type="type" v-model="user.userPass"></el-input><el-button @click="type = 'text'"><i class="el-icon-view">查看密码</i> </el-button>

        </el-form-item>
        <el-form-item label="找回密码问题">
          <el-input v-model="user.userFindQuestion"></el-input>

        </el-form-item>
        <el-form-item label="找回密码答案">
          <el-input v-model="user.userFindAnswer"></el-input>

        </el-form-item>

      </el-form>
    </el-card>
</template>

<script>

  import axios from 'axios'

  export default {
    name: "Profile",
    data() {
      return {
        user: {},
        type: 'password'
      }
    },
    mounted() {
      this.getUserDetail()
    },
    methods: {
      // 获取用户详细信息
      getUserDetail() {
        axios.get('/api/user/getOne', {
          params: {
            userId: JSON.parse(localStorage.getItem("theUser")).userId
          }
        }).then(
          res => {
            this.user = res.data.extend.user
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
