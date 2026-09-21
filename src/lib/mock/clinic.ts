/** Mock data for the Provider (facility) workspace. Replace with API calls. */
import type { Risk } from "@/lib/mock/mother";
import type { Supporter } from "@/lib/mock/chw";

export const facility = { id: "hc_kinyinya", name: "Kinyinya Health Centre", level: "Health centre" as "Health centre" | "District hospital", district: "Gasabo", referral: "Kibagabaga District Hospital", phone: "+250 788 000 222", inCharge: "Dr. Uwera Immaculée" };

export type QueueItem = {
  id: string;
  motherId: string;
  motherName: string;
  age: number;
  weeks: number;
  gravida: number;
  risk: Risk;
  kind: "escalation" | "referral" | "walk-in";
  at: string;
  from: string; // who sent it
  chwName: string;
  chwPhone: string;
  reason: string;
  chwFindings?: string;
  status: "waiting" | "in-progress" | "seen" | "referred-up";
  eta?: string;
  transport?: boolean;
};

export const queue: QueueItem[] = [
  { id: "q1", motherId: "m_01", motherName: "Uwase Claudine", age: 27, weeks: 28, gravida: 2, risk: "high", kind: "referral", at: "2026-09-21T11:05:00", from: "CHW Marie Mukamana (Gasharu)", chwName: "Marie Mukamana", chwPhone: "+250 788 000 111", reason: "Headache since yesterday, blurred vision, swollen feet. Partner confirmed.", chwFindings: "BP 152/96 at home visit 10:50. Fetal movement normal. Referred NOW.", status: "waiting", eta: "11:40", transport: true },
  { id: "q2", motherId: "m_20", motherName: "Mukashema Béatrice", age: 31, weeks: 31, gravida: 3, risk: "high", kind: "escalation", at: "2026-09-19T14:00:00", from: "Mother (SMS) · escalated by supervisor", chwName: "Claudine Nyiraneza", chwPhone: "+250 788 000 555", reason: "Vaginal bleeding at 31 weeks, self-reported by SMS. CHW has not reached her; supervisor escalated to facility.", status: "waiting" },
  { id: "q3", motherId: "m_03", motherName: "Mukamana Josiane", age: 34, weeks: 24, gravida: 4, risk: "moderate", kind: "referral", at: "2026-09-21T09:30:00", from: "CHW Marie Mukamana (Gasharu)", chwName: "Marie Mukamana", chwPhone: "+250 788 000 111", reason: "Partner reports reduced fetal movement since last night.", chwFindings: "Kick count 6 in 2 h. Refer within 24 h.", status: "in-progress" },
  { id: "q4", motherId: "m_21", motherName: "Uwamahoro Solange", age: 22, weeks: 22, gravida: 1, risk: "moderate", kind: "referral", at: "2026-09-18T16:00:00", from: "CHW Claudine Nyiraneza (Rugando)", chwName: "Claudine Nyiraneza", chwPhone: "+250 788 000 555", reason: "Fever 38.6 °C, pain passing urine.", status: "waiting" },
  { id: "q5", motherId: "m_30", motherName: "Mukamurenzi Yvonne", age: 29, weeks: 37, gravida: 2, risk: "low", kind: "walk-in", at: "2026-09-21T08:40:00", from: "Walk-in", chwName: "Josephine Uwera", chwPhone: "+250 788 000 777", reason: "ANC visit 4 (scheduled).", status: "seen" },
];

export type PendingFeedback = { id: string; motherId: string; motherName: string; chwName: string; chwPhone: string; referredAt: string; reason: string; seenAt?: string; daysWaiting: number };

