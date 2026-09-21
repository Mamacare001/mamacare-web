/** Mock data for the CHW app. Replace with API calls; shapes match the intended API. */
import type { Risk } from "@/lib/mock/mother";

export const chw = {
  id: "chw_01",
  name: "Marie Mukamana",
  phone: "+250 788 000 111",
  village: "Gasharu",
  cell: "Kinyinya",
  sector: "Kinyinya",
  district: "Gasabo",
  facility: { name: "Kinyinya Health Centre", phone: "+250 788 000 222" },
  supervisor: { name: "Aline Uwimana", phone: "+250 788 000 333" },
  binome: { name: "Jean Claude Habimana", phone: "+250 788 000 444" },
};

export type CaseMother = {
  id: string;
  name: string;
  age: number;
  village: string;
  phone: string;
  weeks: number;
  edd: string;
  gravida: number;
  risk: Risk;
  riskReason?: string;
  lastContact: string;
  nextVisitDue: string;
  ancDone: number;
  flags: string[];
  openEscalation?: string;
  supporters?: Supporter[];
};

export type Supporter = { name: string; relation: string; phone: string; status: "active" | "invited" };
export const RELATIONS = ["Husband / partner", "Mother", "Mother-in-law", "Sister", "Neighbour", "Other"] as const;

export const caseload: CaseMother[] = [
  { id: "m_01", name: "Uwase Claudine", age: 27, village: "Gasharu", phone: "+250 781 234 567", weeks: 28, edd: "2026-12-14", gravida: 2, risk: "high", riskReason: "Headache + blurred vision + swelling reported 10:26", lastContact: "2026-09-21T10:33:00", nextVisitDue: "2026-09-21", ancDone: 3, flags: ["Possible pre-eclampsia"], openEscalation: "esc_01", supporters: [{ name: "Jean Bosco", relation: "Husband / partner", phone: "+250 781 234 568", status: "active" }] },
  { id: "m_03", name: "Mukamana Josiane", age: 34, village: "Gasharu", phone: "+250 782 111 222", weeks: 24, edd: "2027-01-10", gravida: 4, risk: "moderate", riskReason: "Partner reported reduced fetal movement", lastContact: "2026-09-21T08:15:00", nextVisitDue: "2026-09-22", ancDone: 2, flags: ["Grand multipara"], openEscalation: "esc_02", supporters: [{ name: "Ntwari Alexis", relation: "Husband / partner", phone: "+250 782 111 223", status: "active" }, { name: "Mukamana Vestine", relation: "Mother-in-law", phone: "+250 782 111 224", status: "invited" }] },
  { id: "m_04", name: "Nyirahabimana Diane", age: 19, village: "Rugando", phone: "+250 783 333 444", weeks: 36, edd: "2026-10-18", gravida: 1, risk: "moderate", riskReason: "First pregnancy, 36 weeks, no birth plan recorded", lastContact: "2026-09-19T14:00:00", nextVisitDue: "2026-09-23", ancDone: 4, flags: ["Adolescent", "No birth plan"] },
  { id: "m_05", name: "Ingabire Alice", age: 23, village: "Gasharu", phone: "+250 784 555 666", weeks: 18, edd: "2027-02-20", gravida: 1, risk: "low", lastContact: "2026-09-15T11:00:00", nextVisitDue: "2026-09-29", ancDone: 1, flags: [] },
  { id: "m_06", name: "Uwimana Grace", age: 31, village: "Rugando", phone: "+250 785 777 888", weeks: 32, edd: "2026-11-16", gravida: 3, risk: "low", lastContact: "2026-09-17T09:30:00", nextVisitDue: "2026-09-24", ancDone: 3, flags: ["Previous C-section"] },
  { id: "m_07", name: "Mutesi Sandrine", age: 29, village: "Gasharu", phone: "+250 786 999 000", weeks: 12, edd: "2027-04-05", gravida: 2, risk: "low", lastContact: "2026-09-10T16:00:00", nextVisitDue: "2026-09-21", ancDone: 0, flags: ["ANC not started"] },
  { id: "m_08", name: "Kaliza Immaculée", age: 38, village: "Rugando", phone: "+250 787 121 212", weeks: 30, edd: "2026-11-30", gravida: 5, risk: "moderate", riskReason: "Age 38, gravida 5, BP 138/88 at last visit", lastContact: "2026-09-16T10:00:00", nextVisitDue: "2026-09-22", ancDone: 3, flags: ["Grand multipara", "Borderline BP"] },
  { id: "m_09", name: "Umutoni Belise", age: 25, village: "Gasharu", phone: "+250 788 343 434", weeks: 40, edd: "2026-09-21", gravida: 1, risk: "moderate", riskReason: "Due today", lastContact: "2026-09-20T18:00:00", nextVisitDue: "2026-09-21", ancDone: 4, flags: ["Due date"] },
];

