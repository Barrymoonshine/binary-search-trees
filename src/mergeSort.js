const mergeSort = (arr) => {
  const merge = (leftSubArray, rightSubArray) => {
    const newArray = [];

    while (leftSubArray.length && rightSubArray.length) {
      if (leftSubArray[0] < rightSubArray[0]) {
        newArray.push(leftSubArray.shift());
      } else {
        newArray.push(rightSubArray.shift());
      }
    }

    return [...newArray, ...leftSubArray, ...rightSubArray];
  };

  const arrayLength = arr.length;

  const middleOfArray = Math.round(arrayLength / 2);
  const leftSubArray = arr.slice(0, middleOfArray);
  const rightSubArray = arr.slice(middleOfArray, arrayLength);

  if (arrayLength <= 1) {
    return arr;
  }

  const left = mergeSort(leftSubArray);
  const right = mergeSort(rightSubArray);

  return merge(left, right);
};

export default mergeSort;
