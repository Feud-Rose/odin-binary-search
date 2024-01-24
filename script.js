class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
 

class Tree{
    constructor(root){
        this.root = root
    }

    buildTree(arr){
    let n = arr.length;
    this.root = this.buildTreeLooper(arr, 0, n - 1);
    return this
    }

    buildTreeLooper(arr, start, end){
      if (start > end) return null
      let middle = parseInt((start + end) / 2);
      let node = new Node(arr[middle]);
      node.left = this.buildTreeLooper(arr, start, middle - 1);
      node.right = this.buildTreeLooper(arr, middle + 1, end);
      
      return node;
  }

  isEmpty() {
      return this.root === null
    }
    
  insert(value) {
      const newNode = new Node(value)
      console.log(this.root)
      if(this.root.isEmpty){
        this.root = newNode
      }
      else if(this.root.data === newNode.data){
        console.log("Matched")//check if root is a same value
      }
      else{
    
        this.insertNode(this.root, newNode)
      }

    }
  

  insertNode(root, newNode) {
  
    if(newNode.data < root.data){
      if(root.left === null){
        root.left = newNode} 
      else {
        
        this.insertNode(root.left, newNode)
      }
    }
    else if(newNode.data > root.data){
      if(root.right === null){
        root.right = newNode} 
      else {
        
        this.insertNode(root.right, newNode)
      }
    }
  }

  delete(value) {
    if(this.isEmpty()) return null
    let x = this.deleteLoop(this.root, value)

    }

  deleteSearchLoop(root, value) {
    console.log(root)
    console.log(root.data)
    if(root.data === value) {
      return console.log("delete me")//add delete func
    }
    else if(value < root.data){

      if(root.left === null) return console.log("ow")

      return this.deleteSearchLoop(root.left, value)
    }
    else if(value > root.data){

      if(root.right === null) return console.log("ow")

      else return this.deleteSearchLoop(root.right, value)
    }
  }  


}



function mergeSort(arr) {
    
    if(arr.length == 1) return arr

    else {
    let half =  Math.ceil(arr.length / 2)
        let left = arr.slice(0, half)
        let right = arr.slice(half)
        let sortedLeft = mergeSort(left)
        let sortedRight = mergeSort(right)
        return merge(sortedLeft,sortedRight)
    }
}

function merge(left, right) {
    let sortedArr = []
    while (left.length && right.length) {
     
      if (left[0] < right[0]) {
        sortedArr.push(left.shift())
      } else {
        sortedArr.push(right.shift())
      }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right]
  }
 

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

//Make test array
const sortMe = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let sorted = mergeSort(sortMe)
console.log(sorted)
let setArr = removeDuplicates(sorted) 
//


let newTree = new Tree()



newTree.buildTree(setArr);
console.log(setArr)



newTree.insert(2)
newTree.delete(25)

//Make it visual
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  console.log(newTree)
  console.log(prettyPrint(newTree.root))