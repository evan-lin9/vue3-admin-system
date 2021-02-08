import { createStore, createLogger } from "vuex";
import { login, getUserInfo } from "@/api";

export default createStore({
  state: {
    token: sessionStorage.getItem('token') || '',
    userInfo: {},
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    SET_USER: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    login({ commit, dispatch }, payload) {
      return login(payload).then(res => {
        const { token } = res
        // save token & get user info
        commit('SET_TOKEN', token)
        dispatch('fetchUserInfoByToken', token)
      })
    },
    fetchUserInfoByToken({ commit }, token) {
     return getUserInfo(token).then(res => {
        const { userInfo } = res
        commit('SET_USER', userInfo)
      })
    }
  },
  modules: {},
  plugins: [createLogger()]
});
