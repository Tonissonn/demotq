//0. Choose a public api, make a call and get the result by using both then method and async/await as well.


let cats = fetch('https://catfact.ninja/facts',)
    .then(response => response.json())
    .then(response => response.data.forEach(element => {
      console.log(element);
    }))
    .catch(err => console.error(err)).finally(idk=>console.log("***THEN CATCH***"))

let getCats = async ()=>{
  try{
    let response = await fetch('https://catfact.ninja/facts');
    let catsResponse = await response.json();
    catsResponse.data.forEach(element => {
      console.log(element);
    })
  }
  catch{
    console.log("No cats")
  }
  console.log("***AWAIT ASYNC***")
}

getCats();