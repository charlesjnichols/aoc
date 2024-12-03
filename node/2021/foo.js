const path = require('path');
const fs = require('fs');

const parseFile = (relative_file) => {
    const raw_input = fs
        .readFileSync(path.join(__dirname, relative_file), 'utf8')
        .toString()
        .trim();

    // @example "target area: x=56..76, y=-162..-134"
    let [, x1, x2, y1, y2] = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(
        raw_input
    );
    [x1, x2, y1, y2] = [x1, x2, y1, y2].map((v) => parseInt(v, 10));

    // Actually not necessary for this input, but more robust
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }

    if (y1 > y2) {
        [y1, y2] = [y2, y1];
    }

    return { x: [x1, x2], y: [y1, y2] };
};

const input = parseFile('input.txt');

function launch(initial_xv, initial_yv, input) {
    let xv = initial_xv;
    let yv = initial_yv;

    let x = 0;
    let y = 0;

    const lowest_y = Math.min(...input.y);
    let max_y = y;

    while (y > lowest_y) {
        x += xv;
        y += yv;

        if (y > max_y) {
            max_y = y;
        }

        xv += xv === 0 ? 0 : xv > 0 ? -1 : 1;
        yv--;
        if (x >= input.x[0] && x <= input.x[1] && y >= input.y[0] && y <= input.y[1]) {
            // console.log(initial_xv,initial_yv);
            return {
                max_y,
                xv: initial_xv,
                yv: initial_yv,
            };
        }
    }
}

function getValidTrajectories(input) {
    const lowest_y = Math.min(...input.y);
    const farthest_x = Math.max(...input.x);

    let solutions = [];
    for (let x = 0; x <= farthest_x + 1; x++) {
        for (let y = lowest_y; y <= 1000; y++) {
            let landed = launch(x, y, input);

            if (landed) {
                //  console.log(x,y);
                solutions.push(landed);
            }
        }
    }

    return solutions;
}

function partOne() {
    const solutions = getValidTrajectories(input);
    const { max_y } = solutions.sort((a, b) => b.max_y - a.max_y)[0];

    console.log('Part one:', max_y);
}

function partTwo() {
    const solutions = getValidTrajectories(input);

    console.log('Part two:', solutions.length);
}
// console.log(launch(20,2,input));

partOne();
partTwo();