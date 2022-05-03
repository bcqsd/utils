/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
 var solveSudoku = function(board) {
    const block=new Array(9).fill(0).map(_=>new Array(9).fill(false))  //记录block数字出现情况
    const row=new Array(9).fill(0).map(_=>new Array(9).fill(false))  //记录row数字出现情况
    const col=new Array(9).fill(0).map(_=>new Array(9).fill(false))  //记录col数字出现情况
    //已填入
    for(let i=0;i<9;++i){
        for(let j=0;j<9;++j){
            if(board[i][j]=='.') continue
            let num=parseInt(board[i][j])-1
            let blockId=Math.floor(j/3)+3*Math.floor(i/3)
             block[blockId][num]=true
             row[i][num]=true
             col[j][num]=true
        }
    }
    let flag=false
    dfs(0,0)
    function dfs(i,j){
        if(i==9){
            flag=true
             return 
        }
     let blockId=Math.floor(j/3)+3*Math.floor(i/3)
        if(board[i][j]!='.'){
               if(j==8){
                 dfs(i+1,0)
              }else{
               dfs(i,j+1)    
              }
              return
        }
         for(let num=0;num<=9;++num){
             //死路
             if(num==9){
                return 
             }
             //重复数字
             if(block[blockId][num]||row[i][num]||col[j][num]) {
                continue
             }
             block[blockId][num]=true
             row[i][num]=true
             col[j][num]=true
             board[i][j]=String(num+1)
               //next to dfs
               if(j==8){
                 dfs(i+1,0)
              }else{
               dfs(i,j+1)    
              }
              if(flag) return
               board[i][j]='.'
                block[blockId][num]=false
               row[i][num]=false
               col[j][num]=false
         }
   
    }
 };
const board=[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
solveSudoku(board)
