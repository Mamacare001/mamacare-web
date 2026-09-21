/** Mock data for the Family supporter app. Replace with API calls. */
import type { Risk } from "@/lib/mock/mother";

export const supporter = {
  id: "f_01",
  name: "Jean Bosco",
  phone: "+250 788 555 222",
  language: "rw" as "rw" | "en",
  channel: "whatsapp" as "whatsapp" | "sms" | "app",
};

export type LinkedMother = {
  id: string;
  name: string;
  relation: string;
  status: "active" | "pending";
  weeks: number;
  edd: string;
  risk?: Risk; // undefined when she has not allowed the supporter to see it
  canSeeRisk: boolean;
  chw: { name: string; phone: string };
  facility: { name: string; phone: string };
  nextVisit?: { date: string; note: string };
  lastGuidance?: { at: string; text: string };
  emergencyPlan: { transport: string; goTo: string; bring: string };
  updates: { at: string; text: string; by: string }[];
};

export const mothers: LinkedMother[] = [
  {
    id: "m_01",
    name: "Uwase Claudine",
    relation: "Wife",
    status: "active",
    weeks: 28,
    edd: "2026-12-14",
    risk: "moderate",
    canSeeRisk: true,
    chw: { name: "Marie Mukamana", phone: "+250 788 000 111" },
    facility: { name: "Kinyinya Health Centre", phone: "+250 788 000 222" },
    nextVisit: { date: "2026-10-03", note: "ANC visit 4 · 30 weeks" },
    lastGuidance: { at: "2026-09-21T10:31:00", text: "Rest, drink water, avoid salty food today. Marie will visit within 2 days. If her vision changes or the headache gets much worse, go to the health centre." },
    emergencyPlan: { transport: "Moto from Gasharu junction · Kalisa +250 788 333 444", goTo: "Kinyinya Health Centre (open 24 h) · 15 min", bring: "ANC card, mutuelle card, phone" },
    updates: [
      { at: "2026-09-21T10:31:00", text: "Uwase reported a headache and swollen feet. Guidance sent; CHW notified.", by: "MamaCare" },
      { at: "2026-09-18T15:02:00", text: "Marie visited: BP normal, baby moving well.", by: "Marie (CHW)" },
      { at: "2026-09-12T09:41:00", text: "You reported she was very tired. She confirmed. Guidance sent.", by: "You" },
    ],
  },
  {
    id: "m_02",
    name: "Ingabire Alice",
    relation: "Sister",
    status: "pending",
    weeks: 18,
    edd: "2027-02-20",
    canSeeRisk: false,
    chw: { name: "—", phone: "" },
    facility: { name: "—", phone: "" },
    emergencyPlan: { transport: "", goTo: "", bring: "" },
    updates: [],
  },
];

export const observationSigns = [
  { id: "headache", en: "Bad headache", rw: "Umutwe ukabije", weight: 2 },
  { id: "vision", en: "Trouble seeing / blurred vision", rw: "Amaso atabona neza", weight: 3 },
  { id: "swelling", en: "Swollen face, hands or feet", rw: "Mu maso, ibiganza cyangwa ibirenge byabyimbye", weight: 2 },
  { id: "bleeding", en: "Bleeding", rw: "Kuva amaraso", weight: 5 },
  { id: "fits", en: "Fits / convulsions", rw: "Kugagara", weight: 5 },
  { id: "fever", en: "Fever or feels very hot", rw: "Umuriro", weight: 2 },
  { id: "pain", en: "Strong belly pain", rw: "Kubabara inda cyane", weight: 3 },
  { id: "movement", en: "Says the baby is moving less", rw: "Umwana anyeganyega gake", weight: 3 },
  { id: "tired", en: "Very tired, weak or dizzy", rw: "Umunaniro ukabije / kuzungera", weight: 1 },
  { id: "vomiting", en: "Cannot keep food or water down", rw: "Ntashobora kurya no kunywa", weight: 2 },
  { id: "waters", en: "Waters broke", rw: "Amazi yasohotse", weight: 4 },
  { id: "other", en: "Something else", rw: "Ikindi", weight: 1 },
] as const;
