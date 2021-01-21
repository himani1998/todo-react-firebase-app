import firebase from "firebase";

const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyDcU8lk3HrMNwUp9B-ALtL6mw6gsdVPnoY",
    authDomain: "todo-ap-cp-1ee73.firebaseapp.com",
    projectId: "todo-ap-cp-1ee73",
    storageBucket: "todo-ap-cp-1ee73.appspot.com",
    messagingSenderId: "40272349611",
    appId: "1:40272349611:web:226392cda7d1a79e76aaee",
    measurementId: "G-PHTZ9VV6Y9"
  });
  const db= firebaseApp.firestore();
export default db;