const arr=[1,2,3,4]
arr.sort(()=>Math.random()<0.5?2:-1)

console.log(arr)