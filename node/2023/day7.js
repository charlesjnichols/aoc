const fs = require('fs');
const _ = require('lodash');

let current = '';

const inputs = fs
  .readFileSync('day7.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .reduce((p, input) => {
    if (input.startsWith('$')) {
      const [, cmd, value] = input.split(' ');
      if (cmd === 'cd') {
        if (value === '..') {
          current = current.substring(0, current.lastIndexOf('/'));
        } else {
          current += `/${value}`;
          if (!p[current]) {
            p[current] = [];
          }
        }
      }
      return p;
    }

    const [one] = input.split(' ');
    if (one !== 'dir') {
      p[current].push(Number.parseInt(one));
    }
    return p;
  }, {});

const dir_names = _.keys(inputs);
const dir_sizes = dir_names.map((dir) =>
  _.sum(
    _.filter(dir_names, (key) => key.startsWith(dir)).flatMap(
      (key) => inputs[key]
    )
  )
);
const one = _.sum(dir_sizes.filter((value) => value <= 100000));
console.log(one);

// 70000000 //  30000000
const total_disk = _.sum(dir_names.map((input) => _.sum(inputs[input])));
const to_free = 30000000 - Math.abs(70000000 - total_disk);

const two = _.min(dir_sizes.filter((value) => value >= to_free));
console.log(two);
