import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwtToken : "",
    name: "",
  },
  mutations: {
    setToken(state, jwtToken) {
      state.jwtToken = jwtToken
    },
    clearToken(state) {
      state.jwtToken = ""
    },
    setName(state, name) {
      state.name = name
    },
    clearName(state) {
      state.name = ""
    }
  },
  actions: {
    initAuth({ dispatch, commit }) {
      let jwtToken = localStorage.getItem('jwtToken');
      let name = localStorage.getItem('name');
      if (jwtToken && name) {
        commit('setToken', jwtToken);
        commit('setName', name);
        // router.push('/');
      }else {
        router.push('/auth').catch(()=>{});
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
            commit('setName', response.data.user.rows[0].name);
            localStorage.setItem('jwtToken', response.data.jwtToken);
            localStorage.setItem('name', response.data.user.rows[0].name);

            // dispatch('setTimeoutTimer', +response.data.expiresIn)
          })
          .catch((e) => console.log(e));
    },
    logout({ commit }) {
      commit('clearToken','clearName');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('name');
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
