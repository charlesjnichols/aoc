const fs = require('fs');
const _ = require('lodash');
const { exit } = require('process');
const FifoArray = require('fifo-array/lib/fifo-array');

const fifo = new FifoArray(14);

const inputs = fs
  .readFileSync('day6.txt')
  .toString('utf8')
  .split('')
  .forEach((input, index) => {
    fifo.push(input);
    if(fifo.length == 14){
        if( _.intersection(fifo).length == 14){
            console.log(index+1);
            exit(0);
        }
        // console.log(index, _.intersection(fifo).length);
    }
  });
