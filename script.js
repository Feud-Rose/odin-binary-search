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
    let x = this.deleteSearchLoop(this.root, value)

    }

  deleteSearchLoop(root, value, prev = null) {
    console.log(this.root.data)
    console.log(root.data)
    if(root.data === value) {
      if(this.root.data === value) {
       let newTop = this.getSmallestOfRight(root.right, root)
       this.root.data = newTop.data
       return console.log(this.root)
      }
      else{
        console.log(prev.right)
        console.log(root.right)
        if(!root.left && !root.right){
          console.log("double null")
          return (root.data < prev.data) ? prev.left = null : prev.right = null
        }
        else if(!root.left && root.right){
          return prev.right = root.right 
        }
        else if(!root.right && root.left){
          return prev.right = root.left
        }
        else{
          
          let newRoot = this.getSmallestOfRight(root.right, root)
          console.log(newRoot)
          console.log(prev.data)
          console.log(root.data)
          if(root.data > prev.data){ 
            newRoot.left = root.left
            newRoot.right = root.right
            prev.right = newRoot
          }
          else{ 
            prev.left = newRoot
            newRoot.left = root.left
            newRoot.right = root.right
          }

        }
      }
    }
    else if(value < root.data){

      if(root.left === null) return console.log("ow")

      return this.deleteSearchLoop(root.left, value, root)
    }
    else if(value > root.data){

      if(root.right === null) return console.log("ow")

      else return this.deleteSearchLoop(root.right, value, root)
    }
  }  


  //get lowest value on right side for replacing Top root
  getSmallestOfRight(root, prev){
    console.log(root)
   if (!root.left){
      if(root.right && prev){
        console.log(prev)
        prev.left = root.right
      }
      else if(!root.right && prev){
        console.log(prev)
        prev.left = null
      }
      return root
    }
    return this.getSmallestOfRight(root.left, root)
  }

  deleteNode(root){
  
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
const sortMe = [1, 7, 4, 23, 8, 12, 4, 3, 5, 7, 10, 67, 6345, 324]
let sorted = mergeSort(sortMe)
console.log(sorted)
let setArr = removeDuplicates(sorted) 
//


let newTree = new Tree()



newTree.buildTree(setArr);
console.log(setArr)



newTree.insert(11)
newTree.insert(9)
newTree.delete(10)

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