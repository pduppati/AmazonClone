import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // For Firestore database
import { getAuth } from 'firebase/auth';
import * as firebase from 'firebase/app';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDxufV9H1JxD5rxjonfLDPF0pT8iMOyhtE",
    authDomain: "fir-540be.firebaseapp.com",
    projectId: "fir-540be",
    storageBucket: "fir-540be.appspot.com",
    messagingSenderId: "216064130790",
    appId: "1:216064130790:web:c24fa976ab3830dc124527",
    measurementId: "G-EP8Q2JZ4S7"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };