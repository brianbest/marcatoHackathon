var express = require('express');
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html');
});
 app.use("/questions.html", express.static(__dirname + '/questions.html'));
 app.use("/instr.html", express.static(__dirname + '/instr.html'));
 app.use("/css", express.static(__dirname + '/css'));
 app.use("/js", express.static(__dirname + '/js'));
 app.use("/fonts", express.static(__dirname + '/fonts'));
 app.use("/img", express.static(__dirname + '/img'));


http.listen(3000, function(){
  console.log('listening on *:3000');
});
