import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBJArBe2yKLIFKNfzUbnI1ggcSR844fF1o",
    authDomain: "vicious-library796.firebaseapp.com",
    projectId: "vicious-library796",
    storageBucket: "vicious-library796.firebasestorage.app",
    messagingSenderId: "1019613109673",
    appId: "1:1019613109673:web:d77be9f5991fe7fa4178b8"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)