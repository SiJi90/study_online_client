<template>
  <!--分页条-->
  <!--<el-col span="18" offset="4">-->
    <el-card style="margin-top: 20px">
      <el-pagination
        @current-change="handCurrentChange"
        @size-change="handSizeChange"
        prev-text="上一页"
        next-text="下一页"
        :current-page="pageInfo.pageNum"
        :page-sizes="[5,10,15,20]"
        background
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </el-card>
  <!--</el-col>-->
</template>

<script>

  import {mapActions} from 'vuex'

  export default {
    name: "Pagination",
    props: ['pageInfo', 'activeName'],

    methods: {
      // 翻页
      ...mapActions(['getUserPageInfo']),
      handCurrentChange(pageNum) {
        const page = {
          pageNum: pageNum,
          pageSize: this.pageInfo.pageSize,
          activeName: this.activeName
        };
        this.getUserPageInfo(page)
      },
      // 每页条数
      handSizeChange(pageSize) {
        this.getUserPageInfo({pageNum: this.pageInfo.pageNum, pageSize: pageSize, activeName: this.activeName})
      }
    }
  }
</script>

<style scoped>

</style>
