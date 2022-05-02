import * as XLSX from 'xlsx/xlsx.mjs';

export function processSheet(worksheet){
    process(worksheet)
}




function process(sheet){
    let data=[]
    const option4=['A','B','C','D']
    const option3=['A','B','C']
    let have3=[4,5,12,13,14,15,21,22]
    have3=have3.map(p=>p+2)
    for(let i=0;i<32;++i){
        data[i]=new Array(30).fill(0)
        data[i][0]=i+3
        data[i][1]=data[i][2]='重庆市'
        for(let j=5;j<30;++j){
            let rand4=~~(Math.random()*4)
            let rand3=~~(Math.random()*3)
            data[i][j]=have3.indexOf(j)!=-1?option3[rand3]:option4[rand4]
        } 
        data[i][3]='B'
        data[i][4]=Math.random()<0.5?'A':'B'
        data[i][19]=Math.random()<0.5?'A':'B'
        data[i][25]=Math.floor(Math.random()*10)
        data[i][26]=Math.floor(Math.random()*10)
        data[i][27]=['A','B','C','D','E','F','G','H'].filter(p=>Math.random()<0.5).join('')
        data[i][28]=data[i][29]=''
        if(data[i][19]!='A') data[i][20]=''
        if(data[i][19]!='A') data[i][21]=''
        data[i][22]=''
    }
    XLSX.utils.sheet_add_aoa(sheet, data, { origin: "A3" });
}