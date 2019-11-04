import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main/Main'
import User from '@/pages/User/User'
import Batch from '@/pages/Batch/Batch'
import Role from '@/pages/Role/Role'
import Course from '@/pages/Course/Course'
import Courseware from '@/pages/Courseware/Courseware'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      component: Main,
      children: [
        {
          path: '/user',
          component: User
        },
        {
          path: '/batch',
          component: Batch
        }, {
          path: '/Role',
          component: Role
        }, {
          path: '/course',
          component: Course
        }, {
          path: '/courseware',
          component: Courseware
        },
      ]
    }
  ]
})
