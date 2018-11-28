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
let Message = require("./../controller/message")
let RoomExist = require("./../controller/roomExist")
let sendMessage = Message.sendMessage

//catch webSocket
let io = sio.listen(server)
io.sockets.on('connection', function (scoket) {

  //用户接入，触发Login事件，查询用户是否存在
  scoket.on("login", function (message) {
    userLogin(message,(res) =>{
      console.log(res)
      if(res.code == 1 || res.code == 1201){
        //将用户分入房间分组，便于之后组内广播
        for(let i=0;i<res.data.room.length;i++){
          socket.join('room'+res.data.room[i].roomId);
        }
        io.to(message.userId).emit("getUserRoomInfo")
      }else{
        console.log(res.code)
      }
    })
  })

  //用户发送消息，触发message事件
  scoket.on("message", function (message) {
    sendMessage(message,(res)=>{
      //用户发送消息成功
      if(res.code == 1 || res.code == 2){
        socket.broadcast.to('room')
        io.in("").emit("msgSuccess")
      }else{
        console.log(res.code,res.data)
      }
    })
  })

  //用户进入会话
    scoket.on("createChat",function(message){
      console.log(message)
      RoomExist(params,(res)=>{
         //用户发送消息成功
        socket.join('room'+res.data.room[i].roomId);
        if(res.code == 1 || res.code == 2){
          socket.broadcast.to('room')
          io.in("roomId"+res.roomId).emit("msgSuccess")
        }else{
          console.log(res.code,res.data)
        }
      })
    })
})

module.exports = router;
