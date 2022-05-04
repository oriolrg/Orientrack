import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
}

const app = initializeApp(firebaseConfig)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app)

export { auth,db }