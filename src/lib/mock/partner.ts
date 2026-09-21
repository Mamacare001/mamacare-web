/** Mock aggregates for partner / analyst / care-manager / researcher surfaces. Replace with API calls. */
import type { Risk } from "@/lib/mock/mother";

export const MIN_CELL = 20;
/** Suppress any count below the minimum cell size. Returns null when suppressed. */
export const cell = (n: number) => (n < MIN_CELL ? null : n);
export const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

export const scope = { name: "Gasabo district", level: "district", period: "1 Jul – 21 Sep 2026", partner: "RSSB · Community-based health insurance", asOf: "2026-09-21T06:00:00" };

export const districtSummary = {
  enrolled: 1842,
  activeLast30d: 1516,
  checkins: 9310,
  escalations: 412,
  escalationsHigh: 71,
  reached24h: 356, // escalations reaching a facility within 24 h
  reachedHigh2h: 58, // high-risk reaching facility within 2 h
  loopClosed: 341,
  loopMedianH: 11,
  anc4: 1288,
  eligibleAnc4: 1701,
  facilityDeliveries: 402,
  deliveries: 431,
  emergencyAdmissions: 27,
  emergencyBaseline: 41, // matched comparison cohort, same period
};

export const bySector = [
  { sector: "Kinyinya", enrolled: 312, escalations: 74, reached24h: 68, high: 12, anc4: 71 },
  { sector: "Gacuriro", enrolled: 287, escalations: 88, reached24h: 61, high: 19, anc4: 64 },
  { sector: "Kagugu", enrolled: 241, escalations: 49, reached24h: 46, high: 9, anc4: 78 },
  { sector: "Remera", enrolled: 298, escalations: 61, reached24h: 55, high: 11, anc4: 74 },
  { sector: "Kimironko", enrolled: 334, escalations: 79, reached24h: 71, high: 13, anc4: 69 },
  { sector: "Jabana", enrolled: 196, escalations: 41, reached24h: 36, high: 5, anc4: 66 },
  { sector: "Rutunga", enrolled: 174, escalations: 20, reached24h: 19, high: 2, anc4: 81 },
];

export const byWeek = [
  { w: "Jul 1", esc: 28, reached: 22 }, { w: "Jul 8", esc: 31, reached: 25 }, { w: "Jul 15", esc: 33, reached: 27 }, { w: "Jul 22", esc: 30, reached: 26 }, { w: "Jul 29", esc: 35, reached: 30 },
  { w: "Aug 5", esc: 34, reached: 30 }, { w: "Aug 12", esc: 38, reached: 34 }, { w: "Aug 19", esc: 36, reached: 33 }, { w: "Aug 26", esc: 37, reached: 34 },
  { w: "Sep 2", esc: 39, reached: 36 }, { w: "Sep 9", esc: 36, reached: 33 }, { w: "Sep 16", esc: 35, reached: 26 },
];

export const bySign = [
  { sign: "Headache / vision / swelling (hypertensive)", n: 131 }, { sign: "Reduced fetal movement", n: 94 }, { sign: "Fever", n: 66 }, { sign: "Abdominal pain", n: 52 }, { sign: "Bleeding", n: 38 }, { sign: "Other", n: 31 },
];

export const bySource = [{ s: "Mother", n: 241 }, { s: "Family member", n: 63 }, { s: "CHW visit", n: 89 }, { s: "Facility", n: 19 }];

/* ---------- Insurer care management (opt-in members only) ---------- */
export type CareMember = {
  id: string;
  memberNo: string; // insurer's own member number (hashed in transit)
  name: string;
  age: number;
  weeks: number;
  risk: Risk;
  district: string;
  facility: string;
  chwName: string;
  ancDone: number;
  openEscalation?: string;
  lastContact: string;
  consentAt: string;
  nextAction?: string;
  contactLog: { at: string; by: string; note: string }[];
};

export const careMembers: CareMember[] = [
  { id: "cm1", memberNo: "RSSB-•••4821", name: "Uwase Claudine", age: 27, weeks: 28, risk: "high", district: "Gasabo", facility: "Kinyinya HC", chwName: "Marie Mukamana", ancDone: 3, openEscalation: "Hypertensive signs · referred to HC today", lastContact: "2026-09-21T11:05:00", consentAt: "2026-07-20", nextAction: "Confirm she was seen at Kinyinya HC; arrange transport to DH if referred up", contactLog: [{ at: "2026-09-12T10:00:00", by: "Care nurse Diane", note: "Called re: ANC 3 reminder. Attended 5 Sept." }] },
  { id: "cm2", memberNo: "RSSB-•••1930", name: "Kaliza Immaculée", age: 38, weeks: 30, risk: "moderate", district: "Gasabo", facility: "Kinyinya HC", chwName: "Marie Mukamana", ancDone: 3, lastContact: "2026-09-18T11:00:00", consentAt: "2026-08-02", nextAction: "BP recheck at ANC 4 — call 2 days before", contactLog: [] },
  { id: "cm3", memberNo: "RSSB-•••7712", name: "Mutesi Sandrine", age: 29, weeks: 12, risk: "low", district: "Gasabo", facility: "—", chwName: "Marie Mukamana", ancDone: 0, lastContact: "2026-09-10T16:00:00", consentAt: "2026-09-10", nextAction: "No ANC yet at 12 weeks — call to book first visit (covered benefit)", contactLog: [] },
  { id: "cm4", memberNo: "RSSB-•••3308", name: "Umuhoza Peace", age: 24, weeks: 26, risk: "low", district: "Gasabo", facility: "Kagugu HC", chwName: "Josephine Uwera", ancDone: 2, lastContact: "2026-09-19T15:00:00", consentAt: "2026-08-15", contactLog: [{ at: "2026-09-01T09:30:00", by: "Care nurse Diane", note: "Welcome call. Explained covered ANC visits and transport benefit." }] },
  { id: "cm5", memberNo: "RSSB-•••9054", name: "Nyirarukundo Alice", age: 33, weeks: 33, risk: "high", district: "Gasabo", facility: "Kibagabaga DH", chwName: "Josephine Uwera", ancDone: 3, openEscalation: "Eclampsia · admitted at DH 20 Sept", lastContact: "2026-09-20T09:00:00", consentAt: "2026-07-30", nextAction: "Coordinate discharge transport; confirm postnatal follow-up plan", contactLog: [{ at: "2026-09-20T14:00:00", by: "Care nurse Diane", note: "Spoke to husband. She is stable at DH. Transport home covered." }] },
];

export const careStats = { optedIn: 418, eligible: 1103, highRisk: 23, contactedThisWeek: 61, avoidedEmergencies: 9 };

/* ---------- Researcher portal ---------- */
export const protocols = [
  { id: "P-2026-03", title: "Early prediction of hypertensive disorders from longitudinal community signals", pi: "Dr. K. Mutesi, University of Rwanda", status: "active", approvedBy: "RNEC 2026-08-11", expires: "2027-08-10", extract: "de-identified · 1,842 pregnancies · 41 variables", lastAccess: "2026-09-19T14:22:00" },
  { id: "P-2026-05", title: "Kinyarwanda symptom extraction: error analysis of the conversational layer", pi: "P. Iradukunda, AIMS Rwanda", status: "active", approvedBy: "RNEC 2026-09-02", expires: "2027-03-01", extract: "de-identified · 9,310 conversations · text pseudonymised", lastAccess: "2026-09-21T08:10:00" },
  { id: "P-2026-07", title: "CHW response time and referral outcomes", pi: "Dr. A. Niyonsenga, RBC", status: "pending", approvedBy: "—", expires: "—", extract: "requested" },
];
