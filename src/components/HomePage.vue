<template>
<v-main>
    <div class="image-container">
        <v-img :src="images[currentImageIndex]" class="image" />
        <v-btn @click="prevImage" icon class="left-arrow">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn @click="nextImage" icon class="right-arrow">
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <v-expand-transition>
            <v-card v-if="showCard" :key="currentCardIndex" :prepend-icon="currentCard.icon" width="400" class="card">
                <template v-slot:title>
                    <div class="d-flex justify-space-between align-center">
                        <span style="font-size: 21px; text-align: justify; font-family: 'Poppins', sans-serif; font-weight: bold;">{{ currentCard.title }}</span>
                        <v-icon @click="nextCard">mdi-chevron-right</v-icon>
                    </div>
                </template>
                <v-divider></v-divider>
                <v-card-text style="font-size: 14px; text-align: justify; font-family: 'Poppins', sans-serif; font-weight: 300;">
                    {{ currentCard.text }}
                </v-card-text>
            </v-card>
        </v-expand-transition>

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
            currentImageIndex: 0,
            showCard: false,
            cards: [{
                    title: "Ganga Basin",
                    icon: "mdi-leaf",
                    text: "Content about the Ganga Basin goes here.",
                },
                {
                    title: "Water Quality",
                    icon: "mdi-water-check",
                    text: "Content about Water Quality goes here.",
                },
                {
                    title: "Flood Hazard",
                    icon: "mdi-alert",
                    text: "Content about Flood Hazard goes here.",
                },
                {
                    title: "Solid Waste",
                    icon: "mdi-recycle",
                    text: "Content about Solid Waste Management goes here.",
                },
            ],
            currentCardIndex: 0,
        };

    },
    components: {
        FooterHome,
    },
    computed: {
        currentCard() {
            return this.cards[this.currentCardIndex];
        },
    },
    methods: {
        prevImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            } else {
                this.currentImageIndex = this.images.length - 1;
            }
        },
        nextImage() {
            if (this.currentImageIndex < this.images.length - 1) {
                this.currentImageIndex++;
            } else {
                this.currentImageIndex = 0;
            }
        },
        startSlideshow() {
            this.interval = setInterval(() => {
                this.nextImage();
            }, 2000);
        },
        nextCard() {
            this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
        },
    },
    mounted() {
        this.startSlideshow();

        setTimeout(() => {
            this.showCard = true;
        }, 700);
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
    z-index: 2;
    background-color: #022a38;
    color: wheat;
    border-radius: 50%;
    opacity: 0.8;
}
.left-arrow {
    left: .5%;
}
.right-arrow {
    right: .5%;
}
.card {
    position: absolute;
    top: 4%;
    right: 6%;
    z-index: 2;
    opacity: 0.8;
}
</style>
