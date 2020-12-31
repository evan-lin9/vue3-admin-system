import { createStore } from "vuex";
import { login, getUserInfo } from "@/api";

export default createStore({
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    login({ commit, dispatch }, payload) {
      login(payload).then(res => {
        const { token } = res
        // save token & get user info
        commit('SET_TOKEN', token)
        dispatch('fetchUserInfoByToken', token)
      })
    },
    fetchUserInfoByToken({ commit }, token) {
      getUserInfo(token).then(res => {
        const { userInfo } = res
        commit('SET_USER', userInfo)
      })
    }
  },
  modules: {}
});
