const fs = require("fs");
const _ = require("lodash");

const inputs = fs.readFileSync("day4.txt").toString("utf8").split(/\r?\n/);

var calls = inputs
  .shift(1)
  .split(",")
  .map((x) => Number.parseInt(x));

// calls = [14, 21, 17, 24, 4];

const starting_boards = inputs
  .filter((x) => x != "")
  .reduce(
    (acc, x) => {
      const x_num = x
        .split(" ")
        .filter((x) => x != "")
        .map((x) => Number.parseInt(x));
      if (acc[acc.length - 1].length < 5) {
        acc[acc.length - 1].push(x_num);
      } else {
        acc.push([x_num]);
      }
      return acc;
    },
    [[]]
  )
  .map((one) => {
    return {
      hori: one,
      vert: one.map((foo, column) => one.map((foo2, row) => one[row][column])),
      matched: false,
    };
  });

const match_boards = (boards, called) =>
  _.map(boards, ({ hori, vert }) => {
    const found = _.find(
      [...hori, ...vert],
      (answer) => _.intersection(called, answer).length == 5
    );
    if (found) {
      return { called, hori, vert, matched: true };
    }
    return { called, hori, vert, matched: false };
  });

const board_matches = [];


var boards = starting_boards;
for (var i = 1; i <= calls.length; i++) {
  const called = calls.slice(0, i);

  boards = match_boards(
    boards.filter((x) => !x.matched),
    called
  );

  boards
    .filter((x) => x.matched)
    .forEach((found) => {
      board_matches.push(found);
    });
}

// console.log(board_matches);

const answer = (board) => {
  const { hori, called } = board;
  const not_marked = _(hori)
    .map((row) => row.filter((c) => _.indexOf(called, c) == -1))
    .flatMap()
    .sum();
  return not_marked * _.last(called);
};

console.log(answer(_.head(board_matches)));
console.log(answer(_.last(board_matches)));
