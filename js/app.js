'use strict';

var app = require('http').createServer();
var io = require('socket.io')(app);


app.listen(3000);


io.on('connection', function (socket) {
  //socket代表和客户端连接
  socket.emit('news', { hello: 'world' });//派发事件到前端,发送数据对象到前端
  socket.on('my other event', function (data) {
    console.log(data);
  });
});