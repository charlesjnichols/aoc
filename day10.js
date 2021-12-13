const fs = require("fs");
const _ = require("lodash");

const inputs = fs.readFileSync("day10.txt").toString("utf8").split(/\r?\n/);
// console.log(inputs);

const open_char = { "(": ")", "[": "]", "{": "}", "<": ">" };
const invalid_cost = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const incomplete_cost = { ")": 1, "]": 2, "}": 3, ">": 4 };

const answer = _(inputs).map((input) =>
  input.split("").reduce(
    ({ open, wrong }, x) => {
      if (open_char[x]) {
        open.push(x);
      } else {
        const last = open.splice(open.length - 1);
        if (x != open_char[last]) {
          wrong.push(x);
        }
      }
      return { open, wrong };
    },
    { open: [], wrong: [] }
  )
);

console.log(
  _(answer)
    .filter(({ wrong }) => wrong.length)
    .map(({ wrong }) => invalid_cost[_.head(wrong)])
    .sum()
);

const costs = _(answer)
  .filter((a) => a.wrong.length === 0)
  .map(({ open }) =>
    open
      .reverse()
      .reduce((acc, c) => acc * 5 + incomplete_cost[open_char[c]], 0)
  )
  .sort((a, b) => a - b)
  .value();

console.log(costs[Math.floor(costs.length / 2)]);
