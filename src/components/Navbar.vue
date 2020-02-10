<template>
  <nav>
    <v-app-bar
      color = "#f2dcfa"
      elevation="1"
    >
    <v-toolbar-side-icon @click="drawer = !drawer" v-if='this.$store.state.enableNav'>
      <img class="pt-2" width="40" height="60"
        :src="require('../static/icons/EasyMenu-60x41.png?1')"
        alt="Menu"
        transition="scale-transition"
      >
    </v-toolbar-side-icon>

      <v-spacer></v-spacer>

      <p class="ma-1">{{ShowUserName()}}</p>
      <v-btn class="ma-1" tile x-large min-width="150px" color="#cdacf9" :disabled='!this.$store.state.enableNav'>
        Phone   <v-icon right dark>mdi-phone-log</v-icon>
      </v-btn>
      <v-btn class="ma-1" id="table" tile x-large min-width="150px" color="#cdacf9" @click="Go('table')" :disabled='!this.$store.state.enableNav'>
        Table<v-icon right dark>mdi-table-chair</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary color="#f2dcfa">
      <v-list multiple="true">
        <v-list-item>
          <v-list-item-icon>
            <v-icon left class="grey--text text--darken-2">mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--darken-2">Sum</v-list-item-title>
        </v-list-item>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon left class="grey--text text--darken-2">mdi-account-badge-horizontal</v-icon>
            </v-list-item-icon>
            <v-list-item-title  class="grey--text text--darken-2">Account</v-list-item-title>
          </template>
          <v-list-item
            class="ml-4"
            v-for="(acc, i) in account"
            :key="i"
            @click="Go(acc[2])"
          >
            <v-list-item-icon>
              <v-icon left class="grey--text text--darken-2" v-text="acc[1]"></v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 grey--text text--darken-2" v-text="acc[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group
          value="true">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon left class="grey--text text--darken-2">mdi-database-import</v-icon>
            </v-list-item-icon>
            <v-list-item-title  class="grey--text text--darken-2">Contents</v-list-item-title>
          </template>
          <v-list-item
            class="ml-4"
            v-for="(content, i) in contents"
            :key="i"
            @click="Go(content[2])"
          >
            <v-list-item-icon>
              <v-icon left class="grey--text text--darken-2" v-text="content[1]"></v-icon>
            </v-list-item-icon>
            <v-list-item-title class="ml-4 grey--text text--darken-2" v-text="content[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item>
          <v-list-item-icon>
            <v-icon left class="grey--text text--darken-2">mdi-account-box-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--darken-2">Member</v-list-item-title>
        </v-list-item>

        <v-list-item @click="Logout">
          <v-list-item-icon>
            <v-icon left class="grey--text text--darken-2">mdi-location-exit</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="grey--text text--darken-2">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
/* eslint-disable no-console */
import router from '../router'
// Light theme

export default {
  name: 'Navbar',
  components: {
 
  },
  data: () => ({
    drawer: false,
    account: [
        ['Information', 'mdi-account-badge-horizontal-outline', 'ShowInfo'],
        ['Password', 'mdi-lock-reset', '']
      ],
    contents: [
        ['Items', 'mdi-sitemap', '/Items'],
        ['Tables', 'mdi-table-chair', '/Table'],
        ['Modifier', 'mdi-arrow-decision-outline', ''],
        ['Tax', 'mdi-alpha-t-box-outline', ''],
        ['Hardware', 'mdi-printer-settings', '']
      ],
  }),

  methods:{
    ShowUserName(){
      if(typeof this.$store.state.userName != 'undefined')
      {
        return this.$store.state.userName;
      }
      //console.log(this.$store.state);
    },
    Logout(){
      this.$store.state.userName = '';
      localStorage.removeItem('phone');
      this.$store.state.enableNav = false;
      router.push('/login');
    },
    ShowInfo(){
      router.push('/UserInfo');
    },
    Go(page){
      router.push(page);
    }
  }

};
</script>

<style scoped>

</style>