export const pendingFeedback: PendingFeedback[] = [
  { id: "fb1", motherId: "m_22", motherName: "Mukandayisenga Rose", chwName: "Claudine Nyiraneza", chwPhone: "+250 788 000 555", referredAt: "2026-09-16T11:00:00", reason: "BP 142/92 at home visit", seenAt: "2026-09-17T10:20:00", daysWaiting: 4 },
  { id: "fb2", motherId: "m_03", motherName: "Mukamana Josiane", chwName: "Marie Mukamana", chwPhone: "+250 788 000 111", referredAt: "2026-09-21T09:30:00", reason: "Reduced fetal movement", daysWaiting: 0 },
  { id: "fb3", motherId: "m_24", motherName: "Nyirarukundo Alice", chwName: "Josephine Uwera", chwPhone: "+250 788 000 777", referredAt: "2026-09-20T07:45:00", reason: "Fits — referred up to Kibagabaga DH", seenAt: "2026-09-20T09:00:00", daysWaiting: 1 },
];

export type ClinicMother = {
  id: string;
  name: string;
  age: number;
  phone: string;
  village: string;
  chwName: string;
  chwPhone: string;
  weeks: number;
  edd: string;
  gravida: number;
  para: number;
  risk: Risk;
  bloodGroup?: string;
  hiv?: string;
  allergies?: string;
  history: string[];
  encounters: { at: string; by: string; bp?: string; urine?: string; hb?: string; fh?: string; fhr?: string; impression: string; plan: string }[];
  chwVisits: { at: string; bp?: string; signs: string[]; note?: string }[];
  conversationSummary?: string;
  supporters?: Supporter[];
};

/** CHWs a clinic can assign a newly enrolled mother to (its catchment). */
export const catchmentChws = [
  { id: "chw_01", name: "Marie Mukamana", cell: "Kinyinya", village: "Gasharu" },
  { id: "chw_02", name: "Jean Claude Habimana", cell: "Kinyinya", village: "Gasharu" },
  { id: "chw_03", name: "Claudine Nyiraneza", cell: "Gacuriro", village: "Rugando" },
  { id: "chw_04", name: "Emmanuel Niyonzima", cell: "Gacuriro", village: "Kabuga" },
  { id: "chw_05", name: "Josephine Uwera", cell: "Kagugu", village: "Kagugu I" },
];

