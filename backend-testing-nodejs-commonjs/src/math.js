function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += Number(number);
  }
  return sum;
}

exports.add = add;
// same as module.exports = add;
