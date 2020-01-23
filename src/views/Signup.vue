<template>
    <v-card  max-width="500px" class="mx-auto mt-12" color = "#f2dcfa">
        <v-card-title>
            Sign Up
        </v-card-title>
        <v-card-text>
            <v-form class="px-3">
                <v-text-field v-model="$store.state.phone"
                    prepend-icon="mdi-phone-in-talk"
                    :rules="[rules.required, rules.phone]"
                    label="Phone: 123-456-7890"></v-text-field>
                
                <v-text-field v-if="showPhoneAuth" v-model="phoneAuth"
                    prepend-icon="mdi-numeric"
                    :rules="[rules.required, rules.min6]"
                    label="Auth Code: 123456"></v-text-field>
                <v-card class="d-flex justify-center text" color = "#f2dcfa" flat
                    tile>
                    <v-btn id="SignInSubmit"  
                        v-if="showSignInSubmitBtn" 
                        class="success mx-0 mt-3 text" 
                        :loading="loading"
                        :disabled="loading"
                        @click="onGetAuthNumber">
                        Get Auth Number
                    </v-btn> 
                    <v-btn id="get-auth-btn" 
                        v-if="showPhoneAuthBtn" 
                        class="success mx-0 mt-3 text" 
                        :loading="loading"
                        :disabled="loading"
                        @click="onVerifyCode">
                        Code Verify
                    </v-btn> 
                </v-card>
                <v-text-field  v-if="showOthers" label="loginName" v-model="login_name"></v-text-field>
                <v-text-field  v-if="showPassword" label="Password" v-model="password" 
                    prepend-icon="mdi-lock-question"
                    :append-icon="showPasswordTxt ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    :type="showPasswordTxt ? 'text' : 'password'"
                    @click:append="showPasswordTxt = !showPasswordTxt"
                    :rules="[rules.required, rules.min6]"></v-text-field>
                <v-text-field label="Password Again" v-if="showPassword" v-model="passwordCopy" 
                    prepend-icon="mdi-lock-question"
                    :append-icon="showPasswordTxt ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                    :type="showPasswordTxt ? 'text' : 'password'"
                    :rules="[rules.required, rules.min6, passwordConfirmationRule]"></v-text-field>
                <v-text-field  v-if="showOthers" label="E-Mail" v-model="email" 
                    prepend-icon="mdi-email-outline"
                    :rules="[rules.required, rules.email]"></v-text-field>
                <v-text-field  v-if="showOthers" label="FirstName" v-model="first_name"></v-text-field>
                <v-text-field  v-if="showOthers" label="LastName" v-model="last_name"></v-text-field>
                <v-text-field  v-if="showOthers" label="Gender" v-model="gender"></v-text-field>
                <v-text-field  v-if="showOthers" label="Address" v-model="address"></v-text-field>
                <v-text-field  v-if="showOthers" label="City" v-model="city"></v-text-field>
                <v-text-field  v-if="showOthers" label="Post Code" v-model="postcode"></v-text-field>
                <v-card v-if="showOthers||showPassword" class="d-flex justify-center text" color="#f2dcfa" flat
                    tile>
                    <v-btn id="signup-btn" 
                        class="success mx-0 mt-3 text" 
                        :loading="loading"
                        :disabled="loading"
                        @click="Signup">
                        SIGN UP
                   </v-btn> 
                </v-card>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
