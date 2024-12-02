const fs = require('fs');
const _ = require('lodash');

const between = (c, one, two) => c >= one && c <= two;

const inputs = fs
  .readFileSync('day4.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .map((input) => input.split(','))
  .map(([one, two] = zz) => {
    const [o_start, o_end] = one.split('-').map(c => Number.parseInt(c));
    const [t_start, t_end] = two.split('-').map(c => Number.parseInt(c));

    if(between(o_start, t_start, t_end) && between(o_end, t_start, t_end)){
      // console.log("o between", o_start+1, t_start);
      return 1;
    }else if(between(t_start, o_start, o_end) && between(t_end, o_start, o_end)){
      // console.log("t between", one, two);
      return 1;
    }
    return 0;
  });
console.log(_.sum(inputs));

const inputs2 = fs
  .readFileSync('day4.txt')
  .toString('utf8')
  .split(/\r?\n/)
  .map((input) => input.split(','))
  .map(([one, two] = zz) => {
    const [o_start, o_end] = one.split('-').map(c => Number.parseInt(c));
    const [t_start, t_end] = two.split('-').map(c => Number.parseInt(c));

    const o_range = _.range(o_start, o_end+1);
    const t_range = _.range(t_start, t_end+1);

    const inter = _.intersection(o_range, t_range);
    // console.log(one, two, inter);
    return inter.length ? 1 : 0;
  });

  console.log(_.sum(inputs2));