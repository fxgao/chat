let express = require('express');
let sio = require("socket.io")
let path = require('path');
let  app = express();

//catch webSocket
let io = sio.listen(app)
io.sockets.on('connection',function(scoket){
  scoket.on("message",function(){

  })
})
function userLogin(){
    
}

exports.login = userLogin;