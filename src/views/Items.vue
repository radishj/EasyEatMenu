<template>
    <v-container class="grey lighten-5 pt-1">
    <v-row
      no-gutters
    >
        <v-col       
            cols="12"
            md="6"
        >
        <v-row class="mt-2"
        no-gutters
        >
            <v-col
                v-for="cate in menu"
                :key="cate.id"
                :cols=2
                @click="SetCate(cate.id)"
            >
                <v-card
                class="pa-2"
                tile
                outlined
                >
                    {{cate.name}} 
                </v-card>
            </v-col>
        </v-row>

        <v-row no-gutters class="mt-2">
            <v-col
                v-for="item in cateSel"
                :key="item.name"
                :cols="2"
                @click="SetItem(item.id)"
            >
                <v-card
                class="pa-2"
                tile
                outlined
                >
                    {{item.name}}
                </v-card>
            </v-col>
        </v-row>
        </v-col>
        <v-col       
            cols="12"
            md="6"
        >
        <v-row no-gutters class="mt-2">
        <v-col>
            <v-card
                max-width="100%"
                class="mx-auto"
            >

                <v-list>
                <v-list-item
                    v-for="opt in itemSel"
                    :key="opt.name"
                >
                    <v-list-item-content>
                    <v-list-item-title v-text="opt.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
            </v-card>
        </v-col>
        </v-row>
        </v-col>
    </v-row>
</v-container>

</template>

<script>
  export default {
    data () {
      return {
        items: [[
                { id:0, name:'kesong puti'},
                { id:1, name:'panko'},
                { id:2, name:'marinara'}
            ],
            [
                { id:0, name:'spicy sausage'},
                { id:1, name:'ala jillo'}
            ],
            [
                { id:0, name:'Grilled chicken'},
                { id:1, name:'wonton strips'},
                { id:2, name:'carrots'},
            ],
            [
                { id:0, name:'candied walnuts'},
                { id:1, name:'farmer\'s cheese'},
                { id:2, name:'raspberry dressing'},
            ],
        ],
        categories: [[
                { id:0, name:'Quezo Bianca', grade:'a'},
                { id:1, name:'Hungarian Sausage', grade:'d'}
            ],
            [
                { id:2, name:'Chicken Chopstick', grade:'c'},
                { id:3, name:'Farmer\'s Cheese', grade:'d'}
            ]
        ],
        menu: [
          { id:0, name:'Appetizers'},
          { id:1, name:'Salads'},
        ],
        itemSel:0,
        cateSel:0,
      }
    },
    methods:{
        SetCate(index){
            this.cateSel = this.categories[index];
        },
        SetItem(index){
            this.itemSel = this.items[index];
        }
    },
    beforeMount(){
        this.cateSel = this.categories[0];
        this.itemSel = this.items[0];
    }  
  }
</script>
