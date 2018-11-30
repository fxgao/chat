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
let sendMessage = Message.sendMessage;

//catch webSocket
let io = sio.listen(server)
io.sockets.on('connection', function (socket) {

  //用户接入，触发Login事件，查询用户是否存在
  socket.on("login", function (message,fn) {
    userLogin(message,(res) =>{
      if(res.code == 1){
        if (res.data[0].room.length) {
          //将用户分入房间分组，便于之后组内广播
          for (let i = 0; i < res.data[0].room.length; i++) {
            console.log(res.data[0].room[i].roomId)
            socket.join('room' + res.data[0].room[i].roomId);
          }
        }
        fn(res.data[0]);
      }else{
        console.log(res.code)
      }
    })
  })

  //用户发送消息，触发message事件
  socket.on("message", function (message) {
    sendMessage(message,(res)=>{
      //用户发送消息成功
      if(res.code == 1){
        console.log(res.roomId)
        //给房间中所有人广播消息
        io.sockets.in('room' + res.roomId, res.data[0].chatContent[0]).emit("newMessage", res.data[0]);
        // socket.broadcast.to('room' + res.roomId, res.data[0].chatContent[0]).emit("newMessage", res.data[0])
      }else{
        console.log(res.code,res.data)
      }
    })
  })

  //用户进入聊天页面，检查是否存在房间
  socket.on("intoRoom", function (message,fn) {
    RoomExist(message,(res)=>{
      fn(res)
    })
  })

  //用户进入会话
  socket.on("createChat",function(message){
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
