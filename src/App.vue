<template>
  <v-app style="backgroundColor: #e6dfe6;">
    <v-snackbar v-model='snackbar' :timeout='4000' top color='success'>
      <span>Congratulations! You were signuped in our system.</span>
      <v-btn flat color="blue" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-app-bar
      color = "#f2dcfa"
      elevation="1"
      app
    >
    <hsc-menu-style-white>
      <hsc-menu-button-menu style="margin: 5px;"  :menuZIndex="3" >
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            :src="require('./static/icons/EasyMenu-60x41.png?1')"
            transition="scale-transition"
            width="40"
            
          />
        <template slot="contextmenu" v-if='!disableAll'>
            <hsc-menu-item class="mt-3">
              <div slot="body">
                <v-icon left class="mb-1">mdi-clipboard-text</v-icon>
                <span>Sum</span>       
              </div>
            </hsc-menu-item>
            <hsc-menu-item class="mt-3">
              <div slot="body">
                <v-icon left class="mb-1">mdi-account-badge-horizontal</v-icon>
                <span>Account</span>       
              </div>
                <hsc-menu-item label="Information" />
                <hsc-menu-item label="Password" />
            </hsc-menu-item>
            <hsc-menu-item class="mt-3 mb-2">
              <div slot="body"  @click="Logout">
                <v-icon left class="mb-1">mdi-location-exit</v-icon>
                <span>Exit</span>       
              </div>
            </hsc-menu-item>
        </template>
        </hsc-menu-button-menu>
      </hsc-menu-style-white>

    <hsc-menu-style-white>
      <hsc-menu-button-menu style="margin: 5px;"  :menuZIndex="3" >
        <div><v-btn class="ma-1" tile x-large min-width="150px" color="#cdacf9" :disabled='disableAll'>
          Settings<v-icon right dark>mdi-pencil</v-icon> 
        </v-btn></div>

        <template slot="contextmenu" v-if='!disableAll'>
            <hsc-menu-item class="mt-3">
              <div slot="body">
                <v-icon left class="mb-1">mdi-format-list-text</v-icon>
                <span>Menu</span>       
              </div>
                <hsc-menu-item label="Items" class="py-2"/>
                <hsc-menu-item label="Modifier" class="py-2"/>
                <hsc-menu-item label="Tax" class="py-2"/>
            </hsc-menu-item>
            <hsc-menu-item class="mt-3">
              <div slot="body">
                <v-icon left class="mb-1">mdi-account-box-multiple</v-icon>
                <span>Member</span>       
              </div>
            </hsc-menu-item>
            <hsc-menu-item class="mt-3 mb-2">
              <div slot="body"  @click="Logout">
                <v-icon left class="mb-1">mdi-location-exit</v-icon>
                <span>Hardware</span>       
              </div>
            </hsc-menu-item>
        </template>
        </hsc-menu-button-menu>
      </hsc-menu-style-white>

      <v-spacer></v-spacer>

      <p class="ma-1">{{ShowUserName()}}</p>
      <v-btn class="ma-1" tile x-large min-width="150px" color="#cdacf9" :disabled='disableAll'>
        Phone   <v-icon right dark>mdi-phone-log</v-icon>
      </v-btn>
      <v-btn class="ma-1" id="table" tile x-large min-width="150px" color="#cdacf9" :disabled='disableAll'>
        Table<v-icon right dark>mdi-table-chair</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import firebase from 'firebase'
import {mapMutations} from 'vuex';
import router from './router'
import { serverBus } from './main';
export default {
  name: 'App',

  components: {
   },

  data: () => ({
       disableAll: true,
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

    Logout(){
      this.$store.state.userName = '';
      localStorage.removeItem('phone');
      this.disableAll = true;
      router.push('/login');
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
    this.disableAll = !this.$store.getters.isLoggedIn;
  },
  created(){
    serverBus.$on('EnableMenu', enable => {
      this.disableAll = !enable;
    })
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

