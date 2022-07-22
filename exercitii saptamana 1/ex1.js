// 1. Given an array of objects that have a field called population, sort the objects by population size. Return the sorted array.

let arr = [{id:1,size:10013,population:123},{id:2,size:10013,population:144},{id:3,size:10013,population:23},
    {id:4,size:10013,population:12},{id:5,size:10013,population:643},{id:6,size:10013,population:1}]
  arr.forEach(element=>console.log(element))
  console.log("sorted:")
  let sortedArr = arr.sort(function(a,b){return a.population - b.population})
  sortedArr.forEach(element=>console.log(element))