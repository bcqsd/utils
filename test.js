var TextEditor = function() {
    this.str="."
 };
 
 /** 
  * @param {string} text
  * @return {void}
  */
 TextEditor.prototype.addText = function(text) {
     let ind=this.str.split('').indexOf('.')
     let strl=this.str.slice(0,ind)
     let strr=this.str.slice(ind)
     this.str=strl+text+strr
     
 };
 
 /** 
  * @param {number} k
  * @return {number}
  */
 TextEditor.prototype.deleteText = function(k) {
     let ind=this.str.indexOf('.')
     let strl=this.str.slice(0,Math.max(ind-k,0))
     let strr=this.str.slice(ind)
     this.str=strl+strr
     return Math.min(k,ind)
 };
 
 /** 
  * @param {number} k
  * @return {string}
  */
 TextEditor.prototype.cursorLeft = function(k) {
     let ind=this.str.indexOf('.')
     let strl=this.str.slice(0,ind)
     let strr=this.str.slice(ind)
     if(k>=strl.length){
         this.str='.'+strl+strr.slice(1)
         return ""
     }
     let newl=strl.slice(0,strl.length-k)
     let newr=strl.slice(strl.length-k)
     this.str=newl+'.'+newr+strr.slice(1)
     return newl.slice(Math.max(0,newl.length-10))
 };
 
 /** 
  * @param {number} k
  * @return {string}
  */
 TextEditor.prototype.cursorRight = function(k) {
      let ind=this.str.indexOf('.')
      let strl=this.str.slice(0,ind)
     let strr=this.str.slice(ind+1)
     while(k--&&strr.length>0){
        strl+=strr[0]
        strr=strr.slice(1)
     }
     this.str=strl+'.'+strr
     return strl.slice(Math.max(0,strl.length-10))
 };
 
  var obj = new TextEditor()
  obj.addText("qvcwugyrkrxqmivvh")
  var param_1 = obj.cursorRight(5)
  var param_4 = obj.cursorLeft(3)
  var param_2 = obj.cursorLeft(17)
  obj.addText("eai")
  var param_5 = obj.deleteText(8)
  obj.addText("kwwp")
  var param_6 = obj.cursorRight(8)
  var param_7 = obj. obj.cursorLeft(6)

//["TextEditor","addText","cursorRight","cursorLeft","cursorLeft","addText","deleteText","cursorRight","cursorLeft"]
//[[],["qvcwugyrkrxqmivvh"],[5],[3],[17],["eai"],[8],[8],[6]]