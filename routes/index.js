let express = require('express');
let wbIO = require("./wbIO")

module.exports = function (app) {
  app.use('/',function(req,res){
    res.send("welcome to fxgao's chat project!")
  })
  app.use('/wbIO', wbIO)
}
