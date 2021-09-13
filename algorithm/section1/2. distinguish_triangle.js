function init(a, b, c) {
  //! 가장 긴 변을 찾는다
  let max = a >= b ? a : b;
  max = max >= c ? max : c;

  //! 나머지 두 변의 합보다 작은지 비교한다
  return a + b + c - max > max ? 'YES' : 'NO';
}

console.log(init(13, 22, 17));
