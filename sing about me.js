console.log('Start program')
var startTime = performance.now()


function resolveAfter2Seconds(x) {
    return new Promise(()=>{
        while(true){}
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
  
async function f1() {
    const x = await resolveAfter2Seconds(10);
    console.log(x); // 10
}
  
f1();


var endTime = performance.now()
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)