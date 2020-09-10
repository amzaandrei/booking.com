import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCkOGcys40rOT399iz13j9KrThyxvup0jE",
    authDomain: "mamaproject-a52e4.firebaseapp.com",
    databaseURL: "https://mamaproject-a52e4.firebaseio.com",
    projectId: "mamaproject-a52e4",
    storageBucket: "mamaproject-a52e4.appspot.com",
    messagingSenderId: "1012639560804",
    appId: "1:1012639560804:web:390ada8a73bf9b2b13db71",
    measurementId: "G-7MXTVM2MBN"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

export default db