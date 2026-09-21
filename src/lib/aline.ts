/**
 * Aline's story — the narrative behind the four signs on the home page.
 * `sign` marks the paragraph that corresponds to sign 1–4 in the timeline, so the reader can open at that chapter.
 */
export type StoryBeat = { text: string; sign?: 1 | 2 | 3 | 4; kind?: "quote" | "turn" | "end" };

export const alineStory: StoryBeat[] = [
  { text: "I want you to meet someone. Let’s call her Aline." },
  { text: "Aline is 29. She works at a bank in Kigali. She goes to every antenatal appointment. She reads the pamphlets. She is, by every measure, a careful mother." },
  { sign: 1, text: "One Tuesday evening, she notices her wedding ring feels a little tight. Her ankles look puffier than usual. She laughs it off — ‘too much salt at lunch’ — and puts her feet up for the evening." },
  { sign: 2, text: "A few days later, a headache. Not a terrible one. The kind you get from staring at a screen too long. She takes a paracetamol, drinks some water, goes to bed early." },
  { sign: 3, text: "The next week, she’s on the bus home, and for a second — just a second — the shop signs outside the window blur. She blinks, and it’s gone. She tells herself it’s tiredness. Third trimester. Everyone says pregnancy makes you exhausted." },
  { sign: 4, text: "Then, two days later, she realises… the baby has gone quiet. Not still — just… quieter than before." },
  { kind: "quote", text: "“Babies rest before they’re born, dear. It’s a good sign.”" },
  { text: "So Aline breathes out, relieved, and goes about her day." },
  { kind: "turn", text: "Four signs. Four small, forgettable, everyday signs. Swelling. A headache. A flicker of blurred vision. A quieter baby." },
  { text: "Each one, alone, means almost nothing. Together, they were her body screaming a word doctors call preeclampsia." },
  { text: "Five days after that quiet afternoon on the bus, Aline collapsed at her desk. By the time she reached the hospital, she was having seizures. The doctors saved her life. They could not save her baby." },
  { text: "She lives with that today. Some women in her position don’t survive it at all. Some live with kidney damage, or a heart that will never fully recover, for the rest of their lives." },
  { text: "Here is what haunts me about Aline’s story: nothing she felt was dramatic. Nothing screamed emergency. If you’d been sitting next to her on that bus, you would have seen a tired, pregnant woman — nothing more." },
  { text: "That is the real danger. Not that the signs are hidden. It’s that they look exactly like ordinary life." },
  { text: "Aline could be your sister. Your colleague. Your daughter. She could be any one of us." },
  { kind: "end", text: "And that is exactly why MamaCare exists — because the warning was already there. It just needed somewhere to go." },
];
