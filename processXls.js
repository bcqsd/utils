import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */
import * as fs from 'fs';
XLSX.set_fs(fs);

/* load 'stream' for stream support */
import { Readable } from 'stream';
XLSX.stream.set_readable(Readable);

/* load the codepage support library for extended support with older formats  */
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
XLSX.set_cptable(cpexcel);

//get data from .xlsx file
const workbook=XLSX.readFile('./data.xlsx')

//get sheet
let worksheet=workbook.Sheets['Sheet1']


//change cell value
XLSX.utils.sheet_add_aoa(worksheet, [
    [1],                             // <-- Write 1 to cell B3
    ,                                // <-- Do nothing in row 4
    [/*B5*/, /*C5*/, /*D5*/, "abc"]  // <-- Write "abc" to cell E5
  ], { origin: "B3" });

  XLSX.writeFileXLSX(workbook,'ret.xlsx')