import firebase from 'firebase'
import 'firebase/messaging';

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
export const auth = firebase.auth()
export const db = firebaseApp.firestore()
const messaging = firebase.messaging();
export const apart1Ref = firebase.storage().ref('apartament1')
export const apart2Ref = firebase.storage().ref('apartament2')

const provider = new firebase.auth.GoogleAuthProvider()

export const generateUserDocument = async (user, additionalData) => {
  if(!user) return
  const userRef = db.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if(!snapshot.exists) {
    const { uid, email, displayName } = user
    try {
      await userRef.set({
        uid: uid,
        userType: (email === "iulian@ffem.com" ) ? "admin" : "user",
        displayName,
        email,
        ...additionalData
      })
    } catch (err) {
      console.error("Error creating user document", err)
    }
  }
  return getUserDocument(user.uid)
}

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

export const requestFirebaseNotificationPermission = () => {
  if (firebase.messaging.isSupported()) {
    return new Promise((resolve, reject) => {
      messaging
        .requestPermission()
        .then(() => messaging.getToken())
        .then((firebaseToken) => {
          resolve(firebaseToken);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } else {
    console.log('no-support :(')
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });