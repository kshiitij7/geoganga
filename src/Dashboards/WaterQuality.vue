<template>
<div class="WaterQuality">
    <v-main>
        <LeftSideBar />
        <div style="height: 86vh;">
            <MapComponent :center="[80.3319, 26.4499]" :zoom="10" />
        </div>
            <RightSideBar />     
    </v-main>
</div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import LeftSideBar from '@/Layouts/LeftSideBar.vue';
import RightSideBar from '@/Layouts/RightSideBar.vue';

export default {
    name: 'WaterQuality',
    components: {
        MapComponent,
        RightSideBar,
        LeftSideBar,
    },
    data(){
        return {
            
        }
    },

};
</script>
