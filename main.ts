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
  "and the sunny window is yours.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 120;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
