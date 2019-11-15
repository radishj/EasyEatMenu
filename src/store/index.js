import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      name: 'Login'
    },
    loginDlg:{
      open: false
    },
    signupDlg:{
      open: false
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
