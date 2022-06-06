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
    constructor(rect?:Rect,x=20,y=20,width=20,height=20){
        if(rect){
            x=rect.x
            y=rect.y
            width=rect.width
            height=rect.height
        }
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
        this.body.forEach(function (p) { return p.draw(color); });
        this.head.draw("yellow");
    }
    constructor(len=0) {
        this.length = len;
        this.head = new Rect();
        this.body = new Array(this.length);
        for (var i = 0; i < len; ++i) {
            this.body.push(new Rect(null,20 * (i+2), 20));
        }
        this.draw();
    }
    move(direction:number=0){
        this.body.unshift(new Rect(this.head))
        this.body.pop()
        switch(direction){
            case 0:
                this.head.x+=20
                break
            case 1:
                this.head.y+=20
                break 
            case 2:   
                this.head.x-=20
                break
            case 3:  
                this.head.y-=20
                break 
        } 
        ctx.clearRect(0,0,(canvas as HTMLCanvasElement).width,
        (canvas as HTMLCanvasElement).height)
        this.draw()
    }
}

let snake=new Snake(3)


canvas.addEventListener('keydown',(ev)=>{
    ev.preventDefault()
    switch (ev.key) {
        case "ArrowUp":
            snake.move(3);
            break;
        case "ArrowRight":
            snake.move(0);
            break;
        case "ArrowDown":
            snake.move(1);
            break;
        case "ArrowLeft":
            snake.move(2);
            break;
    }
})
