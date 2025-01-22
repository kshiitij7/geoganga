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
    <v-img :src="gangaLogo" max-width="150" max-height="150"></v-img>
    <v-spacer></v-spacer>
</v-app-bar>
</template>

<script>
export default {
    name: 'NavBarMain',
    data() {
        return {   
            gangaLogo: require('@/assets/img/geoganga_logo.png'),     
            tabs: [
                {name: 'Home',route: '/',icon: 'mdi-home'},  
                {name: 'Ganga Basin',route: '/basin',icon: 'mdi-leaf'},
                {name: 'Water Quality',route: '/quality',icon: 'mdi-water-check'},
                {name: 'Flood Hazard', route: '/flood', icon: 'mdi-alert'},
                {name: 'Solid Waste',route: '/solid',icon: 'mdi-recycle'},
                {name: 'About',route: '/about',icon: 'mdi-information'},
            ],
        }
    },
    methods: {
        isActive(route) {
            return this.$route.path === route;
        }
    }
}
</script> 

<style scoped>
.active {
    height: 60px;
    background-color: rgba(2, 42, 56, 0.2);
    font-size: 15px;
}
</style>
