function init(a, b, c) {
  let min = a >= b ? b : a;
  return min >= c ? c : min;
}

console.log(init(10, 9, 9));
