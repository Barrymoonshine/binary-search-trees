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
  // Base case if the tree is empty
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

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const start = 0;
const end = myArray.length - 1; // 2
const sortedArray = mergeSort(myArray);
const uniqueArray = removeDuplicates(sortedArray);
root = buildTree(uniqueArray, start, end);

console.log(root);

insertNode(10, root); // correctly inserts 10 as a new node to the right of 9,
// left of 6,345, 67 and 23

prettyPrint(root);

deleteNode(10, root);

prettyPrint(root);
