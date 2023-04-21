/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mergeSort_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mergeSort.js */ \"./src/mergeSort.js\");\n // Importing mergeSort algorithm from Recursion project\n\nconst NodeFactory = (data, left = null, right = null) => ({\n  data,\n  left,\n  right,\n});\n\n// Function to visualize the binary search tree in the console\nconst prettyPrint = (node, prefix = '', isLeft = true) => {\n  if (node === null) {\n    return;\n  }\n  if (node.right !== null) {\n    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);\n  }\n  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);\n  if (node.left !== null) {\n    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);\n  }\n};\n\nlet root = null;\n\nconst buildTree = (array, start, end) => {\n  // Base case to exit algorithm\n  if (start > end) {\n    return null;\n  }\n  // Recursively call buildTree to construct left and right branches\n  const mid = parseInt((start + end) / 2);\n  const node = NodeFactory(array[mid]);\n  node.left = buildTree(array, start, mid - 1);\n  node.right = buildTree(array, mid + 1, end);\n  return node;\n};\n\nconst removeDuplicates = (array) => {\n  const uniqueArray = [];\n  array.forEach((item) => {\n    if (!uniqueArray.includes(item)) {\n      uniqueArray.push(item);\n    }\n  });\n  return uniqueArray;\n};\n\nconst insertNode = (value, node) => {\n  // First check if tree has been initialised\n  if (node === null) {\n    root = NodeFactory(value);\n    // Check if a duplicate, if so throw error\n  }\n  if (node.data === value) {\n    console.log('Error, data already exists in tree');\n  }\n  // If the data at the current node is greater than the value to be inserted,\n  // go down the left subtree\n  else if (node.data > value) {\n    // If the current node has a left child, continue to search\n    if (node.left !== null) {\n      insertNode(value, node.left);\n      // else if there is no left child, insert the data\n    } else {\n      node.left = NodeFactory(value);\n    }\n    // Else the data at the current node is less than the value to be inserted\n  } else {\n    // if the current node has a right child, continue to search\n    if (node.right !== null) {\n      insertNode(value, node.right);\n    } else {\n      node.right = NodeFactory(value);\n    }\n  }\n};\n\nconst findMin = (node) => {\n  // Find smallest value in the right subtree and return this value\n  // First look in the left subtree\n  if (node.left !== null) {\n    findMin(node.left);\n    // When the left subtree is empty, the function has found the smallest value\n  } else {\n    return node;\n  }\n};\n\nconst deleteNode = (value, node) => {\n  // Edge case if the tree is empty\n  if (node === null) {\n    console.log('Error, no data present in the tree');\n    return null;\n  }\n  // Recurse down the tree until the specified value is found, or exit via base case\n  if (node.data > value && node.left !== null) {\n    node.left = deleteNode(value, node.left);\n  } else if (node.data < value && node.right !== null) {\n    node.right = deleteNode(value, node.right);\n    // Function has found a value to delete\n  } else if (node.data === value) {\n    // If the target node has two children\n    if (node.left !== null && node.right !== null) {\n      // Search the right sub-tree for the smallest value to replace the node to be deleted\n      const minVal = findMin(node.right);\n      // Override the data to be deleted with the smallest value\n      node.data = minVal;\n      // Recursively delete the now duplicate node to the right\n      node.right = deleteNode(minVal, node.right);\n      // If the target node only has a left child\n    } else if (node.left !== null && node.right === null) {\n      return node.left;\n      // If the target node only has a right child\n    } else if (node.left === null && node.right !== null) {\n      return node.right;\n      // Check if the node has no children and is therefore a leaf\n    } else if (node.left === null && node.right === null) {\n      return null;\n    }\n  }\n  return node;\n};\n\nconst findNode = (value, node) => {\n  // Edge case if the tree is empty\n  if (node === null) {\n    console.log('Error, no data present in the tree');\n    return null;\n  }\n  // First check if data at current node is what we are lookin for\n  if (node.data === value) {\n    console.log('success');\n    console.log(node);\n    return node;\n    // If not, check if the data is less than current node\n    // If true, search left sub-tree\n  }\n  if (node.data > value && node.left !== null) {\n    return findNode(value, node.left);\n    // Check if data is greater than current node\n    // If true, search right sub-tree\n  }\n  if (node.data < value && node.right !== null) {\n    return findNode(value, node.right);\n  }\n  return null;\n};\n\n// Callback function\nconst processNode = (node) => node.data;\n\nconst levelOrder = (root, callBack) => {\n  // First check if there is a BST\n  if (root === null) {\n    return [];\n  }\n\n  const result = [];\n  // Then add initialize the queue with the root\n  const queue = [root];\n  // Loop through the queue taking the first element from the queue\n  while (queue.length !== 0) {\n    const node = queue.shift();\n    // Only add leaves that have a value\n    if (callBack(node)) {\n      result[result.length] = callBack(node);\n    }\n\n    // If the visited node has left or right children, add these to the queue\n    if (node.left) {\n      queue.push(node.left);\n    }\n    if (node.right) {\n      queue.push(node.right);\n    }\n  }\n  return result;\n};\n\n// Left, root, right\n// Using easyArray, expected 2,3,12,15,28,36,39\nconst inOrder = (root, callBack) => {\n  // First check if there is a BST\n  if (root === null) {\n    return [];\n  }\n  const result = [];\n\n  const traverse = (root) => {\n    // Keep traversing the left node until there are no more children\n    if (root.left) traverse(root.left);\n    // Add the value of the left node into the results array\n    result[result.length] = callBack(root);\n    // Keep traversing the right node until there are no more children\n    if (root.right) traverse(root.right);\n  };\n\n  traverse(root);\n  return result;\n};\n\n// Root, left , right\n// Using easyArray expected [13,3,5,12,36,28,39]\nconst preOrder = (root, callBack) => {\n  // First check if there is a BST\n  if (root === null) {\n    return [];\n  }\n\n  const result = [];\n  const traverse = (root) => {\n    // Add the value of the root node to the results array\n    result[result.length] = callBack(root);\n    // Then traverse left\n    if (root.left) traverse(root.left);\n    // Traverse right until there are no more children\n    if (root.right) traverse(root.right);\n  };\n\n  traverse(root);\n  return result;\n};\n\n// Left, right, root\n// Expected output [2,12,3,28,39,15]\nconst postOrder = (root, callBack) => {\n  // First check if there is a BST\n  if (root === null) {\n    return [];\n  }\n\n  const result = [];\n  const traverse = (root) => {\n    if (root.left) traverse(root.left);\n    if (root.right) traverse(root.right);\n    result[result.length] = callBack(root);\n  };\n\n  traverse(root);\n  return result;\n};\n\n// Largest number of edges from target node to the furthest away leaf\nconst findHeight = (node) => {\n  // Base case to exist recursion\n  if (node === null) {\n    return -1;\n  }\n\n  // Recursively find height of left and right subtrees\n  const leftHeight = findHeight(node.left);\n  const rightHeight = findHeight(node.right);\n\n  // Return the max plus one for the current node\n  const result = Math.max(leftHeight, rightHeight) + 1;\n\n  return result;\n};\n\nconst findDepth = (value, node, depth = 0) => {\n  console.log(`depth ${depth}`);\n  console.log(node);\n  // Edge case if the tree is empty\n  if (node === null) {\n    return depth;\n  }\n  // First check if data at current node is what we are lookin for\n  if (node.data === value) {\n    return depth;\n    // If not, check if the data is less than current node\n    // If true, search left sub-tree\n  }\n  if (node.data > value && node.left !== null) {\n    return findDepth(value, node.left, (depth += 1));\n    // Check if data is greater than current node\n    // If true, search right sub-tree\n  }\n  if (node.data < value && node.right !== null) {\n    return findDepth(value, node.right), (depth += 1);\n  }\n};\n\n// A BST is deemed to be balanced if the height of the left sub-tree and right subtree\n// Do not differ by more than 1\nconst getHeight = (root) => {\n  if (root == null) {\n    return 0;\n  }\n  const leftHeight = getHeight(root.left);\n  const rightHeight = getHeight(root.right);\n  return Math.max(leftHeight, rightHeight) + 1;\n};\n\n// Checks if the difference between the height of the left and right subtree\n// Is not more than 1\nconst isTreeBalanced = (root) => {\n  // Base case, empty tree balanced\n  if (root === null) {\n    return true;\n  }\n\n  // Recursively check if left and right subtrees are balanced\n  const leftHeight = getHeight(root.left);\n  const rightHeight = getHeight(root.right);\n\n  if (\n    Math.abs(leftHeight - rightHeight) <= 1 &&\n    isTreeBalanced(root.left) &&\n    isTreeBalanced(root.right)\n  ) {\n    return true;\n  }\n\n  return false;\n};\n\nconst rebalance = (root) => {\n  const orderedArray = levelOrder(root, processNode);\n  const start = 0;\n  const end = orderedArray.length - 1;\n  const balancedTree = buildTree(orderedArray, start, end);\n  return balancedTree;\n};\n\nconst createRandomArray = (num, maxVal) => {\n  const randomArray = [];\n  for (let i = 0; i < num; i += 1) {\n    randomArray.push(Math.floor(Math.random() * maxVal));\n  }\n  return randomArray;\n};\n\nconst runTests = () => {\n  const myArray = createRandomArray(10, 100);\n  const sortedArray = (0,_mergeSort_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(myArray);\n  const uniqueArray = removeDuplicates(sortedArray);\n  const myBST = buildTree(uniqueArray, 0, uniqueArray.length - 1);\n  prettyPrint(myBST);\n  console.log(`Is BST balanced? ${isTreeBalanced(myBST)}`);\n  console.log(levelOrder(myBST, processNode));\n  console.log(preOrder(myBST, processNode));\n  console.log(postOrder(myBST, processNode));\n  console.log(inOrder(myBST, processNode));\n  const node1 = NodeFactory(145);\n  const node2 = NodeFactory(102);\n  const node3 = NodeFactory(186);\n  node1.left = node2;\n  node2.left = node3;\n  console.log(`Is the new BST balanced? ${isTreeBalanced(node1)}`);\n  const newBalancedBST = rebalance(node1);\n  prettyPrint(newBalancedBST);\n  console.log(`Is the new new BST balanced? ${isTreeBalanced(newBalancedBST)}`);\n  console.log(levelOrder(newBalancedBST, processNode));\n  console.log(preOrder(newBalancedBST, processNode));\n  console.log(postOrder(newBalancedBST, processNode));\n  console.log(inOrder(newBalancedBST, processNode));\n};\n\nrunTests();\n// Previous tests\n// const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];\n// const myEasyArray = [2, 3, 12, 15, 28, 36, 39];\n// const start = 0;\n// const end = myArray.length - 1; // 2\n// const sortedArray = mergeSort(myArray);\n// const uniqueArray = removeDuplicates(sortedArray);\n// root = buildTree(uniqueArray, start, end);\n// const rootEasyExample = buildTree(myEasyArray, start, myEasyArray.length - 1);\n\n// // console.log(root);\n\n// insertNode(10, root); // correctly inserts 10 as a new node to the right of 9,\n// // left of 6,345, 67 and 23\n\n// // prettyPrint(root);\n\n// deleteNode(10, root); // Correctly deletes the previously added 10\n\n// // prettyPrint(root);\n\n// prettyPrint(rootEasyExample);\n\n// // console.log(findNode(4, root)); // Returns the correct node with 1 and 7 as it's children\n\n// // console.log(levelOrder(root, processNode)); // Returns the level order traversed BST\n\n// console.log(inOrder(rootEasyExample, processNode)); returns expected output [2,3,12,15,28,36,39]\n\n// console.log(preOrder(rootEasyExample, processNode)); returns expected output [13,3,5,12,36,28,39]\n\n// console.log(postOrder(rootEasyExample, processNode)); returns expected output [2,12,3,28,39,15]\n\n// console.log(findHeight(rootEasyExample)); // Returns expected output 2\n\n// console.log(findHeight(rootEasyExample.left)); //  Returns expected output 1\n\n// console.log(findDepth(2, rootEasyExample)); // Returns output 2\n\n// console.log(isTreeBalanced(rootEasyExample)); // Expected output true\n\n\n//# sourceURL=webpack://binary-search-trees/./src/index.js?");

/***/ }),

/***/ "./src/mergeSort.js":
/*!**************************!*\
  !*** ./src/mergeSort.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mergeSort = (arr) => {\n  const merge = (leftSubArray, rightSubArray) => {\n    const newArray = [];\n\n    while (leftSubArray.length && rightSubArray.length) {\n      if (leftSubArray[0] < rightSubArray[0]) {\n        newArray.push(leftSubArray.shift());\n      } else {\n        newArray.push(rightSubArray.shift());\n      }\n    }\n\n    return [...newArray, ...leftSubArray, ...rightSubArray];\n  };\n\n  const arrayLength = arr.length;\n\n  const middleOfArray = Math.round(arrayLength / 2);\n  const leftSubArray = arr.slice(0, middleOfArray);\n  const rightSubArray = arr.slice(middleOfArray, arrayLength);\n\n  if (arrayLength <= 1) {\n    return arr;\n  }\n\n  const left = mergeSort(leftSubArray);\n  const right = mergeSort(rightSubArray);\n\n  return merge(left, right);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeSort);\n\n\n//# sourceURL=webpack://binary-search-trees/./src/mergeSort.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;