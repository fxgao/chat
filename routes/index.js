let express = require('express');
let wbIO = require("./wbIO")

module.exports = function (app) {
  app.use('/wbIO', wbIO)
}
