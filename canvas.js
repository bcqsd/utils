"use strict";
//exports.__esModule = true;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth; // 设置宽度
canvas.height = document.documentElement.clientHeight; // 设置高度
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        if (x === void 0) { x = 20; }
        if (y === void 0) { y = 20; }
        if (width === void 0) { width = 20; }
        if (height === void 0) { height = 20; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rect.prototype.draw = function (color) {
        if (color === void 0) { color = "red"; }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
    return Rect;
}());
var Snake = /** @class */ (function () {
    function Snake(len) {
        if (len === void 0) { len = 0; }
        this.length = len;
        this.head = new Rect();
        this.body = new Array(this.length);
        for (var i = 0; i < len; ++i) {
            this.body.push(new Rect(20 * (i + 2), 20));
        }
        this.draw();
    }
    Snake.prototype.draw = function (color) {
        if (color === void 0) { color = "red"; }
        this.head.draw("yellow");
        this.body.forEach(function (p) { return p.draw(color); });
    };
    return Snake;
}());
var snake = new Snake(3);
