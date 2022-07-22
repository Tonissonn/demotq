// 4. Create a class called CustomList with these methods:
//     insertFirst(data)
//     insertLast(data)
//     getFirst()
//     getLast()
// Make sure you test the functionality by creating some objects.
// Bonus: Create a class for a LinkedList.

class CustomList{
    constructor(list){
      this.list=list;
    }
    insertFirst(data){
      this.list.unshift(data)
      return this;
    }
    insertLast(data){
      this.list.push(data)
      return this;
    }
    getFirst(){
      return this.list[0]
    }
    getLast(){
      return this.list[this.list.length-1]
    }
    getList(){
      return this.list;
    }
  }
  
  let arr = [1,2,3]
  let cstmLst = new CustomList(arr);
  
  cstmLst.insertFirst(99)
  cstmLst.insertLast(10)
  console.log(cstmLst.getLast());
  console.log(cstmLst.getFirst());
  console.log(cstmLst.getList());




//   class Node{
//     constructor(data,prev,next){
//       this.data=data;
//       this.prev=prev;
//       this.next=next;
//     }
//   }
  
//   class LinkedList{
//     constructor()
//   }