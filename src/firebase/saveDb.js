
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
export default {
    data() {
        return {
            docData : {
                    nom: null,
                    kmTotals: 3.14159265,
                    dateCarregaTrack: new Date(),
                    arrayExample: [5, true, "hello"],
                    tempsTrack: "55min",
                    waiPoints: {
                            q: 5,
                            s: 4,
                            e: "hello"
                    },
                    
                }
        };
    },
    methods: {
        async saveData(docData) {
            try {
                await setDoc(doc(db, auth.currentUser.uid, docData.nom), docData);
                console.log("Emmagatsemat a bbdd: ", docData.nom);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
    }
 }