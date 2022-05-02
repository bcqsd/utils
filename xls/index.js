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

processSheet(worksheet)

XLSX.writeFileXLSX(workbook,config.outputUrl)