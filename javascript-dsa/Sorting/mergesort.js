// Write a merge function to merge two sorted arrays.
function merge(arr1, arr2) {
  let mergedArr = [];
  let i = 0;
  let j = 0;
  while (arr1.length > i && arr2.length > j) {
    if (arr1[i] > arr2[j]) {
      mergedArr.push(arr2[j]);
      j++;
    } else {
      mergedArr.push(arr1[i]);
      i++;
    }
  }

  while (arr1.length > i) {
    mergedArr.push(arr1[i]);
    i++;
  }
  while (arr2.length > j) {
    mergedArr.push(arr2[j]);
    j++;
  }

  return mergedArr;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

console.log(mergeSort([4, 8, 1, 5, 3, 9, 2]));
