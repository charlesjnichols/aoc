const fs = require('fs');
const _ = require('lodash');
const { exit } = require('process');
const { getSystemErrorMap } = require('util');

let describe_stack = true;

const stacks = [[], [], [], [], [], [], [], [], [], []];
const cmds = [];

const inputs = fs
  .readFileSync('day5.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .forEach((input) => {
    if (!describe_stack) {
      const [cmd, times, word, begin, other_word, end] = input.split(' ');
      cmds.push({ begin, times, end });
    }
    if (input == '') {
      describe_stack = false;
    }
    if (describe_stack) {
      const row = _.chunk(input, 4);

      row.forEach(([emp, crate] = row_split, index) => {
        if (crate != ' ') {
          stacks[index + 1].push(crate);
        }
      });
    }
  });

// stacks.forEach((column) => console.log(column));
// console.log(cmds);
cmds.forEach(({begin, times, end} = cmd) => {
    const pickup = stacks[begin].slice(0,times);
    stacks[begin] = stacks[begin].slice(times);
    stacks[end].unshift(...pickup);

    // stacks.forEach((column) => console.log(column));
    // console.log();
});

console.log(stacks.map((column) => column[0]).join(""));