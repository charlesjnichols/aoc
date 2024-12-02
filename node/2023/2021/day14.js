const fs = require("fs");
const _ = require("lodash");
const { listenerCount } = require("stream");

const rules = fs
  .readFileSync("day14.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .reduce((acc, point) => {
    const [x, y] = point.split(",");
    return { ...acc, [x]: y };
  }, {});

const input = "SVCHKVFKCSHVFNBKKPOC".split("");
const counts = {};

let pairs = input
  .map((c) => {
    counts[c] === undefined ? (counts[c] = 1) : counts[c]++;
    return c;
  })
  .reduce(
    (acc, c, i) =>
      i === input.length - 1
        ? acc
        : {
            ...acc,
            [`${c}${input[i + 1]}`]:
              acc[`${c}${input[i + 1]}`] === undefined
                ? 1
                : acc[`${c}${input[i + 1]}`] + 1,
          },
    {}
  );

_.range(0, 40).forEach((i) => {
  pairs = _.keys(pairs).reduce((acc, pair) => {
    const next = rules[pair];
    const first = `${pair[0]}${next}`;
    const last = `${next}${pair[1]}`;
    const times = pairs[pair];

    counts[next] === undefined
      ? (counts[next] = times)
      : (counts[next] += times);
    acc[first] === undefined ? (acc[first] = times) : (acc[first] += times);
    acc[last] === undefined ? (acc[last] = times) : (acc[last] += times);

    return acc;
  }, {});
});

// console.log(counts);
console.log(_(counts).values().max() - _(counts).values().min());
