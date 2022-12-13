const fs = require('fs');
const _ = require('lodash');

const inputs = fs
  .readFileSync('day1.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .reduce(
    (p, c) => {
      const {sum, values} = _.last(p);

      if (c === '') {
        _.last(p).sum = _.sum(values);
        p.push({ values: [] });
      } else {
        _.last(p).values.push(Number.parseInt(c))
      }
      return p;
    },
    [{ values: [] }]
  );

_.last(inputs).sum = _.sum(_.last(inputs).values);

const {sum: part1} = _.maxBy(inputs, 'sum');
console.log(part1);

const part2t = _.sortBy(inputs, 'sum').slice(-3);
const part2 = _.sum(part2t.map(({sum}) => sum));
console.log(part2);
