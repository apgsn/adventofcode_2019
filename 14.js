const _ = require('lodash');
const test0 = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`

const test1 = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

const test2 = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT
`;

const test3 = `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX
`
const i = `2 JNLZG => 7 SJTKF
1 BDCJZ, 3 NWCRL => 5 PMQS
1 TNRBS => 2 LHNGR
7 TWHBV => 6 FLQSP
4 DNLQF, 3 DRFL, 4 RSHRF => 6 HXJFS
5 VHSLS => 7 DZDQN
11 STPXT, 16 XRTW => 1 CTZFK
5 BXWD => 2 RVNR
1 XRTW, 2 SJTKF => 2 FPKWZ
1 JMGDP, 3 TJLKW => 7 FNLF
26 DTQTB, 16 TWHBV => 3 JMGDP
1 DFRNL, 1 LHNGR => 9 NWCRL
2 NWPC, 2 LHNGR, 3 QCHC => 8 HPBP
10 CSKJQ => 4 QRSD
8 FVLQ => 6 WMBVF
11 NPVB, 12 QRFV => 6 STPXT
3 SJTKF, 1 NPVB => 7 GWHG
4 DKPKX, 1 SJPWK => 5 DTQTB
1 RVNR => 8 XRTW
67 KGVR, 1 ZLJR, 4 TBPB, 19 KPJZM, 8 QSWQ, 12 DTQTB, 15 QRSD, 4 FPKWZ => 1 FUEL
20 LHNGR, 6 DNLQF, 9 TWHBV => 8 SJPWK
1 QRSD, 11 HZWS => 5 KGVR
2 CTZFK, 1 DRFL, 1 TNRBS => 5 DKPKX
14 FVFTN, 2 VLKQ, 12 STPXT => 4 TWHBV
1 FXWRB, 1 BXWD => 8 FVFTN
12 NPVB, 2 KJWC, 1 JNLZG => 3 NDNZP
13 NPVB, 7 HZLKM => 3 ZRMQC
2 HXJFS, 14 PDGB, 2 FNLF => 1 FVLQ
7 QRFV, 10 QRSD, 6 FVFTN => 5 DNLQF
4 XQDC, 2 VHSLS => 1 BDCJZ
9 HZLKM, 1 NDNZP => 6 DRFL
147 ORE => 4 BXWD
6 DNLQF => 5 VCBFZ
1 FVFTN => 8 TNRBS
1 RSHRF, 2 PDGB, 1 MKWH, 4 QRSD, 11 DNLQF, 7 WMBVF, 1 HJHM => 8 QSWQ
6 PMQS, 2 HNTS => 1 WNVGC
4 RVNR, 6 GWHG => 2 VLKQ
11 DRFL, 1 PDGB => 6 DFRNL
3 WNVGC, 28 PFZN, 14 HNTS, 2 WMBVF, 18 VCBFZ, 2 HPBP, 2 PDGB => 6 TBPB
2 XQDC => 6 HZWS
7 JNLZG, 1 BXWD, 7 FXWRB => 5 KJWC
9 KJWC, 7 NDNZP => 4 CSKJQ
194 ORE => 9 FXWRB
2 VHSLS, 12 MKWH, 2 FWBL, 6 TJLKW, 9 HZWS, 11 ZQGXM => 5 ZLJR
139 ORE => 2 JNLZG
2 TNRBS => 2 QCHC
7 DRFL, 10 STPXT, 1 QRSD => 6 MKWH
9 JNLZG => 8 NPVB
3 RSHRF => 6 FWBL
7 NDNZP => 5 PDGB
2 FVFTN => 6 QRFV
1 QRSD, 22 XQDC => 3 VHSLS
2 FVFTN => 3 HZLKM
6 ZRMQC => 2 PFZN
12 QRFV, 6 HZLKM => 6 XQDC
12 JMGDP, 1 KPJZM, 10 ZPKP => 5 HJHM
23 JNLZG => 2 ZQGXM
1 TJLKW => 9 HNTS
1 HZLKM, 12 PMQS => 5 KPJZM
7 DNLQF => 9 NWPC
1 FLQSP => 6 ZPKP
5 VLKQ => 7 RSHRF
6 TNRBS, 4 DZDQN, 6 TWHBV => 6 TJLKW
`



const input = test2;
let chems = [];

const reactions = input
  .replace(/\s=>/g, ',')
  .split('\n')
  .map(reaction => reaction.split(', '));

reactions.forEach(reaction => {
  const [amount, name] = reaction.pop().split(' ');
  chemical = {
    name,
    amount: +amount,
    precursors: {},
    depth: 0,
    required: 0,
  };
  reaction.forEach(reagent => {
    const [am, ch] = reagent.split(' ');
    chemical.precursors[ch] = +am;
  })
  chems.push(chemical);
})

chems.push({
  name: 'ORE',
  amount: 1,
  precursors: {},
  depth: 0,
  required: 0,
});

const calc = (name, depth = 1) => {
  const chem = chems.find(ch => ch.name === name);
  chem.depth = Math.max(chem.depth, depth);
  Object.keys(chem.precursors).forEach(k => {
    calc(k, depth + 1);
  })
};

const calcOre = (p) => {
  const cChems = _.cloneDeep(chems);
  cChems[0].amount = p;
  Object.keys(cChems[0].precursors).forEach(el => cChems[0].precursors[el] *= p);

  const totals = {};
  totals.FUEL = p;
  cChems.forEach(chem => {
    totals[chem.name] = totals[chem.name] || BigInt(0);
    Object.entries(chem.precursors).forEach(([k, v]) => {
      totals[k] = totals[k] || BigInt(0);
      totals[k] = totals[k] + BigInt(Math.ceil(Number(totals[chem.name]) / Number(chem.amount))) * BigInt(v);
    })
  })
  return totals.ORE;
}

calc('FUEL');
chems = chems.sort((a, b) => a.depth - b.depth).filter(chem => chem.depth);

let left = 1;
let right = 1000000000000;
while(left < right && left + 1 !== right) {
  const mid = Math.floor((left + right) / 2);
  const ore = calcOre(mid);
  if (ore < 1000000000000) {
    left = mid;
  } else {
    right = mid - 1;
  }
}

console.log(left);
