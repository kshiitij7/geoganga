<template>
<v-footer color="#022a38" height="130" location="bottom" class="footer-links">
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="text-center"> 
                <h2 class="footer-title">ADDITIONAL LINKS</h2>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-img :src="isrologo" contain max-height="50" max-width="70" />
            <v-img :src="iirslogo" contain max-height="50" max-width="80" />
            <v-img :src="nmcglogo" contain max-height="45" max-width="80" />
            <v-img :src="bhuvanlogo" contain max-height="50" max-width="95" />
        </v-row>

        <v-row justify="center">
            <a href="https://www.isro.gov.in/" target="_blank" style="text-decoration: none;"><div class="links">ISRO</div></a>
            <a href="https://www.iirs.gov.in/" target="_blank" style="text-decoration: none;">  <div class="links">IIRS</div></a>
            <a href="https://nmcg.nic.in/" target="_blank" style="text-decoration: none;"> <div class="links">NMCG</div></a>
            <a href="https://bhuvan.nrsc.gov.in/home/index.php" target="_blank" style="text-decoration: none;"> <div class="links">Bhuvan</div></a>
        </v-row>

    </v-container>
</v-footer>

<v-divider></v-divider>

<v-footer location="bottom" color="#022a38" height="30">
    <h5 class="footer-text"> Copyright © 2025 All Rights Reserved</h5>
    <v-spacer></v-spacer>
    <!-- <h5 class="footer-text">Last Updated: {{ currentDate }}</h5>
    <v-spacer></v-spacer> -->
    <h5 class="footer-text"> Designed and Developed by IIRS, ISRO </h5>
</v-footer>
</template>

<script>
// import { ref } from 'vue';  

export default {
    name: 'FooterHome',
    data: () => ({
        isrologo: require('@/assets/img/isro.png'),
        iirslogo: require('@/assets/img/iirs.png'),
        nmcglogo: require('@/assets/img/nmcgGif.gif'),
        bhuvanlogo: require('@/assets/img/bhuvan.png')
    }),
//     setup() {
//     const formatDate = (date) => {
//       const day = String(date.getDate()).padStart(2, '0'); 
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     };
//     const currentDate = ref(formatDate(new Date())); 
//     return { currentDate };
//   }
};

</script>

<style scoped>
.footer-text {
    font-size: 15px;
    text-align: justify;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    color: wheat;
}
.footer-title {
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    color: wheat;
}
.links{
    color: wheat;
     margin-left: 18px;
     margin-right: 20px;
     font-family: 'Poppins', sans-serif;
    font-weight: 300;
}
</style>
