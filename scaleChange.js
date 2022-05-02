/**
 * desc:transform a float number to IEEE 745
 * @param {float} f 
 */
function transToIeee(f){
    let sign=f>=0?0:1;  // describe positive or nagtive
    let zs=Math.floor(f)
    let xs=f-zs
    zs=transIntegerToB(zs)
    xs=transDeciToB(xs)
    let e=zs.length-1  
    let E=transIntegerToB(e+127)
    let M=zs.slice(1)+xs
    while(M.length<23) M+='0'
    return sign+E+M
}
/**
 * desc:transfrom from dec Integer to bin
 */
function transIntegerToB(i){
    let ret="" 
    // %2 every time and let i/=2
    while(i){
        ret=i%2+ret
        i=Math.floor(i/2)
     }
     return ret
}
/**
 * desc:transform from float to bin
 * @param {float to transform} f 
 * @returns 
 */
function transDeciToB(f){
    let ret=""
    let maxDec=22
    //*2 every time and get the interger part 
    while(f&&maxDec){
        maxDec-=1
        ret+=f*2>=1?1:0
        f=f*2>=1?f*2-1:f*2
     }
     return ret
}

/**
 * desc:trans a binary iEEE to dec number
 * @param {string} s 
 */
function transfromIeee(s){
  let sign=s[0]==1?-1:1
  let e=transFromBinToInteger(s.slice(1,9))-127   
  let M=transFromBinToDeci(s.slice(9))+1
  return sign*M*Math.pow(2,e)
}
/**
 * desc:tranform a binary string to decimal
 * @param {string} s 
 */
function transFromBinToInteger(s){
   let ret=0
    for(let i=s.length-1;i>=0;i--){
       ret+=Number(s[i])*Math.pow(2,s.length-1-i)
   }
   return ret
}

/**
 * desc:transform binary string as decimal
 * @param {string} s 
 */
function transFromBinToDeci(s){
    let ret=0
    for(let i=0;i<s.length;++i){
        ret+=Number(s[i])*Math.pow(2,-i-1)
    }
    return ret
}

// test:console.log(transfromIeee("1100000010100"))


console.log(transToIeee(20.59375))
                                    //11.1