/**
 * Utilities related to Intcode: https://adventofcode.com/2019/day/2 
 */


/**
 * Generator to compute intcode programs. Supports multithreading execution.
 * 
 * @param {string} program  comma-separated instructions
 */
module.exports = function* computeIntcode(program = '99') {
  const P = program.split(',').map(Number);
  const answers = [];
  let input = null;
  let ptr = 0;

  while (true) {
    const code = `0000${P[ptr]}`.slice(-4);
    const opcode = +code.slice(-2);
    const param1 = +code[1] ? P[ptr + 1] : P[P[ptr + 1]];
    const param2 = +code[0] ? P[ptr + 2] : P[P[ptr + 2]];

    switch (opcode) {
      case 1:
        P[P[ptr + 3]] = param1 + param2;
        ptr += 4;
        break;

      case 2:
        P[P[ptr + 3]] = param1 * param2;
        ptr += 4;
        break;

      case 3: // write
        P[P[ptr + 1]] = input ? input : yield;
        ptr += 2;
        break;

      case 4: // read
        answers.push(param1);
        input = yield param1;
        ptr += 2;
        break;

      case 5:
        ptr = param1 ? param2 : ptr + 3;
        break;

      case 6:
        ptr = !param1 ? param2 : ptr + 3;
        break;

      case 7:
        P[P[ptr + 3]] = param1 < param2;
        ptr += 4;
        break;

      case 8:
        P[P[ptr + 3]] = param1 === param2;
        ptr += 4;
        break;

      case 99:
        return answers;

      default:
        return [`Error: unrecognized opcode ${opcode}`];
    }
  }
}
