<template>
<v-app-bar app color="white" dark class="button-bar" height="50" elevation="2">
    <v-spacer></v-spacer>
    <div v-for="tab in tabs" :key="tab.route">
        <router-link :to="tab.route">
            <v-btn :class="{'active': isActive(tab.route)}">
                <v-icon :icon="tab.icon" size="x-large" style="color: rgb(2, 42, 56);"></v-icon>
                <div style="color: rgb(2, 42, 56); font-family: 'Poppins', sans-serif; font-weight: 500;">{{ tab.name }}</div>
            </v-btn>
        </router-link>
    </div>
    <v-img :src="nmcg" max-width="130" max-height="50"></v-img>
    <v-spacer></v-spacer>
</v-app-bar>
</template>

<script>
export default {
    name: 'NavBarMain',
    data() {
        return {
            nmcg: require('@/assets/img/nmcgGif.gif'),
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
    height: 50px;
    background-color: rgba(2, 42, 56, 0.2);
    color: wheat;
    font-size: 15px;
}
</style>
