const fs = require('fs');
const _ = require('lodash');

const _fuelRequired = x => Math.floor(x / 3) - 2;
const _totalFuelRequired = x => {
    const required = _fuelRequired(x);
    return required <= 0 ? 0 : required + _totalFuelRequired(required);
}

const inputs = fs.readFileSync('day1.txt')
    .toString('utf8')
    .split(/\r?\n/)
    .map(x => Number.parseInt(x));

const part1 = inputs.reduce((acc, x) => acc + _fuelRequired(x), 0);
console.log(part1);

const part2 = inputs.reduce((acc, x) => acc + _totalFuelRequired(x), 0);
console.log(part2);
