<template>
    <div ref="map" style=" width: 100%;height: 100%;position: relative;">
        <div id="mouse-pos" style="position: absolute; bottom:6.3%; left: 0%; background-color: black;color: white; padding: 0.1em 0.1em; border-radius: 4px; font-family: 'Poppins', sans-serif ; font-size: calc(4.5px + 0.45vw); z-index: 1000; pointer-events: none; max-width: 30%; text-align: center;"></div>
        <v-icon class="resetButton"  @click="handleReset">mdi-refresh</v-icon>  
    </div>
    </template>
      
    <script>
    import 'ol/ol.css';
    import {Map} from 'ol';
    import BingMaps from 'ol/source/BingMaps';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import OSM from 'ol/source/OSM';
    import LayerSwitcher from 'ol-layerswitcher';
    import 'ol-layerswitcher/dist/ol-layerswitcher.css';
    import TileWMS from 'ol/source/TileWMS';
    import {get as getProjection} from 'ol/proj';
    import FullScreen from 'ol/control/FullScreen';
    import {Draw} from 'ol/interaction';
    import {Vector as VectorSource} from 'ol/source';
    import { Vector as VectorLayer} from 'ol/layer';
    import {ScaleLine} from 'ol/control.js';
    import {getLength, getArea} from 'ol/sphere';
    import Overlay from 'ol/Overlay.js';
    import eventBus from '@/event-bus';
    import { createBox } from 'ol/interaction/Draw';
    import MousePosition from 'ol/control/MousePosition.js';
    import {createStringXY} from 'ol/coordinate.js';
    import axios from 'axios';
    
    export default {
        name: 'MapComponent',
        props: {
            center: {type: Array,required: true,},
            zoom: {type: Number,required: true,},
            minZoom: {type: Number, required: true,},
            dashLayers: {type: Array,required: true,},
        },
        mounted() {
            const osm = new TileLayer({
                title: 'Open Street Map',
                type: 'overlay',
                source: new OSM(),
                visible: false,
            });
            const bing = new TileLayer({
                title: 'Bing',
                type: 'overlay',
                source: new BingMaps({ key: "ArIdKOW0eb8TRcLZdt0l2cG8kHA_uW92yIvx1aFzsQ1xHxpnVRMGmO0N0neY8P90", imagerySet: 'AerialWithLabels',
                }),
                visible: true,
            });
            const bhuvan = new TileLayer({
                title: 'Bhuvan',
                type: 'overlay',
                source: new TileWMS({
                    params: {FORMAT: "image/jpeg", VERSION: "1.1.1", tiled: true, LAYERS: "bhuvan_imagery", exceptions: "application/vnd.ogc.se_inimage",},
                    url: "https://bhuvan-ras2.nrsc.gov.in/tilecache/tilecache.py",
                }),
                visible: false,
            });
            const indiaCountryBoundary = new TileLayer({
                title: 'India Boundary',
                type: 'overlay',
                source: new TileWMS({
                    url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                    params: { 'LAYERS': 'india_country_boundary_4326', 'TILED': true, 'VERSION': '1.1.1', },
                    serverType: 'geoserver',
                    tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
                }),
                visible: true,
            });
            const StatesBoundary = new TileLayer({
                title: 'State Boundary',
                type: 'overlay',
                source: new TileWMS({
                    url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                    params: {'LAYERS': 'states_boundary_ganga','TILED': true,'VERSION': '1.1.1', },
                    serverType: 'geoserver',
                    tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
                }),
                visible: false,
            });
            const DistrictsBoundary = new TileLayer({
                title: 'District Boundary',
                type: 'overlay',
                source: new TileWMS({
                    url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                    params: {'LAYERS': 'district_touch','TILED': true,'VERSION': '1.1.1',},
                    serverType: 'geoserver',
                    tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
                }),
                visible: false,
            });
            const SubDistrictsBoundary = new TileLayer({
                title: 'Sub-District Boundary',
                type: 'overlay',
                source: new TileWMS({
                    url: 'http://192.168.17.37:8080/geoserver/Geo-Ganga/wms?',
                    params: {'LAYERS': 'subdistrict_touch','TILED': true,'VERSION': '1.1.1',},
                    serverType: 'geoserver',
                    tileGrid: new TileWMS().getTileGridForProjection(getProjection('EPSG:4326')),
                }),
                visible: false,
            });
       
    
            const baseMaps = [bhuvan, osm, bing, SubDistrictsBoundary,DistrictsBoundary,StatesBoundary,indiaCountryBoundary,  ];
       
            const map = new Map({
                target: this.$refs.map,
                layers: baseMaps, 
                view: new View({projection: 'EPSG:4326',center: this.center,zoom: this.zoom,minZoom: this.minZoom, }),
            });
               
    
            const mousePositionControl = new MousePosition({projection: 'EPSG:4326',coordinateFormat: createStringXY(4),target: document.getElementById('mouse-pos'), className: '',});
            map.addControl(mousePositionControl);
    
            const scaleControl = new ScaleLine({units: 'metric',bar: true,steps: 5,text: true,minWidth: 200,dpi: 96,target: 'scale-line',});
            map.addControl(scaleControl);
    
            const layerSwitcher = new LayerSwitcher({activationMode:'click',startActive:false,tipLabel:'Layers',collapseLabel:'\u00BB',expandLabel:'\u00AB',showRoot: false,});
            map.addControl(layerSwitcher);
    
            const fullScreen = new FullScreen({tipLabel: 'Fullscreen', });
            map.addControl(fullScreen);
    
            // Measurement Layer
            this.measurementSource = new VectorSource();
            this.measurementLayer = new VectorLayer({
                source: this.measurementSource,
                style: {'fill-color': 'rgba(255, 255, 255, 0.2)', 'stroke-color': 'rgba(255, 255, 255, 0.8)','stroke-lineDash': [10, 10],'stroke-width': 3, },
            });
            map.addLayer(this.measurementLayer);
    
              // Crop Layer
              this.cropSource = new VectorSource();
                this.cropLayer = new VectorLayer({
                source: this.cropSource,
                style: {'stroke-color': 'yellow','stroke-lineDash': [10, 10],'stroke-width': 3,}
            });
            map.addLayer(this.cropLayer);
    
            this.map = map;
            this.cropInteraction = null;
            this.measurementOverlays = [];
            // Listen to events from RightSideBar
            eventBus.on('set-measurement-mode', this.setMeasurementMode);
            eventBus.on('clear-measurements', this.clearMeasurements);
            eventBus.on('cropToolToggled', this.toggleCropTool);
            eventBus.on('search-query', this.handleSearchQuery);

        },

        methods: {
            handleReset() {
                const view = this.map.getView();
                view.animate({center: this.center, zoom: this.zoom, rotation: 0, duration: 1000 });
            },
            setMeasurementMode(mode) {
                this.measurementMode = mode;
                this.activateMeasurement(mode);
            },
            activateMeasurement(mode) {
                const type = mode === 'Length' ? 'LineString' : 'Polygon';
                this.drawInteraction = new Draw({source: this.measurementSource,type: type, });
                const measurementOverlay = document.createElement('div');
                measurementOverlay.className = 'measurement-overlay';
                measurementOverlay.style.position = 'absolute';
                measurementOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                measurementOverlay.style.color = 'white';
                measurementOverlay.style.padding = '2px 4px';
                measurementOverlay.style.borderRadius = '4px';
                measurementOverlay.style.fontSize = '12px';
                measurementOverlay.style.pointerEvents = 'none';
                const overlay = new Overlay({element: measurementOverlay,positioning: 'center-center',stopEvent: false,});
                this.map.addOverlay(overlay);

                this.drawInteraction.on('drawstart', (event) => {
                    const geometry = event.feature.getGeometry();
                    geometry.on('change', () => {
                        const coordinates = geometry.getLastCoordinate();
                        overlay.setPosition(coordinates);
                        const transformedGeometry = geometry.clone().transform('EPSG:4326', 'EPSG:3857');
                        if (mode === 'Length') {
                            const length = getLength(transformedGeometry);
                            const displayLength =
                                length > 100 ?
                                `${(length / 1000).toFixed(2)} km` :
                                `${length.toFixed(2)} m`;
                            measurementOverlay.innerHTML = `Length: ${displayLength}`;
                        } else if (mode === 'Area') {
                            const area = getArea(transformedGeometry);
                            const displayArea = area > 10000 ? `${(area / 1e6).toFixed(2)} km²` : `${area.toFixed(2)} m²`;
                            measurementOverlay.innerHTML = `Area: ${displayArea}`;
                            overlay.setPosition(geometry.getInteriorPoint().getCoordinates());
                        }
                    });
                });
                this.drawInteraction.on('drawend', (event) => {
                    const feature = event.feature;
                    const geometry = feature.getGeometry();
                    const transformedGeometry = geometry.clone().transform('EPSG:4326', 'EPSG:3857');
                    if (mode === 'Length') {
                        const length = getLength(transformedGeometry);
                        const displayLength = length > 100 ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
                        measurementOverlay.innerHTML = `Length: ${displayLength}`;
                    } else if (mode === 'Area') {
                        const area = getArea(transformedGeometry);
                        const displayArea = area > 10000 ? `${(area / 1e6).toFixed(2)} km²` : `${area.toFixed(2)} m²`;
                        measurementOverlay.innerHTML = `Area: ${displayArea}`;
                        overlay.setPosition(geometry.getInteriorPoint().getCoordinates());
                    }
                });
                this.map.addInteraction(this.drawInteraction);
                this.measurementOverlays.push(overlay);
            },
          
            clearMeasurements() {
                if (this.drawInteraction) {
                    this.map.removeInteraction(this.drawInteraction);
                }
                if (this.modifyInteraction) {
                    this.map.removeInteraction(this.modifyInteraction);
                }
                this.measurementSource.clear();
                this.measurementOverlays.forEach((overlay) => {
                    this.map.removeOverlay(overlay);
                });
                this.measurementOverlays = []; 
            },

            toggleCropTool(isActive) {
                if (isActive) {
                    this.activateCropTool();
                } else {
                    this.deactivateCropTool();
                }
            },
            activateCropTool() {
                this.cropInteraction = new Draw({
                    source: this.cropSource,
                    type: 'Circle',
                    geometryFunction: createBox(),  
                });
                this.cropInteraction.on('drawend', (event) => {
                    const feature = event.feature;
                    const geometry = feature.getGeometry();
                    const extent = geometry.getExtent();
                    console.log('Box Area Extent:', extent);
                    this.map.getView().fit(extent, { duration: 800 });
                });
                this.map.addInteraction(this.cropInteraction);
            },
            deactivateCropTool() {
                if (this.cropInteraction) {
                    this.cropSource.clear();
                    this.map.removeInteraction(this.cropInteraction);
                }
            },
            handleSearchQuery(query) {
                console.log('Search query received:', query);
                this.searchPlace(query);
            },
            flyTo(location, zoomLevel) {
        const view = this.map.getView();
    
        // Animate the transition to the new location
        view.animate({
            center: location,
            zoom: zoomLevel,
            duration: 1000 // 5 seconds
        });
    },
            async searchPlace(query) {
                try {
                    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                        params: {q: query,format: 'json',addressdetails: 1,limit: 1, }
                    });
                    const results = response.data;
                    if (results.length > 0) {
                        const place = results[0];
                        const lat = parseFloat(place.lat);
                        const lon = parseFloat(place.lon);
                        this.flyTo([lon, lat], 19.4);
                    } else {
                        alert('Location not found!');
                    }
                } catch (error) {
                    console.error('Search failed', error);
                }
            },
        },
        beforeUnmount() {
        eventBus.off('search-query', this.handleSearchQuery);  
        eventBus.off('set-measurement-mode', this.setMeasurementMode);
      }
    };
    </script>

<style scoped>
.resetButton {top: 1%;right: 2.5%;position: absolute;padding: 0;color: var(--ol-subtle-foreground-color);font-weight: bold;text-decoration: none;font-size: inherit;text-align: center;height: 1.45em;width: 1.45em;line-height: .4em;background-color: var(--ol-background-color);border: none;border-radius: 2px;z-index: 1000;}
.resetButton:hover, .resetButton:focus {text-decoration: none;outline: 1px solid var(--ol-subtle-foreground-color);color: var(--ol-foreground-color);}
</style>
