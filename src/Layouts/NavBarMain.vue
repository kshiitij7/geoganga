<template>
<v-app-bar app color="white" dark class="button-bar" height="60" elevation="2">
    <v-spacer></v-spacer>
    <div v-for="tab in tabs" :key="tab.route">
        <router-link :to="tab.route">
            <v-btn :class="{'active': isActive(tab.route)}">
                <v-icon :icon="tab.icon" size="x-large" style="color: rgb(2, 42, 56);"></v-icon>
                <div style="color: rgb(2, 42, 56); font-family: 'Poppins', sans-serif; font-weight: 500;">{{ tab.name }}</div>
            </v-btn>
        </router-link>
    </div>
    <v-img :src="gangaLogo" max-width="150" max-height="150" class="cursor-pointer" @click="openGangaDialog"></v-img>
    <v-spacer></v-spacer>
</v-app-bar>

<v-dialog v-model="geoDialog" max-width="1000">
    <v-card>
        <template v-slot:title>
            <div style="display: flex; align-items: center; justify-content: space-between;">

                <v-img :src="gangaLogo" max-width="250" max-height="250"></v-img>
                <!-- <span style="font-size: 21px; font-family: 'Poppins', sans-serif; font-weight: bold;">Geo-Ganga</span> -->
                <v-icon color="#700B0B" @click="geoDialog = false" style="cursor: pointer;">mdi-close</v-icon>
            </div>
        </template>
        <v-divider></v-divider>
        <v-card-text>
            <v-row>
                <v-col v-for="portal in portal" :key="portal.image">
                    <v-img :src="portal.image" contain></v-img>
                </v-col>
                <v-col>
                    <div v-for="portal in portal" :key="portal.text" style=" color:black;font-size: 14px; text-align: justify; font-family: 'Poppins', sans-serif; font-weight: 300;">
                        {{ portal.text }}
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</v-dialog>
</template>

<script>
export default {
    name: 'NavBarMain',
    data() {
        return {
            geoDialog: false,
            gangaLogo: require('@/assets/img/geoganga_logo.png'),
            tabs: [{
                    name: 'Home',
                    route: '/',
                    icon: 'mdi-home'
                },
                {
                    name: 'Ganga Basin',
                    route: '/basin',
                    icon: 'mdi-leaf'
                },
                {
                    name: 'Water Quality',
                    route: '/quality',
                    icon: 'mdi-water-check'
                },
                {
                    name: 'Flood Hazard',
                    route: '/flood',
                    icon: 'mdi-alert'
                },
                {
                    name: 'Solid Waste',
                    route: '/solid',
                    icon: 'mdi-recycle'
                },
                {
                    name: 'About',
                    route: '/about',
                    icon: 'mdi-information'
                },
            ],
            portal: [{
                image: require('@/assets/img/portal.png'),
                text: 'The Geo-Ganga portal is an innovative digital platform to support the initiatives for the rejuvenation and conservation of the Ganga River and its basin. This portal provides geospatial data, satellite imagery, and mapping tools that are essential for effective monitoring, management, and decision-making related to the Ganga’s ecosystem. The platform integrates data from various sources, including remote sensing technologies, GIS (Geographic Information Systems), and field surveys, offering a comprehensive view of the river and its surrounding areas. Geo-Ganga aims to aid in the planning, implementation, and monitoring of the Namami Gange Programme, a flagship initiative to clean and protect the Ganga River. It provides crucial insights for assessing water quality, identifying pollution hotspots, tracking the progress of river rejuvenation projects, and ensuring sustainable development along the river. Through the portal, users can access various layers of information, including land use patterns, pollution sources, and infrastructure data. It also helps stakeholders, including government agencies, researchers, and environmental organizations, to collaborate effectively in Ganga conservation efforts. In sum, Geo-Ganga plays a vital role in enhancing the efficiency and transparency of efforts to restore and protect one of India’s most iconic rivers.'
            }, ]
        }
    },
    methods: {
        isActive(route) {
            return this.$route.path === route;
        },
        openGangaDialog() {
            this.geoDialog = true;
        },
    },
};
</script> 

<style scoped>
.active {
    height: 60px;
    background-color: rgba(2, 42, 56, 0.2);
    font-size: 15px;
}
</style>
