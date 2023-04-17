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

const insert = (value, node) => {
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
      insert(value, node.left);
      // else if there is no left child, insert the data
    } else {
      node.left = NodeFactory(value);
    }
    // Else the data at the current node is less than the value to be inserted
  } else {
    // if the current node has a right child, continue to search
    if (node.right !== null) {
      insert(value, node.right);
    } else {
      node.right = NodeFactory(value);
    }
  }
};

const deleteNode = (value, node) => {
  // First check if tree has been initialised
  if (node === null) {
    console.log('Error, no data present in the tree');
    return null;
  }
  // Recurse down the tree
  if (node.data < value) {
    deleteNode(value, node.left);
  } else if (node.data > value) {
    deleteNode(value, node.right);
  } else {
    // Then check if the node is a leaf, if so remove it from the tree
    if (node.left === null && node.right === null) {
      node.data = null;
    }
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return root.left;
    }
  }
};

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const start = 0;
const end = myArray.length - 1; // 2
const sortedArray = mergeSort(myArray);
const uniqueArray = removeDuplicates(sortedArray);
root = buildTree(uniqueArray, start, end);

console.log(root);

insert(10, root);

prettyPrint(root);
