const _ = require("lodash");

const initial =
  // "1,1,1,1,2,1,1,4,1,4,3,1,1,1,1,1,1,1,1,4,1,3,1,1,1,5,1,3,1,4,1,2,1,1,5,1,1,1,1,1,1,1,1,1,1,3,4,1,5,1,1,1,1,1,1,1,1,1,3,1,4,1,1,1,1,3,5,1,1,2,1,1,1,1,4,4,1,1,1,4,1,1,4,2,4,4,5,1,1,1,1,2,3,1,1,4,1,5,1,1,1,3,1,1,1,1,5,5,1,2,2,2,2,1,1,2,1,1,1,1,1,3,1,1,1,2,3,1,5,1,1,1,2,2,1,1,1,1,1,3,2,1,1,1,4,3,1,1,4,1,5,4,1,4,1,1,1,1,1,1,1,1,1,1,2,2,4,5,1,1,1,1,5,4,1,3,1,1,1,1,4,3,3,3,1,2,3,1,1,1,1,1,1,1,1,2,1,1,1,5,1,3,1,4,3,1,3,1,5,1,1,1,1,3,1,5,1,2,4,1,1,4,1,4,4,2,1,2,1,3,3,1,4,4,1,1,3,4,1,1,1,2,5,2,5,1,1,1,4,1,1,1,1,1,1,3,1,5,1,2,1,1,1,1,1,4,4,1,1,1,5,1,1,5,1,2,1,5,1,1,1,1,1,1,1,1,1,1,1,1,3,2,4,1,1,2,1,1,3,2"
  "3,4,3,1,2".split(",").map((i) => Number.parseInt(i));
// console.log(initial);

const end = 1;

const fish_holder = [initial];

for (var day = 0; day < 256; day++) {
  fish_holder[day + 1] = [];
  for (var generation = 0; generation <= day; generation++) {
    fish_holder[generation].forEach((cycle, i) => {
      if (cycle === 0) {
        fish_holder[generation][i] = 6;
        fish_holder[day + 1].push(8);
      } else {
        fish_holder[generation][i] = cycle - 1;
      }
    });
  }
  //   console.log(generation, fish_holder.length);
}

// fish_holder.forEach((i) => console.log(i));
// console.log(fish_holder[0], fish_holder[1]);
console.log(_.sum(fish_holder.map(days => days.length)));
