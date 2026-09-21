/** Mock data for the CHW supervisor console (one sector). Replace with API calls. */
import type { Risk } from "@/lib/mock/mother";

export const sector = { name: "Kinyinya", district: "Gasabo", facility: "Kinyinya Health Centre", supervisor: "Aline Uwimana", cells: ["Kinyinya", "Gacuriro", "Kagugu", "Murama"] };

export type Chw = {
  id: string;
  name: string;
  phone: string;
  cell: string;
  village: string;
  binome?: string;
  caseload: number;
  highRisk: number;
  openAlerts: number;
  medianResponseH: number; // median time to acknowledge, hours
  visitsDue: number;
  visitsDone7d: number;
  lastSync: string;
  status: "active" | "inactive" | "training";
};

export const chws: Chw[] = [
  { id: "chw_01", name: "Marie Mukamana", phone: "+250 788 000 111", cell: "Kinyinya", village: "Gasharu", binome: "Jean Claude Habimana", caseload: 8, highRisk: 1, openAlerts: 2, medianResponseH: 1.5, visitsDue: 3, visitsDone7d: 9, lastSync: "2026-09-21T10:40:00", status: "active" },
  { id: "chw_02", name: "Jean Claude Habimana", phone: "+250 788 000 444", cell: "Kinyinya", village: "Gasharu", binome: "Marie Mukamana", caseload: 6, highRisk: 0, openAlerts: 0, medianResponseH: 3, visitsDue: 1, visitsDone7d: 6, lastSync: "2026-09-21T09:10:00", status: "active" },
  { id: "chw_03", name: "Claudine Nyiraneza", phone: "+250 788 000 555", cell: "Gacuriro", village: "Rugando", caseload: 11, highRisk: 2, openAlerts: 3, medianResponseH: 14, visitsDue: 5, visitsDone7d: 4, lastSync: "2026-09-19T17:20:00", status: "active" },
  { id: "chw_04", name: "Emmanuel Niyonzima", phone: "+250 788 000 666", cell: "Gacuriro", village: "Kabuga", caseload: 7, highRisk: 0, openAlerts: 1, medianResponseH: 4, visitsDue: 2, visitsDone7d: 7, lastSync: "2026-09-21T08:00:00", status: "active" },
  { id: "chw_05", name: "Josephine Uwera", phone: "+250 788 000 777", cell: "Kagugu", village: "Kagugu I", caseload: 9, highRisk: 1, openAlerts: 1, medianResponseH: 2, visitsDue: 2, visitsDone7d: 10, lastSync: "2026-09-21T11:05:00", status: "active" },
  { id: "chw_06", name: "Pascal Ndayisaba", phone: "+250 788 000 888", cell: "Murama", village: "Murama", caseload: 0, highRisk: 0, openAlerts: 0, medianResponseH: 0, visitsDue: 0, visitsDone7d: 0, lastSync: "2026-09-14T12:00:00", status: "training" },
];

export type SectorEscalation = {
  id: string;
  motherId: string;
  motherName: string;
  chwId: string;
  chwName: string;
  cell: string;
  risk: Risk;
  at: string;
  reason: string;
  status: "open" | "acknowledged" | "acted" | "closed";
  ageH: number; // hours since created
  sinceStatusH: number; // hours in current status
  facilityResponded: boolean;
};

