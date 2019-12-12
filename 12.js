const { lcm } = require('mathjs');

const test1 = [
  { pos: [-1, 0, 2], vel: [0, 0, 0] },
  { pos: [2, -10, -7], vel: [0, 0, 0] },
  { pos: [4, -8, 8], vel: [0, 0, 0] },
  { pos: [3, 5, -1], vel: [0, 0, 0] },
];
const test2 = [
  { pos: [-8, -10, 0], vel: [0, 0, 0] },
  { pos: [5, 5, 10], vel: [0, 0, 0] },
  { pos: [2, -7, 3], vel: [0, 0, 0] },
  { pos: [9, -8, -3], vel: [0, 0, 0] },
];
const input = [
  { pos: [-4, 3, 15], vel: [0, 0, 0] },
  { pos: [-11, -10, 13], vel: [0, 0, 0] },
  { pos: [2, 2, 18], vel: [0, 0, 0] },
  { pos: [7, -1, 0], vel: [0, 0, 0] },
];

const moons = input;
let n = 1000;
const cyclesLength = [null, null, null];

for (let step = 0; true; step++) {
  // update velocities
  for (let i = 0; i < moons.length - 1; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      for (let axis = 0; axis < 3; axis++) {
        const diff = moons[i].pos[axis] - moons[j].pos[axis];
        if (diff < 0) {
          moons[i].vel[axis]++;
          moons[j].vel[axis]--;
        }
        if (diff > 0) {
          moons[i].vel[axis]--;
          moons[j].vel[axis]++;
        }
      }
    }
  }

  // update positions
  for (let i = 0; i < moons.length; i++) {
    for (let axis = 0; axis < 3; axis++) {
      moons[i].pos[axis] += moons[i].vel[axis];
    }
  }

  // calc the kinetic energy after n steps
  n--;
  if (!n) {
    let kinetic = 0;
    moons.forEach(moon => {
      const pot = moon.pos.reduce((acc, el) => acc + Math.abs(el), 0)
      const kin = moon.vel.reduce((acc, el) => acc + Math.abs(el), 0)
      kinetic += pot * kin;
    });
    console.log('Part one:', kinetic);
  }

  // check if the global velocity of some axis is back to 0 (we have the cycle)
  for (let axis = 0; axis < 3; axis++) {
    if (!cyclesLength[axis] && moons.every(moon => !moon.vel[axis])) {
      cyclesLength[axis] = step + 1;
    }
  }

  // calc how much it takes to get back to the initial state
  if (cyclesLength.every(axis => axis)) {
    console.log('Part two:', lcm(...cyclesLength) * 2);
    break;
  }
}
