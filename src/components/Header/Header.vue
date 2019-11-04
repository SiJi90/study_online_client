<template>
  <el-row style="position: relative; margin-bottom: 60px">
    <el-col class="head">
      <div>
        <span class="logo"><img src="../../assets/img/logo.png" style="height: 40px;"></span>
      </div>
      <div class="avatar">
        <el-dropdown>
          <el-avatar>用户</el-avatar>
          <el-dropdown-menu>
            <el-dropdown-item><i class="el-icon-right">退出</i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "Header"
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
