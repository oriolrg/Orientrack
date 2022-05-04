import mapboxgl from "mapbox-gl";
//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from "axios";

export default {
    methods: {
        async createMap() {
            try {
                this.numCoord = this.getNumberPoints();
                this.getLocation();
                //Guardo el token de mapbox a mapboxgl
                mapboxgl.accessToken = this.access_token;
                this.map = new mapboxgl.Map({
                    container: "map",
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: this.center,
                    zoom: 15,
                });
                //geocoder dona controls al mapa visualitzat
                /*let geocoder =  new MapboxGeocoder({
                    accessToken: this.access_token,
                    mapboxgl: mapboxgl,
                    marker: false,
                }); 
                this.map.addControl(geocoder);
                geocoder.on("result", (e) => {
                    const marker = new mapboxgl.Marker({
                        draggable: true,
                        color: "#D80739",
                    })
                    .setLngLat(e.result.center)
                    .addTo(this.map);
                    this.center = e.result.center;
                    marker.on("dragend", (e) => {
                        this.center = Object.values(e.target.getLngLat());
                    });
                });*/
                
                //console.log("kkkkk"+Object.keys(this.content.properties.name))
                //console.log("kkkkk"+this.content.properties.name)
                this.map.on('load', () => {
                    this.map.addSource("route", {
                        'type': 'geojson',
                        'data': {
                        'type': 'Feature',
                        'geometry': this.content.features[0].geometry
                        }
                    });
                    //Dibuixola nova capa amb les coordenades indicades al fitxer
                    this.map.addLayer({
                        'id': "route",
                        'type': 'line',
                        'source': "route",
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#f00',
                            'line-width': 3
                        }
                    });
                });
                
            } catch (err) {
                console.log("map error", err);
            }
        },
        //Obtenir la localitzacio del punt inicial
        async getLocation() {
            try {
                this.loading = true;
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
                );
                this.loading = false;
                this.location = response.data.features[0].place_name;
            } catch (err) {
                this.loading = false;
                console.log(err);
            }
        },
        copyLocation() {
            if (this.location) {
                navigator.clipboard.writeText(this.location);
                alert("Location Copied")
            }
            return;
        },
        moveCenter() {
            this.i +=this.numCoord;
            this.center[0] = this.content.features[0].geometry.coordinates[this.i][0];
            this.center[1] = this.content.features[0].geometry.coordinates[this.i][1];
            this.map.flyTo({
                center: [
                    this.center[0],
                    this.center[1]
                ],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        },
    }
 }