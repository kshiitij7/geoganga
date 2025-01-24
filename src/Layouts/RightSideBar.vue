<template>
    <div class="RightSideBar">
        <v-main style="--v-layout-top: 0px;">
            <v-navigation-drawer rail app location="right" color="rgb(2, 42, 56)">
                <v-list>
                    <!-- Search Button -->
                    <v-list-item @click="openRightDrawer('search')" class="cursor-pointer">
                        <v-list-item-title>
                            <v-tooltip location="right">
                                <template v-slot:activator="{ props: tooltip }">
                                    <v-icon style="color: wheat;" v-bind="tooltip">mdi-magnify</v-icon>
                                </template>
                                <span>Search</span>
                            </v-tooltip>
                        </v-list-item-title>
                    </v-list-item>
                    <v-divider :thickness="2" color="white"></v-divider>
                    <!-- Measure Button -->
                    <v-list-item @click="openRightDrawer('measurement')" class="cursor-pointer">
                        <v-list-item-title>
                            <v-tooltip location="right">
                                <template v-slot:activator="{ props: tooltip }">
                                    <v-icon style="color: wheat;" v-bind="tooltip">mdi-ruler-square</v-icon>
                                </template>
                                <span>Measurement Tool</span>
                            </v-tooltip>
                        </v-list-item-title>
                    </v-list-item>
                    <v-divider :thickness="2" color="white"></v-divider>
                    <!-- Crop Button -->
                    <v-list-item @click="openRightDrawer('cropTool')" class="cursor-pointer">
                        <v-list-item-title>
                            <v-tooltip location="right">
                                <template v-slot:activator="{ props: tooltip }">
                                    <v-icon style="color: wheat;" v-bind="tooltip">mdi-crop</v-icon>
                                </template>
                                <span>Area Of Interest</span>
                            </v-tooltip>
                        </v-list-item-title>
                    </v-list-item>
                    <v-divider :thickness="2" color="white"></v-divider>
                    <!-- Weather Analysis Button -->
                     <v-list-item @click="openRightDrawer('weatherAnalysis')" class="cursor-pointer">
                        <v-list-item-title>
                            <v-tooltip location="right">
                                <template v-slot:activator="{ props: tooltip}">
                                    <v-icon style="color: wheat;" v-bind="tooltip">mdi-weather-partly-cloudy</v-icon>
                                </template>
                                <span>Weather Analysis</span>
                            </v-tooltip>
                        </v-list-item-title>
                     </v-list-item>
                </v-list>
            </v-navigation-drawer>
    
            <!-- Dynamic Drawer -->
            <v-navigation-drawer v-model="isRightDrawerOpen" location="right" :width="250">
                <!-- Render Content Dynamically Based on `activeTool` -->
                <div v-if="activeTool === 'search'">
                    <v-card elevation="0">
                        <v-card-title>
                            <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Search for a place</div>
                        </v-card-title>
                        <v-divider :thickness="2" color="black"></v-divider>
                        <v-card-text>
                            <v-text-field v-model="searchQuery" clearable prepend-inner-icon="mdi-magnify" @keydown.enter="onSearchInput" style="margin-top: 20px; margin-bottom: 30px;" placeholder="Type to Search ..." outlined></v-text-field>
                        </v-card-text>
                    </v-card>
                    <v-divider :thickness="3"></v-divider>
                    <v-img src="../assets/rightPng/search_tool.png" style="margin-top: 100px; opacity: 0.8;" contain></v-img>
                </div>
                <div v-else-if="activeTool === 'measurement'">
                    <v-card elevation="0">
                        <v-card-title>
                            <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Measurement Tool</div>
                        </v-card-title>
                        <v-divider :thickness="2" color="black"></v-divider>
                        <v-card-text style="margin-bottom: 30px; margin-top: 10px;">
                            <v-container class="icon-container" justify="center">
                                <v-row justify="center">
                                    <v-col cols="6" class="text-center">
                                        <v-btn :color="activeMeasurement === 'Length' ? 'blue' : ''" prepend-icon="mdi-pulse" stacked @click="activateMeasurement('Length')">Length</v-btn>
                                    </v-col>
                                    <v-col cols="6" class="text-center">
                                        <v-btn :color="activeMeasurement === 'Area' ? 'blue' : ''" prepend-icon="mdi-pentagon-outline" stacked @click="activateMeasurement('Area')">Area</v-btn>
                                    </v-col>
                                    <v-col cols="6" class="text-center">
                                        <v-btn color="#700B0B" prepend-icon="mdi-delete" stacked @click="clearMeasurements" v-tooltip="'Clear or Deactivate'">Clear </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider :thickness="3"></v-divider>
                    <v-img src="../assets/rightPng/measure_tool.png" style="margin-top: 50px;opacity: 0.8;" contain></v-img>
                </div>
                <div v-else-if="activeTool === 'cropTool'">
                    <v-card elevation="0">
                        <v-card-title>
                            <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Area of Interest</div>
                        </v-card-title>
                        <v-divider :thickness="2" color="black"></v-divider>
                        <v-card-text style="margin-bottom: 30px; margin-top: 10px;">
                            <v-container class="icon-container" justify="center">
                                <v-row justify="center">
                                    <v-col cols="5" class="text-center">
                                        <v-btn :color="cropToolActive ? 'blue' : ''" prepend-icon="mdi-rectangle-outline" stacked v-tooltip="'Area of Interest'" @click="toggleCropTool">A O I</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                    </v-card>
                    <v-divider :thickness="3"></v-divider>
                    <v-img src="../assets/rightPng/crop_tool.png" style="margin-top: 80px; opacity: 0.7;" max-height="300" contain></v-img>
                </div>
                <div v-else-if="activeTool === 'weatherAnalysis'">
                    <v-card elevation="0">
        <v-card-title>
            <div class="text-h5" style="font-family: 'Poppins', sans-serif; font-weight:500; text-align: center;">Weather Analysis</div>
        </v-card-title>
        <v-divider :thickness="2" color="black"></v-divider>
        <v-card-text>
            <div v-if="weatherError" class="text-center text-error">
                <v-icon large color="red">mdi-alert</v-icon>
                <p>{{ weatherError }}</p>
            </div>
            <div v-else-if="weatherData">
                <ul>
                    <li v-for="(value, key) in weatherData" :key="key">
                        <strong>{{ key }}:</strong> {{ value }}
                    </li>
                </ul>
            </div>
            <div v-else class="text-center">
                <v-progress-circular indeterminate color="blue"></v-progress-circular>
                <p>Loading Weather Data...</p>
            </div>
        </v-card-text>
    </v-card>
    <v-divider :thickness="3"></v-divider>
                    <v-img src="../assets/rightPng/weather_tool.png" style="margin-top: 80px; opacity: 0.7;" max-height="300" contain></v-img>
                </div>
            </v-navigation-drawer>
        </v-main>
    </div>
    </template>
    
    <script>
    import eventBus from '@/event-bus';
    
    export default {
        name: 'RightSideBar',
        data() {
            return {
                // Right 
                isRightDrawerOpen: false,
                activeTool: null,
                searchQuery: '',
                activeMeasurement: null,
                cropToolActive: false,

                weatherData: null,
                isWeatherLoading: false,
                 weatherError: null,
            };
        },   
        methods: {
            openRightDrawer(tool) {
                if (this.activeTool === tool && this.isRightDrawerOpen) {
                    this.isRightDrawerOpen = false;
                    this.activeTool = null;
                } else {
                    this.activeTool = tool;
                    this.isRightDrawerOpen = true;
                }
            },
            onSearchInput() {
            eventBus.emit('search-query', this.searchQuery);
            },
            activateMeasurement(type) {
                this.activeMeasurement = type;
                eventBus.emit('set-measurement-mode', type);
            },
            clearMeasurements() {
                this.activeMeasurement = null;
                eventBus.emit('clear-measurements');
            },
            toggleCropTool() {
                this.cropToolActive = !this.cropToolActive; 
                eventBus.emit('cropToolToggled', this.cropToolActive); 
            },  
        },
    };
    </script>