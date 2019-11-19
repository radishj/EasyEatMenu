<template>
  <v-app>
    <v-snackbar v-model='snackbar' :timeout='4000' top color='success'>
      <span>Congratulations! You were signuped in our system.</span>
      <v-btn flat color="blue" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
   <v-app-bar
      app
      color="grey"
      elevation=0
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
     
      <v-flex class="mt-4 mb-3">
        <v-card class="d-flex justify-end"
          color="grey"
          flat
          tile>
          <p class = "mr-3 mt-2">{{this.$store.state.user.firstName}}</p>
          <v-btn tile v-on:click.stop="$store.state.loginDlg.open = true" class="success">{{this.logBtnTxt}}</v-btn>
          <v-btn id="SignUp" tile v-on:click.stop="$store.state.signupDlg.open = true" class="success">SignUp</v-btn></v-card>
        <Login  @userAdded="Login"/>
        <Signup @userAdded="Signup"/>
      </v-flex>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase'
import Login from './components/Login'
import Signup from './components/Signup'
import {mapMutations} from 'vuex';
export default {
  name: 'App',

  components: {
    Login,
    Signup
   },

  data: () => ({
       snackbar: false,
       logBtnTxt: 'LOGIN'
  }),
  methods:{
    ...mapMutations(['initData']),
    initReCaptcha(){
      console.log('start......');
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('SignUp', {
          'size': 'invisible',
          'callback': function(response) {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log('success:'+response);
          },
          'expired-callback': function() {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          }
      });
    },
    Login(){
      this.logBtnTxt = 'LOGOUT';
    },
    Signup(){
      this.logBtnTxt = 'LOGOUT';
      this.snackbar = true;
    }
  },
  async mounted(){
    this.initReCaptcha();
    await this.initData();
  } 
};
</script>

