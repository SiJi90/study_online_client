<template>
  <div>
    <el-col span="18" offset="4">
      <!--新增或删除-->
      <DelAndAdd/>

      <!--分页条-->
      <Pagination/>
    </el-col>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination/Pagination'
  import DelAndAdd from '@/components/DelAndAdd/DelAndAdd'

  export default {
    name: "Role",
    components: {
      DelAndAdd,
      Pagination
    }
  }
</script>

<style scoped>

</style>
