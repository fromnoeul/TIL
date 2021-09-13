function init(buje, cars) {
  jukbal = 0;
  cars.forEach(i => {
    jukbal += i % 10 === buje ? 1 : 0;
  });
  return jukbal;
}

let buje = 0,
  cars = [12, 20, 54, 30, 87, 91, 30];

console.log(init(buje, cars));
