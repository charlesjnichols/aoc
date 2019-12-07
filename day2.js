const _ = require('lodash');

const input = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,19,6,23,1,23,6,27,1,13,27,31,2,13,31,35,1,5,35,39,2,39,13,43,1,10,43,47,2,13,47,51,1,6,51,55,2,55,13,59,1,59,10,63,1,63,10,67,2,10,67,71,1,6,71,75,1,10,75,79,1,79,9,83,2,83,6,87,2,87,9,91,1,5,91,95,1,6,95,99,1,99,9,103,2,10,103,107,1,107,6,111,2,9,111,115,1,5,115,119,1,10,119,123,1,2,123,127,1,127,6,0,99,2,14,0,0';

const gravity_assist = (one, two) => {
    const sacc = input.split(',').map(x => Number.parseInt(x));
    sacc[1] = one;
    sacc[2] = two;

    const instruction_pointers = _.range(0, _.countBy(input)[','], 4);
    const execute_instruction = pos => {
        const [opt, in1, in2, out] = sacc.slice(pos);

        if (opt === 99) {
            return true;
        };
        const opp = opt === 1 ? _.add : _.multiply;
        sacc[out] = opp(sacc[in1], sacc[in2]);
    }

    return {
        answer: () => {
            instruction_pointers.some(execute_instruction)
            return sacc[0];
        }
    }
}


const part1_compute = gravity_assist(12, 2);
console.log(part1_compute.answer());
// 12490719


const nouns = _.range(0, 100);
const verbs = _.range(0, 100);
nouns.forEach(noun => {
    verbs.forEach(verb => {
        const part2_compute = gravity_assist(noun, verb);
        if (part2_compute.answer() === 19690720) {
            console.log(100 * noun + verb);
        }
    })
})
// 2003