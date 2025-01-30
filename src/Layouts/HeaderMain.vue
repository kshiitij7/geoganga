<template>
    <v-app-bar app color="rgb(2, 42, 56)" class="home-page-header" height="80" elevation="2">
      <!-- Left Logo -->
      <v-img ref="indialogo" :src="indialogo" contain max-width="80" max-height="70" />
  
      <v-spacer></v-spacer>
  
      <!-- ISRO Logo -->
      <v-img ref="isro" :src="isro" contain max-width="60" max-height="60" style="margin-right:30px" />
  
      <!-- Header Text -->
      <div ref="headerText" class="header-text">
        <h3>भारतीय अंतरिक्ष अनुसंधान संगठन, अंतरिक्ष विभाग</h3>
        <h3>Indian Space Research Organisation, Department of Space</h3>
        <h3>भारत सरकार / Government of India</h3>
      </div>
  
      <!-- IIRS Logo -->
      <v-img ref="iirs" :src="iirs" contain max-width="60" max-height="60" style="margin-left:30px" />
  
      <v-spacer></v-spacer>
  
      <!-- NMCG Logo -->
      <v-img ref="nmcg" :src="nmcg" contain max-width="80" max-height="60" style="margin-right:5px" />
    </v-app-bar>
  </template>
  
  <script>
  import gsap from "gsap";
  
  export default {
    name: "HeaderMain",
    data: () => ({
      isro: require("@/assets/img/isro.png"),
      iirs: require("@/assets/img/iirs.png"),
      nmcg: require("@/assets/img/nmcgGif.gif"),
      indialogo: require("@/assets/img/india.png"),
    }),
    mounted() {
      // Access native DOM elements using $el
      const headerText = this.$refs.headerText;
      const logos = [
        this.$refs.indialogo.$el,
        this.$refs.isro.$el,
        this.$refs.iirs.$el,
        this.$refs.nmcg.$el,
      ];
  
      // Text animation
      gsap.from(headerText, {
        duration: 1,
        opacity: 0,
        y: -20,
        rotationX: 50,
        ease: "power3.out",
      });
  
      // Logo animations
      gsap.from(logos, {
        duration: 1,
        opacity: 0,
        x: -30,
        rotationY: 90,
        ease: "power3.out",
        stagger: 0.2, // Sequential animation
      });
  
      // Hover effects on logos
      logos.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { scale: 1.1, rotationY: 10, duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { scale: 1, rotationY: 0, duration: 0.3 });
        });
      });
    },
  };
  </script>
  
  <style scoped>
  .header-text {
    color: wheat;
    line-height: 1.1;
    font-family: "Poppins", sans-serif;
    text-align: center;
  }
  </style>
  