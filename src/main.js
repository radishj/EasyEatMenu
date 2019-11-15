import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
import firebase from 'firebase'
 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyDVq1dElMlfBzorw72Cw8MlcphwL6QI73M",
  authDomain: "easyeatmenu.firebaseapp.com",
  databaseURL: "https://easyeatmenu.firebaseio.com",
  projectId: "easyeatmenu",
  storageBucket: "easyeatmenu.appspot.com",
  messagingSenderId: "597879606216",
  appId: "1:597879606216:web:b222bce5a73c899f4a4efd",
  measurementId: "G-XHDBVQSMRC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')