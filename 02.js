const program = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,6,19,23,2,23,6,27,1,5,27,31,1,10,31,35,2,6,35,39,1,39,13,43,1,43,9,47,2,47,10,51,1,5,51,55,1,55,10,59,2,59,6,63,2,6,63,67,1,5,67,71,2,9,71,75,1,75,6,79,1,6,79,83,2,83,9,87,2,87,13,91,1,10,91,95,1,95,13,99,2,13,99,103,1,103,10,107,2,107,10,111,1,111,9,115,1,115,2,119,1,9,119,0,99,2,0,14,0'
  .split(',')
  .map(Number);

const program1202 = () => {
  const input = [...program];
  let i = 0;

  while (input[i] !== 99) {
    switch (input[i]) {
      case 1: {
        input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
        i += 4;
        break;
      }
      case 2: {
        input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
        i += 4;
        break;
      }
      default: {
        return -1;
      }
    }
  }
  return input[0];
}

const TARGET = 19690720;
for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    program[1] = noun;
    program[2] = verb;
    if (program1202() === TARGET) {
      console.log(noun * 100 + verb);
    }
  }
}
