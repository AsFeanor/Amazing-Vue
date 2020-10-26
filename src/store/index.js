import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwtToken : "",
  },
  mutations: {
    setToken(state, jwtToken) {
      state.jwtToken = jwtToken
    },
    clearToken(state) {
      state.jwtToken = ""
    }
  },
  actions: {
    initAuth({ dispatch, commit }) {
      let jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        commit('setToken', jwtToken);
        router.push('/');
      }else {
        router.push('/auth');
        return false;
      }
    },
    login({ commit, dispatch, state}, authData) {
      let authLink = 'http://localhost:3000/authentication/register'
      if (authData.isUser) {
        authLink = 'http://localhost:3000/authentication/login'
      }

      return axios.post(authLink, { name: authData.name, email: authData.email, password: authData.password })
          .then((response) => {
            console.log(response.data);
            commit('setToken', response.data.jwtToken);
            localStorage.setItem('jwtToken', response.data.jwtToken);

            // dispatch('setTimeoutTimer', +response.data.expiresIn)
          })
          .catch((e) => console.log(e));
    },
    logout({ commit }) {
      commit('clearToken');
      localStorage.removeItem('jwtToken');
      router.replace('/auth');
    },
    // setTimeoutTimer({ dispatch }, expiresIn) {
    //   setTimeout(() =>{
    //     dispatch('logout');
    //   }, expiresIn);
    // }
  },
  getters: {
    isAuthenticated(state) {
      return state.jwtToken !== ""
    }
  },
  modules: {
  }
})
