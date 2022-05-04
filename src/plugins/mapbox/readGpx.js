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
                    this.createMap();
                };
                reader.onerror = (err) => console.log(err);
                reader.readAsText(this.file);
            } else {
                alert("El format no es gpx, pot donar error");
                
            }
        },
    }
}