function positiveSum(arr) {
    return arr.reduce((sum, current) => {
        return current > 0 ? sum + current : sum
    }, 0)
}
console.log(positiveSum([2,4,6,8]));
console.log(positiveSum([0,-3,5,7]));