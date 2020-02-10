<template>
    <v-container class="grey lighten-5">
    <v-row
      class="mb-2"
      no-gutters
    >
        <v-col       
            cols="12"
            md="6"
        >
        <v-row
        class="mb-2"
        no-gutters
        >
            <v-col
                v-for="n in 6"
                :key="n"
                :cols=2
            >
                <v-card
                class="pa-2"
                tile
                outlined
                >
                Section--{{n}} 
                </v-card>
            </v-col>
            </v-row>

            <v-row no-gutters>
            <v-col
                v-for="n in 12"
                :key="n"
                :cols="2"
            >
                <v-card
                class="pa-2"
                tile
                outlined
                >
                table-{{n}}
                </v-card>
            </v-col>
        </v-row>
        </v-col>
        <v-col       
            cols="12"
            md="6"
        >
        <v-row no-gutters>
        <v-col>
            <v-list
            subheader
            flat
            class="pl-3"
            >
                <P class="py-1 my-1">Sec:2, Table:3, 18:36</P>

                <v-list-item-group>
                    <v-list-item height = "10">
                        <v-list-item-content @click="ItemClick" class="py-0 my-0"  height = "10">
                        <v-row no-gutters>
                            <v-col cols="10">
                                <v-list-item-title>Notifications</v-list-item-title>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="2">
                                <v-list-item-title>$6.66</v-list-item-title>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col>
                                <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
                            </v-col>
                        </v-row>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content @click="ItemClick" class="py-0 my-0">
                        <v-row no-gutters>
                            <v-col cols="10">
                                <v-list-item-title>Notifications</v-list-item-title>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="2">
                                <v-list-item-title>$6.66</v-list-item-title>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col>
                                <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
                            </v-col>
                        </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-col>
        </v-row>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    data: () => ({
        dialog: false,
        name: 'table',
        settings: [],
        active1: false
    }),
    methods:{
        ItemClick(){
            alert('aaaaaaaaaaaa')
        }
    }
}
</script>
