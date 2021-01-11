"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.messaging = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _settings = require("./settings");

var serviceAccount = require(_settings.googleApplicationCredentials); // const serviceAccount = require('../serviceAccountKey.json')


_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(serviceAccount),
  databaseURL: 'https://mamaproject-a52e4.firebaseio.com'
});

var messaging = _firebaseAdmin.default.messaging();

exports.messaging = messaging;

var db = _firebaseAdmin.default.firestore();

exports.db = db;