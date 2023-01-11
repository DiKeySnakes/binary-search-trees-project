// Node class
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Binary Search tree class
class BinarySearchTree {
  constructor(arr) {
    // root of a binary search tree
    this.root = this.buildTree(arr);
  }

  // A function that constructs Balanced Binary Search Tree
  buildTree(arr) {
    const sortedArray = this.sortArray(arr);
    const uniqueValuesArray = this.deleteDuplicates(sortedArray);
    const n = uniqueValuesArray.length;
    const root = this.sortedArrayToBST(uniqueValuesArray, 0, n - 1);
    return root;
  }

  // A function that sorts the array
  sortArray(arr) {
    const sorted = arr.sort((a, b) => a - b);
    return sorted;
  }

  // A function that deletes duplicates from the array
  deleteDuplicates(arr) {
    const uniques = [...new Set(arr)];
    return uniques;
  }

  // A function that constructs Balanced Binary Search Tree
  //  from a sorted array
  sortedArrayToBST(arr, start = 0, end = arr.length - 1) {
    /* Base Case */
    if (start > end) {
      return null;
    }
    /* Get the middle element and make it root */
    const mid = parseInt((start + end) / 2);
    const root = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it
     left child of root */
    root.left = this.sortedArrayToBST(arr, start, mid - 1);
    /* Recursively construct the right subtree and make it
     right child of root */
    root.right = this.sortedArrayToBST(arr, mid + 1, end);
    return root;
  }

  // function to be implemented

  // insert(data)

  // helper method which creates a new node to
  // be inserted and calls insertNode
  insert(data) {
    // Creating a node and initialising
    // with data
    const newNode = new Node(data);

    // root is null then node will
    // be added to the tree and made root.
    if (this.root === null) this.root = newNode;
    // find the correct position in the
    // tree and add the node
    else this.insertNode(this.root, newNode);
  }

  // Method to insert a node in a tree
  // it moves over the tree to find the location
  // to insert a node with a given data
  insertNode(node, newNode) {
    // if the data is less than the node
    // data move left of the tree
    if (newNode.data < node.data) {
      // if left is null insert node here
      if (node.left === null) node.left = newNode;
      // if left is not null recur until
      // null is found
      else this.insertNode(node.left, newNode);
    }

    // if the data is more than the node
    // data move right of the tree
    else {
      // if right is null insert node here
      if (node.right === null) node.right = newNode;
      // if right is not null recur until
      // null is found
      else this.insertNode(node.right, newNode);
    }
  }

  // remove(data)

  // helper method that calls the
  // removeNode with a given data
  remove(data) {
    // root is re-initialized with
    // root of a modified tree.
    this.root = this.removeNode(this.root, data);
  }

