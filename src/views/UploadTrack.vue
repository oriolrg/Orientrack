<template>
    <div class="main">
        <div class="flex">
        <!-- Map Display here 
            <div class="map-holder">
                <div id="map"></div>
            </div>-->
            <MapaComponent></MapaComponent>
            <!-- Coordinates Display here -->
            <div class="dislpay-arena">
                <div v-if="loading"><input type="file" ref="doc" @change="readFile()" /></div>
                <div v-if="dades">
                    <h1>Nom activitat: {{ nom }}</h1>
                    <input v-model="nom" placeholder="Nom activitat"  required>
                    <p>Latitud: {{ center[0] }}</p>
                    <p>Longitud: {{ center[1] }}</p>
                </div>
                <div v-if="dades" class="coordinates-header">
                    <p>Localització Inici: {{ location }}</p>
                    <div class="form-group">
                        <button type="button" class="copy-btn" @click="moveCenter">
                            Moure
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <button type="button" class="copy-btn" @click="saveActivitat">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapBox from '../plugins/mapbox/mapbox.js';
import readGpx from '../plugins/mapbox/readGpx.js';
import saveDb from '../firebase/saveDb.js';
import MapaComponent from '@/components/MapaComponent.vue'

export default {
    components: {
        MapaComponent,
    },
    mixins: [mapBox, readGpx, saveDb],
    data() {
        return {
            i:0,
            loading: true,
            dades: false,
            location: "",
            nom: null,
            access_token: process.env.VUE_APP_MAP_ACCESS_TOKEN,
            center: [null,null,],
            map: {},
            numCoord:null,
        };
    },

    mounted() {
    },
    methods: {
        saveActivitat(){
            if(this.nom){
                this.docData.nom = this.nom;
                console.log(this.getNumberPoints())
                for (let index = 0; index < this.content.features[0].geometry.coordinates.length ; index += this.getNumberPoints()) {
                    console.log(this.content.features[0].geometry.coordinates[index][0])
                    console.log(this.content.features[0].geometry.coordinates[index][1])
                    
                }
                this.saveData(this.docData);
            }else{alert("Introdueix el nom")}
        },
        getNumberPoints(){
            return parseInt(this.content.features[0].geometry.coordinates.length / 10)
        }
    },
};
</script>

<style scoped>
.main {
  padding: 45px 50px;
}
.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.map-holder {
  width: 65%;
}
#map {
  height: 70vh;
}
.dislpay-arena {
  background: #ffffff;
  box-shadow: 0px -3px 10px rgba(0, 58, 78, 0.1);
  border-radius: 5px;
  padding: 20px 30px;
  width: 25%;
}
.coordinates-header {
  margin-bottom: 50px;
}
.coordinates-header h3 {
  color: #1f2a53;
  font-weight: 600;
}

.coordinates-header p {
  color: rgba(13, 16, 27, 0.75);
  font-weight: 600;
  font-size: 0.875rem;
}
.form-group {
  position: relative;
}
.location-control {
  height: 30px;
  background: #ffffff;
  border: 1px solid rgba(31, 42, 83, 0.25);
  box-shadow: 0px 0px 10px rgba(73, 165, 198, 0.1);
  border-radius: 4px;
  padding: 0px 10px;
  width: 90%;
}
.location-control:focus {
  outline: none;
}
.location-btn {
  margin-top: 15px;
  padding: 10px 15px;
  background: #d80739;
  box-shadow: 0px 4px 10px rgba(73, 165, 198, 0.1);
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
}

.location-btn:focus {
  outline: none;
}
.disabled {
  background: #db7990;
  cursor: not-allowed;
}
.copy-btn {
  background: #f4f6f8 0% 0% no-repeat padding-box;
  border: 1px solid #f4f6f8;
  border-radius: 0px 3px 3px 0px;
  position: absolute;
  color: #5171ef;
  font-size: 0.875rem;
  font-weight: 500;
  height: 30px;
  padding: 0px 10px;
  cursor: pointer;
  right: 3.5%;
  top: 5%;
}
.copy-btn:focus {
  outline: none;
}
</style>
