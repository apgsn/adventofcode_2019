/**
 * Utilities related to Intcode: https://adventofcode.com/2019/day/2 
 */


/**
 * Execute generator till the end skipping yield interruptions
 * @param {string} program  generator
 * @param {number} input    input to add at the beginning
 */
module.exports = batchExecute = (program, input) => {
  let i = program.next();
  i = program.next(input);
  for (; !i.done; i = program.next());
  return i.value;
}

/**
 * Generator to compute intcode programs. Supports multithreading execution.
 * 
 * @param {string} program  comma-separated instructions
 */
module.exports = function* computeIntcode(program = '99') {
  let input = undefined;
  let ptr = 0;
  let relativeBase = 0;
  const answers = [];
  const mem = {};
  program.split(',').forEach((el, index) => { mem[index] = +el; });

  const getIndex = (mode, pointer) => {
    switch (mode) {
      case 0: return mem[pointer];
      case 1: return pointer;
      case 2: return mem[pointer] + relativeBase;
    }
  }

  while (true) {
    const code = `0000${mem[ptr]}`.slice(-5);
    const opcode = +code.slice(-2);
    const idx1 = getIndex(+code[2], ptr + 1);
    const idx2 = getIndex(+code[1], ptr + 2);
    const idx3 = getIndex(+code[0], ptr + 3);

    switch (opcode) {
      case 1:
        mem[idx3] = mem[idx1] + mem[idx2];
        ptr += 4;
        break;

      case 2:
        mem[idx3] = mem[idx1] * mem[idx2];
        ptr += 4;
        break;

      case 3: // write
        if (input === undefined) {
          mem[idx1] = yield;
        } else {
          mem[idx1] = input;
          input = undefined;
        }
        ptr += 2;
        break;

      case 4: // read
        answers.push(mem[idx1]);
        input = yield mem[idx1];
        ptr += 2;
        break;

      case 5:
        ptr = mem[idx1] ? mem[idx2] : ptr + 3;
        break;

      case 6:
        ptr = !mem[idx1] ? mem[idx2] : ptr + 3;
        break;

      case 7:
        mem[idx3] = mem[idx1] < mem[idx2];
        ptr += 4;
        break;

      case 8:
        mem[idx3] = mem[idx1] === mem[idx2];
        ptr += 4;
        break;

      case 9:
        relativeBase += mem[idx1];
        ptr += 2;
        break;

      case 99:
        return answers;

      default:
        return [`Error: unrecognized opcode ${opcode}`];
    }
  }
}
