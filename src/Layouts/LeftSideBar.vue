<template>
<div class="LeftSideBar">
    <v-main style="--v-layout-top: 0px;">
        <v-navigation-drawer rail color="rgb(2, 42, 56)">
            <v-list>
                <!-- Layers Button -->
                <v-list-item @click="openLeftDrawer('layers')" class="cursor-pointer">
                    <v-tooltip location="left">
                        <template v-slot:activator="{ props: tooltip }">
                            <v-icon style="color: wheat;" v-bind="tooltip">mdi-layers-triple</v-icon>
                        </template>
                        <span>Layers</span>
                    </v-tooltip>
                </v-list-item>
                <v-divider :thickness="2" color="white"></v-divider>
                <!-- Time Series Button -->
                <v-list-item @click="openLeftDrawer('timeSeries')" class="cursor-pointer">
                    <v-tooltip location="left">
                        <template v-slot:activator="{ props: tooltip }">
                            <v-icon style="color: wheat;" v-bind="tooltip">mdi-chart-timeline</v-icon>
                        </template>
                        <span>Time Series</span>
                    </v-tooltip>
                </v-list-item>
                <v-divider :thickness="2" color="white"></v-divider>
                <!-- Feature Info Button -->
                <v-list-item @click="openLeftDrawer('featureInfo')" class="cursor-pointer">
                    <v-list-item-title>
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-icon style="color: wheat;" v-bind="tooltip">mdi-information</v-icon>
                            </template>
                            <span>Feature Info</span>
                        </v-tooltip>
                    </v-list-item-title>
                </v-list-item>
                <v-divider :thickness="2" color="white"></v-divider>
                <!-- Compare Button -->
                <v-list-item @click="openLeftDrawer('compare')" class="cursor-pointer">
                    <v-list-item-title>
                        <v-tooltip location="right">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-icon style="color: wheat;" v-bind="tooltip">mdi-compare</v-icon>
                            </template>
                            <span>Compare Tool</span>
                        </v-tooltip>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Dynamic Drawer -->
        <v-navigation-drawer v-model="isLeftDrawerOpen" location="left" :width="250">
            <!-- Layers Content -->
            <div v-if="activeLeftTab === 'layers'">
                <v-list>
                    <v-list-item>
                    <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Layers</div>
                </v-list-item>
                <v-divider :thickness="2" color="black"></v-divider>
                    <v-expansion-panels>
                        <v-expansion-panel elevation="0">
                            <v-expansion-panel-title>Administrative Boundaries</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <!-- Boundary Layer Checkboxes -->
                                <v-list-item v-for="(adminLayer, index) in adminLayers" :key="index">
                                    <v-checkbox color="primary" :label="adminLayer.name" v-model="adminLayer.visible" 
                                    style="margin-top: -7px; margin-bottom: -38px; margin-left:-10px" 
                                    @change="onAdminBoundaryVisibilityChange(adminLayer)"></v-checkbox>
                                </v-list-item>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                        <v-expansion-panel elevation="0">
                            <v-expansion-panel-title>
                                Project Boundaries
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <!-- Project Layer Checkboxes -->
                                <v-list-item v-for="(projectLayer, index) in projectLayers" :key="index">
                                    <v-checkbox color="primary" :label="projectLayer.name" v-model="projectLayer.visible" 
                                    style="margin-top: -7px; margin-bottom: -38px; margin-left:-10px" 
                                    @change="onProjectBoundaryVisibilityChange(projectLayer)"></v-checkbox>
                                </v-list-item>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-divider></v-divider>
                </v-list>
            </div>
            <!-- Time Series Content -->
            <div v-else-if="activeLeftTab === 'timeSeries'">
                <v-list-item>
                    <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Time Series Data</div>
                </v-list-item>
                <v-divider :thickness="2" color="black"></v-divider>
                <v-select style="margin-top: 40px; margin-bottom: 30px;" v-model="timeSeries" :items="timeSeriesLayers" label="Please Select an Option" required></v-select>
                <v-divider :thickness="3"></v-divider>
            </div>
            <!-- Feature Info Content -->
            <div v-else-if="activeLeftTab === 'featureInfo'">
                <v-card elevation="0">
                    <v-card-title>
                        <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Feature Info Tool</div>
                    </v-card-title>
                    <v-divider :thickness="2" color="black"></v-divider>
                    <v-card-text>
                        <v-switch color="error" v-model="featureInfoEnabled" label="Enable Feature Info" @change="toggleFeatureInfo"></v-switch>
                    </v-card-text>
                </v-card>
                <v-divider :thickness="3"></v-divider>
                <v-img src="../assets/rightPng/feature_tool.png" style="margin-top: 70px;opacity: 0.8;" contain></v-img>
            </div>
            <!-- Compare Tool Content -->
            <div v-else-if="activeLeftTab === 'compare'">
                <v-card elevation="0">
                    <v-card-title>
                        <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Comparison Tool</div>
                    </v-card-title>
                    <v-divider :thickness="2" color="black"></v-divider>
                    <v-card-text>
                        <v-title>
                            <div class="text-h8 font-weight-bold">Left Side</div>
                        </v-title>
                        <v-select v-model="leftSelect" :items="leftMonths" label="Please Select a Layer"></v-select>
                        <v-title>
                            <div class="text-h8 font-weight-bold">Right Side</div>
                        </v-title>
                        <v-select v-model="rightSelect" :items="rightMonths" label="Please Select a Layer"></v-select>
                        <v-btn :disabled="!isBothSelected || showError" @click="handleCompare">Compare</v-btn>
                        <div v-if="showError" class="text-red text-caption mt-2">Please select different months.</div>
                    </v-card-text>
                </v-card>
                <v-divider :thickness="3"></v-divider>
                <v-img src="../assets/rightPng/compare_tool.png" style="margin-top: 80px; opacity: 0.9;" max-height="300" contain></v-img>
            </div>
        </v-navigation-drawer>
    </v-main>
