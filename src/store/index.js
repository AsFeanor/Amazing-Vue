import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwtToken : "",
    name: "",
    member_since: {}
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
    },
    setMemberSince(state, member_since) {
      state.member_since = member_since
    },
    clearMemberSince(state) {
      state.member_since = ""
    },
  },
  actions: {
    initAuth({ dispatch, commit }) {
      let jwtToken = localStorage.getItem('jwtToken');
      let name = localStorage.getItem('name');
      let member_since = localStorage.getItem('member_since');
      if (jwtToken && name && member_since) {
        commit('setToken', jwtToken);
        commit('setName', name);
        commit('setMemberSince', member_since);
        router.push('/').catch(()=>{});
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
            commit('setMemberSince', response.data.member_since[0].member_since);
            localStorage.setItem('jwtToken', response.data.jwtToken);
            localStorage.setItem('name', response.data.user.rows[0].name);
            localStorage.setItem('member_since', response.data.member_since[0].member_since);

            // dispatch('setTimeoutTimer', +response.data.expiresIn)
          })
          .catch((e) => console.log(e));
    },
    logout({ commit }) {
      commit('clearToken','clearName','clearMemberSince');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('name');
      localStorage.removeItem('member_since');
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
