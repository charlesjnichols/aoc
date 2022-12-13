const _ = require("lodash");

const move_probe = ({ x, y, x_velocity, y_velocity }) => {
  x = x + x_velocity;
  y = y + y_velocity;
  x_velocity =
    x_velocity > 0 ? x_velocity - 1 : x_velocity === 0 ? 0 : x_velocity + 1;
  y_velocity = y_velocity - 1;
  return { x, y, x_velocity, y_velocity };
};

const build_probe = (x_v, y_v) => ({
  x: 0,
  y: 0,
  x_velocity: x_v,
  y_velocity: y_v,
});

// const target = { x_1: 20, x_2: 30, y_1: -10, y_2: -5 };
const target = { x_1: 192, x_2: 251, y_1: -89, y_2: -59 };

const min_y = _.min([target.y_1, target.y_2]);
const max_x = _.max([target.x_1, target.x_2]);

const in_target_area = ({ x, y }, { x_1, y_1, x_2, y_2 }) =>
  x >= x_1 && x <= x_2 && y >= y_1 && y <= y_2;

const beyond_target_area = (probe) => beyond_x(probe) || beyond_y(probe);

const beyond_x = ({ x }) => x >= max_x;
const beyond_y = ({ y }) => y <= min_y;

const launch = (x_v, y_v) => {
  let probe = build_probe(x_v, y_v);
  let highest_y = 0;
  while (!beyond_target_area(probe, target) && !in_target_area(probe, target)) {
    probe = move_probe(probe);
    if (highest_y < probe.y) highest_y = probe.y;
    // console.log(probe, max_x, min_y);
  }

  if (in_target_area(probe, target)) {
    console.log("hit", x_v, y_v, probe);
    return {highest_y, x_v, y_v};
  } else {
    //   console.log("miss", x_v, y_v, probe, target);
    return;
  }
};

// console.log(launch(0,2));

// console.log(max_x, min_y);
const solutions = [];
for (let x = 0; x <= max_x + 1; x++) {
  for (let y = min_y; y <= 1000; y++) {
    let landed = launch(x, y);
    // console.log(x,y);
    if (landed) {
      solutions.push(landed);
    }
  }
}
// console.log(_.maxBy(solutions, (x) => x.highest_y));
console.log(solutions.length);