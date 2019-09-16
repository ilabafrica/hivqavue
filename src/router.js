import { AuthLayout, DefaultLayout} from './components/layouts'
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'
import Team from './views/Team.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import Facilities from './views/Facilities.vue'
import SDP from './views/SDPs.vue'
import SPI_Collected_Data from './views/SPI/SPI_Collected_Data.vue'
import HTC_Collected_Data from './views/HTC/HTC_Collected_Data.vue'
import HTC_Questionnaire from './views/HTC/HTC_Questionnaire.vue'
import store from './store/index'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth/login')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'Login',
      component: AuthLayout,
      redirect: "/auth/login",
      beforeEnter: ifNotAuthenticated,
      hidden: true,
      children :[{
        path: 'login',
        component: () => import ("@/views/login.vue")
      }]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/facilities',
      name: 'Facilities',
      component: Facilities,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/sdp',
      name: 'SDP',
      component: SDP,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/spi_collected_data',
      name: 'SPI_Collected_Data',
      component: SPI_Collected_Data,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/htc_collected_data',
      name: 'HTC_Collected_Data',
      component: HTC_Collected_Data,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/htc_questionnaire',
      name: 'HTC_Questionnaire',
      component: HTC_Questionnaire,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/',
      component: DefaultLayout,
      meta: {title: "Dashboard"},
      //beforeEnter: ifAuthenticated,
      ridirect: "/dashboard",
      hidden :true,
      children : [{
        path: '/dashboard',
        name: "Dashboard",
        component: () => import ('./views/Dashboard.vue')

      }]
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/team',
      name: 'team',
      component: Team,
      beforeEnter: ifAuthenticated,
    }
  ]
})
