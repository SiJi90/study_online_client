<template>
  <div>
    <!--通用头部-->
    <Header/>
    <!--首页展示页面-->
    <div v-if="$route.path === '/student/index'" style="font-size: 80px">
      <el-card shadow="hover" style="position: absolute; width: 80%; height: 550px; margin-left: 10%; margin-top: 30px">
        <p>学海无涯</p>
        <p>学无止境</p>
        <p style="font-size: 20px"><i class="el-icon-loading"></i>后续功能继续完善中...</p>
      </el-card>
    </div>

    <!--路由页面-->
    <transition enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutUP"
                :duration="{ enter: 500, leave: 100 }">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Header from '@/components/Header/Header'

  export default {
    name: "StudentMain",
    mounted() {

    },
    methods: {

    },
    components: {
      Header
    }
  }
</script>

<style scoped>

</style>
