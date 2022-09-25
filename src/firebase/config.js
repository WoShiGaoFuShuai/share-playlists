import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';



const firebaseConfig = {
   apiKey: "AIzaSyAqBuTbhN4c5omrkcobsb9z11otkn8vpRg",
   authDomain: "app-playlists-b8607.firebaseapp.com",
   projectId: "app-playlists-b8607",
   storageBucket: "app-playlists-b8607.appspot.com",
   messagingSenderId: "1006514946086",
   appId: "1:1006514946086:web:7c514fae62b3fc36b7e6e7"
 };

 //init firebase
 firebase.initializeApp(firebaseConfig);

 //init services

 const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore, projectAuth, projectStorage, timestamp }