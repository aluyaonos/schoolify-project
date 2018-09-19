import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Tables from '@/components/Tables'
import Maps from '@/components/Maps'
import BadGateway from '@/components/BadGateway'
import AddClass from '@/components/AddClass'
import AddCourses from '@/components/AddCourses'
import AddQuestion from '@/components/AddQuestion'
import GeneratePaper from '@/components/GeneratePaper'
import QuestionVault from '@/components/QuestionVault'
import ViewClass from '@/components/ViewClass'
import ViewCourses from '@/components/ViewCourses'
import ViewQuestions from '@/components/ViewQuestions'
import ClassView from '@/components/attachments/ModalPopup/ClassView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: { page: 1 },
      alias: '/'
    },
    {
      path: '/profile',
      name: 'Profile',
      props: { page: 2 },
      component: Profile
    },
    {
      path: '/addclass',
      name: 'AddClass',
      props: { page: 3 },
      component: AddClass
    },
    {
      path: '/viewclass',
      name: 'ViewClass',
      props: { page: 4 },
      component: ViewClass
    },
    {
      path: '/addcourses',
      name: 'AddCourses',
      props: { page: 5 },
      component: AddCourses
    },
    {
      path: '/viewcourses',
      name: 'ViewCourses',
      props: { page: 6 },
      component: ViewCourses
    },
    {
      path: '/addquestion',
      name: 'AddQuestion',
      props: { page: 7 },
      component: AddQuestion
    },
    {
      path: '/viewquestions',
      name: 'ViewQuestions',
      props: { page: 8 },
      component: ViewQuestions
    },
    {
      path: '/generatepaper',
      name: 'GeneratePaper',
      props: { page: 9 },
      component: GeneratePaper
    },
    {
      path: '/questionvault',
      name: 'QuestionVault',
      props: { page: 10 },
      component: QuestionVault
    },
    {
      path: '/tables',
      name: 'Tables',
      props: { page: 11 },
      component: Tables
    },
    {
      path: '/maps',
      name: 'Maps',
      props: { page: 12 },
      component: Maps
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: { page: 13 },
      component: BadGateway
    },
    {
      path: '*',
      props: { page: 14 },
      redirect: '/404'
    },
    {
      path: '/viewclass/classid',
      name: 'SingleClass',
      props: { page: 15 },
      component: ClassView
    }
  ]
})
