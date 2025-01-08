<template>
<v-main>
    <div class="image-container">
        <v-img :src="images[currentIndex]"/>

        <v-btn @click="prevImage" icon class="left-arrow">
            <v-icon>mdi-chevron-left</v-icon> 
        </v-btn>
        <v-btn @click="nextImage" icon class="right-arrow">
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
    </div>
</v-main>

<FooterHome />
</template>

  
  
<script>
import FooterHome from '@/Layouts/FooterHome.vue';

export default {
    name: 'HomePage',
    data() {
        return {
            images: [
                require('@/assets/HomeImages/1.png'),
                require('@/assets/HomeImages/2.png'),   
                // Add more images here...
            ],
            currentIndex: 0, 
        };
    },
    components: {
        FooterHome,
    },
    methods: {
        prevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.images.length - 1; 
            }
        },
        nextImage() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        },
        startSlideshow() {
            this.interval = setInterval(() => {
                this.nextImage(); }, 2000);
        },
    },
    mounted() {
        this.startSlideshow();
    },
};
</script>
  
  
<style scoped>
.image-container {
    position: relative;
    margin: 0 auto;
}
.left-arrow,
.right-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;       
}
.left-arrow {
    left: 10px;
}
.right-arrow {
    right: 10px;
}
.v-btn {
    background-color: #022a38;
    color: wheat;
    border-radius: 50%;
    opacity: 0.8;
}

</style>
