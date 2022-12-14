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

const senic_score = (w, h, offset_width, offset_height) => {
  const at = grid.at(w, h);
  let distance = 0;
  while (true) {
    w += offset_width;
    h += offset_height;
    const next = grid.at(w, h);

    distance++;

    if (next === -1) {
      return distance-1;
    } else if (at <= next) {
      return distance;
    }
  }
};

const scores = _.range(1, height - 1).flatMap((h) => {
  return _.range(1, width - 1).map((w) => {
    const at = grid.at(w, h);
    const left = senic_score(w, h, -1, 0);
    const right = senic_score(w, h, 1, 0);

    const top = senic_score(w, h, 0, -1);
    const bottom = senic_score(w, h, 0, 1);

    return left * right * top * bottom;
  });
});

console.log(_.max(scores));
