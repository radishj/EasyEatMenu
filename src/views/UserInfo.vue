<template>
    <v-card  max-width="500px" class="mx-auto mt-12" color = "#f2dcfa">
        <v-card-title>
            User Information
        </v-card-title>
        <v-card-text>
            <v-form class="px-3">
                <v-text-field v-model="$store.state.phone"
                    prepend-icon="mdi-phone-in-talk"></v-text-field>
                <v-text-field label="loginName" v-model="login_name"></v-text-field>
                <v-text-field label="E-Mail" v-model="email" 
                    prepend-icon="mdi-email-outline"></v-text-field>
                <v-text-field label="FirstName" v-model="first_name"></v-text-field>
                <v-text-field label="LastName" v-model="last_name"></v-text-field>
                <v-text-field label="Gender" v-model="gender"></v-text-field>
                <v-text-field label="Address" v-model="address"></v-text-field>
                <v-text-field label="City" v-model="city"></v-text-field>
                <v-text-field label="Post Code" v-model="postcode"></v-text-field>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
/*eslint no-console: [0, { allow: ["warn", "error"] }] */
export default {
    data: () => ({
    dialog: false,
    showUserID: false,
    UID: '',
    showPass: false,
    showOthers: false,
    login_name: '',
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    address: '',
    city: '',
    postcode: '',
    loading: false
  }),
  methods:{
    async resetData(){
        this.showSignInSubmitBtn = true;
        this.showPhoneAuthBtn = false;
        this.phoneAuth = '';
        this.showPhoneAuth = false;

        this.$store.state.phone = '';
        this.showUserID = false;
        this.UID = '';
        this.showPass = false;
        this.showOthers = false;
        this.password = '';
        this.passwordCopy = '';
        this.showPassword = false;
        this.email = '';
        this.first_name = '';
        this.last_name = '';
        this.gender = '';
        this.address = '';
        this.city = '';
        this.postcode = '';
    },
    async GetData(){
        this.loading = true;
        let vm = this;
        this.$store.state.dbUsers.get(vm.$store.state.phone, function(err, data){
            if(err)
            {
                console.log(err);
                return;
            }
            vm.login_name = data.login_name;
            vm.email = data.email;
            vm.first_name = data.first_name;
            vm.last_name = data.last_name;
            vm.gender = data.gender;
            vm.address = data.address;
            vm.city = data.city;
            vm.postcode = data.postcode;
        });
    }
  },
  async mounted(){
      this.GetData()
  },
}
</script>