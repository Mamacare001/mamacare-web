/**
 * Mock data for the Mother app. Replace each export with an API call.
 * Shapes are the ones the API should return, so pages need no changes later.
 */
export type Risk = "low" | "moderate" | "high";

export const profile = {
  id: "m_01",
  name: "Uwase Claudine",
  phone: "+250 781 234 567",
  language: "rw" as "rw" | "en",
  channel: "whatsapp" as "whatsapp" | "sms" | "app",
  district: "Gasabo",
  facility: "Kinyinya Health Centre",
  edd: "2026-12-14",
  firstPregnancy: false,
  code: "UWA7K2", // shared with family to link
  chw: { name: "Marie Mukamana", phone: "+250 788 000 111", village: "Gasharu" },
  risk: "low" as Risk,
  nextCheckIn: "2026-09-24",
};

export function weeksPregnant(edd = profile.edd, today = new Date()): number {
  const due = new Date(edd).getTime();
  const days = Math.round((due - today.getTime()) / 86400000);
  return Math.max(1, Math.min(42, 40 - Math.round(days / 7)));
}

export type TimelineEvent = {
  id: string;
  at: string; // ISO
  kind: "checkin" | "visit" | "measurement" | "escalation" | "guidance" | "family" | "note";
  title: string;
  detail?: string;
  by: string;
  risk?: Risk;
};

export const timeline: TimelineEvent[] = [
  { id: "e9", at: "2026-09-21T10:26:00", kind: "checkin", title: "Check-in: headache and swollen feet", detail: "Reported by you. Follow-up questions answered. Vision clear.", by: "You", risk: "moderate" },
  { id: "e8", at: "2026-09-21T10:31:00", kind: "guidance", title: "Rest, drink water, and see your CHW within 2 days", detail: "Rule set v0.4 · reviewed by clinical lead", by: "MamaCare", risk: "moderate" },
  { id: "e7", at: "2026-09-18T15:02:00", kind: "visit", title: "Home visit by Marie", detail: "BP 118/76 · no swelling · baby moving well", by: "Marie (CHW)", risk: "low" },
  { id: "e6", at: "2026-09-12T09:40:00", kind: "family", title: "Jean noticed you were very tired", detail: "Reported by your partner. You confirmed. Guidance sent.", by: "Jean (partner)" },
  { id: "e5", at: "2026-09-05T11:15:00", kind: "measurement", title: "ANC visit 3 · Kinyinya HC", detail: "BP 116/74 · weight 68 kg · urine protein negative · fundal height 26 cm", by: "Nurse Aline (HC)", risk: "low" },
  { id: "e4", at: "2026-08-29T08:00:00", kind: "checkin", title: "Routine check-in: feeling well", by: "You", risk: "low" },
  { id: "e3", at: "2026-08-10T10:00:00", kind: "measurement", title: "ANC visit 2 · Kinyinya HC", detail: "BP 112/70 · weight 66 kg · Hb 11.8", by: "Nurse Aline (HC)", risk: "low" },
  { id: "e2", at: "2026-07-14T14:20:00", kind: "note", title: "Linked to CHW Marie Mukamana", by: "MamaCare" },
  { id: "e1", at: "2026-07-14T14:00:00", kind: "note", title: "Joined MamaCare", detail: "Enrolled by your CHW · invite ABC123", by: "MamaCare" },
];

export const visits = [
  { id: "v1", n: 1, date: "2026-06-30", facility: "Kinyinya Health Centre", status: "done" as const, note: "Booking visit · 16 weeks" },
  { id: "v2", n: 2, date: "2026-08-10", facility: "Kinyinya Health Centre", status: "done" as const, note: "22 weeks" },
  { id: "v3", n: 3, date: "2026-09-05", facility: "Kinyinya Health Centre", status: "done" as const, note: "26 weeks" },
  { id: "v4", n: 4, date: "2026-10-03", facility: "Kinyinya Health Centre", status: "upcoming" as const, note: "30 weeks · bring your ANC card" },
  { id: "v5", n: 5, date: "2026-10-31", facility: "Kinyinya Health Centre", status: "planned" as const, note: "34 weeks" },
  { id: "v6", n: 6, date: "2026-11-21", facility: "Kinyinya Health Centre", status: "planned" as const, note: "37 weeks · birth plan" },
];

export type Member = {
  id: string;
  name: string;
  role: "chw" | "facility" | "family";
  relation?: string;
  since: string;
  status: "active" | "pending";
  sees: string[];
  canSeeRisk?: boolean;
};

export const circle: Member[] = [
  { id: "c1", name: "Marie Mukamana", role: "chw", since: "2026-07-14", status: "active", sees: ["Risk level", "Warning signs", "Visits", "Referrals"] },
  { id: "c2", name: "Kinyinya Health Centre", role: "facility", since: "2026-07-14", status: "active", sees: ["Full record when you are referred or registered"] },
  { id: "c3", name: "Jean Bosco", role: "family", relation: "Husband / partner", since: "2026-08-02", status: "active", sees: ["Guidance sent to you", "Emergency instructions"], canSeeRisk: false },
  { id: "c4", name: "Mama Chantal", role: "family", relation: "Mother", since: "2026-09-20", status: "pending", sees: ["Guidance sent to you"], canSeeRisk: false },
];

export const accessLog = [
  { at: "2026-09-21T10:32:00", who: "MamaCare assistant", role: "system", what: "Read your check-in to assess risk" },
  { at: "2026-09-21T10:33:00", who: "Marie Mukamana", role: "chw", what: "Viewed your risk level and check-in" },
  { at: "2026-09-18T15:05:00", who: "Marie Mukamana", role: "chw", what: "Recorded a home visit" },
  { at: "2026-09-12T09:41:00", who: "Jean Bosco", role: "family", what: "Viewed guidance sent to you" },
  { at: "2026-09-05T11:20:00", who: "Nurse Aline (Kinyinya HC)", role: "facility", what: "Recorded ANC visit 3" },
  { at: "2026-09-05T11:18:00", who: "Nurse Aline (Kinyinya HC)", role: "facility", what: "Viewed your full record" },
];

export const guidanceByTrimester = {
  1: [
    { t: "Start ANC early", d: "Book your first visit before 12 weeks. Bring any previous pregnancy records." },
    { t: "Folic acid and iron", d: "Take the tablets from the health centre every day, even when you feel well." },
    { t: "Warning signs now", d: "Bleeding, severe belly pain, or vomiting that stops you eating or drinking: report it the same day." },
  ],
  2: [
    { t: "Feel the baby move", d: "From about 20 weeks you will feel movement. Notice the pattern; a big change is worth a check-in." },
    { t: "Watch for swelling and headache", d: "Puffy face or hands, a headache that will not go, or blurred vision can be signs of high blood pressure. Report them." },
    { t: "Sleep on your side", d: "From 28 weeks, sleeping on your side is safer for the baby than on your back." },
  ],
  3: [
    { t: "Count the kicks", d: "Pick a time each day. If the baby moves much less than usual, do not wait until tomorrow." },
    { t: "Know the signs of labour", d: "Regular pains that get closer, waters breaking, or a show. Bleeding is not normal: go now." },
    { t: "Make a birth plan", d: "Where you will deliver, how you will get there, who comes with you, and who looks after the other children." },
  ],
} as const;
