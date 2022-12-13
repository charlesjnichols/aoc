const fs = require("fs");
const _ = require("lodash");

const inputs = fs.readFileSync("day5.txt").toString("utf8").split(/\r?\n/);

var coords = inputs.map((line) =>
  line.split("|").map((pos) => pos.split(",").map((x) => Number.parseInt(x)))
);

const print = (coord_grid) => {
  console.log("- 0 1 2 3 4 5 6 7 8 9");
  coord_grid.forEach((row, ri) => {
    const col = row.map((column, ci) => {
      return coord_grid[ci][ri];
    });
    console.log(ri + " " + col.join(" "));
  });
};

const biggest = (index) =>
  _(coords.map((s_e) => s_e.map((x_y) => x_y[0])))
    .flatMap()
    .max();

const large = _.max([biggest(0), biggest(1)]);
console.log(large);
const grid = _.times(large + 1, () => _.times(large + 1, () => 0));

coords.forEach((s_e) => {
  var start = s_e[0];
  var end = s_e[1];

  var current = start;
  grid[current[0]][current[1]]++;

  while (current[0] != end[0] || current[1] != end[1]) {
    if (current[0] != end[0]) {
      if (s_e[0][0] < s_e[1][0]) {
        current[0]++;
      } else {
        current[0]--;
      }
    }
    if (current[1] != end[1]) {
      if (s_e[0][1] < s_e[1][1]) {
        current[1]++;
      } else {
        current[1]--;
      }
    }
    grid[current[0]][current[1]]++;
  }
  //   }
});

// console.log(print(grid));

const answer = _(
  grid.map((row, ri) => row.map((col, ci) => (grid[ri][ci] > 1 ? 1 : 0)))
)
  .flatMap()
  .sum();
console.log(answer);
