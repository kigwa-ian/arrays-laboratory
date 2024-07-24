function hasTargetSum(array, target) {
    const seenNumbers = new Set();
  
    for (const number of array) {
      const complement = target - number;
      if (seenNumbers.has(complement)) {
        return true;
      }
      seenNumbers.add(number);
    }
  
    return false;
  }
  

  console.log(hasTargetSum([3, 8, 12, 4, 11, 7], 10)); // true
  console.log(hasTargetSum([22, 19, 4, 6, 30], 25)); // true
  console.log(hasTargetSum([1, 2, 5], 4)); // false
  console.log(hasTargetSum([1, 2, 3, 4, 5], 9)); // true
  console.log(hasTargetSum([], 1)); // false
  console.log(hasTargetSum([1, 1, 1, 1], 2)); // true
  