<template>
   <div>
       <div id="recaptcha-container"></div>
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
                        <v-text-field v-if="showPhoneAuth" v-model="phoneAuth"
                            prepend-icon="mdi-numeric"
                            :rules="[rules.required, rules.min6]"
                            label="Auth Code: 123456"></v-text-field>
                        <v-btn id="get-auth-btn" v-if="showPhoneAuthBtn" class="success mx-0 mt-3 text" @click="onVerifyCode">Get Auth Number</v-btn> 
                        <v-text-field  v-if="showPassword" label="Password" v-model="password" 
                            prepend-icon="mdi-lock-question"
                            :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            :rules="[rules.required, rules.min6]"></v-text-field>
                        <v-text-field label="Password Again" v-if="showPassword" v-model="passwordCopy" 
                            prepend-icon="mdi-lock-question"
                            :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            :rules="[rules.required, rules.min6, passwordConfirmationRule]"></v-text-field>
                        <v-card v-if="showPassword" class="d-flex justify-center text" flat
                            tile>
                            <v-btn id="signup-btn" class="success mx-0 mt-3 text" >SIGN UP</v-btn> 
                        </v-card>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
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


export default {
   data: () => ({
    dialog: false,
    showPhoneAuthBtn: true,
    phoneAuth: '',
    showPhoneAuth: false,

    phone: '',
    showPassword: false,
    password: '',
    passwordCopy: '',
    rules: {
            required: value => !!value || 'Input required',
            min6: value => value.length >= 6 || 'Min 6 letters',
            phone: value => {
                const pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/
                return pattern.test(value) || 'Wrong phone number format'
            }
        },

    user:{}
  }),
  computed:{
     passwordConfirmationRule() {
      return () => (this.password === this.passwordCopy) || 'Password must match'
    },     
   },
  methods:{
      submit(){
          console.log(this.phone, this.password)
      },
      DlgUp(){
          this.dialog = true;
      },
      onVerifyCode(){
        window.confirmationResult.confirm(this.phoneAuth).then(function (result) {
        // User signed in successfully.
        this.user = result.user;
        this.showPhoneAuthBtn = false;
        this.showPass = true;
        // ...
        }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
            alert('Phone code verify failed! '+ error);
        });
      },
      onSignInSubmit(){
        var phoneNumber = this.phone;
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            this.phoneAuth = true;
            window.confirmationResult = confirmationResult;
            }).catch(function (error) {
            // Error; SMS not sent
            // ...
                alert('Recaptcha verify failed! SMS not sent. '+ error);
            });
      }
  },
  mounted(){
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('get-auth-btn', {
        'size': 'invisible',
        'callback': function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log(response);
            alert('good');
            this.onSignInSubmit();
        }
    })
  }
}
</script>










<template>
    <div>
        <v-dialog max-width="600px" v-model="$store.state.loginDlg.open">
            <v-card>
                <v-card-title>
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3">
                        <v-text-field v-model="phone"
                            prepend-icon="mdi-phone-in-talk"
                            :rules="[rules.required, rules.phone]"
                            label="Phone: 123-456-7890"></v-text-field>
                        <v-text-field label="Password" v-model="password" 
                            prepend-icon="mdi-lock-question"
                            :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                            :type="showPass ? 'text' : 'password'"
                            @click:append="showPass = !showPass"
                            :rules="[rules.required]"></v-text-field>
                        <v-card class="d-flex justify-center" text
                            tile>
                            <v-btn text class="success mx-0 mt-3" @click="submit">LOGIN</v-btn>
                        </v-card>
                    </v-form>
                    <div @logindlg="dialog=true"></div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
   data: () => ({
    dialog: false,
    phone: '',
    showPass: false,
    rules: {
            required: value => !!value || 'Input required',
            counter: value => value.length <= 10 || 'Max 10 letters',
            phone: value => {
                const pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/
                return pattern.test(value) || 'Wrong phone number format'
            }
        },
    password: ''
  }),
  methods:{
      submit(){
          console.log(this.phone, this.password)
      }
  }
};
</script>