const fs = require('fs');
const _ = require('lodash');

const priority = (c) =>
  c === c.toUpperCase() ? c.charCodeAt() - 64 + 26 : c.charCodeAt() - 96;

const inputs = fs
  .readFileSync('day3.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .map((input) => {
    const [one, two] = _.chunk(input, input.length / 2);
    const [inter] = _.intersection(one, two);
    // console.log(one, two);
    // console.log(priority(inter));
    return priority(inter);
  });
// console.log(_.sum(inputs));

const inputs2 = fs
  .readFileSync('day3.txt')
  .toString('utf8')
  .split(/\r?\n/);

const groups = _.chunk(inputs2, 3);
const pp = groups.map(input => {
    const [inter] = _.intersection(input[0].split(""), input[1].split(""), input[2].split(""));
    // console.log(inter);
    return priority(inter);
})
console.log(_.sum(pp));