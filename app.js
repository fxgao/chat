let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let config = require("config-lite")(__dirname);

let router = require('./routes/index');
let mongo = require("./mongodb/mongo.js");

const app = express();

// let http = require("http")
// let server = http.Server(app)
// let sio = require("socket.io")
// server.listen(8001,()=>{
//   console.log("websocket listening on*:8001");
// });

// //catch webSocket
// let io = sio.listen(server)
// io.sockets.on('connection',function(scoket){
//   scoket.on("login",function(){
    
//   })
//   scoket.on("message",function(message){
//     console.log(message)
//   })
// })

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//static resource
app.use(express.static(path.join(__dirname, 'public')));

//set Headers
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type,Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("X-Powered-By", "3.2.1");
  if (req.url !== "/favicon.ico") {
    if (req.method == "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  } else {
    res.sendStatus(404);
  }
});

//set routers
router(app);

//close servers
app.on("close", function (error) {
  mongo.disconnect(function (err) {
    console.log("DB discontented")
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//set listening port
app.listen(config.port);

//connect mongoDB
mongo.connect(function (error) {
  if (error) throw error;
});

module.exports = app;
