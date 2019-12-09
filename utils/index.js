/** 
 * All the utility functions for Advent of Code 2019.
 * Author: @apgsn
 */


const computeIntcode = require('./intcode.js');

/**
 * Returns an array with all the ordered permutations of the input array
 * @param {Array} arr
 */
const permute = (arr = []) => {
  const res = [];
  if (!arr.length) return [res];
  for (let i in arr) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    permute(arr.slice(1)).forEach(p => {
      res.push([arr[0], ...p]);
    });
  }
  return res;
};

module.exports = {
  computeIntcode,
  batchExecute,
  permute,
};