export type Escalation = {
  id: string;
  motherId: string;
  motherName: string;
  risk: Risk;
  at: string;
  reason: string;
  recommended: string;
  status: "open" | "acknowledged" | "acted" | "closed";
  facilityResponse?: { at: string; by: string; text: string };
  source: "mother" | "family" | "system" | "facility";
};

export const escalations: Escalation[] = [
  { id: "esc_01", motherId: "m_01", motherName: "Uwase Claudine", risk: "high", at: "2026-09-21T10:31:00", reason: "Headache since yesterday, blurred vision, swollen feet (self-reported; partner confirmed)", recommended: "Visit today; check BP; refer to Kinyinya HC same day if BP ≥ 140/90 or symptoms persist", status: "open", source: "mother" },
  { id: "esc_02", motherId: "m_03", motherName: "Mukamana Josiane", risk: "moderate", at: "2026-09-21T08:12:00", reason: "Partner reports baby moving less since last night", recommended: "Contact within 24 h; kick count; refer if < 10 movements in 2 h", status: "acknowledged", source: "family" },
  { id: "esc_03", motherId: "m_08", motherName: "Kaliza Immaculée", risk: "moderate", at: "2026-09-16T10:40:00", reason: "BP 138/88 at home visit, age 38, gravida 5", recommended: "Recheck BP within 3 days; refer if ≥ 140/90", status: "acted", source: "system", facilityResponse: { at: "2026-09-18T11:00:00", by: "Nurse Aline (Kinyinya HC)", text: "Seen 18 Sept. BP 132/84, urine protein negative. Continue routine ANC, recheck at visit 4." } },
  { id: "esc_04", motherId: "m_06", motherName: "Uwimana Grace", risk: "low", at: "2026-09-10T09:00:00", reason: "Routine: previous C-section, birth plan review", recommended: "Discuss facility delivery and transport at next visit", status: "closed", source: "system", facilityResponse: { at: "2026-09-12T15:00:00", by: "Nurse Aline (Kinyinya HC)", text: "Birth plan recorded. Planned facility delivery at Kinyinya HC." } },
];

export const dangerSignChecklist = [
  { id: "bleeding", label: "Vaginal bleeding", urgent: true },
  { id: "fits", label: "Fits / convulsions", urgent: true },
  { id: "unconscious", label: "Unconscious or very drowsy", urgent: true },
  { id: "headache", label: "Severe headache" },
  { id: "vision", label: "Blurred vision / sees spots" },
  { id: "swelling", label: "Swelling of face or hands" },
  { id: "fever", label: "Fever ≥ 38 °C" },
  { id: "pain", label: "Severe abdominal pain" },
  { id: "movement", label: "Reduced or absent fetal movement" },
  { id: "waters", label: "Waters broken" },
  { id: "pallor", label: "Pale palms / conjunctiva" },
  { id: "breath", label: "Difficulty breathing" },
];

export const learnCards = [
  { id: "pe", title: "Pre-eclampsia", summary: "Headache + blurred vision + swelling after 20 weeks. Check BP. ≥ 140/90 → refer same day. Fits → 912 now.", tags: ["Danger sign", "BP"] },
  { id: "aph", title: "Bleeding in pregnancy", summary: "Any bleeding after 20 weeks is an emergency. Do not examine. Arrange transport to the nearest facility immediately.", tags: ["Danger sign", "Emergency"] },
  { id: "fm", title: "Reduced fetal movement", summary: "Lie on left side, count for 2 hours. Fewer than 10 movements → refer the same day. No movement → emergency.", tags: ["Danger sign"] },
  { id: "anaemia", title: "Anaemia", summary: "Pale palms, tiredness, breathlessness. Check iron tablets are being taken. Refer for Hb test.", tags: ["Routine"] },
  { id: "birthplan", title: "Birth plan", summary: "Where, how to get there, who comes, who cares for children, what to bring, money for transport. Review by 32 weeks.", tags: ["Routine", "Counselling"] },
  { id: "pp", title: "After birth: first 7 days", summary: "Heavy bleeding, fever, foul discharge, severe headache, breast pain, baby not feeding. Visit on day 1, 3 and 7.", tags: ["Postnatal"] },
];
