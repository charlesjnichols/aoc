const fs = require('fs');
const _ = require('lodash');

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
      _.range(0, times).forEach(() => cmds.push({ begin, end }));
    }
    if (input == '') {
      describe_stack = false;
    }
    if (describe_stack) {
      const row = _.chunk(input, 4);
      //   console.log(row);

      row.forEach(([emp, crate] = row_split, index) => {
        if (crate != ' ') {
          //   console.log(crate, ind);
          stacks[index + 1].push(crate);
        }
      });
    }
  });

// stacks.forEach((column) => console.log(column));
// console.log(cmds);
cmds.forEach(({begin, end} = cmd) => {
    stacks[end].unshift(stacks[begin].shift());
});

console.log(stacks.map((column) => column[0]).join(""));