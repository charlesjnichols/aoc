const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("day2.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((x) => {
    const parts = x.split(" ");
    return {
      direction: parts[0],
      amount: Number.parseInt(parts[1]),
    };
  });

const forward = _(inputs)
  .filter({ direction: "forward" })
  .map((x) => x.amount)
  .sum();
const up = _(inputs)
  .filter({ direction: "up" })
  .map((x) => x.amount)
  .sum();
const down = _(inputs)
  .filter({ direction: "down" })
  .map((x) => x.amount)
  .sum();
console.log(forward * (down - up));

const two = inputs.reduce(
  ({ aim, horizontal, vertial }, { direction, amount }) => {
    if (direction === "forward") {
      horizontal += amount;
      vertial += aim * amount;
    } else if (direction === "down") {
      aim += amount;
    } else if (direction === "up") {
      aim -= amount;
    }
    return { aim, horizontal, vertial };
  },
  { aim: 0, horizontal: 0, vertial: 0 }
);
console.log(two.horizontal * two.vertial);
