<template>
    <v-app-bar  app color="rgb(2, 42, 56)" class="home-page-header" height="80" elevation="2">
       
            <v-img :src="isrologo" contain  max-width="100" max-height="60" class="ml-0" />
            <v-img :src="iirslogo" contain  max-width="50" class="ml-0" />
            <v-spacer></v-spacer>
            
                <div class="header-text" >
                    <h3>भारतीय अंतरिक्ष अनुसंधान संगठन, अंतरिक्ष विभाग</h3>
                    <h3>Indian Space Research Organisation, Department of Space</h3>
                    <h3>भारत सरकार / Government of India</h3>
                </div>
           
            <v-spacer></v-spacer>
            
            <v-img :src="indialogo" contain max-width="150" max-height="70" />
        
    </v-app-bar>
    </template>
    
    <script>
    export default {
        name: 'HeaderMain',
        data: () => ({
            isrologo: require('@/assets/img/isro.png'),
            iirslogo: require('@/assets/img/iirs.png'),
            indialogo: require('@/assets/img/india.png'),
            
        }),
    }
    </script>
    
    <style scoped>
    .header-text {
        color: wheat;
        line-height: 1.1;
        margin-top: 5px;
        font-family: 'Poppins', sans-serif;
        text-align: center; 
    }
  
    </style>
    