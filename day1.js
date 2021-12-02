const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("day1.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((x) => Number.parseInt(x));

const by_sum = (index, window = 1) =>
  _.sum(inputs.slice(index - 1, index - 1 + window)) <
  _.sum(inputs.slice(index, index + window))
    ? 1
    : 0;

const part1 = _(_.range(1, inputs.length))
  .map((index) => by_sum(index))
  .sum();
console.log(part1);

const part2 = _(_.range(1, inputs.length - 2))
  .map((index) => by_sum(index, 3))
  .sum();
console.log(part2);
