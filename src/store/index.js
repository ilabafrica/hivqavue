import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'
import accesscontrol from './modules/accesscontrol'
import { abilitiesPlugin } from '@casl/vue'

Vue.use(Vuex)
Vue.use (abilitiesPlugin)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    plugins: [
    
  ],

  modules: {
    user,
    auth,
    accesscontrol,
  },
  strict: debug,
})


