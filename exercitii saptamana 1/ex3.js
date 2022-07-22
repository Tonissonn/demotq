// 3. Write a function that takes an array of strings as argument. Group those strings by their first letter. 
//     Return an object that contains properties with keys representing first letters
//     The values should be arrays of strings containing only the corresponding strings
//     For example, the array ['Alf', 'Alice', 'Ben'] should be transformed to
//     Ex: { a: ['Alf', 'Alice'], b: ['Ben']}

let arr = ['Alf', 'Alice', 'Ben', 'Karen'];

let res = {}
arr.forEach(nickname=>{
  try{
    let localVar = res[nickname[0].toLowerCase()].length;
    res[nickname[0].toLowerCase()].push(nickname)
  }
  catch{
    res[nickname[0].toLowerCase()]=[nickname]
  }
})
console.log(res)