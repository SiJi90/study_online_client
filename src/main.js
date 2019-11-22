// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css'
import store from './store'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import animated from 'animate.css'


Vue.use(axios, VueAxios)
Vue.use(VideoPlayer)

/*import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video*/



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animated)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
