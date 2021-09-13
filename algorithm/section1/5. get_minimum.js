function init(arr) {
  const arrlen = arr.length;
  let min = arr[0];

  arr.forEach(i => {
    min = min <= i ? min : i;
  });

  return min;
}

arr = [51, 33, 76, 111, 24, 152, 171];
console.log(init(arr));