/*eslint no-console: [0, { allow: ["warn", "error"] }] */
import firebase from 'firebase'
import router from '../router'
export default {
    data: () => ({
    dialog: false,
    showSignInSubmitBtn: true,
    showPhoneAuthBtn: false,
    phoneAuth: '',
    showPhoneAuth: false,
    
    showUserID: false,
    UID: '',
    showPass: false,
    showOthers: false,
    login_name: '',
    password: '',
    passwordCopy: '',
    showPassword: false,
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    address: '',
    city: '',
    postcode: '',
    loading: false,
    rules: {
            required: value => !!value || 'Input required',
            min6: value => value.length >= 6 || 'Min 6 letters',
            phone: value => {
                const pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/
                return pattern.test(value) || 'Wrong phone number format'
            },
            email: value => {
                const pattern =  /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
                return pattern.test(value) || 'Wrong E-Mail format'
            }
        },
  }),
  computed:{
     passwordConfirmationRule() {
      return () => (this.password === this.passwordCopy) || 'Password must match'
    },     
   },
  methods:{
        submit(){
            //console.log(this.phone, this.password)
        },
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
        onVerifyCode(){
            this.loading = true;
            let vm = this;
            window.confirmationResult.confirm(this.phoneAuth).then(function (result) {
            // User signed in successfully.
                vm.showPhoneAuth = false;
                vm.showSignInSubmitBtn = false;
                vm.showPhoneAuthBtn = false;
                if(!vm.$store.state.recoverPass)
                    vm.showOthers = true;
                vm.showPassword = true;
                vm.user = result.user;
                vm.UID = vm.user.uid;
                vm.showPass = true;
                vm.loading = false;
                //console.log(vm.user);
                //vm.showPhoneAuthBtn = false;
                //vm.showPassword = true;
                // ...
            }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
                alert('Phone code verify failed! '+ error);
                vm.loading = false;
            });
        },
        async onGetAuthNumber(){
            this.loading = true;
            //var phoneNumber = this.phone;
            var appVerifier = window.recaptchaVerifier;
            let vm = this;
            await firebase.auth().signInWithPhoneNumber('+1'+vm.$store.state.phone, appVerifier)
                .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                vm.showPhoneAuth = true;
                vm.showSignInSubmitBtn = false;
                vm.showPhoneAuthBtn = true;
                window.confirmationResult = confirmationResult;
                    vm.loading = false;
                }).catch(function (error) {
                // Error; SMS not sent
                // ...
                    alert('Recaptcha verify failed! SMS not sent. '+ error);
                    vm.loading = false;
                });
        },
        async Signup(){
            this.loading = true;
            if(this.$store.state.recoverPass)
            {
                let vm = this;
                this.$store.state.dbUsers.get(vm.$store.state.phone, function(err, retrieved){
                    var passwordHash = require('password-hash');
                    var hashedPassword = passwordHash.generate(vm.password);
                    var data = retrieved;
                    data.password = hashedPassword;
                    vm.$store.state.dbUsers.put(data, function(err, ){
                        if(err){  
                            console.log("COULDN'T CHANGE password");
                        } else {  
                            console.log("password updated");
                        }
                    });
                });
                vm.$store.state.recoverPass = false;
                vm.loading = false;
                router.push('/');
                return false;
            }
 
            var userData = {};
            userData._id = this.$store.state.phone;
            userData.UID = this.UID;
            var passwordHash = require('password-hash');
            var hashedPassword = passwordHash.generate(this.password);
            userData.password = hashedPassword;
            if(this.email!='')
            {
                userData.email = this.email;
            }
            if(this.login_name!='')
            {
                userData.login_name = this.login_name;
            }
            if(this.first_name!='')
            {
                userData.first_name = this.first_name;
            }
            if(this.email!='')
            {
                userData.last_name = this.last_name;
            }
            if(this.gender!='')
            {
                userData.gender = this.gender;
            }
            if(this.address!='')
            {
                userData.address = this.address;
            }
            if(this.city!='')
            {
                userData.city = this.city;
            }
            if(this.postCode!='')
            {
                userData.post_code = this.postCode;
            }
            
            this.$store.state.dbUsers.put(userData);
            this.$store.state.user = userData;
            await this.resetData();
            if(this.$store.state.user.login_name!=null && this.$store.state.user.login_name!='')
                this.$store.state.userName = this.$store.state.user.login_name;
            else if(this.$store.state.user.first_name!=null && this.$store.state.user.first_name!='')
                this.$store.state.userName = this.$store.state.user.first_name;
            localStorage.setItem('phone', userData._id);
            this.loading = false;
            this.$store.state.enableNav = true;
            router.push('/');
        }
    }
 
}
</script>