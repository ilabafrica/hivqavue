/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import apiCall from '../../utils/api'

const state = {
  token:localStorage.getItem('access_token') || null,
  status: '',
  hasLoadedOnce: false

   }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)

      apiCall({url: '/api/login', data: user, method: 'POST'})
      .then(resp => {
        commit(AUTH_SUCCESS, resp)
        localStorage.setItem('access_token', 'Bearer ' + resp.access_token)
        // dispatch(USER_REQUEST)
        // console.log(resp.access_token)
        resolve(resp)
      }).catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('access_token')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {

      apiCall({url: '/api/logout',data: '', method:'POST'})
       .then(resp => {
        console.log(resp)
      commit(AUTH_LOGOUT)
      localStorage.removeItem('access_token')
      resolve(resp)

    }).catch(err => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('access_token')
        reject(err)
     })
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
