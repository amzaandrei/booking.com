"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleApplicationCredentials = exports.connectionString = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

var connectionString = process.env.CONNECTION_STRING;
exports.connectionString = connectionString;
var googleApplicationCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
exports.googleApplicationCredentials = googleApplicationCredentials;