import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'

import orgUnits from './modules/orgUnits'
import questions from './modules/questions'
import answers from './modules/answers'

import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocalStorage = new VuexPersist({
  key: 'hivqa_frontend', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  filter: mutation => (true)
})

export default new Vuex.Store({
    plugins: [
    	vuexLocalStorage.plugin
  	],

  	modules: {
    	user,
    	auth,

    	orgUnits,
    	questions,
      answers
  	},
  	strict: false,
})


