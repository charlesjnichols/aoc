const fs = require('fs');
const _ = require('lodash');

// A = ROCK, B = PAPER, C = SCISSOR
// X = ROCK, Y = PAPER, Z = SCISSOR

const played_score = { X: 1, Y: 2, Z: 3 };
const played_beats = { X: 'C', Y: 'A', Z: 'B' };
const played_ties = { X: 'A', Y: 'B', Z: 'C' };

const inputs = fs
  .readFileSync('day2.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .map((input) => {
    [them, me] = input.split(' ');
    if (played_beats[me] === them) {
      return 6 + played_score[me];
    } else if (played_ties[me] == them) {
      return 3 + played_score[me];
    }
    return played_score[me];
  });
console.log(_.sum(inputs));

// X = LOOSE, Y = TIE, Z = WIN
// X = ROCK, Y = PAPER, Z = SCISSOR
const cheat_score = { X: 0, Y: 3, Z: 6 };
const cheat_sheet = {
  A: { Z: 'Y', X: 'Z', Y: 'X' }, // them:ROCK
  B: { Z: 'Z', X: 'X', Y: 'Y' }, // them:PAPER
  C: { Z: 'X', X: 'Y', Y: 'Z' }, // them:SCISSOR
};

const inputs2 = fs
  .readFileSync('day2.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .map((input) => {
    [them, outcome] = input.split(' ');
    // console.log(me, outcome);

    const score = cheat_score[me];
    const i_play = cheat_sheet[them][outcome];

    // console.log(them, outcome, i_play);
    // console.log(cheat_score[outcome], played_score[i_play]);
    return cheat_score[outcome] + played_score[i_play];
  });
console.log(_.sum(inputs2));