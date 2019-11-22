import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main/Main'
import User from '@/pages/User/User'
import Batch from '@/pages/Batch/Batch'
import Role from '@/pages/Role/Role'
import Course from '@/pages/Course/Course'
import Courseware from '@/pages/Courseware/Courseware'
import Login from '@/pages/Login/Login'
import StudentMain from '@/pages/StudentMain/StudentMain'
import StudentBatch from '@/pages/StudentMain/Batch/Batch'
import StudentCourse from '@/pages/StudentMain/Course/Course'
import StudentRecord from '@/pages/StudentMain/Record/Record'
import StudentProfile from '@/pages/StudentMain/Profile/Profile'
import StudentMessage from '@/pages/StudentMain/Message/Message'


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
    },
    // 登录路由界面
    {
      path: '/', redirect: '/login'
    },
    {
      path: '/login', component: Login
    },
    // 学生主界面
    {
      path: '/student/index', component: StudentMain,
      children: [
        {
          path: '/student/batch', component: StudentBatch
        },
        {
          path: '/student/course', component: StudentCourse
        },
        {
          path: '/student/record', component: StudentRecord
        },
        {
          path: '/student/profile',component: StudentProfile
        },
        {
          path: '/student/message',component: StudentMessage
        }
      ]
    }
  ]
})
