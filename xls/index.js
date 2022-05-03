import * as XLSX from 'xlsx/xlsx.mjs';
import { processSheet } from './processSheet.js';
/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';


XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

//get config information from config.json
let config=JSON.parse(fs.readFileSync('xls/config.json',{encoding:'utf8'}))


//get data from .xlsx file
const workbook=XLSX.readFile(config.dataUrl)

//get sheet
let worksheet=workbook.Sheets['Sheet1']

//change cell value

export function changeSheet(){
    processSheet(worksheet)

    XLSX.writeFileXLSX(workbook,config.outputUrl)
}

export function readSheet(){
    const ret=new Array(10).fill(0).map(()=>new Array(2).fill(0))
    console.log(worksheet)
    for(let key in worksheet){
        if(parseInt(key.slice(1))<2) continue
        if(key[0]=='B'){
            ret[parseInt(key.slice(1)-2)][0]=worksheet[key].v
        }else if(key[0]=='C'){
            ret[parseInt(key.slice(1))-2][1]=worksheet[key].v
        }
    }
    console.log(ret)
}

readSheet()