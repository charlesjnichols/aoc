    const fs = require("fs");
    const _ = require("lodash");

    let inputs = fs
      .readFileSync("day13.txt")
      .toString("utf8")
      .split(/\r?\n/)
      .map((point) => {
        const [x, y] = point.split(",");
        return { x: Number.parseInt(x), y: Number.parseInt(y) };
      });

    const print = () => {
      _.range(0, _.maxBy(inputs, "y").y + 1).forEach((y) => {
        console.log(
          _.range(0, _.maxBy(inputs, "x").x + 1)
            .map((x) => (_.find(inputs, { x, y }) != undefined ? "#" : " "))
            .join("")
        );
      });
    };

    const uniq = () =>
      _.uniqWith(inputs, (one, two) => one.x === two.x && one.y === two.y);

    const fold = (inst) => {
      const [pick, fold] = inst.split("=");
      _.remove(inputs, { [pick]: fold });
      inputs
        .filter((pos) => pos[pick] > fold)
        .forEach((pos) => {
          pos[pick] = fold - Math.abs(pos[pick] - fold);
        });
      inputs = uniq();
    };

    fs.readFileSync("day13-2.txt")
      .toString("utf8")
      .split(/\r?\n/)
      .map((line) => line.split(" ")[2])
      .forEach((l) => fold(l));

    print();
