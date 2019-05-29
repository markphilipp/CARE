"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.static('build'));
var server = app.listen(3000);
exports.default = server;
//# sourceMappingURL=index.js.map