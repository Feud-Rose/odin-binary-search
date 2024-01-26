class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }

  buildTree(arr) {
    let n = arr.length;
    this.root = this.buildTreeLooper(arr, 0, n - 1);
    return this;
  }

  buildTreeLooper(arr, start, end) {
    if (start > end) return null;
    let middle = parseInt((start + end) / 2);
    let node = new Node(arr[middle]);
    node.left = this.buildTreeLooper(arr, start, middle - 1);
    node.right = this.buildTreeLooper(arr, middle + 1, end);

    return node;
  }

  isEmpty() {
    return this.root === null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root.isEmpty) {
      this.root = newNode;
    } else if (this.root.data === newNode.data) {
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(root, newNode) {
    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else if (newNode.data > root.data) {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  delete(value) {
    if (this.isEmpty()) return null;
    let x = this.deleteSearchLoop(this.root, value);
  }

  deleteSearchLoop(root, value, prev = null) {
    if (root.data === value) {
      if (this.root.data === value) {
        let newTop = this.getSmallestOfRight(root.right, root);
        this.root.data = newTop.data;
        return console.log(this.root);
      } else {
        console.log(prev.right);
        console.log(root.right);
        if (!root.left && !root.right) {
          console.log("double null");
          return root.data < prev.data
            ? (prev.left = null)
            : (prev.right = null);
        } else if (!root.left && root.right) {
          return (prev.right = root.right);
        } else if (!root.right && root.left) {
          return (prev.right = root.left);
        } else {
          let newRoot = this.getSmallestOfRight(root.right, root);
          console.log(newRoot);
          console.log(prev.data);
          console.log(root.data);
          if (root.data > prev.data) {
            newRoot.left = root.left;
            newRoot.right = root.right;
            prev.right = newRoot;
          } else {
            prev.left = newRoot;
            newRoot.left = root.left;
            newRoot.right = root.right;
          }
        }
      }
    } else if (value < root.data) {
      if (root.left === null) return console.log("ow");

      return this.deleteSearchLoop(root.left, value, root);
    } else if (value > root.data) {
      if (root.right === null) return console.log("ow");
      else return this.deleteSearchLoop(root.right, value, root);
    }
  }

  //get lowest value on right side for replacing Top root
  getSmallestOfRight(root, prev) {
    console.log(root);
    if (!root.left) {
      if (root.right && prev) {
        console.log(prev);
        prev.left = root.right;
      } else if (!root.right && prev) {
        console.log(prev);
        prev.left = null;
      }
      return root;
    }
    return this.getSmallestOfRight(root.left, root);
  }

  find(value) {
    let result = this.findRecursion(value, this.root);
    console.log(result);
    return result;
  }

  findRecursion(value, node) {
    if (!node) return false;
    else if (node.data === value) return node;
    else if (value < node.data) return this.findRecursion(value, node.left);
    else if (value > node.data) return this.findRecursion(value, node.right);
  }

  levelOrder = function (root = this.root, callBack = null) {
    if (root === null) {
      return;
    }

    let result = [];

    function levelRecursive(node, level) {
      if (!node) return;

      if (result[level]) {
        result[level].push(node.data);
      } else {
        result[level] = [node.data];
      }

      levelRecursive(node.left, level + 1);
      levelRecursive(node.right, level + 1);
    }

    levelRecursive(root, 0);

    if (typeof callBack == "function") {
      return;
    }
    return result;
  };

  inOrder(root = this.root, callBack = null) {
    if (root === null) {
      return;
    }

    let result = [];

    function inOrderRecursive(root, result) {
      if (root) {
        inOrderRecursive(root.left, result);

        result.push(root.data);

        inOrderRecursive(root.right, result);
      }
    }

    inOrderRecursive(root, result);
    if (typeof callBack == "function") {
      return;
    }
    return result;
  }

  preOrder(root = this.root, callBack = null) {
    if (root === null) {
      return;
    }
    let result = [];

    function preOrderRecursive(root, result) {
      if (root) {
        result.push(root.data);

        preOrderRecursive(root.left, result);

        preOrderRecursive(root.right, result);
      }
    }

    preOrderRecursive(root, result);

    if (typeof callBack == "function") {
      return;
    }
    return result;
  }

  postOrder(root = this.root, callBack = null) {
    if (root === null) {
      return;
    }
    function postOrderRecursive(root) {
      if (root) {
        postOrderRecursive(root.left);

        postOrderRecursive(root.right);

        console.log(root.data + "");
      }
    }

    postOrderRecursive(root);

    if (typeof callBack == "function") {
      return;
    }
  }

  height(root = this.root) {
    console.log(root);
    function heightRecursive(root, n) {
      if (!root) return n - 1;
      let left = heightRecursive(root.left, n + 1);
      let right = heightRecursive(root.right, n + 1);
      return left > right ? left : right;
    }
    return heightRecursive(root, 0);
  }

  depth(node) {
    if (!node) return null;
    let root = this.root;

    function depthRecursive(root, node, depth) {
      if (!node) return false;
      else if (root === node) return depth;
      else if (root.data > node.data)
        return depthRecursive(root.left, node, depth + 1);
      else if (root.data < node.data)
        return depthRecursive(root.right, node, depth + 1);
    }

    return depthRecursive(root, node, 0);
  }

  isBalanced(root = this.root) {
    function balancedRecursive(root, n) {
      if (!root) return n - 1;
      let left = balancedRecursive(root.left, n + 1);
      let right = balancedRecursive(root.right, n + 1);
      return left > right ? left : right;
    }

    let leftDepth = balancedRecursive(root.left, 0);
    let rightDepth = balancedRecursive(root.right, 0);

    function checkDifference(leftDepth, rightDepth) {
      if (leftDepth === rightDepth) return true;
      else if (leftDepth > rightDepth) {
        let difference = leftDepth - rightDepth;
        if (difference === 1 || difference === 0) {
          return true;
        } else return false;
      } else {
        let difference = rightDepth - leftDepth;
        if (difference === 1 || difference === 0) {
          return true;
        } else return false;
      }
    }
    return checkDifference(leftDepth, rightDepth);
  }

  rebalance() {
    let newArr = this.inOrder();
    console.log(newArr);

    return this.buildTree(newArr);
  }

  print() {
    ////////Purely visual
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
    return prettyPrint(this.root);
  }
}
////////////////

function mergeSort(arr) {
  if (arr.length == 1) return arr;
  else {
    let half = Math.ceil(arr.length / 2);
    let left = arr.slice(0, half);
    let right = arr.slice(half);
    let sortedLeft = mergeSort(left);
    let sortedRight = mergeSort(right);
    return merge(sortedLeft, sortedRight);
  }
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  // Use spread operators to create a new array, combining the three arrays
  return [...sortedArr, ...left, ...right];
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

//Make test array
const sortMe = [1, 7, 4, 23, 8, 12, 4, 3, 5, 7, 10, 67, 6345, 324];
let sorted = mergeSort(sortMe);
console.log(sorted);
let setArr = removeDuplicates(sorted);
//

let newTree = new Tree();

newTree.buildTree(setArr);
console.log(setArr);

newTree.insert(11);
newTree.insert(9);
let nodeTest = newTree.find(11);
console.log(nodeTest);
console.log(newTree.levelOrder());

console.log(newTree.inOrder());
console.log(newTree.preOrder());
console.log(newTree.postOrder());
console.log(newTree.height());
console.log(newTree.depth(nodeTest));
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.print());
