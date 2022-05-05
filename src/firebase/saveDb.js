
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

export default {
    data() {
        return {
            docData : {
                id_usuari:null,
                nom: null,
                kmTotals: 3.14159265,
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
            //Obting els waipoints del track carregat
            this.getWaipoints();            
            try {
                await setDoc(doc(db, "track", this.docData.nom), this.docData);
                this.missatgeEstat = "Activitat guardada";
                console.log("Emmagatsemat a bbdd: ", this.docData.nom);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
    }
 }
 