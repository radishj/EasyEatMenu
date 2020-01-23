<template>
  <v-app style="backgroundColor: #e6dfe6;">
    <v-snackbar v-model='snackbar' :timeout='4000' top color='success'>
      <span>Congratulations! You were signuped in our system.</span>
      <v-btn flat color="blue" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <Navbar />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase'
import {mapMutations} from 'vuex';
import Navbar from '@/components/Navbar'
export default {
  name: 'App',

  components: {
    Navbar
   },

  data: () => ({
       snackbar: false,
   }),
  methods:{
    ...mapMutations(['initData']),
    ShowUserName(){
      if(typeof this.$store.state.userName != 'undefined')
      {
        return this.$store.state.userName;
      }
      //console.log(this.$store.state);
    },
    initReCaptcha(){
      console.log('start......');
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('table', {
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


    open() {
        console.log('open')
    },
    close() {
        console.log('close')
    }
  },
  async mounted(){
    this.initReCaptcha();
    this.$store.dispatch('initData');
    this.$store.state.enableNav = this.$store.getters.isLoggedIn;
  },
  created(){
  }
};

</script>

<style>
.menu {
  box-shadow: 0 0 8pt rgba(0, 0, 0, 0.25);
  border-radius: 20pt;
  background-color:#791079;
  user-select: none;
  cursor: context-menu;
}
</style>

