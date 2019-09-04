import { AuthLayout, DefaultLayout} from './components/layouts'
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Projects from './views/Projects.vue'
import Team from './views/Team.vue'
import Login from './components/login.vue'
import Register from './components/register.vue'
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
