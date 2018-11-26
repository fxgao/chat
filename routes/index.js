let express = require('express');
let app = express();

let wbIO = require("./wbIO")

module.exports = function (app) {
  app.use('/socket.io/', wbIO)
}
