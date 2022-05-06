import {calcularDistanciaEntreCoordenades} from "../../funcionsTracks/index.js"

export default {
    methods: {
        readFile() {
            this.file = this.$refs.doc.files[0];
            let gpxParser = require('gpxparser');
            const reader = new FileReader();
            if (this.file.name.includes(".gpx")) {
                reader.onload = (res) => {
                    //Create gpxParser Object
                    var gpx = new gpxParser(); 
                    //parsejo el fitxer
                    gpx.parse(res.target.result)
                    //Converteixo la lectura gpx del fitxer a json i l'assigno a this.content
                    this.content = gpx.toGeoJSON();
                    //Centro el mapa a l'inici del track nou assignant la coordenada inicial del fitxer a this.center
                    this.center[0] = this.content.features[0].geometry.coordinates[0][0]
                    this.center[1] = this.content.features[0].geometry.coordinates[0][1]
                    this.dades = true;
                    this.loading = false;
                    //Crido el generador del mapa

                    this.numPuntsCoordSalt = this.getSaltNumberPoints();
                    this.numPuntsSalt = this.getNumberPoints();
                    this.docData.kmTotals = this.getKmTotals();
                    this.createMap();
                };
                reader.onerror = (err) => console.log(err);
                reader.readAsText(this.file);
            } else {
                alert("El format no es gpx, pot donar error");
                
            }
        },
        getWaipoints(content){
            var track = [];
            for (let index = 0; index < content.features[0].geometry.coordinates.length ; index += this.getNumberPoints(content)) {
                track.push(
                {
                    longitud:content.features[0].geometry.coordinates[index][0],
                    latitud:content.features[0].geometry.coordinates[index][1],
                    altitud:content.features[0].geometry.coordinates[index][2],
                    spoiler:null,
                }
                );                    
            }
            return track;
        },
        //Obting el numero de punts de salt
        getNumberPoints(){
            return parseInt(this.content.features[0].geometry.coordinates.length  / this.getSaltNumberPoints());
        },
        //Obting el numero de punts de salt
        getSaltNumberPoints(){
            return parseInt(this.content.features[0].geometry.coordinates.length / 10)
        },
        //Obting els km totals de l'activitat
        getKmTotals(){
            //TODO calcul km totals i afegir al guardar
            var total = 0;
            for (let index = 0; index < this.content.features[0].geometry.coordinates.length-1 ; index += 1) {
            total += calcularDistanciaEntreCoordenades(
                this.content.features[0].geometry.coordinates[index][1],
                this.content.features[0].geometry.coordinates[index][0],
                this.content.features[0].geometry.coordinates[index+1][1],
                this.content.features[0].geometry.coordinates[index+1][0],
            )
            }
            return total;
        },
        //Obting temps l'activitat
        getTempsTotal(){
    
        }
    }
}