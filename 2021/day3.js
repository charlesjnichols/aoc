const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("day3.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((x) => x.split("").map((x) => Number.parseInt(x)));

const first = _.head(inputs);

const most_common_bit = (source, flip = false) =>
  first
    .map((x, index) => _.sumBy(source, (input) => input[index]))
    .map((x) => (x >= Number.parseFloat(source.length / 2) ? (flip ? 0 : 1) : flip ? 1 : 0));

const to_number = (source) => parseInt(source.join(""), 2);

const gamma = to_number(most_common_bit(inputs));
const epsilon = to_number(most_common_bit(inputs, true));

console.log(gamma * epsilon);

const reduce_noise = (source, index = 0, flip=false) => {
  if(source.length == 1){
    return source[0];
  }
  const mcb = most_common_bit(source, flip);
  const rest = source.filter((x) => x[index] == mcb[index]);
  return reduce_noise(rest, index+1, flip);
}

const oxy = to_number(reduce_noise(inputs))
const co2 = to_number(reduce_noise(inputs, 0, true));
console.log(oxy * co2);