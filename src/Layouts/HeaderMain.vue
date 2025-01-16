<template>
<v-app-bar app color="rgb(2, 42, 56)" class="home-page-header" height="80" elevation="2">
    <v-img :src="indialogo" contain max-width="80" max-height="70" />
    <v-spacer></v-spacer>
    <v-img :src="isro" contain max-width="60" max-height="60" style="margin-right:30px"></v-img>
    <div class="header-text">
        <h3>भारतीय अंतरिक्ष अनुसंधान संगठन, अंतरिक्ष विभाग</h3>
        <h3>Indian Space Research Organisation, Department of Space</h3>
        <h3>भारत सरकार / Government of India</h3>
    </div>
    <v-img :src="iirs" contain max-width="60" max-height="60" style="margin-left:30px"></v-img>
    <v-spacer></v-spacer>
    <v-img :src="nmcg" contain max-width="80" max-height="60" style="margin-right:5px"></v-img>
</v-app-bar>
</template>

    
    
<script>
export default {
    name: 'HeaderMain',
    data: () => ({
        isro: require('@/assets/img/isro.png'),
        iirs: require('@/assets/img/iirs.png'),
        nmcg: require('@/assets/img/nmcgGif.gif'),
        indialogo: require('@/assets/img/india.png'),
    }),
}
</script>

<style scoped>
.header-text {
    color: wheat;
    line-height: 1.1;
    margin-top: 5px;
    font-family: 'Poppins', sans-serif;
    text-align: center;
}
</style>
