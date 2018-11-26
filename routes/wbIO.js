let express = require('express');
let router = express.Router();
let app = express();
let http = require("http")
let server = http.createServer(app)
let sio = require("socket.io")

//catch webSocket
let io = sio.listen(server)
io.sockets.on('connection',function(scoket){
  console.log("客户端连接",scoket)
  scoket.on("login",function(){

  })
  scoket.on("message",function(){
    console.log("abc")
  })
})

router.get("/",function(){
    console.log("fxgao")
})

module.exports = router;
