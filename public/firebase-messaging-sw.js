
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyCkOGcys40rOT399iz13j9KrThyxvup0jE",
    authDomain: "mamaproject-a52e4.firebaseapp.com",
    databaseURL: "https://mamaproject-a52e4.firebaseio.com",
    projectId: "mamaproject-a52e4",
    storageBucket: "mamaproject-a52e4.appspot.com",
    messagingSenderId: "1012639560804",
    appId: "1:1012639560804:web:390ada8a73bf9b2b13db71",
    measurementId: "G-7MXTVM2MBN"
  };

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});