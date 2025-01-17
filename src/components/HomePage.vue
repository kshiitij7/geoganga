<template>
<v-main>
    <div class="image-container">
        <!-- Image with slideshow controls -->
        <transition name="fade">
            <v-img :src="images[currentImageIndex]" class="image" :key="currentImageIndex" />
        </transition>

        <!-- Left Arrow Button -->
        <v-btn @click="prevImage" icon class="left-arrow">
            <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <!-- Right Arrow Button -->
        <v-btn @click="nextImage" icon class="right-arrow">
            <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <!-- Card Section -->
        <v-expand-transition>
            <v-card v-if="showCard" :key="currentCardIndex" :prepend-icon="currentCard.icon" width="400" class="card">
                <template v-slot:title>
                    <div class="d-flex justify-space-between align-center">
                        <span style="font-size: 21px; text-align: justify; font-family: 'Poppins', sans-serif; font-weight: bold;">{{ currentCard.title }}</span>
                        <v-icon @click="nextCard" class="cardArrow">mdi-chevron-right</v-icon>
                    </div>
                </template>
                <v-divider></v-divider>
                <v-card-text @click="openDialog" style="font-size: 14px; text-align: justify; font-family: 'Poppins', sans-serif; font-weight: 300;">
                    <span ref="textContainer">{{ truncatedText }}</span>
                    <v-card-text class="cursor-pointer"><span style="font-size: 16px;font-weight:bolder">Read More</span></v-card-text>
                </v-card-text>
            </v-card>
        </v-expand-transition>

        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="1200" @click:outside=" showCard = true">
            <v-card :prepend-icon="currentCard.icon" class="dialog-card">
                <template v-slot:title>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 21px; font-family: 'Poppins', sans-serif; font-weight: bold;">{{ currentCard.title }}</span>
                <v-icon color="#700B0B" @click="dialog = false, showCard = true" style="cursor: pointer;">mdi-close</v-icon>
            </div>
        </template>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <v-img :src="currentCard.image" contain></v-img>
                        </v-col>
                        <v-col>
                            <div style=" color:black;font-size: 14px; text-align: justify; font-family: 'Poppins', sans-serif; font-weight: 300;">
                                {{ currentCard.text }}
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
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
            cardArrow: false,
            cards: [{
                    title: 'Ganga Basin',
                    icon: 'mdi-leaf',
                    image: require('@/assets/img/about_img.png'),
                    text: 'The Ganges Basin, part of the Ganges-Brahmaputra-Meghna (GBM) river system,covers about 1,999,000 square kilometers across Tibet, Nepal, India, and Bangladesh.It is surrounded by the Himalayas to the north, the Indus Basin and Aravalli ridge to the west,the Vindhya Mountain range and Chota Nagpur Plateau to the south, and merges with the Brahmaputra Basin in the east.This vast area includes the Indian states of Uttar Pradesh, Madhya Pradesh, Bihar, Rajasthan, West Bengal, Haryana,Himachal Pradesh, Delhi, and Arunachal Pradesh, along with Nepal, Bhutan, and Bangladesh.The basin supports a population of over 500 million people, making it the most populated river basin in the world.It is drained by several tributaries, many of which originate in Tibet and flow through Nepal before joining the Ganges River.These tributaries provide essential water for agriculture and daily life.The Ganges River system is vital for agriculture in the region,with its fertile plains supporting the production of crops like rice and wheat.However, the basin faces significant challenges such as pollution, water scarcity,and the impacts of climate change, including flooding and reduced snowmelt in the Himalayas.Despite these issues, the Ganges Basin remains crucial to the economy, culture,and religious practices of the millions who depend on its resources.Its role in sustaining biodiversity and providing livelihoods makes it one of the most important and complex river systems in the world.',
                },
                {
                    title: 'Water Quality',
                    icon: 'mdi-water-check',
                    image: require('@/assets/img/waterquality.png'),
                    text: 'The water quality of the Ganga River is a complex issue,influenced by a variety of environmental, industrial, and social factors.The river, which flows through densely populated regions of India, faces severe pollution in many of its stretches.In the upper reaches, particularly in the Himalayan region, the water quality is generally better, with clear, cold waterand high levels of dissolved oxygen, supporting a diverse aquatic ecosystem.However, as the river moves through urban and industrial centers like Kanpur, Varanasi, and Allahabad,its water quality deteriorates significantly. Industrial effluents, including toxic chemicals and heavy metals,are often released directly into the river without adequate treatment.Additionally, untreated sewage from millions of people, as well as runoff fromagriculture that carries pesticides and fertilizers, further pollutes the water.These contaminants contribute to high levels of biochemical oxygen demand (BOD),making the water unsafe for drinking and harmful to aquatic life.Religious practices, such as bathing, immersion of idols, and offering flowers,also add to the organic waste and litter in the river. The presence of coliform bacteria,especially fecal coliforms, is alarmingly high, reflecting the unsafe levels of sanitation along the river.In response, the Indian government has launched initiatives like the Namami Gange program,aimed at cleaning the river through wastewater treatment plants, afforestation, and community awareness.However, the Ganga’s water quality continues to be a challenge, requiring concerted efforts in pollution control,infrastructure development, and public participation to restore its ecological health and ensure safe water for millions of people.',
                },
                {
                    title: 'Flood Hazard',
                    icon: 'mdi-alert',
                    image: require('@/assets/img/about_img.png'),
                    text: 'Content about Flood Hazard goes here.',
                },
                {
                    title: 'Solid Waste',
                    icon: 'mdi-recycle',
                    image: require('@/assets/img/about_img.png'),
                    text: 'Content about Solid Waste Management goes here.',
                },
            ],
            currentCardIndex: 0,
            dialog: false,
        };
    },

    components: {
        FooterHome,
    },

    computed: {
        currentCard() {
            return this.cards[this.currentCardIndex];
        },
        truncatedText() {
            const text = this.currentCard.text;
            const maxLength = 150;
            return text.length > maxLength ?
                `${text.slice(0, maxLength)}...` :
                text;
        },
    },

    methods: {
        prevImage() {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        },
        nextImage() {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        },
        startSlideshow() {
            this.interval = setInterval(() => {
                this.nextImage();
            }, 5000);
        },
        nextCard() {
            this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
        },
        openDialog() {
            this.dialog = true;
            this.showCard = false;
        },
    },

    mounted() {
        this.startSlideshow();
        setTimeout(() => {
            this.showCard = true;
            this.cardArrow = true;
        }, 500);
    },

    beforeUnmount() {
        clearInterval(this.interval);
    },
};
</script>


<style scoped>
.image-container {
    position: relative;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
}
.left-arrow,
.right-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background-color: #022a38;
    color: wheat;
    border-radius: 50%;
    opacity: 0.8;
}
.left-arrow:hover,
.right-arrow:hover {
    opacity: 1;
}
.left-arrow {
    left: .5%;
}
.right-arrow {
    right: .5%;
}
.card {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 2;
    opacity: 0.8;
    background: #ffffff;
}
.card-title {
    font-weight: bold;
}

.dialog-card {
    background: white;
    opacity: 0.9;

}
</style>
