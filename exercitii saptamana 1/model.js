let isSuccessful = false;
let result = "";

const promise = new Promise((resolve, reject) => {
  if (isSuccessful) resolve("Success");
  else reject("Failure");
});

// console.log("promise", promise);

promise
.then((res) => {
  result = res;
  // console.log("then result", result);
})
.catch(error => {
  // console.log("then error", error);
});

const rrr = promise.then((res) => {
  // console.log("then res with return", res);
  return res;
});

const getDataFromPromise = async () => {
  let promiseResult;
  try {
   promiseResult = await promise;
  //  console.log("getDataFromPromise success", promiseResult);
  } 
  catch(error) {
    // console.log('getDataFromPromise error', error)
  }
};
getDataFromPromise();

const promise1 = new Promise((resolve, reject) => {
  resolve("Success1");
});
const promise2 = new Promise((resolve, reject) => {
  reject("Failure1");
});
const promise3 = new Promise((resolve, reject) => {
  resolve("Success3");
});

// dependent promises
const arrPromise2 = Promise.all([promise1, promise3]);
const arrResult2 = arrPromise2.then((values) => {
  // console.log("values2", values);
  return values;
});
// console.log("arrResult2", arrResult2);

// not dependent promises
const arrPromise = Promise.allSettled([promise1, promise2, promise3]);
const arrResult = arrPromise.then((values) => {
  // const res1 = values[0];
  const [{status: status1}, res2, res3] = values;
  // const {status: status1} =  res1;
  console.log("status1", status1);
  const {status: status2, reason: value2} =  res2;
  console.log("status2", status2);
  console.log("value2", value2);
  
  // console.log("res1",res1);
  console.log("values", values);
  return values;
});