</div>
</template>

<script>
import eventBus from '@/event-bus';

export default {
    name: 'LeftSideBar',

    data() {
        return {
            // Left 
            isLeftDrawerOpen: false,
            activeLeftTab: null,
            featureInfoEnabled: false,
            leftSelect: null,
            rightSelect: null,
            adminLayers: [
                            { name: 'India Boundary', visible: true },
                            { name: 'States', visible: false },
                            { name: 'Districts', visible: false },
                            { name: 'Sub-Districts', visible: false },
                        ],
            projectLayers: [
                            { name: 'Ganga Basin', visible: true },
                        ],
           
        };
    },
    computed: {
        isBothSelected() {
            return this.leftSelect && this.rightSelect;
        },
        showError() {
            return this.leftSelect === this.rightSelect;
        },
    },

    methods: {
        openLeftDrawer(leftTab) {
            if (this.activeLeftTab === leftTab && this.isLeftDrawerOpen) {
                this.isLeftDrawerOpen = false;
                this.activeLeftTab = null;
            } else {
                this.activeLeftTab = leftTab;
                this.isLeftDrawerOpen = true;
            }
        },
        onAdminBoundaryVisibilityChange(adminLayer) {
                eventBus.emit('toggle-layer-visibility', {name: adminLayer.name,visible: adminLayer.visible,});
        },
        onProjectBoundaryVisibilityChange(projectLayer) {
                eventBus.emit('toggle-layer-visibility', {name: projectLayer.name,visible: projectLayer.visible,});
        },
     toggleFeatureInfo() {
        eventBus.emit('toggleFeatureInfo', this.featureInfoEnabled);
        if (this.featureInfoEnabled) {
          document.body.style.cursor = 'grab';  
        } else {
          document.body.style.cursor = 'auto'; 
        }
        if (!this.featureInfoEnabled) {
        eventBus.emit('hidePopup');
      }
      },
        handleCompare() {
            if (!this.showError) {
                alert('Comparison started!');
            }
        },
    },
};
</script>
