import mergeSort from './mergeSort.js'; // Importing mergeSort algorithm from Recursion project

const NodeFactory = (data, left = null, right = null) => ({
  data,
  left,
  right,
});

// Function to visualize the binary search tree in the console
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let root = null;

const buildTree = (array, start, end) => {
  // Base case to exit algorithm
  if (start > end) {
    return null;
  }
  // Recursively call buildTree to construct left and right branches
  const mid = parseInt((start + end) / 2);
  const node = NodeFactory(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
};

const removeDuplicates = (array) => {
  const uniqueArray = [];
  array.forEach((item) => {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  });
  return uniqueArray;
};

const insertNode = (value, node) => {
  // First check if tree has been initialised
  if (node === null) {
    root = NodeFactory(value);
    // Check if a duplicate, if so throw error
  }
  if (node.data === value) {
    console.log('Error, data already exists in tree');
  }
  // If the data at the current node is greater than the value to be inserted,
  // go down the left subtree
  else if (node.data > value) {
    // If the current node has a left child, continue to search
    if (node.left !== null) {
      insertNode(value, node.left);
      // else if there is no left child, insert the data
    } else {
      node.left = NodeFactory(value);
    }
    // Else the data at the current node is less than the value to be inserted
  } else {
    // if the current node has a right child, continue to search
    if (node.right !== null) {
      insertNode(value, node.right);
    } else {
      node.right = NodeFactory(value);
    }
  }
};

const findMin = (node) => {
  // Find smallest value in the right subtree and return this value
  // First look in the left subtree
  if (node.left !== null) {
    findMin(node.left);
    // When the left subtree is empty, the function has found the smallest value
  } else {
    return node;
  }
};

const deleteNode = (value, node) => {
  // Edge case if the tree is empty
  if (node === null) {
    console.log('Error, no data present in the tree');
    return null;
  }
  // Recurse down the tree until the specified value is found, or exit via base case
  if (node.data > value && node.left !== null) {
    node.left = deleteNode(value, node.left);
  } else if (node.data < value && node.right !== null) {
    node.right = deleteNode(value, node.right);
    // Function has found a value to delete
  } else if (node.data === value) {
    // If the target node has two children
    if (node.left !== null && node.right !== null) {
      // Search the right sub-tree for the smallest value to replace the node to be deleted
      const minVal = findMin(node.right);
      // Override the data to be deleted with the smallest value
      node.data = minVal;
      // Recursively delete the now duplicate node to the right
      node.right = deleteNode(minVal, node.right);
      // If the target node only has a left child
    } else if (node.left !== null && node.right === null) {
      return node.left;
      // If the target node only has a right child
    } else if (node.left === null && node.right !== null) {
      return node.right;
      // Check if the node has no children and is therefore a leaf
    } else if (node.left === null && node.right === null) {
      return null;
    }
  }
  return node;
};

const findNode = (value, node) => {
  // Edge case if the tree is empty
  if (node === null) {
    console.log('Error, no data present in the tree');
    return null;
  }
  // First check if data at current node is what we are lookin for
  if (node.data === value) {
    console.log('success');
    console.log(node);
    return node;
    // If not, check if the data is less than current node
    // If true, search left sub-tree
  }
  if (node.data > value && node.left !== null) {
    return findNode(value, node.left);
    // Check if data is greater than current node
    // If true, search right sub-tree
  }
  if (node.data < value && node.right !== null) {
    return findNode(value, node.right);
  }
  return null;
};

// Callback function
const processNode = (node) => node.data;

const levelOrder = (root, callBack) => {
  // First check if there is a BST
  if (root === null) {
    return [];
  }

  const result = [];
  // Then add initialize the queue with the root
  const queue = [root];
  // Loop through the queue taking the first element from the queue
  while (queue.length !== 0) {
    const node = queue.shift();
    // Only add leaves that have a value
    if (callBack(node)) {
      result[result.length] = callBack(node);
    }

    // If the visited node has left or right children, add these to the queue
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return result;
};

// Left, root, right
// Using easyArray, expected 2,3,12,15,28,36,39
const inOrder = (root, callBack) => {
  // First check if there is a BST
  if (root === null) {
    return [];
  }
  const result = [];

  const traverse = (root) => {
    // Keep traversing the left node until there are no more children
    if (root.left) traverse(root.left);
    // Add the value of the left node into the results array
    result[result.length] = callBack(root);
    // Keep traversing the right node until there are no more children
    if (root.right) traverse(root.right);
  };

  traverse(root);
  return result;
};

// Root, left , right
// Using easyArray expected [13,3,5,12,36,28,39]
const preOrder = (root, callBack) => {
  // First check if there is a BST
  if (root === null) {
    return [];
  }

  const result = [];
  const traverse = (root) => {
    // Add the value of the root node to the results array
    result[result.length] = callBack(root);
    // Then traverse left
    if (root.left) traverse(root.left);
    // Traverse right until there are no more children
    if (root.right) traverse(root.right);
  };

  traverse(root);
  return result;
};

// Left, right, root
// Expected output [2,12,3,28,39,15]
const postOrder = (root, callBack) => {
  // First check if there is a BST
  if (root === null) {
    return [];
  }

  const result = [];
  const traverse = (root) => {
    if (root.left) traverse(root.left);
    if (root.right) traverse(root.right);
    result[result.length] = callBack(root);
  };

  traverse(root);
  return result;
};

// Largest number of edges from target node to the furthest away leaf
const findHeight = (node) => {
  // Base case to exist recursion
  if (node === null) {
    return -1;
  }

  // Recursively find height of left and right subtrees
  const leftHeight = findHeight(node.left);
  const rightHeight = findHeight(node.right);

  // Return the max plus one for the current node
  const result = Math.max(leftHeight, rightHeight) + 1;

  return result;
};

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myEasyArray = [2, 3, 12, 15, 28, 36, 39];
const start = 0;
const end = myArray.length - 1; // 2
const sortedArray = mergeSort(myArray);
const uniqueArray = removeDuplicates(sortedArray);
root = buildTree(uniqueArray, start, end);
const rootEasyExample = buildTree(myEasyArray, start, myEasyArray.length - 1);

// console.log(root);

insertNode(10, root); // correctly inserts 10 as a new node to the right of 9,
// left of 6,345, 67 and 23

// prettyPrint(root);

deleteNode(10, root); // Correctly deletes the previously added 10

// prettyPrint(root);

// prettyPrint(rootEasyExample);

// console.log(findNode(4, root)); // Returns the correct node with 1 and 7 as it's children

// console.log(levelOrder(root, processNode)); // Returns the level order traversed BST

// console.log(inOrder(rootEasyExample, processNode)); returns expected output [2,3,12,15,28,36,39]

// console.log(preOrder(rootEasyExample, processNode)); returns expected output [13,3,5,12,36,28,39]

// console.log(postOrder(rootEasyExample, processNode)); returns expected output [2,12,3,28,39,15]

console.log(findHeight(rootEasyExample)); // Expected result 2
