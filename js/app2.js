'use strict';

var app = require('http').createServer();
var io = require('socket.io')(app);

const PORT = 3000;
app.listen(PORT);
let clientCount = 0;//客户端 数量

io.on('connection', function (socket) {
	clientCount++;
  socket.nickName = 'user' + clientCount;
  //socket代表和客户端连接
  //io 代表广播 消息
  io.emit('enter', socket.nickName + 'comes in');//派发事件到前端,发送数据对象到前端
  socket.on('message', function (str) {
  	io.emit('enter', socket.nickName + 'says:' + str);
  });
  socket.on('disconnect', function () {
  	io.emit('left', socket.nickName + 'left');
  	clientCount--;
  })
});


//在服务端打印log输出
console.log('websocket server listen on port:'+PORT)



