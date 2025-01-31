<template>
    <v-main>
    
        <h1 class="heading">About Geo-Ganga</h1>
    
        <v-row style="margin-left: 40px; margin-right: 40px; margin-top: 20px;">
            <v-col>
            </v-col>
            <v-col style="max-width: 450px; max-height: 450px;">
                <v-img :src="river" class="aboutimg"></v-img>
            </v-col>
        </v-row>
    
        <v-row style="margin-left: 40px; margin-top: 80px; margin-right: 40px;">
            <v-col style="max-width: 600px; max-height: 600px;">
                <v-img :src="basinimg" class="aboutimg" @click="openLightbox(0)"></v-img>
            </v-col>
            <v-col>
                <div class="about-text">
                    <h2 style="font-size: 27px;">1. Ganga Basin</h2>
                    <br>
                   
                </div>
            </v-col>
        </v-row>
    
        <v-row style="margin-left: 40px; margin-top: 80px; margin-right: 40px;">
            <v-col style="max-width: 600px; max-height: 600px;">
                <v-img :src="qualityimg" class="aboutimg" @click="openLightbox(1)"></v-img>
            </v-col>
            <v-col>
                <div class="about-text">
                    <h2 style="font-size: 27px;">2. Water Quality</h2>
                    <br>
                   
                </div>
            </v-col>
        </v-row>
        <!-- Lightbox -->
        <v-dialog v-model="lightbox" fullscreen hide-overlay>
            <div class="lightbox-backgrounds">
                <v-spacer></v-spacer>
                <v-btn icon class="lightbox-close" @click="closeLightbox">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-window v-model="currentIndex" show-arrows>
                    <v-window-item v-for="(image, index) in images" :key="index" :value="index">
                        <div class="lightbox-content">
                            <v-img :src="image" class="lightbox-image"></v-img>
                        </div>
                    </v-window-item>
                </v-window>
            </div>
        </v-dialog>
    </v-main>
    </template>
    
    <script>
    export default {
        name: 'AboutPage',
        data() {
            return {
                basinimg: require('@/assets/img/about_img.png'),
                qualityimg: require('@/assets/img/waterquality.png'),
                river: require('@/assets/img/portal.png'),
    
                lightbox: false,
                currentIndex: 0,
                images: [require('@/assets/img/about_img.png'), require('@/assets/img/waterquality.png'), ],
            };
        },
        methods: {
            openLightbox(index) {
                this.currentIndex = index;
                this.lightbox = true;
            },
            closeLightbox() {
                this.lightbox = false;
            },
        },
    };
    </script>
    
    <style scoped>
    .heading {
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        font-size: 50px;
        text-decoration: underline;
        text-align: center;
        width: 100%;
    }
    
    .aboutimg {
        width: 100%;
        height: auto;
    }
    
    .about-text {
        padding: 20px;
        font-size: 1.1rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
    }
    
    .v-img {
        cursor: pointer;
    }
    
    .aboutimg:hover {
        transform: scale(1.1);
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: rgb(14, 1, 1);
        background-color: rgb(0, 0, 0,);
        border-radius: 50%;
        z-index: 10;
        cursor: pointer;
    }
    
    .lightbox-backgrounds {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
    }
    
    .lightbox-content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
    }
    
    .lightbox-image {
        max-width: 80vw;
        max-height: 80vh;
    
    }
    </style>
    