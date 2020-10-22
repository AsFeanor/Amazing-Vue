import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token : "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = ""
    }
  },
  actions: {
    login({ commit, dispatch, state}, authData) {

    },
    logout({ commit, dispatch, state}) {

    }
  },
  getters: {

  },
  modules: {
  }
})
