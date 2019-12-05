const min = 178416;
const max = 676461;

let count = 0;
for (let n = min; n <= max; n++) {
  let i = String(n)
  let adj = false;
  let incr = true;
  for (let j = 0; j < 5; j++) {
    if (i[j] === i[j + 1] && i[j] !== i[j - 1] && i[j] !== i[j + 2]) {
      adj = true;
    }
    if (i[j] > i[j + 1]) {
      incr = false;
      break;
    }
  }
  if (adj && incr) count++;
}

console.log(count);
