<template>
  <el-card align="left">
    <el-button type="danger" size="small" @click="delAll"><i class="el-icon-delete-solid"></i>全部删除</el-button>
    <el-button type="primary" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
  </el-card>
</template>

<script>

  import {IS_SHOW} from "../../store/mutation-types";

  export default {
    name: "DelAndAdd",
    props: ['selection', 'pageNum', 'pageSize', 'activeName'],
    computed: {
      // 默认页面
      page() {
        return {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          activeName: this.activeName
        }
      }
    },
    methods: {
      // 批量删除
      delAll() {
        if (this.selection.length) {
          this.$confirm('该操作会删除所选中用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              // 将数组拼接为字符串
              let ids = '';
              for (let i in this.selection) {
                ids += this.selection[i] + '-'
              }
              // 删掉尾部  '-'
              ids = ids.substring(0, ids.length - 1);
              // 请求 Actions
              this.$store.dispatch('delUser', ids);
              // 提示信息
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              // 刷新页面
              this.$store.dispatch('getUserPageInfo', this.page);
            }
          ).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            }
          )
        } else {
          this.$message({
            type: 'warning',
            message: '请选择需要删除的用户'
          })
        }

      },
      // 打开增加页面
      add() {
        this.$store.commit(IS_SHOW, true)
      }
    }
  }
</script>

<style scoped>

</style>
