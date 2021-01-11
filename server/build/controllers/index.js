"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _messages = require("./messages");

Object.keys(_messages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _messages[key];
    }
  });
});