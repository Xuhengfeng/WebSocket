(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * 导入数据模型模块
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

},{"./model.js":2}],2:[function(require,module,exports){
'use strict';
/**
 * 定义game数据模型设计
 * 一组方块组合的数据模型
 * 已经存在的大容器的方块组合的数据模型
 */
let gameData = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 2, 2, 2, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 2, 0, 0],
	[0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
]

let nextData = [       //下一个方块数据模型  把方块看成二维数据表;
	[2, 2, 0, 0],
	[0, 2, 2, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
]

module.exports = {
	gameData: gameData,
	nextData: nextData
}

},{}]},{},[1]);
