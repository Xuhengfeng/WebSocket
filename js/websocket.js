'use strict';
 
const PORT = 3000;
let clientCount = 0;//客户端 数量

var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.nickName = 'user' + clientCount;
    broadcast(conn.nickName + 'come in');//对每个客户端进行消息的广播!
    
    conn.on("text", function (str) {
        console.log("Received "+str)
        broadcast(str);
//      conn.sendText(str.toUpperCase()+"!!!")
    })
    
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        broadcast(conn.nickName + 'left');
        clientCount--;
    })
    
    conn.on("error", function (err) {
        console.log(err)
    })
    
}).listen(PORT);

console.log('websocket server listen on port:'+PORT)


//广播消息的函数;
function broadcast(str) {
	server.connections.forEach((item) => {
		item.sendText(str);//设置前端响应的数据 e.data
	})
}