export const sectorEscalations: SectorEscalation[] = [
  { id: "esc_01", motherId: "m_01", motherName: "Uwase Claudine", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", risk: "high", at: "2026-09-21T10:31:00", reason: "Headache, blurred vision, swelling", status: "open", ageH: 3, sinceStatusH: 3, facilityResponded: false },
  { id: "esc_02", motherId: "m_03", motherName: "Mukamana Josiane", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", risk: "moderate", at: "2026-09-21T08:12:00", reason: "Partner reports reduced fetal movement", status: "acknowledged", ageH: 5, sinceStatusH: 4, facilityResponded: false },
  { id: "esc_10", motherId: "m_20", motherName: "Mukashema Béatrice", chwId: "chw_03", chwName: "Claudine Nyiraneza", cell: "Gacuriro", risk: "high", at: "2026-09-19T14:00:00", reason: "Vaginal bleeding at 31 weeks (self-reported by SMS)", status: "open", ageH: 47, sinceStatusH: 47, facilityResponded: false },
  { id: "esc_11", motherId: "m_21", motherName: "Uwamahoro Solange", chwId: "chw_03", chwName: "Claudine Nyiraneza", cell: "Gacuriro", risk: "moderate", at: "2026-09-18T09:30:00", reason: "Fever 38.6 °C, pain passing urine", status: "acknowledged", ageH: 76, sinceStatusH: 70, facilityResponded: false },
  { id: "esc_12", motherId: "m_22", motherName: "Mukandayisenga Rose", chwId: "chw_03", chwName: "Claudine Nyiraneza", cell: "Gacuriro", risk: "moderate", at: "2026-09-16T11:00:00", reason: "BP 142/92 at home visit", status: "acted", ageH: 122, sinceStatusH: 96, facilityResponded: false },
  { id: "esc_13", motherId: "m_23", motherName: "Ingabire Chantal", chwId: "chw_04", chwName: "Emmanuel Niyonzima", cell: "Gacuriro", risk: "low", at: "2026-09-20T16:00:00", reason: "Routine: birth plan review, previous C-section", status: "acknowledged", ageH: 21, sinceStatusH: 20, facilityResponded: false },
  { id: "esc_14", motherId: "m_24", motherName: "Nyirarukundo Alice", chwId: "chw_05", chwName: "Josephine Uwera", cell: "Kagugu", risk: "high", at: "2026-09-20T07:45:00", reason: "Fits reported by mother-in-law; referred immediately", status: "acted", ageH: 30, sinceStatusH: 28, facilityResponded: true },
  { id: "esc_03", motherId: "m_08", motherName: "Kaliza Immaculée", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", risk: "moderate", at: "2026-09-16T10:40:00", reason: "BP 138/88, age 38, G5", status: "acted", ageH: 122, sinceStatusH: 70, facilityResponded: true },
  { id: "esc_04", motherId: "m_06", motherName: "Uwimana Grace", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", risk: "low", at: "2026-09-10T09:00:00", reason: "Birth plan review", status: "closed", ageH: 266, sinceStatusH: 200, facilityResponded: true },
];

/** SLA (hours) by risk: time allowed in "open" before it is flagged as stalled. */
export const SLA_H: Record<Risk, number> = { high: 2, moderate: 24, low: 72 };

export function isStalled(e: SectorEscalation) {
  if (e.status === "closed") return false;
  if (e.status === "open") return e.sinceStatusH > SLA_H[e.risk];
  if (e.status === "acknowledged") return e.sinceStatusH > SLA_H[e.risk] * 2;
  if (e.status === "acted") return !e.facilityResponded && e.sinceStatusH > 48;
  return false;
}

export type SectorMother = { id: string; name: string; chwId: string; chwName: string; cell: string; village: string; weeks: number; risk: Risk; ancDone: number; lastContact: string };
export const sectorMothers: SectorMother[] = [
  { id: "m_01", name: "Uwase Claudine", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", village: "Gasharu", weeks: 28, risk: "high", ancDone: 3, lastContact: "2026-09-21T10:33:00" },
  { id: "m_03", name: "Mukamana Josiane", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", village: "Gasharu", weeks: 24, risk: "moderate", ancDone: 2, lastContact: "2026-09-21T08:15:00" },
  { id: "m_20", name: "Mukashema Béatrice", chwId: "chw_03", chwName: "Claudine Nyiraneza", cell: "Gacuriro", village: "Rugando", weeks: 31, risk: "high", ancDone: 2, lastContact: "2026-09-19T14:00:00" },
  { id: "m_21", name: "Uwamahoro Solange", chwId: "chw_03", chwName: "Claudine Nyiraneza", cell: "Gacuriro", village: "Rugando", weeks: 22, risk: "moderate", ancDone: 2, lastContact: "2026-09-18T09:30:00" },
  { id: "m_22", name: "Mukandayisenga Rose", chwId: "chw_03", chwName: "Claudine Nyiraneza", cell: "Gacuriro", village: "Rugando", weeks: 35, risk: "moderate", ancDone: 4, lastContact: "2026-09-16T11:00:00" },
  { id: "m_24", name: "Nyirarukundo Alice", chwId: "chw_05", chwName: "Josephine Uwera", cell: "Kagugu", village: "Kagugu I", weeks: 33, risk: "high", ancDone: 3, lastContact: "2026-09-20T07:45:00" },
  { id: "m_08", name: "Kaliza Immaculée", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", village: "Gasharu", weeks: 30, risk: "moderate", ancDone: 3, lastContact: "2026-09-16T10:00:00" },
  { id: "m_23", name: "Ingabire Chantal", chwId: "chw_04", chwName: "Emmanuel Niyonzima", cell: "Gacuriro", village: "Kabuga", weeks: 36, risk: "low", ancDone: 4, lastContact: "2026-09-20T16:00:00" },
  { id: "m_06", name: "Uwimana Grace", chwId: "chw_01", chwName: "Marie Mukamana", cell: "Kinyinya", village: "Gasharu", weeks: 32, risk: "low", ancDone: 3, lastContact: "2026-09-17T09:30:00" },
  { id: "m_25", name: "Mutoni Diane", chwId: "chw_02", chwName: "Jean Claude Habimana", cell: "Kinyinya", village: "Gasharu", weeks: 14, risk: "low", ancDone: 1, lastContact: "2026-09-15T10:00:00" },
  { id: "m_26", name: "Umuhoza Peace", chwId: "chw_05", chwName: "Josephine Uwera", cell: "Kagugu", village: "Kagugu I", weeks: 26, risk: "low", ancDone: 2, lastContact: "2026-09-19T15:00:00" },
  { id: "m_27", name: "Nishimwe Fanny", chwId: "chw_04", chwName: "Emmanuel Niyonzima", cell: "Gacuriro", village: "Kabuga", weeks: 9, risk: "low", ancDone: 0, lastContact: "2026-09-11T09:00:00" },
];
