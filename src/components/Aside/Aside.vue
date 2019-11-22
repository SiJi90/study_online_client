<template>
  <div>
    <div class="aside">
      <el-menu
        :collapse="isShow"
        align="left"
        router
        @select="handSelect"
        active-text-color="#ff0000"
        :default-active="indexPath"
        style="height: 100vh">
        <el-menu-item index="/index">
          <i class="el-icon-house"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/role">
          <i class="el-icon-user-solid"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/batch">
          <i class="el-icon-set-up"></i>
          <span slot="title">批次管理</span>
        </el-menu-item>
        <el-menu-item index="/course">
          <i class="el-icon-reading"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
        <el-menu-item index="/courseware">
          <i class="el-icon-s-management"></i>
          <span slot="title">课件管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div :style="styleObj">
      <i :class="classObj" @click="show"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Aside",
    mounted() {
      this.indexPath = this.$route.path
    },
    data() {
      return {
        isShow: false,
        styleObj: {
          position: 'absolute',
          left: '9%',
          top: '50%',
        },
        classObj: 'el-icon-d-arrow-left',
        // 激活菜单
        indexPath: ''
      }
    },
    methods: {
      show() {
        this.isShow = !this.isShow;
        if (!this.isShow) {
          this.styleObj.left = '9.5%';
          this.classObj = 'el-icon-d-arrow-left'
        } else {
          this.styleObj.left = '3.5%';
          this.classObj = 'el-icon-d-arrow-right'
        }
      },
    },

  }
</script>

<style scoped>
  .aside {
    position: fixed;
    width: 10%;
    left: 0;
  }
</style>
