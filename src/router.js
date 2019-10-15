import { AuthLayout, DefaultLayout} from './components/layouts'
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import UserAccounts from './views/ACL/useraccounts.vue'
import Permission from './views/ACL/permissions.vue'
import Role from './views/ACL/role.vue'
import RoleUser from './views/ACL/roleuser.vue'
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
    next('/dashboard')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
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
      path: '/dashboard',
      component: DefaultLayout,
      meta: {title: "Dashboard", group:"apps", icon:""},
      beforeEnter: ifAuthenticated,
      ridirect: '/dashboard',
      hidden :true,
      children : [{
        path: '/dashboard',
        name: "Dashboard",
        meta: {title: "Dashboard", group:"apps", icon:"dashboard"},
        component: () => import ('./views/Dashboard.vue')

      }]
    },
    //Access Control
    {
      path: '/accesscontrol/useraccounts',
      name: 'accesscontrol/Useraccounts',
      component: DefaultLayout,
      ridirect:"/accesscontrol/useraccounts",
      beforeEnter: ifAuthenticated,
      hidden: true,      
      children:[{
        path:'/accesscontrol/useraccounts',
        name: 'Useraccounts',
        component: UserAccounts,
        meta: {title: "Useraccounts", group:"accesscontrol", icon:"settings"},      

      }]
      
    },
    {
      path: '/accesscontrol/permissions',
      name: 'accesscontrol/Permissions',
      component: DefaultLayout,
      redirect:'/accesscontrol/permissions',
      meta: {title: "Permissions", group:"accesscontrol", icon:"settings"},      
      beforeEnter: ifAuthenticated,
      hidden:true,
      children:[{
        path:'/accesscontrol/permissions',
        name:'Permissions',
        component: Permission,
        meta: {title: "Useraccounts", group:"accesscontrol", icon:"settings"},      

      }]
    },
    {
      path: '/accesscontrol/roles',
      name: 'accesscontrol/Roles',
      component: DefaultLayout,
      redirect:'/accesscontrol/roles',      
      beforeEnter: ifAuthenticated,
      hidden:true,
      children:[{
        path:'/accesscontrol/roles',
        name:'Roles',
        component: Role,
        meta: {title: "Roles", group:"accesscontrol", icon:"settings"},
      }]
    },
    {
      path: '/accesscontrol/roleusers',
      name: 'RoleUser',
      component: RoleUser,
      beforeEnter: ifAuthenticated,
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
      name: 'surveys/SPI_Collected_Data',
      component: DefaultLayout,
      redirect:"/spi_collected_data",
      beforeEnter: ifAuthenticated,
      hidden:true,
      children:[{
        path:'/spi_collected_data',
        name:'SPI_Collected_Data',
        component: SPI_Collected_Data,
        meta: {title: "SPI_Collected_Data", group:"surveys"},
      }]
    },
    {
      path: '/htc_collected_data',
      name: 'surveys/HTC_Collected_Data',
      component: DefaultLayout,
      redirect:"htc_collected_data",
      beforeEnter: ifAuthenticated,
      hidden:true,
      children:[{
        path:'/htc_collected_data',
        name:'HTC_Collected_Data',
        component: HTC_Collected_Data,
        meta: {title: "HTC_Collected_Data", group:"surveys"},
      }]
    },
    {
      path: '/htc_questionnaire',
      name: 'surveys/HTC_Questionnaire',
      component: DefaultLayout,
      beforeEnter: ifAuthenticated,
      hidden:true,
      children:[{
        path:'/htc_collected_data',
        name:'HTC_Questionnaire',
        component: HTC_Questionnaire,
        meta: {title: "HTC_Questionnaire", group:"surveys"},
      }]
    },  
    
  ]
})
