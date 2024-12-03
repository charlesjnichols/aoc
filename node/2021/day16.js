const fs = require("fs");
const _ = require("lodash");

const rules = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

const to_binary = (str) =>
  str
    .split("")
    .map((s) => rules[s])
    .join("");

const inputs = to_binary(fs.readFileSync("day16.txt").toString("utf8"))
  .split("")
  .map(Number);

const read = (input, length) => input.splice(0, length).join("");

const binary = (b) => parseInt(b, 2);

const header = (input) => {
  const whats = read(input, 3);
  return binary(whats);
};

const literal = (input, word) => {
  const instruction = read(input, 1);
  word += read(input, 4);

  if (instruction === "1") return literal(input, word);
  return word;
};

let versions = 0;

const packet_version_rules = {
  0: (i) => i.length ? i.reduce((acc, x) => acc + x) : 0,
  1: (i) => i.reduce((acc, x) => acc * x),
  2: (i) => _.min(i),
  3: (i) => _.max(i),
  4: (i) => binary(literal(i, "")),
  5: (i) => i[0] > i[1] ? 1 : 0,
  6: (i) => i[0] < i[1] ? 1 : 0,
  7: (i) => i[0] === i[1] ? 1 : 0,
};

const packet = (input) => {
  if (!input.length) return;

  const packet_version = header(input);
  versions += packet_version;

  const packet_type = header(input);

  // console.log(input.length, packet_version, packet_type);
  let pp = [];

  if (packet_type === 4) {
    pp = [packet_version_rules[4](input)];
  } else {
    if (read(input, 1) === "0") {
      pp = [
        packet(
          read(input, binary(read(input, 15)))
            .split("")
            .map(Number)
        ),
      ];
    } else {
      pp = _.range(0, binary(read(input, 11))).map(() => packet(input));
    }
    const workd = _.flatMapDeep(pp).filter(x => x != undefined);
    pp = packet_version_rules[packet_type](workd);
    console.log(packet_type, workd, pp);
  }
  if (input.includes(1)) return [...pp, packet(input)];
  return pp;
};

console.log(packet(inputs));
// console.log(versions);
