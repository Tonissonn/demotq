// 2. Write a function that takes two objects as arguments.
//     Merge both objects and create another object that has fields from the arguments.
//     Return the resulting object
//     Ex: For an input {'a': 1, 'b': 2}, {'c': 3, 'd': 4} it should return another object with the properties 'a', 'b', 'c', 'd'.


function fct(a,b){
    let x = {...a,...b}
    return x;
  }
  
  let val1={'a': 1, 'b': 2}, val2={'c': 3, 'd': 4}
  console.log(fct(val1,val2))