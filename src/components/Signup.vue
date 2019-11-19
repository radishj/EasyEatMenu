<template>
   <div>
         <v-dialog max-width="600px" v-model="$store.state.signupDlg.open">
            
            <v-card>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3">
                        <v-text-field v-model="phone"
                            prepend-icon="mdi-phone-in-talk"
                            :rules="[rules.required, rules.phone]"
                            label="Phone: 123-456-7890"></v-text-field>
                        <div id="recaptcha-container" v-if="showUserID">User ID:{{UID}}</div>
  
                        <v-text-field v-if="showPhoneAuth" v-model="phoneAuth"
                            prepend-icon="mdi-numeric"
                            :rules="[rules.required, rules.min6]"
                            label="Auth Code: 123456"></v-text-field>
                        <v-btn id="SignInSubmit"  v-if="showSignInSubmitBtn" class="success mx-0 mt-3 text" @click="onSignInSubmit">Get Auth Number</v-btn> 
                        <v-btn id="get-auth-btn" v-if="showPhoneAuthBtn" class="success mx-0 mt-3 text" @click="onVerifyCode">Code Verify</v-btn> 
                        <v-text-field  v-if="showOthers" label="Password" v-model="password" 
                            prepend-icon="mdi-lock-question"
                            :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            :rules="[rules.required, rules.min6]"></v-text-field>
                        <v-text-field label="Password Again" v-if="showOthers" v-model="passwordCopy" 
                            prepend-icon="mdi-lock-question"
                            :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="[rules.required, rules.min6, passwordConfirmationRule]"></v-text-field>
                        <v-text-field  v-if="showOthers" label="E-Mail" v-model="email" 
                            prepend-icon="mdi-email-outline"
                            :rules="[rules.required, rules.email]"></v-text-field>
                        <v-text-field  v-if="showOthers" label="FirstName" v-model="firstName"></v-text-field>
                        <v-text-field  v-if="showOthers" label="LastName" v-model="lastName"></v-text-field>
                        <v-text-field  v-if="showOthers" label="Gender" v-model="gender"></v-text-field>
                        <v-text-field  v-if="showOthers" label="Address" v-model="address"></v-text-field>
                        <v-text-field  v-if="showOthers" label="City" v-model="city"></v-text-field>
                        <v-text-field  v-if="showOthers" label="Post Code" v-model="postcode"></v-text-field>
                        <v-card v-if="showOthers" class="d-flex justify-center text" flat
                            tile>
                            <v-btn id="signup-btn" class="success mx-0 mt-3 text" @click="Signup">SIGN UP</v-btn> 
                        </v-card>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
   data: () => ({
    dialog: false,
    showSignInSubmitBtn: true,
    showPhoneAuthBtn: false,
    phoneAuth: '',
    showPhoneAuth: false,

    phone: '',
    showUserID: false,
    UID: '',
    showOthers: false,
    password: '',
    passwordCopy: '',
    showPassword: false,
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    city: '',
    postcode: '',
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

            this.phone = '';
            this.showUserID = false;
            this.UID = '';
            this.showOthers = false;
            this.password = '';
            this.passwordCopy = '';
            this.showPassword = false;
            this.email = '';
            this.firstName = '';
            this.lastName = '';
            this.gender = '';
            this.address = '';
            this.city = '';
            this.postcode = '';
        },
        onVerifyCode(){
            let vm = this;
            window.confirmationResult.confirm(this.phoneAuth).then(function (result) {
            // User signed in successfully.
            vm.showPhoneAuth = false;
            vm.showSignInSubmitBtn = false;
            vm.showPhoneAuthBtn = false;
            vm.showOthers = true;
            vm.user = result.user;
            vm.UID = vm.user.uid;
            vm.showUserID = true;
            //console.log(vm.user);
            //vm.showPhoneAuthBtn = false;
            //vm.showPassword = true;
            // ...
            }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
                alert('Phone code verify failed! '+ error);
            });
        },
        async onSignInSubmit(){
            //var phoneNumber = this.phone;
            var appVerifier = window.recaptchaVerifier;
            let vm = this;
            await firebase.auth().signInWithPhoneNumber('+1'+vm.phone, appVerifier)
                .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                vm.showPhoneAuth = true;
                vm.showSignInSubmitBtn = false;
                vm.showPhoneAuthBtn = true;
                window.confirmationResult = confirmationResult;
                }).catch(function (error) {
                // Error; SMS not sent
                // ...
                    alert('Recaptcha verify failed! SMS not sent. '+ error);
                });
        },
        async Signup(){
            var userData = {};
            userData._id = this.phone;
            userData.UID = this.UID;
            userData.password = this.password;
            if(this.email!='')
            {
                userData.email = this.email;
            }
            if(this.firstName!='')
            {
                userData.first_name = this.firstName;
            }
            if(this.email!='')
            {
                userData.last_name = this.lastName;
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
            
            this.$store.state.db.put(userData);
            this.$store.state.user.firstName = this.firstName;
            await this.resetData();
            this.$store.state.signupDlg.open = false; 
            this.$emit('userAdded');
        }
    }
 
}
</script>