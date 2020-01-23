<template>
        <v-card class="d-flex justify-center text" color="grey lighten-4" flat
                        tile>
                <v-form class="pt-6">
                    <v-text-field v-model="$store.state.phone"
                        prepend-icon="mdi-phone-in-talk"
                        :rules="[rules.required, rules.phone]"
                        label="Phone: 123-456-7890"></v-text-field>
                    <v-text-field label="Password" v-model="password" 
                        prepend-icon="mdi-lock-question"
                        :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                        :type="showPass ? 'text' : 'password'"
                        @click:append="showPass = !showPass"
                        :rules="[rules.required]"></v-text-field>
                    <v-card class="d-flex justify-center text" color="grey lighten-4" flat
                        tile>
                        <v-btn text class="mt-3 mr-1 red--text text" style="text-transform:none !important;" @click="RecoverPass">Forgot password?</v-btn>
                        <v-btn class="mt-3" tile color="#cdacf9"  @click="Login">
                            LOGIN <v-icon right dark>mdi-login</v-icon>
                        </v-btn>
                    </v-card>
                    <v-card class="d-flex justify-center text" color="grey lighten-4" flat
                        tile>
                        <v-btn class="mt-3 mb-10" tile color="#cdacf9"  @click="Signup">
                            NEW USER SIGNUP   <v-icon right dark>mdi-clipboard-account</v-icon>
                        </v-btn>
                    </v-card>
                </v-form>
                <div @logindlg="dialog=true"></div>
        </v-card>
 </template>


<script>
/*eslint no-console: [0, { allow: ["warn", "error"] }] */
import router from '../router'
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
            let phone = this.$store.state.phone 
            let password = this.password
            let vm = this;
            await vm.$store.dispatch('login', { phone, password })
            .then(() => {
                if((typeof vm.$store.state.fromPage == 'undefined') || vm.$store.state.fromPage == '' || vm.$store.state.fromPage == '/login')
                   vm.$store.state.fromPage = '/';
                if(vm.$store.state.fromPage && vm.$store.state.fromPage!='')
                    router.push(vm.$store.state.fromPage);
            })
            .catch(err => {
                console.log(err);
                router.push('/');
            })
        },
        methodToExecuteWhenClosed(){
            this.password = '';
        },
        async RecoverPass(){
            var user = await this.$store.state.dbUsers.get(this.$store.state.phone).catch(function(){
                alert('Unknow phone number for us.  Please check the number or Signup new');
                return false;
            });
            if(!user)
                return false;
            this.$store.state.recoverPass = true;
            router.push('/signup');
        }
    }
 }
</script>
