const _ = require('lodash');

const test = (password, { part2 = false } = {}) => {
    if (password.length !== 6)
        return false;

    const ascending = password.split('').reduce((acc, val) => {
        if (acc === false)
            return acc;

        if (acc <= val)
            return val;
        return false;

    }, 0);

    if (!ascending){
        return false;
    }


    const grouping = password.split('').reduce((acc, val) => {
        if (acc.length === 0) {
            acc.push([val]);
            return acc;

        } else {
            const last = acc[acc.length - 1];
            if (last.indexOf(val) !== -1) {
                last.push(val);
            } else {
                acc.push([val]);
            }
        }
        return acc;
    }, []).map(x => x.length);

    if (part2 ? grouping.indexOf(2) === -1 : _.max(grouping) < 2) {
        return false;
    }

    return true;
}

const part1 = _.range(197487, 673251).filter(x => test(x.toString())).length;
console.log(part1);
// 1640

const part2 = _.range(197487, 673251).filter(x => test(x.toString(), { part2: true })).length;
console.log(part2);
// 1126