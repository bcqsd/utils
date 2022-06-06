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
    growing:boolean
    draw(color="red") {
        this.body.forEach(function (p) { return p.draw(color); });
        this.head.draw("yellow");
    }
    constructor(len=0) {
        this.growing=false
        this.length = len;
        this.head = new Rect();
        this.body = new Array(this.length);
        for (var i = 0; i < len; ++i) {
            this.body.push(new Rect(null,20 * (i+2), 20));
        }
        this.draw();
    }
    grow(){
        this.growing=true
    }
    move(direction:number=0){
        this.body.unshift(new Rect(this.head))
        //判断是否延长
        if(!this.growing) this.body.pop()
        else this.growing=false
        switch(direction){
            case 0:
                this.head.x+=20
                if(this.head.x>(canvas as HTMLCanvasElement).width){
                    this.head.x=0
                }
                break
            case 1:
                this.head.y+=20
                if(this.head.y>(canvas as HTMLCanvasElement).height){
                    this.head.y=0
                }
                break 
            case 2:   
                this.head.x-=20
                if(this.head.x<0){
                    this.head.x=(canvas as HTMLCanvasElement).width
                }
                break
            case 3:  
                this.head.y-=20
                if(this.head.y<0){
                    this.head.y=(canvas as HTMLCanvasElement).height
                }
                break 
        } 
        ctx.clearRect(0,0,(canvas as HTMLCanvasElement).width,
        (canvas as HTMLCanvasElement).height)
        this.draw()
    }
}

class Food{
    x:number
    y:number
    constructor(){
        this.x=Math.random()*(canvas as HTMLCanvasElement).width
        this.y=Math.random()*(canvas as HTMLCanvasElement).width
        this.draw()
    }
    reset(){
        this.x=Math.random()*(canvas as HTMLCanvasElement).width
        this.y=Math.random()*(canvas as HTMLCanvasElement).width
       this.draw()
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle="green"
        ctx.fillRect(this.x,this.y,20,20)
        ctx.strokeRect(this.x, this.y,20,20)
    }
}
let food=new Food()
//监听snake对象，当与food相遇时reset food
let handler={
    set(target,key,value,receiver){
        const res=Reflect.set(target,key,value,receiver)
            console.log('moved')
            let snakeX= target.x
            let snakeY=target.y 
            if(Math.abs(snakeX-food.x)<10&&Math.abs(snakeY-food.y)<10){
           ate()
        }
        return res
    }
}
let snake=new Snake(3)
snake.head=new Proxy(snake.head,handler)
let dir=0
let anima=setInterval(()=>{
    snake.move(dir)
    food.draw() //food要刷新显示
},50)

//成功吃到食物
function ate(){
    console.log("success to eat food");
    food.reset()
    snake.growing=true
}
canvas.addEventListener('keydown',(ev)=>{
    ev.preventDefault()
    switch (ev.key) {
        case "ArrowUp":
            dir=3
            break;
        case "ArrowRight":
            dir=0
            break;
        case "ArrowDown":
            dir=1
            break;
        case "ArrowLeft":
            dir=2
            break;
        case "Escape":
            clearInterval(anima)
            break
        case "Enter":
            clearInterval(anima)
            anima=setInterval(()=>{
                snake.move(dir)
            },50)    
    }
})

