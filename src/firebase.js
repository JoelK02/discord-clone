import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBGYvWJWBb206-9ehkejLamRAUC08G2cjw",
    authDomain: "discord-clone-ff540.firebaseapp.com",
    projectId: "discord-clone-ff540",
    storageBucket: "discord-clone-ff540.appspot.com",
    messagingSenderId: "610082297781",
    appId: "1:610082297781:web:866d22f81745ba0497ebfc",
    measurementId: "G-W33BEMGZG2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;