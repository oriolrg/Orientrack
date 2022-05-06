
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { auth } from '../firebase';

export default {
    data() {
        return {
            docData : {
                id_usuari:null,
                nom: null,
                kmTotals: null,
                dateCarregaTrack: new Date(),
                tempsTrack: "55min",
                waiPoints: {
                        q: {
                        s: 4,
                        e: "hello"
                        },
                },
                
            }
        };
    },
    methods: {
        //Emmagatzemo les dades del track carregat
        async saveData() {
            this.docData.id_usuari = auth.currentUser.uid;
            this.docData.nom = this.nom;
            //Obting els waipoints del track carregat     
            this.docData.waiPoints = this.getWaipoints();      
            try {
                //TODO completar la variable correr amb el tipus d'activitat que es tracti
                const nouTrackRef = doc(db, "tracks", "correr", "track", this.docData.nom);
                await setDoc(nouTrackRef, this.docData);
                this.missatgeEstat = "Activitat guardada";
                console.log("Emmagatsemat a bbdd: ", this.docData.nom);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        getWaipoints(){
            var track = [];
            for (let index = 0; index < this.content.features[0].geometry.coordinates.length ; index += this.getNumberPoints(this.content)) {
                track.push(
                {
                    longitud:this.content.features[0].geometry.coordinates[index][0],
                    latitud:this.content.features[0].geometry.coordinates[index][1],
                    altitud:this.content.features[0].geometry.coordinates[index][2],
                    spoiler:null,
                }
                );                    
            }
            return track;            
        }
    }
 }
 