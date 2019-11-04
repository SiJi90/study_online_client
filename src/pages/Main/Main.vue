<template>
  <div>
    <Header/>
    <Aside/>
    <div v-if="$route.path === '/index'">欢迎来到首页</div>
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
