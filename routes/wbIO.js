let express = require('express');
let router = express.Router();
let app = express();
let http = require("http")
let server = http.Server(app)
let sio = require("socket.io")
server.listen(8001, () => {
  console.log("websocket listening on*:8001");
});

let userLogin = require("./../controller/login")


//catch webSocket
let io = sio.listen(server)
io.sockets.on('connection', function (scoket) {
  //用户接入，触发Login事件，查询用户是否存在
  scoket.on("login", function (message) {
    userLogin(message,(res) =>{
      console.log(res)
    })
  })
  scoket.on("message", function (message) {
    console.log(message)
  })
})

module.exports = router;
