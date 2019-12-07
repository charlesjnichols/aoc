const fs = require('fs');

const answer = fs.readFileSync('day1.txt')
                    .toString('utf8')
                    .split(/\r?\n/)
                    .reduce((acc, x) => acc + Math.floor(x / 3) - 2, 0);

console.log(answer);