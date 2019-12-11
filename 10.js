const test0 = '.#..#.....######..##...##';
const test1 = '......#.#.#..#.#......#######..#.#.###...#..#.......#....#.##..#....#..##.#..#####...#..#..#....####';
const test2 = '.#..##.###...#########.############..##..#.######.########.#.###.#######.####.#.#####.##.#.##.###.##..#####..#.##############################.####....###.#.#.####.######################.##.###..####....######..##.###########.##.####...##..#.#####..#.######.#####...#.##########...#.##########.#######.####.#.###.###.#.##....##.##.###..#####.#.#.###########.####.#.#.#####.####.######.##.####.##.#..##';
const test3 = '.#....#####...#..##...##.#####..####...#...#.#####...#.....#...###....#.#.....#....##';
const input = '.###..#######..####..##...#########.#.###...###.#....####..#...#######...#..####..##.#.....#....##.#.#.....####.#######.###..##......#.#..###..###.##.#.#####....##.##..###....#####...##.##.####.##..#...#####.#..###.##..#....####.####.###.#.####..#..#....###...#####..#..##...####.######....#.####.####.##...###.####..##....##.#..#.###.#.##.####..#...#..##..##....#.#..##..#.#..###.##.#..######.#..#..####.#.....#####.##........########.#.#######..#.#.##..#..####...#..#.#..##.##..#####..##.#..#...#####.###.##.##....#.#.######.#####.#.####.#..##..###...###.#.#..#.#.#.#..#.#......#.###...###..##.##.#.#..#.#......#..#..##.##.##.##.#...##.##.##.#..##.###.#.#...##..#####.###.##.####.#..#.#.##.######.#...#.#####.##...#...#.##...#.';

const map = input;
const s = Math.sqrt(map.length);
const asteroids = new Set();

[...map].forEach((p, idx) => {
  if (p === '#') {
    asteroids.add([idx % s, Math.floor(idx / s)]);
  }
})

let maxSight = null;
let maxCoord = null;
asteroids.forEach(a1 => {
  const [x1, y1] = a1;
  const coord = {};
  asteroids.forEach((a2, index) => {
    if (a1 === a2) return;

    // Calculate ratio
    const [x2, y2] = a2;
    xDiff = x1 - x2;
    yDiff = y1 - y2;
    ratio = Math.abs(yDiff / xDiff);

    /**
     * Quadrant types (clockwise order)
     *  11 | 00
     *  ———#———
     *  10 | 01
     */
    xQuad = xDiff > 0;
    yQuad = yDiff > 0;
    // Trick to pass from xy quadrants to clockwise quadrants
    const yQuadRel = !xQuad ? !yQuad : yQuad;

    // Invert ratio values for NE/SW quadrants
    if (xQuad !== yQuad) {
      ratio = -ratio;
    }

    // Add each asteroid to the correct trajectory
    const trajectory = `${+xQuad}${+yQuadRel}_${ratio}`;
    coord[trajectory] = {
      ...(coord[trajectory] || {}),
      [Math.abs(xDiff) + Math.abs(yDiff)]: index,
    }
  })

  const sight = Object.values(coord).length;
  if (sight > maxSight) {
    maxSight = sight;
    maxCoord = coord;
  }
})
console.log('Part one:', maxSight)

// Sort keys so that trajectories closer to 0 are computed first
const sortedTrajectories = Object.keys(maxCoord)
  .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
// console.log(sortedTrajectories.map(el => ({ '0': el, ...maxCoord[el], })))

// Find 200th asteroid to vaporize
let vaporizeCount = 200;
for (let i = 0; vaporizeCount; i++) {
  const trajectory = maxCoord[sortedTrajectories[i % sortedTrajectories.length]];
  const closestAsteroid = Object.keys(trajectory)
    .sort((a, b) => (+b - +a))
    .pop();

  if (closestAsteroid) {
    const asteroidCoords = trajectory[closestAsteroid];
    if (vaporizeCount === 1) {
      console.log('Part two:', asteroidCoords[0] * 100 + asteroidCoords[1]);
    }
    delete asteroidCoords;
    vaporizeCount--;
  }
}
