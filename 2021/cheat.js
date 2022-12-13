const { readFileSync } = require("fs");
const { resolve } = require("path");

function readData(filepath) {
  return readFileSync(resolve(__dirname, filepath), "utf8")
    .toString()
    .trim()
    .split("\n");
}

function hexToBin(hex) {
  const hexChars = [...hex];
  const binString = [];

  for (let hexChar of hexChars) {
    binString.push(("0000" + parseInt(hexChar, 16).toString(2)).slice(-4));
  }

  return binString.join``;
}

const TYPE_ID_OP_SUM = 0;
const TYPE_ID_OP_PRODUCT = 1;
const TYPE_ID_OP_MINIMUM = 2;
const TYPE_ID_OP_MAXIMUM = 3;
const TYPE_ID_LITERAL = 4;
const TYPE_ID_OP_GT = 5;
const TYPE_ID_OP_LT = 6;
const TYPE_ID_OP_EQ = 7;

function nextLeafNode(packet) {
//   console.log(packet.length);
  
  const version = parseInt(packet.splice(0, 3).join``, 2);
  const typeId = parseInt(packet.splice(0, 3).join``, 2);
  if (packet.length == 114) {
    console.log(packet.length);
  }
  console.log(packet.length, version, typeId);

  const numParts = [];
  let num = null;
  let leaves = [];

  switch (typeId) {
    case TYPE_ID_LITERAL: {
      let done = false;

      do {
        const [shouldContinue, ...parts] = packet.splice(0, 5);
        if (parseInt(shouldContinue) === 0) done = true;
        numParts.push(...parts);
      } while (!done);

      break;
    }
    default: {
      const subPacketType = parseInt(packet.splice(0, 1).join``, 2);
      let len = 15;
      if (subPacketType === 1) len = 11;

      const subPacketLen = parseInt(packet.splice(0, len).join``, 2);
      console.log(subPacketLen, "packet_length");

      if (subPacketType === 1) {
        let counter = 0;
        while (counter < subPacketLen) {
          const leaf = nextLeafNode(packet);
          leaves.push(leaf);
          counter++;
        }
      } else {
        leaves.push(...nextLeafNodes(packet.splice(0, subPacketLen)).leaves);
      }

      break;
    }
  }

  if (numParts.length) {
    num = parseInt(numParts.join``, 2);
  }

  return {
    version,
    typeId,
    data: {
      number: num,
    },
    leaves,
  };
}

function nextLeafNodes(packet) {
  const root = {
    version: null,
    typeId: null,
    leaves: [],
  };

  let done = false;
  do {
    const leaf = nextLeafNode(packet);
    if (!packet.includes("1")) done = true;

    root.leaves.push(leaf);
  } while (!done);

  return root;
}

function answerA(lines) {
  let packet = [...hexToBin(lines[0])];

  const ast = nextLeafNodes(packet);

  function sumASTNodeVersions(tree, total = 0) {
    if (tree.leaves.length === 0) return total + (tree.version ?? 0);

    let subsum = 0;
    for (let leaf of tree.leaves) {
      subsum += sumASTNodeVersions(leaf);
    }

    return total + subsum + (tree.version ?? 0);
  }

  return sumASTNodeVersions(ast);
}

function processAST(astNode) {
  const args = [];

  for (let node of astNode.leaves) {
    args.push(node?.data?.number ?? processAST(node));
  }

  switch (astNode.typeId) {
    case TYPE_ID_OP_SUM: {
      return args.reduce((sum, val) => sum + val, 0);
    }
    case TYPE_ID_OP_PRODUCT: {
      return args.reduce((sum, val) => sum * val, 1);
    }
    case TYPE_ID_OP_MINIMUM: {
      return args.reduce((min, val) => Math.min(min, val), Number.MAX_VALUE);
    }
    case TYPE_ID_OP_MAXIMUM: {
      return args.reduce((max, val) => Math.max(max, val), Number.MIN_VALUE);
    }
    case TYPE_ID_LITERAL: {
      throw new Error("should not be processing literals as an operation");
    }
    case TYPE_ID_OP_GT: {
      if (args.length > 2)
        throw new Error("too many arguments for GT", args.length);
      return args[0] > args[1] ? 1 : 0;
    }
    case TYPE_ID_OP_LT: {
      if (args.length > 2)
        throw new Error("too many arguments for LT", args.length);
      return args[0] < args[1] ? 1 : 0;
    }
    case TYPE_ID_OP_EQ: {
      if (args.length > 2)
        throw new Error("too many arguments for EQ", args.length);
      return args[0] === args[1] ? 1 : 0;
    }
    case null: {
      return args[0];
    }
    default:
  }

  throw new Error("unknown type id %", astNode.typeId);
}

function answerB(lines) {
  let packet = [...hexToBin(lines[0])];
  const ast = nextLeafNodes(packet);

  return processAST(ast);
}

console.log(answerA(readData("day16.txt")));
