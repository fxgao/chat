let express = require('express');
let sio = require("socket.io")
let path = require('path');
let app = express();
let io = sio.listen(app)

//catch webSocket
function catchWebSocket() {
    io.sockets.on('connection', function (scoket) {
        scoket.on("message", function () {

        })
    })
}
exports.catchWb = catchWebSocket;