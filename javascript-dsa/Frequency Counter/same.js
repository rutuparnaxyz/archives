// Naive or brute force approach
// Time complexity O(N2)
function sameNaive(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let idx = arr2.indexOf(arr1[i] * arr1[i]);
    if (idx == -1) {
      return false;
    }
    arr2.splice(idx, 1);
  }
  return true;
}

// Efficient Solution by using map object
function same(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }
  let objOne = {};
  let objTwo = {};
  for (const i of arr1) {
    if (objOne[i] == null) {
      objOne[i] = 1;
    } else {
      objOne[i] = objOne[i] + 1;
    }
  }

  for (const i of arr2) {
    if (objTwo[i] == null) {
      objTwo[i] = 1;
    } else {
      objTwo[i] = objTwo[i] + 1;
    }
  }

  for (const key in objOne) {
    if (!(key ** 2 in objTwo)) {
      return false;
    }
    if (objTwo[key ** 2] != objOne[key]) {
      return false;
    }
  }

  return true;
}

console.log(same([1, 1, 1, 2, 3, 3], [9, 4, 9, 1, 1, 1]));

// same([1, 1, 1, 2, 3, 3, 3], [9, 4, 9, 1, 1, 1]);
