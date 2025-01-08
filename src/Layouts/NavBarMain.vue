<template>
    <v-app-bar app color="white" dark class="button-bar" height="50" elevation="2">
        <v-spacer></v-spacer>
        
        <v-divider :thickness="1" color="black" vertical></v-divider>
        
        <router-link to="/">
            <v-btn :class="{'active': isActive('/')}" >
                <v-icon icon="mdi-home" size="x-large"></v-icon> <div style="font-family: 'Poppins', sans-serif; font-weight: 400;">Home</div>
            </v-btn>
        </router-link>
    
        <v-divider :thickness="1" color="black" vertical></v-divider>
    
        <router-link to="/basin">
            <v-btn :class="{'active': isActive('/basin')}">
                <v-icon icon="mdi-leaf" size="x-large"></v-icon><div style="font-family: 'Poppins', sans-serif; font-weight: 400;">Ganga Basin</div>
            </v-btn>
        </router-link>
    
        <v-divider :thickness="1" color="black" vertical></v-divider>
    
        <router-link to="/quality">
        <v-btn :class="{'active': isActive('/quality')}">
            <v-icon icon="mdi-water-check" size="x-large"></v-icon><div style="font-family: 'Poppins', sans-serif; font-weight: 400;">Water Quality</div>
        </v-btn>
        </router-link>
    
        <v-divider :thickness="1" color="black" vertical></v-divider>

        <router-link to="/flood">
        <v-btn :class="{'active': isActive('/flood')}">
            <v-icon icon="mdi-alert" size="x-large"></v-icon><div style="font-family: 'Poppins', sans-serif; font-weight: 400;"> Flood Hazard</div>
        </v-btn>
    </router-link>

        <v-divider :thickness="1" color="black" vertical></v-divider>

        <router-link to="/solid">
        <v-btn :class="{'active': isActive('/solid')}">
            <v-icon icon="mdi-recycle" size="x-large"></v-icon><div style="font-family: 'Poppins', sans-serif; font-weight: 400;"> Solid Waste</div>
        </v-btn>
    </router-link>

        <v-divider :thickness="1" color="black" vertical></v-divider>

        <router-link to="/about">
            <v-btn :class="{'active': isActive('/about')}">
                <v-icon icon="mdi-information" size="x-large"></v-icon> <div style="font-family: 'Poppins', sans-serif; font-weight: 400;">About</div>
            </v-btn>
        </router-link>

        <v-divider :thickness="1" color="black" vertical></v-divider>

        <v-img :src="nmcg"  max-width="130" max-height="50" class="image-hover"></v-img>

        <v-divider :thickness="1" color="black" vertical></v-divider>

        <v-spacer></v-spacer>
    
    </v-app-bar>
    </template>
    
    <script>


    export default {
        name: 'NavBarMain',
        data() {
            return {
                nmcg:require('@/assets/img/nmcgGif.gif'),     
            }
        },
        methods: {
            isActive(route) {
                return this.$route.path === route;
            }
        }
    }
    </script> 
      
    <style scoped>
    .active {
        height: 50px; 
        background-color:  rgba(2, 42, 56,1);  
        color: wheat;
        font-size: 15px;       
    }
    .image-hover {
      transition: 0.3s ease; 
    }
    .image-hover:hover {
      transform: scale(1.1); 
    }

    </style>
    