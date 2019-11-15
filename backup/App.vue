<template>
  <v-app>
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
          <v-btn tile v-on:click.stop="$store.state.loginDlg.open = true" class="success">{{this.$store.state.user.name}}</v-btn>
          <v-btn id="SignUp" tile v-on:click.stop="$store.state.signupDlg.open = true" class="success">SignUp</v-btn></v-card>
        <Login />
        <Signup />
      </v-flex>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import Login from './components/Login'
import Signup from './components/Signup'
export default {
  name: 'App',

  components: {
    Login,
    Signup
   },

  data: () => ({
 
  }),
  methods:{
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
    }
  },
  mounted(){
    this.initReCaptcha()
  } 
};
</script>
