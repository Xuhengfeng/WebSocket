/**
* 徐横峰 
* 启动本地服务器   node websocket.js 
* 2017.08.30
**/
'use strict';
 
const PORT = 3000;
let clientCount = 0;//客户端 数量

let ws = require("nodejs-websocket");

let server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.nickName = 'user' + clientCount;
    let mes = {};
    mes.type = 'enter';
    mes.data = conn.nickName + 'comes in';
    broadcast(JSON.stringify(mes));//对刚进来的每个客户端进行消息的广播!
    
    //监听前端 发送消息str事件
    conn.on("text", function (str) {
        console.log("Received "+str)
        let mes = {};
        mes.type = "message";
        mes.data = conn.nickName +'says: ' + str;
        broadcast(JSON.stringify(mes));
    })
    
    //监听前端 关闭事件
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        let mes = {};
        mes.type = "left";
        mes.data = conn.nickName + 'left';
        broadcast(JSON.stringify(mes));
        clientCount--;
    })
    
    conn.on("error", function (err) {
        console.log(err)
    })
    
}).listen(PORT);

//在服务端打印log输出
console.log('websocket server listen on port:'+PORT)


//广播消息的函数;
function broadcast(str) {
	server.connections.forEach((item) => {
		item.sendText(str);//设置前端响应的数据 e.data
	})
}
