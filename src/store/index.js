import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb';
//import { exists } from 'fs';
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: {},
    remoteDb: {},
    fromPage: '',
    userName: '',
    phone: localStorage.getItem('phone'),
    user:{},
    recoverPass: false,
    enableNav: true
  },
  getters : {
    isLoggedIn(){
      let phone = localStorage.getItem('phone');
      return phone!=null && (typeof phone !== 'undefined') && (typeof phone != "object") && phone!='';
    },
    authStatus: state => state.status,
  },
  mutations: {
    initData(state, isLoggedIn){
      state.remoteDbUsers = new PouchDB('http://mediavictoria.com:5984/users');
        state.dbUsers = new PouchDB('users');
        state.dbUsers.sync(this.state.remoteDbUsers, {live: true, retry: true});
      //alert(isLoggedIn);
      if(!isLoggedIn)
      {
        return;
      }
      var phone = localStorage.getItem('phone');
      var vm = this;
      state.dbUsers.get(phone).then(res => {
        var user = res;
        state.user = user;
        //console.log('user:'+user);
        if(user.login_name && user.login_name != '')
          state.userName = user.login_name;
        else if(user.first_name && user.first_name != '')
          state.userName = user.first_name;
      }).catch(err => {
        vm.state.status = 'error';
        localStorage.removeItem('phone');
        console.log(err);
      })
      /*var user = {
        "_id": "123",
        "data": "test"
      };
      this.state.dbUsers.put(user);*/
      state.dbUsers.info().then(function (info) {
        console.log(info);
      })
      /*axios.get('http://mediavictoria.com:3000/fresh/productTypes').then(
          result => {
              //alert(result.data) 
              state.categories = result.data;
          },
          error => {
              alert(error)
          }
      )*/
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, user){
      state.status = 'success'
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.user = {}
    },
  },
  actions: {
    async initData({commit, getters}){
      await commit('initData', getters.isLoggedIn);
    },
    async login({commit}, data){
      return new Promise(async(resolve, reject) => {
        commit('auth_request');
        var vm = this;
      await vm.state.dbUsers.get(data.phone)
        .then(res => {
          var user = res;
          var passwordHash = require('password-hash');
          if(user && (passwordHash.verify(data.password, user.password)))
          {
            vm.state.user = user;
            //console.log('user:'+user);
            if(user.login_name && user.login_name != '')
              vm.state.userName = user.login_name;
            else if(user.first_name && user.first_name != '')
              vm.state.userName = user.first_name;
            localStorage.setItem('phone', data.phone)
            vm.state.enableNav = true;
            commit('auth_success', user)
          }
          else{
            alert('Phone number and password are not matching! Login failed.');
            commit('auth_error')
            localStorage.removeItem('phone')
          }
          resolve(res);
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('phone')
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
