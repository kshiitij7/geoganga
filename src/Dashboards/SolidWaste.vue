<template>
<div class="SolidWaste">
    <v-main>
        <LeftSideBar />
        <div style="height: 85vh;">
            <MapComponent :center="[82.0662, 26.2648]" :zoom="10"  />
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
    name: 'SolidWaste',
    components: {
        MapComponent,
        RightSideBar,
        LeftSideBar,
    },
    data() {
        return {
        
        }
    },

};
</script>