  // Method to remove node with a
  // given data
  // it recur over the tree to find the
  // data and removes it
  removeNode(node, key) {
    // if the root is null then tree is
    // empty
    if (node === null) return null;
    // if data to be delete is less than
    // roots data then move to left subtree
    else if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    // if data to be delete is greater than
    // roots data then move to right subtree
    else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    // if data is similar to the root's data
    // then delete this node
    else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      const aux = this.findMinNode(node.right);
      node.data = aux.data;

      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  // Helper function
  // findMinNode()

  // finds the minimum node in tree
  // searching starts from given node
  findMinNode(node) {
    // if left of a node is null
    // then it must be minimum node
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  // getRootNode()

  // returns root of the tree
  getRootNode() {
    return this.root;
  }

  // levelOrder(node)
  levelOrder(arr = [], queue = [], node = this.root) {
    if (node === null) return;
    // Visit the root
    arr.push(node.data);

    // Traverse to left and right children -> add to queue
    queue.push(node.left);
    queue.push(node.right);

    // Move to next level
    while (queue.length) {
      const level = queue[0];
      queue.shift();
      this.levelOrder(arr, queue, level);
    }
    return arr;
  }

  // inorder(node)

  // Performs inorder traversal of a tree
  inorder(arr = [], node = this.root) {
    if (node !== null) {
      this.inorder(arr, node.left);
      arr.push(node.data);
      this.inorder(arr, node.right);
    }
    return arr;
  }

  // preorder(node)

  // Performs preorder traversal of a tree
  preorder(arr = [], node = this.root) {
    if (node !== null) {
      arr.push(node.data);
      this.preorder(arr, node.left);
      this.preorder(arr, node.right);
    }
    return arr;
  }

  // postorder(node)

  // Performs postorder traversal of a tree
  postorder(arr = [], node = this.root) {
    if (node !== null) {
      this.postorder(arr, node.left);
      this.postorder(arr, node.right);
      arr.push(node.data);
    }
    return arr;
  }

  // find(node, data)

  // search for a node with given data
  find(node = this.root, data) {
    // if trees is empty return null
    if (node === null) return null;
    // if data is less than node's data
    // move left
    else if (data < node.data) return this.find(node.left, data);
    // if data is more than node's data
    // move right
    else if (data > node.data) return this.find(node.right, data);
    // if data is equal to the node data
    // return node
    else return node;
  }

  // function to find height of binary tree
  height(root = this.root) {
    if (root === null) return 0;

    let lHeight = this.height(root.left);
    let rHeight = this.height(root.right);

    if (lHeight > rHeight) {
      return lHeight + 1;
    } else {
      return rHeight + 1;
    }
  }

  // function to find depth of binary tree
  depth(node, root = this.root, depth = 0) {
    if (root === null || node === null) return;
    // if (node === root) return depth;
    if (node === root) return `Depth: ${depth}`;
    if (node.data < root.data) {
      return this.depth(node, root.left, (depth += 1));
    } else {
      return this.depth(node, root.right, (depth += 1));
    }
  }

  // function to check if tree is height-balanced or not
  isBalanced(root = this.root) {
    const lHeight = this.height(root.left);
    const rHeight = this.height(root.right);
    const diff = Math.abs(lHeight - rHeight);
    return diff < 2 ? 'true' : 'false';
  }

  // function which rebalances an unbalanced tree
  rebalance() {
    const currentTreeArray = this.inorder();
    this.root = this.buildTree(currentTreeArray);
  }
}

// function that will console.log your tree in a structured format
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const createRandomArray = (n) => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.floor(Math.random() * 101);
  }
  return array;
};

const addNumbers = (n) => {
  const array = createRandomArray(n);
  for (let i = 0; i < n; i++) {
    BST.insert(array[i]);
  }
};

// create an object for the BinarySearchTree
const BST = new BinarySearchTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

let root = BST.getRootNode();
prettyPrint(root);

console.log('isBalanced:', BST.isBalanced(root));
console.log('Height:', BST.height());

BST.insert(2);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));
console.log('Height:', BST.height());

BST.insert(102);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));
console.log('Height:', BST.height());

BST.insert(208);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));
console.log('Height:', BST.height());

BST.remove(8);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));
console.log('Height:', BST.height());

BST.remove(208);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));
console.log('Height:', BST.height());

console.log('Find:', BST.find(root, 3));
console.log('Find:', BST.find(root, 67));

console.log('levelOrder:', BST.levelOrder());
console.log('inorder:', BST.inorder());
console.log('preorder:', BST.preorder());
console.log('postorder:', BST.postorder());

console.log('findMinNode:', BST.findMinNode(root));
console.log(BST.depth(BST.findMinNode(root)));
console.log(BST.depth(BST.find(root, 2)));

addNumbers(101);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));

BST.rebalance(root);
root = BST.getRootNode();
prettyPrint(root);
console.log('isBalanced:', BST.isBalanced(root));

console.log('levelOrder:', BST.levelOrder());
console.log('inorder:', BST.inorder());
console.log('preorder:', BST.preorder());
console.log('postorder:', BST.postorder());

console.log('Height:', BST.height());
