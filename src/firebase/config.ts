import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBOcCDokf9-GapBoneo-J2p04lzsIRudEE",
    authDomain: "spotify-addon-5f9f2.firebaseapp.com",
    projectId: "spotify-addon-5f9f2",
    storageBucket: "spotify-addon-5f9f2.appspot.com",
    messagingSenderId: "1025447924082",
    appId: "1:1025447924082:web:bcd3303374393eb4e30deb",
    measurementId: "G-1BGQCX55Q7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, db, auth };