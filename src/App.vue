<template>
  <v-app>

    <HeaderMain/>
    <NavBarMain/>
    
    <router-view/>
  
  </v-app>
</template>

<script>

import HeaderMain from './Layouts/HeaderMain.vue';
import NavBarMain from './Layouts/NavBarMain.vue';

export default {
  name: 'App',
  components:{
    HeaderMain,
    NavBarMain,
  },

  data: () => ({

  }),
}
</script>
  
