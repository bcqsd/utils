export{}  //模块声明
const canvas= document.getElementById('canvas');
const ctx=(canvas as HTMLCanvasElement).getContext('2d');
(canvas as HTMLCanvasElement).width = document.documentElement.clientWidth; // 设置宽度
(canvas as HTMLCanvasElement).height =document.documentElement.clientHeight; // 设置高度

class Rect{
    x:number
    y:number
    width:number
    height:number
    constructor(x=20,y=20,width=20,height=20){
        this.x=x
        this.y=y 
        this.width=width 
        this.height=height 
    }
    draw(color:string | CanvasGradient | CanvasPattern="red"){
        ctx.beginPath()
        ctx.fillStyle=color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
}

class Snake {
    length:number
    body:Rect[]
    head:Rect
    draw(color="red") {
        this.head.draw("yellow");
        this.body.forEach(function (p) { return p.draw(color); });
    }
    constructor(len=0) {
        this.length = len;
        this.head = new Rect();
        this.body = new Array(this.length);
        for (var i = 0; i < len; ++i) {
            this.body.push(new Rect(20 * (i+2), 20));
        }
        this.draw();
    }
}

let snake=new Snake(3)


