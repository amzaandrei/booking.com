"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotificationToClient = void 0;

var _firebaseInit = require("./firebaseInit");

var sendNotificationToClient = function sendNotificationToClient(tokens, data) {
  // Send a message to the device corresponding to the provided
  // registration token.
  _firebaseInit.messaging.sendMulticast({
    tokens: tokens,
    data: data
  }).then(function (response) {
    // Response is an object of the form { responses: [] }
    var successes = response.responses.filter(function (r) {
      return r.success === true;
    }).length;
    var failures = response.responses.filter(function (r) {
      return r.success === false;
    }).length;
    console.log('Notifications sent:', "".concat(successes, " successful, ").concat(failures, " failed"));
  }).catch(function (error) {
    console.log('Error sending message:', error);
  });
};

exports.sendNotificationToClient = sendNotificationToClient;