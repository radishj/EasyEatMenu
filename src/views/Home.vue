<template>
  <div class="home">
    <HelloWorld msg="Welcome to EasyEatMenu App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{

    }
  }
}
</script>
