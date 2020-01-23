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
export default {
   data: () => ({
        }),
    computed:{
        
    },
    methods:{
 
    }
 }
</script>
