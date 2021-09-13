function init(N) {
  let i = 1,
    sum = 0;
  for (i; i < N + 1; i++) sum += i;
  return sum;
}

let N = 100;
console.log(init(N));
