<template>
    <div>
        <v-dialog max-width="600px" v-model="$store.state.loginDlg.open" @input="methodToExecuteWhenClosed">
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
                        <v-card class="d-flex justify-center text" flat
                            tile>
                            <v-btn text class="mt-3 mr-6 red--text white text" style="text-transform:none !important;" @click="RecoverPass">Forgot password?</v-btn>
                            <v-btn text class="success mt-3 text" @click="Login">LOGIN</v-btn>
                        </v-card>
                    </v-form>
                    <div @logindlg="dialog=true"></div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import { serverBus } from '../main';
export default {
   data: () => ({
    dialog: false,
    phone: '',
    showPass: false,
    password: '',
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
        
    },
    methods:{
        async Login(){
            var user = await this.$store.state.db.get(this.phone).catch(function(){
                alert('Unknow phone number! Login failed.');
                return false;
            });
            if(!user)
                return false;
            var passwordHash = require('password-hash');
            if(user && (passwordHash.verify(this.password, user.password)))
            {
                this.$store.state.user = user;
                console.log('user:'+user);
                if(user.login_name && user.login_name != '')
                    this.$store.state.userName = user.login_name;
                else if(user.first_name && user.first_name != '')
                    this.$store.state.userName = user.first_name;
                else
                    this.$store.state.userName = '';
                this.$emit('userAdded');
            }
            else{
                alert('Phone number and password are not matching! Login failed.');
                return false;
            }
            this.password = '';
            this.$store.state.loginDlg.open = false; 
        },
        methodToExecuteWhenClosed(){
            this.password = '';
        },
        async RecoverPass(){
            var user = await this.$store.state.db.get(this.phone).catch(function(){
                alert('Unknow phone number for us.  Please check the number or Signup new');
                return false;
            });
            if(!user)
                return false;
            this.$store.state.loginDlg.open = false; //alert(user._id);
            serverBus.$emit('RecoverPass', this.phone);
        }
    }
 }
</script>