export const clinicMothers: ClinicMother[] = [
  {
    id: "m_01", name: "Uwase Claudine", age: 27, phone: "+250 781 234 567", village: "Gasharu", chwName: "Marie Mukamana", chwPhone: "+250 788 000 111", weeks: 28, edd: "2026-12-14", gravida: 2, para: 1, risk: "high", bloodGroup: "O+", hiv: "Negative (Jun 2026)", allergies: "None known",
    history: ["Previous pregnancy 2023: normal delivery at Kinyinya HC, 3.1 kg", "No chronic illness", "Mutuelle de Santé, category 3"],
    encounters: [
      { at: "2026-09-05T11:15:00", by: "Nurse Aline", bp: "116/74", urine: "Protein neg", hb: "11.8", fh: "26 cm", fhr: "144", impression: "Normal ANC 3", plan: "Iron/folate continued. Visit 4 on 3 Oct." },
      { at: "2026-08-10T10:00:00", by: "Nurse Aline", bp: "112/70", urine: "Protein neg", hb: "11.8", fh: "22 cm", fhr: "150", impression: "Normal ANC 2", plan: "Routine." },
    ],
    chwVisits: [
      { at: "2026-09-21T10:50:00", bp: "152/96", signs: ["Severe headache", "Blurred vision", "Swelling of face or hands"], note: "Referred NOW. Transport requested." },
      { at: "2026-09-18T15:02:00", bp: "118/76", signs: [], note: "Baby moving well." },
    ],
    supporters: [{ name: "Jean Bosco", relation: "Husband / partner", phone: "+250 781 234 568", status: "active" }],
    conversationSummary: "21 Sept 10:24 — Reported headache since yesterday and swollen feet. On follow-up: vision blurred at times. No bleeding, no fits. System risk: elevated; CHW and facility alerted.",
  },
  { id: "m_20", name: "Mukashema Béatrice", age: 31, phone: "+250 789 100 200", village: "Rugando", chwName: "Claudine Nyiraneza", chwPhone: "+250 788 000 555", weeks: 31, edd: "2026-11-23", gravida: 3, para: 2, risk: "high", history: ["Two previous normal deliveries"], encounters: [{ at: "2026-08-20T09:00:00", by: "Nurse Aline", bp: "118/78", urine: "Protein neg", hb: "10.9", fh: "27 cm", fhr: "140", impression: "Mild anaemia", plan: "Iron doubled. Recheck Hb." }], chwVisits: [], conversationSummary: "19 Sept 14:00 — SMS: ‘ndi kuva amaraso’ (I am bleeding). No further messages. Not reached by CHW. Escalated by supervisor 21 Sept." },
  { id: "m_03", name: "Mukamana Josiane", age: 34, phone: "+250 782 111 222", village: "Gasharu", chwName: "Marie Mukamana", chwPhone: "+250 788 000 111", weeks: 24, edd: "2027-01-10", gravida: 4, para: 3, risk: "moderate", history: ["Grand multipara", "Previous PPH (2021)"], encounters: [{ at: "2026-08-28T10:00:00", by: "Nurse Aline", bp: "120/80", urine: "Protein neg", hb: "11.2", fh: "22 cm", fhr: "148", impression: "Normal ANC 2", plan: "Routine. Counsel on danger signs." }], chwVisits: [{ at: "2026-09-21T09:20:00", signs: ["Reduced or absent fetal movement"], note: "Kick count 6 in 2 h." }], conversationSummary: "21 Sept 08:12 — Partner reported baby moving less since last night. Mother confirmed. Advised kick count and CHW contact." },
  { id: "m_21", name: "Uwamahoro Solange", age: 22, phone: "+250 783 400 500", village: "Rugando", chwName: "Claudine Nyiraneza", chwPhone: "+250 788 000 555", weeks: 22, edd: "2027-01-24", gravida: 1, para: 0, risk: "moderate", history: [], encounters: [], chwVisits: [{ at: "2026-09-18T15:30:00", signs: ["Fever ≥ 38 °C"], note: "Temp 38.6. Dysuria. Referred within 24 h." }] },
  { id: "m_30", name: "Mukamurenzi Yvonne", age: 29, phone: "+250 786 600 700", village: "Kagugu I", chwName: "Josephine Uwera", chwPhone: "+250 788 000 777", weeks: 37, edd: "2026-10-12", gravida: 2, para: 1, risk: "low", history: [], encounters: [{ at: "2026-09-21T08:55:00", by: "Nurse Aline", bp: "118/76", urine: "Protein neg", fh: "36 cm", fhr: "142", impression: "Normal ANC 4. Cephalic.", plan: "Birth plan confirmed: deliver at Kinyinya HC." }], chwVisits: [] },
];

export const staff = [
  { id: "s1", name: "Dr. Uwera Immaculée", role: "In-charge · Medical doctor", email: "i.uwera@kinyinya.hc", status: "active", last: "2026-09-21T09:00:00" },
  { id: "s2", name: "Nurse Aline Mukeshimana", role: "Nurse-midwife · ANC lead", email: "a.mukeshimana@kinyinya.hc", status: "active", last: "2026-09-21T11:10:00" },
  { id: "s3", name: "Nurse Eric Nsengiyumva", role: "Nurse · Maternity", email: "e.nsengiyumva@kinyinya.hc", status: "active", last: "2026-09-20T19:30:00" },
  { id: "s4", name: "Midwife Chantal Ingabire", role: "Midwife", email: "c.ingabire@kinyinya.hc", status: "pending", last: "" },
  { id: "s5", name: "Aline Uwimana", role: "CHW supervisor · Kinyinya sector", email: "a.uwimana@kinyinya.hc", status: "active", last: "2026-09-21T10:45:00" },
];

export const reports = {
  period: "1–21 Sept 2026",
  referralsReceived: 23,
  seenWithin24h: 19,
  escalationsHigh: 6,
  loopClosed: 17,
  loopMedianH: 9,
  ancVisits: 148,
  anc4Coverage: 71,
  referredUp: 3,
  outcomes: { normal: 11, complication: 4, referredUp: 3, pending: 5 },
  byWeek: [
    { w: "1–7 Sept", referrals: 7, closed: 6 },
    { w: "8–14 Sept", referrals: 9, closed: 8 },
    { w: "15–21 Sept", referrals: 7, closed: 3 },
  ],
};
