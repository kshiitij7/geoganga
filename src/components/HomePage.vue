<template>
    <v-main>
      <div class="image-container">      
        <v-img :src="homeImage" />
        <div class="overlay-text animate-text">
          Geo-Ganga Portal
        </div>
      </div>
      <AboutCards />
    </v-main>
  
    <FooterHome />
  </template>
  

<script>
import FooterHome from '@/Layouts/FooterHome.vue';
 import AboutCards from './AboutCards.vue';

export default {
    name: 'HomePage',
    components: {
        FooterHome,
       AboutCards,
    },
    data() {
        return {
            homeImage: require('@/assets/HomeImages/1.png'),
        };
    },
};
</script>

<style scoped>
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.overlay-text {
    width: 100%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
  font-weight: bold;
  text-align: center;
  font-family: "Poppins", sans-serif;
  opacity: 0;
  background: linear-gradient(45deg, #009688, #00796b, #004d40, #0288d1, #ff5722);
  -webkit-background-clip: text;
  color: transparent;
  animation: fadeSlideIn 1.5s ease-out forwards;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.animate-text {
  animation: fadeSlideIn 1.5s ease-out forwards;
}

.image-container {
  position: relative;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
}
</style>
