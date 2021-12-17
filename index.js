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

const packet = (input) => {
  if (!input.length) return;

  const packet_version = header(input);
  versions += packet_version;

  const packet_type = header(input);

  // console.log(input.length, packet_version, packet_type);

  if (packet_type === 4) {
    const num = binary(literal(input, ""));
  } else {
    if (read(input, 1) === "0") {
      packet(
        read(input, binary(read(input, 15)))
          .split("")
          .map(Number)
      );
    } else {
      _.range(0, binary(read(input, 11))).forEach(() => packet(input));
    }
  }
  if (input.includes(1)) packet(input);
};

packet(inputs);
console.log(versions);
