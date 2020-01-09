import { AuthLayout, DefaultLayout} from './components/layouts'
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
import Facilities from './views/Facilities.vue'
import SDP from './views/SDPs.vue'
import SPI_Collected_Data from './views/SPI/SPI_Collected_Data.vue'
import HTC_Collected_Data from './views/HTC/HTC_Collected_Data.vue'
import HTC_Questionnaire from './views/HTC/HTC_Questionnaire.vue'
import HTC_Filled_Survey from './views/HTC/HTC_Filled_Survey.vue'
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
  //mode: 'history',
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
      name: 'htc_collected_data',
      component: HTC_Collected_Data,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/htc_questionnaire',
      name: 'htc_questionnaire',
      component: HTC_Questionnaire,
      props: true,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/htc_filled_survey',
      name: 'htc_filled_survey',
      component: HTC_Filled_Survey,
      props: true,
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
  ]
})
