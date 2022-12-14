const fs = require('fs');
const _ = require('lodash');
const { exit } = require('process');
const Grid = require('./grid');

const width = 99;
const height = 99;

const grid = new Grid(width, height, false);

fs.readFileSync('day8.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .forEach((input) => {
    input.split('').forEach((i) => grid.push(Number.parseInt(i)));
  });

const find_larger = (w, h, offset_width, offset_height) => {
  const at = grid.at(w, h);
  while (true) {
    w += offset_width;
    h += offset_height;
    const next = grid.at(w, h);

    if (next === -1) {
      return false;
    } else if (at <= next) {
      return true;
    }
  }
  return true;
};

const hidden = _.range(1, height - 1)
  .flatMap((h) => {
    return _.range(1, width - 1).map((w) => {
      const left = find_larger(w, h, -1, 0);
      const right = find_larger(w, h, 1, 0);

      const top = find_larger(w, h, 0, -1);
      const bottom = find_larger(w, h, 0, 1);

      return left && right && top && bottom;
    });
  })
  .filter((h) => !h);

console.log(hidden.length + (width * 2) + (height * 2) - 4);
