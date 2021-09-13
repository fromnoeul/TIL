function init(arr) {
  let odd_min = -1,
    odd_sum = 0;
  arr.forEach(i => {
    if (i % 2 !== 0) {
      odd_sum += i;
      odd_min = odd_min < 0 || odd_min >= i ? i : odd_min;
    }
  });
  return [odd_sum, odd_min];
}

let arr = [12, 77, 38, 41, 53, 92, 85];
console.log(init(arr)[0]);
console.log(init(arr)[1]);
