const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("day1.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((x) => Number.parseInt(x));

const by_sum = (index, window) => _.sum(inputs.slice(index, index + window));

const part1 = _.map(_.range(1, inputs.length), (index) => by_sum(index-1, 1) < by_sum(index, 1) ? 1 : 0);
console.log(_.sum(part1));

const part2 = _.map(inputs.slice(1, inputs.length - 2), (value, index) =>
    by_sum(index - 1, 3) < by_sum(index, 3) ? 1 : 0
);
console.log(_.sum(part2));
