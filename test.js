function process(){
    let data=[]
    const options=['A','B','C','D']
    for(let i=0;i<32;++i){
        data[i]=new Array(30).fill(0)
        data[i][0]=i+3
        data[i][1]=data[i][2]='重庆市'
        for(let j=5;j<30;++j){
            let rand=Math.floor((Math.random()*4))
            data[i][j]=options[rand]
        } 
        data[i][3]='B'
        data[i][4]=Math.random()<0.5?'A':'B'
    }
    console.log(data)
}

process()