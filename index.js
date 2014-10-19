var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

 app.use("/css", express.static(__dirname + '/css'));
 app.use("/js", express.static(__dirname + '/js'));


// app.use("/mic-animate.gif", express.static(__dirname + '/mic-animate.gif'));
// app.use("/mic-slash.gif", express.static(__dirname + '/mic-slash.gif'));
// app.use("/mic.gif", express.static(__dirname + '/mic.gif'));

//io.on('connection', function(socket){
  // console.log('a user connected');
  //
  // //Send user a list of stuff
  // //holdingArry = getPast(client);
  // socket.on("send past", function(msg){
  //   client.lrange(['mes1',0,-1], function (err, reply) {
  //     io.emit('past messages', reply);
  //   }, redis.print);
  // });
  //
  //
  // socket.on("chat message", function(msg){
  //   //Print message to db
  //   client.rpush('mes1', msg, redis.print);
  //   io.emit('chat message', msg);
  // });
  // socket.on('disconnect',function(){
  //   console.log('user disconnect');
  // });
//});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
