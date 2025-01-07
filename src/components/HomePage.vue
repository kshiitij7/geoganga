<template>
<v-main>
    <div class="image-container">
        <!-- Display the current image based on the current index -->
        <v-img :src="images[currentIndex]" class="image" />

        <!-- Arrow buttons positioned over the image -->
        <v-btn @click="prevImage" icon class="left-arrow">
            <v-icon>mdi-chevron-left</v-icon> <!-- Left arrow -->
        </v-btn>

        <v-btn @click="nextImage" icon class="right-arrow">
            <v-icon>mdi-chevron-right</v-icon> <!-- Right arrow -->
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
                require('@/assets/img/Ganga_Home.png'),
                require('@/assets/img/Second.jpg'), 
                require('@/assets/img/Third.jpg'),
                require('@/assets/img/Fourth.jpg'),
                // Add more images here...
            ],
            currentIndex: 0, 
        };
    },
    components: {
        FooterHome,
    },
    methods: {
        // Go to the previous image
        prevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.images.length - 1; // Loop back to the last image
            }
        },

        // Go to the next image
        nextImage() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0; // Loop back to the first image
            }
        },
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
