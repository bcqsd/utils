import * as XLSX from 'xlsx/xlsx.mjs';

export function processSheet(worksheet){
    XLSX.utils.sheet_add_aoa(worksheet, [
        [3],                             // <-- Write 1 to cell B3
        ,                                // <-- Do nothing in row 4
        [/*B5*/, /*C5*/, /*D5*/, "abc"]  // <-- Write "abc" to cell E5
      ], { origin: "B3" });
    
}