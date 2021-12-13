    const fs = require("fs");
    const _ = require("lodash");

    const inputs = fs
    .readFileSync("day12.txt")
    .toString("utf8")
    .split(/\r?\n/)
    .reduce((acc, x) => {
        const [start, end] = x.split(" ");
        if (end != "start") {
        if (acc[start]) {
            acc[start].push(end);
        } else {
            acc[start] = [end];
        }
        }
        if (start != "start" && end != "end") {
        if (acc[end]) {
            acc[end].push(start);
        } else {
            acc[end] = [start];
        }
        }
        return acc;
    }, {});

    console.log(inputs);

    const large_filter = (seen, step) =>
    inputs[step].filter(
        (n) => _.indexOf(seen.filter(_.negate(isUpper)), n) === -1
    );

    const large_twice_filter = (seen, step) =>
    inputs[step].filter((n) => {
        const only_lower = _.countBy(seen.filter(_.negate(isUpper)));
        return !only_lower[n] || _(only_lower).values().max() == 1;
    });

    const isUpper = (c) => c == c.toUpperCase();

    const path = (seen, step) => {
    if (inputs[step] === undefined) {
        return seen;
    }
    const next = large_twice_filter(seen, step);
    return next.map((n) => (n === "end" ? [...seen, n] : path([...seen, n], n)));
    };

    const printable = (a) => {
    if (Array.isArray(_.head(a))) {
        return a.map(printable);
    } else {
        if (a && a.length) return a.join(",");
    }
    };

    const answer = _.flattenDeep(printable(path(["start"], "start")))
    .filter((b) => b)
    .sort();

    // answer.forEach((b) => console.log(b));
    console.log(answer.length);
