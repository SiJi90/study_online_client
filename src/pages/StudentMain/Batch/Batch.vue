<template>
  <div>
    <el-col span="16" offset="4">
      <el-card shadow style="margin-top: 30px">
        <el-table :data="batchList" max-height="400px">
          <el-table-column type="index" label="序号" width="100px"></el-table-column>
          <el-table-column prop="batchName" label="批次名称"></el-table-column>
          <el-table-column prop="batchStartTime" label="开始时间"></el-table-column>
          <el-table-column prop="batchEndTime" label="结束时间"></el-table-column>
          <el-table-column prop="batchCredit" label="资格学分"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Batch",
    data() {
      return {
        batchList: []
      }
    },
    mounted() {
      this.getBatchList()
    },
    methods: {
      getBatchList() {
        axios.get('/api/userBatch/list', {
          params: {
            userId: JSON.parse(localStorage.getItem("theUser")).userId
          }
        }).then(
          res => {
            this.batchList = res.data.extend.batchList
          }
        )

      }
    }
  }
</script>

<style scoped>

</style>
