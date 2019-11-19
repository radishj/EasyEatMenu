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
    user:{
      name: 'Login',
      firstName: ''
    },
    loginDlg:{
      open: false
    },
    signupDlg:{
      open: false
    }
  },
  mutations: {
    async initData(){
      this.state.remoteDb = new PouchDB('http://mediavictoria.com:5984/users');
      this.state.db = new PouchDB('users');
      this.state.db.sync(this.state.remoteDb, {
        live: true,
        retry: true
      });
      /*var user = {
        "_id": "123",
        "data": "test"
      };
      this.state.db.put(user);*/
      this.state.db.info().then(function (info) {
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
    }
  },
  actions: {
  },
  modules: {
  }
})
