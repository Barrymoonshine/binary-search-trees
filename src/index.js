import mergeSort from './mergeSort.js'; // Importing mergeSort algorithm from Recursion project

const NodeFactory = (value, left = null, right = null) => ({
  value,
  left,
  right,
});

// Function to visualize the binary search tree in the console
// const prettyPrint = (node, prefix = '', isLeft = true) => {
//   if (node === null) {
//     return;
//   }
//   if (node.right !== null) {
//     prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//   }
//   console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//   if (node.left !== null) {
//     prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//   }
// };

const root = null;

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

const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const start = 0;
const end = myArray.length - 1; // 2
const sortedArray = mergeSort(myArray);

console.log(sortedArray);
console.log(removeDuplicates(sortedArray));
