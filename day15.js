require("dotenv").config();

const fs = require("fs");
const _ = require("lodash");
const { find_path } = require("dijkstrajs");

const inputs = fs
  .readFileSync("day15.txt")
  .toString("utf8")
  .split(/\r?\n/)
  .map((line) => line.split("").map(Number));

const max_x = _.head(inputs).length;
const max_y = inputs.length;

const map = [];

console.log("duplicating");

_.range(0, 5).forEach((y_round) =>
  _.range(0, max_y).forEach((y) =>
    _.range(0, 5).forEach((x_round) =>
      _.range(0, max_x).forEach((x) => {
        const n_y = y + y_round * max_y;
        const n_x = x + x_round * max_x;
        const round = x_round + y_round;
        if (!map[n_y]) map[n_y] = [];
        map[n_y][n_x] =
          inputs[y][x] + round > 9
            ? ((inputs[y][x] + round) % 10) + 1
            : inputs[y][x] + round;
      })
    )
  )
);

// console.log(map.map((line) => line.join("")).join("\n"));
// return;

const connections = (x, y) => {
  const connections = {};
  if (x < _.head(map).length - 1)
    // right
    connections[`${x + 1}_${y}`] = map[y][x + 1];
  if (y < map.length - 1)
    //  bottom
    connections[`${x}_${y + 1}`] = map[y + 1][x];
  if (x > 0)
    // left
    connections[`${x - 1}_${y}`] = map[y][x - 1];
  if (y > 0)
    // top
    connections[`${x}_${y - 1}`] = map[y - 1][x];

  connections.cost = map[y][x];
  return connections;
};

console.log("making grid");
const graph = {};

_.range(0, map.length).forEach((y) =>
  _.range(0, _.head(map).length).forEach(
    (x) => (graph[`${x}_${y}`] = connections(x, y))
  )
);

console.log("starting");

const path = find_path(graph, "0_0", "499_499");
console.log(_.sum(path.slice(1).map((n) => graph[n].cost)));
