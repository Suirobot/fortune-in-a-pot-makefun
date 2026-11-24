// Fortune in a Pot — entrypoint.
// Writes one kind, funny fortune for a houseplant (at most 120
// characters) to /output/entry.txt for the house judge.
// Competition: u-golden-heron-44-fortune-in-a-pot-ded981e9
// (make.fun, account @bangjacky). The fortune is assembled from
// beats below, so the prediction and the promise stay separate.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The fortune, beat by beat: the plant addressed by name first,
// then what its keeper is finally going to do.
const PARTS = [
  "Brave fern, you will lean toward the light this week:",
  "the tall human finally rotates you,",
  "and the good window is yours.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge.
const CAP = 120;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
