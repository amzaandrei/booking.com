import admin from 'firebase-admin';

import { googleApplicationCredentials } from './settings';

const serviceAccount = require(googleApplicationCredentials);

// const serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mamaproject-a52e4.firebaseio.com',
});

export const messaging = admin.messaging();
export const db = admin.firestore()