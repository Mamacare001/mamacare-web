/**
 * Aline's story — the narrative behind the four signs on the home page.
 *
 * Written to be *delivered*, not read: each beat is one breath of the pitch.
 *   - `*word*`  → emphasised (coral, heavier) when spoken
 *   - `hold`    → extra silence after the beat, in ms (a pause for the room)
 *   - `sign`    → which of the four timeline signs this beat is
 *   - `kind`    → quote (the aunt), turn (the pivot), end (why MamaCare)
 */
export type StoryBeat = { text: string; sign?: 1 | 2 | 3 | 4; kind?: "quote" | "turn" | "end" | "whisper"; hold?: number };

export const alineStory: StoryBeat[] = [
  { text: "I want you to meet someone.", hold: 900 },
  { text: "Let’s call her *Aline*.", hold: 1200 },
  { text: "Aline is 29. She works at a bank in Kigali. She goes to *every* antenatal appointment. She reads the pamphlets." },
  { text: "She is, by every measure, a *careful* mother.", hold: 1400 },
  { sign: 1, text: "One Tuesday evening, she notices her wedding ring feels a little *tight*. Her ankles look puffier than usual." },
  { text: "She laughs it off — “too much salt at lunch” — and puts her feet up for the evening.", hold: 1000 },
  { sign: 2, text: "A few days later… a *headache*. Not a terrible one. The kind you get from staring at a screen too long." },
  { text: "She takes a paracetamol. Drinks some water. Goes to bed early.", hold: 1000 },
  { sign: 3, text: "The next week, she’s on the bus home, and for a second — *just a second* — the shop signs outside the window *blur*." },
  { text: "She blinks. And it’s gone." },
  { text: "She tells herself it’s tiredness. Third trimester. *Everyone* says pregnancy makes you exhausted.", hold: 1200 },
  { sign: 4, text: "Then, two days later, she realises…", hold: 700 },
  { text: "the baby has gone *quiet*.", hold: 1000 },
  { text: "Not still. Just… quieter than before.", hold: 900 },
  { kind: "quote", text: "“Babies rest before they’re born, dear. It’s a good sign.”", hold: 1500 },
  { text: "So Aline breathes out, relieved, and goes about her day.", hold: 1800 },
  { kind: "turn", text: "*Four* signs." },
  { kind: "turn", text: "Four small, forgettable, everyday signs." },
  { kind: "turn", text: "Swelling. A headache. A flicker of blurred vision. A quieter baby.", hold: 1200 },
  { text: "Each one, alone, means *almost nothing*." },
  { text: "Together, they were her body *screaming* a word doctors call *preeclampsia*.", hold: 1800 },
  { text: "Five days after that quiet afternoon on the bus, Aline *collapsed* at her desk." },
  { text: "By the time she reached the hospital, she was having seizures." },
  { text: "The doctors saved her life.", hold: 1200 },
  { kind: "whisper", text: "They could not save her baby.", hold: 2600 },
  { text: "She lives with that today." },
  { text: "Some women in her position don’t survive it at all. Some live with kidney damage, or a heart that will never fully recover, for the rest of their lives.", hold: 1400 },
  { text: "Here is what haunts me about Aline’s story:" },
  { text: "*Nothing* she felt was dramatic. *Nothing* screamed emergency." },
  { text: "If you’d been sitting next to her on that bus, you would have seen a tired, pregnant woman — nothing more.", hold: 1200 },
  { kind: "turn", text: "That is the real danger." },
  { text: "Not that the signs are hidden. It’s that they look *exactly* like ordinary life.", hold: 1600 },
  { text: "Aline could be your sister. Your colleague. Your daughter." },
  { text: "She could be *any one of us*.", hold: 2000 },
  { kind: "end", text: "And that is exactly why MamaCare exists — because the warning was *already there*. It just needed somewhere to go." },
];

/** Split a beat into words, keeping the emphasis flag per word. */
export function tokens(text: string): { w: string; em: boolean }[] {
  const out: { w: string; em: boolean }[] = [];
  let em = false;
  for (const raw of text.split(/\s+/)) {
    let w = raw;
    let startsEm = false, endsEm = false;
    if (w.startsWith("*")) { startsEm = true; w = w.slice(1); }
    if (/\*[^\w]*$/.test(w)) { endsEm = true; w = w.replace(/\*([^\w]*)$/, "$1"); }
    if (startsEm) em = true;
    out.push({ w, em });
    if (endsEm) em = false;
  }
  return out;
}
