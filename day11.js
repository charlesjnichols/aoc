const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("day11.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((l) => l.split("").map((i) => Number.parseInt(i)));

// [y[x]]
// console.log(inputs);

const print = () => {
  _.range(0, inputs.length).forEach((y) => console.log(inputs[y].join("")));
  console.log();
};

const adjacent = (x, y) => {
  const adj = [];

  //top
  if (y > 0) adj.push({ x, y: y - 1 });
  //bottom
  if (y < inputs.length - 1) adj.push({ x, y: y + 1 });
  // left
  if (x > 0) adj.push({ x: x - 1, y });
  //top-left
  if (x > 0 && y > 0) adj.push({ x: x - 1, y: y - 1 });
  //bottom-left
  if (x > 0 && y < inputs.length - 1) adj.push({ x: x - 1, y: y + 1 });
  // right
  if (x < _.head(inputs).length - 1) adj.push({ x: x + 1, y });
  //top-right
  if (x < _.head(inputs).length - 1 && y > 0) adj.push({ x: x + 1, y: y - 1 });
  //bottom-right
  if (x < _.head(inputs).length - 1 && y < inputs.length - 1)
    adj.push({ x: x + 1, y: y + 1 });

  return adj;
};

const all_pos = () => {
  const pos = [];
  _.range(0, inputs.length).forEach((y) => {
    _.range(0, _.head(inputs).length).forEach((x) => {
      pos.push({ x, y });
    });
  });
  return pos;
};

const all_flash = () => {
  const flash = all_pos().filter(({ x, y }) => inputs[y][x] > 9);
  flash.forEach(({ x, y }) => {
    adjacent(x, y).forEach(({ x, y }) => {
      if (inputs[y][x] != 0) inputs[y][x]++;
    });
    inputs[y][x] = 0;
  });
  return flash;
};

print();

const flashes = _.range(0, 100).map(() => {
  all_pos().map(({ x, y }) => inputs[y][x]++);

  const flash = [];
  do {
    flash.push(all_flash());
  } while (_.last(flash).length != 0);

  return _.flatMap(flash).length;
});

console.log(_.sum(flashes));

let count = 0;
while (true) {
  all_pos().map(({ x, y }) => inputs[y][x]++);

  const flash = [];
  do {
    flash.push(all_flash());
  } while (_.last(flash).length != 0);

  count++;
  if (_.flatMap(flash).length == 100) {
    console.log("done", count + 100);
    return;
  }
}
