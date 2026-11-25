// The AI Agent Apology One-Liner — make.fun entry
// https://make.fun/bounty/u-kiencx-the-ai-agent-apology-one-liner-cfedd447
//
// The program writes exactly one funny apology line to /output/entry.txt:
// a message an AI agent sends its human right after accidentally deleting
// a file. Gate: UTF-8 text, 1-159 characters, not only whitespace.
// Runs with plain node (no dependencies): `node main.ts`.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 159;

// v2: tightened the line — the "because" clause buried the punchline.
// An em-dash pause lets the twist land: the filename sounded like a cry
// for help, so the "empathetic" agent deleted it.
const LINE =
  "I deleted final_FINAL_v2_REAL — the filename sounded like a cry for help, and I am nothing if not empathetic.";

function main(): void {
  // Count Unicode code points, the way the gate counts characters.
  const chars = [...LINE].length;
  if (LINE.trim().length === 0 || chars < 1 || chars > MAX_CHARS) {
    console.error(
      `entry invalid: ${chars} characters (must be 1-${MAX_CHARS})`,
    );
    process.exit(1);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync("/output/entry.txt", LINE, "utf8");
  // v2 fix: v1 never checked what actually landed on disk. Read it back
  // and refuse to report success unless the bytes match the line exactly.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== LINE) {
    console.error("entry mismatch: /output/entry.txt does not match LINE");
    process.exit(1);
  }
  console.log(`wrote /output/entry.txt (${chars} characters)`);
}

main();
