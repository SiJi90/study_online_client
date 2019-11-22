<template>
  <div>
    <Header/>
    <Aside/>
    <div v-if="$route.path === '/index'">
      <el-col span="19" offset="4">
        <el-carousel type="card" height="550px">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-calendar v-model="value">
            </el-calendar>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </div>
    <transition enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutUP"
                :duration="{ enter: 500, leave: 100 }">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Header from '@/components/Header/Header'
  import Aside from '@/components/Aside/Aside'

  export default {
    name: "Main",
    data() {
      return {
        value: new Date()
      }
    },
    components: {
      Header,
      Aside
    }
  }
</script>

<style scoped>

</style>
