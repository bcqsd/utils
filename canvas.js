"use strict";
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = document.documentElement.clientWidth; // 设置宽度
canvas.height = document.documentElement.clientHeight; // 设置高度
var Rect = /** @class */ (function () {
    function Rect(rect, x, y, width, height) {
        if (x === void 0) { x = 20; }
        if (y === void 0) { y = 20; }
        if (width === void 0) { width = 20; }
        if (height === void 0) { height = 20; }
        if (rect) {
            x = rect.x;
            y = rect.y;
            width = rect.width;
            height = rect.height;
        }
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
        this.growing = false;
        this.length = len;
        this.head = new Rect();
        this.body = new Array(this.length);
        for (var i = 0; i < len; ++i) {
            this.body.push(new Rect(null, 20 * (i + 2), 20));
        }
        this.draw();
    }
    Snake.prototype.draw = function (color) {
        if (color === void 0) { color = "red"; }
        this.body.forEach(function (p) { return p.draw(color); });
        this.head.draw("yellow");
    };
    Snake.prototype.grow = function () {
        this.growing = true;
    };
    Snake.prototype.move = function (direction) {
        if (direction === void 0) { direction = 0; }
        this.body.unshift(new Rect(this.head));
        //判断是否延长
        if (!this.growing)
            this.body.pop();
        else
            this.growing = false;
        switch (direction) {
            case 0:
                this.head.x += 20;
                if (this.head.x > canvas.width) {
                    this.head.x = 0;
                }
                break;
            case 1:
                this.head.y += 20;
                if (this.head.y > canvas.height) {
                    this.head.y = 0;
                }
                break;
            case 2:
                this.head.x -= 20;
                if (this.head.x < 0) {
                    this.head.x = canvas.width;
                }
                break;
            case 3:
                this.head.y -= 20;
                if (this.head.y < 0) {
                    this.head.y = canvas.height;
                }
                break;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
    };
    return Snake;
}());
var Food = /** @class */ (function () {
    function Food() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.width;
        this.draw();
    }
    Food.prototype.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.width;
        this.draw();
    };
    Food.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, 20, 20);
        ctx.strokeRect(this.x, this.y, 20, 20);
    };
    return Food;
}());
var food = new Food();
//监听snake对象，当与food相遇时reset food
var handler = {
    set: function (target, key, value, receiver) {
        var res = Reflect.set(target, key, value, receiver);
        console.log('moved');
        var snakeX = target.x;
        var snakeY = target.y;
        if (Math.abs(snakeX - food.x) < 10 && Math.abs(snakeY - food.y) < 10) {
            ate();
        }
        return res;
    }
};
var snake = new Snake(3);
snake.head = new Proxy(snake.head, handler);
var dir = 0;
var anima = setInterval(function () {
    snake.move(dir);
    food.draw(); //food要刷新显示
}, 50);
//成功吃到食物
function ate() {
    console.log("success to eat food");
    food.reset();
    snake.growing = true;
}
canvas.addEventListener('keydown', function (ev) {
    ev.preventDefault();
    switch (ev.key) {
        case "ArrowUp":
            dir = 3;
            break;
        case "ArrowRight":
            dir = 0;
            break;
        case "ArrowDown":
            dir = 1;
            break;
        case "ArrowLeft":
            dir = 2;
            break;
        case "Escape":
            clearInterval(anima);
            break;
        case "Enter":
            clearInterval(anima);
            anima = setInterval(function () {
                snake.move(dir);
            }, 50);
    }
});
