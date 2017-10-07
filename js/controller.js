'use strict';

/**
 * 导入数据模型模块
 * 安装 npm install -g browserify  依赖
 * 使用browserify 模块 允许浏览器 模块引入, require()是只存在服务端,运用node.js服务端环境才能使用
 * 早期的npm 模块都是commonjs规范写的
 * 输入命令:  browserify controller.js > bunble.js  
 * browserify 供浏览器环境使用的模块打包工具
 */
let dataModal = require('./model.js');
let gameData = dataModal.gameData;
let nextData = dataModal.nextData;

/**
 * 方块控制
 * none current done 分别代表不同样式的小方块
 */
const none = 0;       
const current = 1;
const done = 2;

/**
 * 缓存数据模型
 * 缓存二维数组
 */
let gameDivs = [];
let nextDivs = [];

/**
 * 初始显示左边容器的存在的方块
 */
let initGame = () => {
	for (let i=0; i<gameData.length; i++) {                                    //先遍历每一行
		let gameDiv = [];                                                      //缓存一维数组
		for (let j=0; j<gameData[0].length; j++) {                             //再遍历每一行中的每一列
			let newNode = document.createElement('div');                       //创建小方块
			newNode.className = 'none';                                        //设置方块的显隐
			newNode.style.top = i*20 + 'px';                                   //设置小方块的位置
			newNode.style.left = j*20 + 'px';
			document.getElementById('game').appendChild(newNode);              //添加小方块
			gameDiv.push(newNode);//一维数组;
		}
		gameDivs.push(gameDiv);//二维数组;
	}
}

/**
 * 初始显示右边容器的存在的方块
 */
let initNext = () => {
	for (let i=0; i<nextData.length; i++) {
		let nextDiv = [];                                                      //缓存一维数组
		for (let j=0; j<nextData[0].length; j++) {
			let newNode = document.createElement('div');
			newNode.className = 'none';
			newNode.style.top = i*20 + 'px';
			newNode.style.left = j*20 + 'px';
			document.getElementById('next').appendChild(newNode);
			nextDiv.push(newNode);//一维数组;
		}
		nextDivs.push(nextDiv);//二维数组;
	}
}

/**
 * 刷新左边的容器存在的方块
 */
let refreshGame = () => {
	for (let i=0; i<gameData.length; i++) {
		for (let j=0; j<gameData[0].length; j++) {
			if (gameData[i][j] == 0) {
				console.log(gameData)
				gameDivs[i][j].className = 'none';
			} else if (gameData[i][j] == 1) {
				gameDivs[i][j].className = 'done';
			} else if (gameData[i][j] == 2) {
				gameDivs[i][j].className = 'current';
			}
		}
	}
}

/**
 * 刷新右边的容器存在的方块
 */
let refreshNext = () => {
	for (let i=0; i<nextData.length; i++) {
		for (let j=0; j<nextData[0].length; j++) {
			if (nextData[i][j] == 0) {
				console.log(nextDivs)
				nextDivs[i][j].className = 'none';
			} else if (nextData[i][j] == 1) {
				nextDivs[i][j].className = 'done';
			} else if (nextData[i][j] == 2) {
				nextDivs[i][j].className = 'current';
			}
		}
	}
}

initGame();
initNext();
refreshGame();
refreshNext();
