// 5. An Armstrong number is an n-digit number that is equal to the sum of the nth powers of its digits. 
//     Determine if the input number is an Armstrong number. Return either true or false.
//     Ex: 1^3 + 5^3 + 3^3 = 153


function Armstrong(number){
    return number === Array.from(String(number),(num)=>Number(num)).reduce(function(p,c){return p+Math.pow(c,Math.ceil(Math.log10(number)))})
  }
  console.log(Armstrong(153))