/** Mock data for the internal admin console. Replace with API calls. */

export const system = {
  env: "production",
  version: "web 0.9.3 · api 0.8.1 · rules v0.4 · model none (rules-only)",
  uptime30d: 99.94,
  apiP95ms: 312,
  queueDepth: 3,
  smsDelivery24h: 98.7,
  waDelivery24h: 99.6,
  escalationSlaBreaches24h: 2,
  activeSessions: 187,
  incidents: [{ id: "INC-014", at: "2026-09-19T15:40:00", sev: "S3", title: "CHW sync failures — Gacuriro cell (carrier data outage)", status: "resolved" }],
};

export type User = { id: string; name: string; email: string; org: string; roles: string[]; status: "active" | "pending" | "suspended" | "expired"; mfa: boolean; expires: string; last: string; approvals?: { by: string; at: string }[] };
export const users: User[] = [
  { id: "u1", name: "Patrice Iradukunda", email: "patrice@mamacare.rw", org: "MamaCare", roles: ["exec", "ds-lead"], status: "active", mfa: true, expires: "2026-12-19", last: "2026-09-21T11:20:00" },
  { id: "u2", name: "Pascal Dukundane", email: "pascal@mamacare.rw", org: "MamaCare", roles: ["eng-lead", "release-manager"], status: "active", mfa: true, expires: "2026-12-19", last: "2026-09-21T10:05:00" },
  { id: "u3", name: "Donatien Iranshubije", email: "donatien@mamacare.rw", org: "MamaCare", roles: ["exec", "partnerships-lead"], status: "active", mfa: true, expires: "2026-12-19", last: "2026-09-20T17:30:00" },
  { id: "u4", name: "Dr. Uwera Immaculée", email: "i.uwera@kinyinya.hc", org: "Kinyinya HC", roles: ["provider-hc", "facility-in-charge"], status: "active", mfa: true, expires: "2026-12-01", last: "2026-09-21T09:00:00" },
  { id: "u5", name: "Nurse Aline Mukeshimana", email: "a.mukeshimana@kinyinya.hc", org: "Kinyinya HC", roles: ["provider-hc"], status: "active", mfa: true, expires: "2026-12-01", last: "2026-09-21T11:10:00" },
  { id: "u6", name: "Midwife Chantal Ingabire", email: "c.ingabire@kinyinya.hc", org: "Kinyinya HC", roles: ["provider-hc"], status: "pending", mfa: false, expires: "—", last: "", approvals: [{ by: "Dr. Uwera (in-charge)", at: "2026-09-20T10:00:00" }] },
  { id: "u7", name: "Aline Uwimana", email: "a.uwimana@kinyinya.hc", org: "Kinyinya HC", roles: ["chw-supervisor"], status: "active", mfa: true, expires: "2026-12-01", last: "2026-09-21T10:45:00" },
  { id: "u8", name: "Diane Uwase", email: "d.uwase@rssb.rw", org: "RSSB", roles: ["care-manager"], status: "active", mfa: true, expires: "2026-11-30", last: "2026-09-21T08:50:00" },
  { id: "u9", name: "Dr. Kevine Mutesi", email: "k.mutesi@ur.ac.rw", org: "University of Rwanda", roles: ["researcher"], status: "active", mfa: true, expires: "2027-08-10", last: "2026-09-19T14:22:00" },
  { id: "u10", name: "Eric Habimana", email: "e.habimana@rbc.gov.rw", org: "RBC", roles: ["district-analyst"], status: "active", mfa: true, expires: "2026-12-31", last: "2026-09-18T16:00:00" },
  { id: "u11", name: "Dr. A. Niyonsenga", email: "a.niyonsenga@rbc.gov.rw", org: "RBC", roles: ["researcher"], status: "pending", mfa: false, expires: "—", last: "", approvals: [] },
  { id: "u12", name: "Grace Mukamana", email: "grace@mamacare.rw", org: "MamaCare", roles: ["support-agent"], status: "expired", mfa: true, expires: "2026-09-15", last: "2026-09-14T12:00:00" },
];

export const orgs = [
  { id: "o1", name: "Kinyinya Health Centre", type: "Health facility", district: "Gasabo", users: 5, chws: 6, mothers: 312, status: "active" },
  { id: "o2", name: "Kibagabaga District Hospital", type: "Health facility", district: "Gasabo", users: 2, chws: 0, mothers: 0, status: "active" },
  { id: "o3", name: "Kagugu Health Centre", type: "Health facility", district: "Gasabo", users: 3, chws: 4, mothers: 241, status: "active" },
  { id: "o4", name: "RSSB", type: "Insurer", district: "National", users: 1, chws: 0, mothers: 418, status: "active" },
  { id: "o5", name: "RBC", type: "Government", district: "National", users: 2, chws: 0, mothers: 0, status: "active" },
  { id: "o6", name: "University of Rwanda", type: "Research", district: "National", users: 1, chws: 0, mothers: 0, status: "active" },
  { id: "o7", name: "Gasabo CHW Cooperative", type: "CHW cooperative", district: "Gasabo", users: 0, chws: 41, mothers: 0, status: "onboarding" },
];

export const invites = [
  { code: "HC-KNY-4F7Q", kind: "provider", org: "Kinyinya HC", issued: "2026-09-18", by: "Dr. Uwera", used: 1, max: 3, expires: "2026-10-18" },
  { code: "CHW-GAS-8M2R", kind: "chw", org: "Kinyinya HC", issued: "2026-09-10", by: "Aline Uwimana", used: 6, max: 10, expires: "2026-10-10" },
  { code: "CHW-KGU-3T9V", kind: "chw", org: "Kagugu HC", issued: "2026-09-12", by: "field-ops", used: 4, max: 6, expires: "2026-10-12" },
  { code: "ABC123", kind: "mother", org: "Kinyinya HC · Marie Mukamana", issued: "2026-07-14", by: "CHW", used: 1, max: 1, expires: "used" },
];

export const rules = {
  live: { version: "v0.4", deployedAt: "2026-09-08T09:00:00", approvedBy: "Clinical lead (Dr. M. Uwase)", deployedBy: "release-manager (Pascal)", sha: "a91f3c2" },
  staging: { version: "v0.5-draft", author: "rules-editor (Nadine)", changed: "2026-09-19T15:00:00", changes: ["Raise moderate threshold for isolated foot swelling after 34 wk", "Add ‘fever + dysuria’ → moderate, refer 24 h", "Kinyarwanda synonyms for ‘blurred vision’ (+4)"], tests: { passed: 128, failed: 2, total: 130 }, review: "awaiting clinical-lead sign-off" },
  history: [
    { version: "v0.4", at: "2026-09-08", note: "Fetal-movement kick-count thresholds; postnatal day-1/3/7 rules" },
    { version: "v0.3", at: "2026-08-11", note: "Pre-eclampsia pattern (headache + vision/swelling) → high" },
    { version: "v0.2", at: "2026-07-22", note: "Initial danger-sign set from WHO/Rwanda ANC guidance" },
  ],
};

export const models = [
  { id: "rules-only", name: "Rules-only baseline", stage: "production", trained: "—", validation: "n/a", bias: "n/a", note: "Current production path. No learned risk model in use." },
  { id: "risk-v0.1", name: "Risk model v0.1 (gradient boosting)", stage: "staging", trained: "2026-09-15 · 1,842 pregnancies (de-identified)", validation: "AUROC 0.81 · sensitivity 0.86 @ specificity 0.70", bias: "Adolescent subgroup sensitivity 0.79 — under review", note: "Not clinically signed off. Cannot be promoted until ds-lead + clinical-lead sign." },
  { id: "nlu-rw-0.3", name: "Kinyarwanda symptom extraction v0.3", stage: "production", trained: "2026-08-30", validation: "F1 0.88 on 600 annotated messages", bias: "—", note: "Drift monitor: OK (last 7 d)" },
];

export const content = [
  { key: "guidance.trimester3.kicks", en: "Count the kicks", rw: "Bara uko umwana anyeganyega", status: "published", updated: "2026-09-01", reviewer: "translator (Emmanuel)" },
  { key: "sms.escalation.high", en: "Please go to {facility} now. Your CHW {chw} has been alerted.", rw: "Jya kuri {facility} ubu. Umujyanama wawe {chw} yamenyeshejwe.", status: "published", updated: "2026-09-08", reviewer: "translator (Emmanuel)" },
  { key: "consent.point.3", en: "A computer system reads my messages…", rw: "Sisitemu ya mudasobwa isoma ubutumwa bwanjye…", status: "in review", updated: "2026-09-19", reviewer: "—" },
  { key: "chat.followup.vision", en: "Is your vision blurred, or do you see spots?", rw: "Ese amaso yawe abona bidasobanutse, cyangwa ubona utudomo?", status: "draft", updated: "2026-09-20", reviewer: "—" },
];

export const caseReviews = [
  { id: "CR-031", opened: "2026-09-20T09:30:00", trigger: "Adverse outcome: eclampsia (Nyirarukundo A.)", question: "Was the 18 Sept moderate-risk flag appropriate given BP 138/88 + G5 + age 38?", status: "open", assignee: "clinical-lead", due: "2026-09-27" },
  { id: "CR-030", opened: "2026-09-17T14:00:00", trigger: "System-wrong report from CHW: ‘umutwe’ misread as ‘umutima’", question: "NLU error on Kinyarwanda ‘headache’; 3 similar cases", status: "in review", assignee: "ds-lead + clinical-lead", due: "2026-09-24" },
  { id: "CR-029", opened: "2026-09-10T11:00:00", trigger: "Stalled escalation > 72 h (Gacuriro)", question: "Process, not model: CHW sync outage", status: "closed", assignee: "product-lead", due: "—" },
];

export const consentRequests = [
  { id: "DS-118", at: "2026-09-21T08:00:00", type: "Subject access", who: "Mother (Gasabo)", status: "in progress", due: "2026-10-21", owner: "dpo" },
  { id: "DS-117", at: "2026-09-19T16:30:00", type: "Withdraw partner consent (RSSB)", who: "Mother (Gasabo)", status: "done", due: "—", owner: "system" },
  { id: "DS-116", at: "2026-09-15T10:00:00", type: "Deletion", who: "Family supporter", status: "done", due: "—", owner: "dpo" },
];
export const consentStats = { mothers: 1842, familyLinks: 611, insurerOptIn: 418, revocations30d: 7, sarOpen: 1 };

export const auditLog = [
  { at: "2026-09-21T11:12:00", who: "a.mukeshimana@kinyinya.hc", role: "provider-hc", action: "READ record", target: "mother m_01", ctx: "queue → encounter" },
  { at: "2026-09-21T11:05:00", who: "svc:risk-engine", role: "system", action: "SCORE", target: "mother m_01", ctx: "rules v0.4 → high" },
  { at: "2026-09-21T10:45:00", who: "a.uwimana@kinyinya.hc", role: "chw-supervisor", action: "NUDGE", target: "chw chw_03 / esc_10", ctx: "SMS + push" },
  { at: "2026-09-21T10:33:00", who: "marie.m@chw", role: "chw", action: "READ record", target: "mother m_01", ctx: "caseload" },
  { at: "2026-09-21T09:02:00", who: "pascal@mamacare.rw", role: "release-manager", action: "DEPLOY", target: "web 0.9.3", ctx: "vercel prod" },
  { at: "2026-09-20T22:14:00", who: "pascal@mamacare.rw", role: "sre", action: "BREAK-GLASS", target: "db:mothers (read)", ctx: "INC-014 sync repair · approved 60 min", flag: true },
  { at: "2026-09-20T10:00:00", who: "i.uwera@kinyinya.hc", role: "facility-in-charge", action: "APPROVE 1/2", target: "user u6", ctx: "provider-hc grant" },
  { at: "2026-09-19T15:00:00", who: "nadine@mamacare.rw", role: "rules-editor", action: "EDIT", target: "rules v0.5-draft", ctx: "staging" },
];

export const breakGlass = [
  { id: "BG-007", at: "2026-09-20T22:14:00", who: "pascal@mamacare.rw (sre)", reason: "INC-014: repair CHW sync records for Gacuriro after carrier outage", scope: "db:mothers · db:visits (read+write)", approvedBy: "security-lead (auto-page) · dpo notified", expired: "2026-09-20T23:14:00", reviewed: false },
  { id: "BG-006", at: "2026-09-12T14:05:00", who: "dr.m.uwase@mamacare.rw (clinical-lead)", reason: "CR-028 case review: read full conversation for adverse-outcome review", scope: "conversation m_15 (read)", approvedBy: "dpo", expired: "2026-09-12T15:05:00", reviewed: true },
];

export const integrations = [
  { name: "WhatsApp Business (Meta)", kind: "channel", status: "healthy", detail: "99.6% delivered 24 h · webhook OK", keyRotated: "2026-08-01", next: "2026-11-01" },
  { name: "SMS gateway (Africa's Talking)", kind: "channel", status: "degraded", detail: "98.7% delivered 24 h · MTN retries elevated", keyRotated: "2026-08-01", next: "2026-11-01" },
  { name: "e-Ubuzima / HMIS", kind: "health system", status: "pilot", detail: "Read-only facility list; write-back of ANC visits in design", keyRotated: "2026-09-01", next: "2026-12-01" },
  { name: "RSSB member reconciliation", kind: "insurer", status: "healthy", detail: "Hashed member-ID match, nightly · 418 opted-in", keyRotated: "2026-07-15", next: "2026-10-15" },
  { name: "Google OAuth", kind: "auth", status: "healthy", detail: "Sign-in for staff and providers", keyRotated: "2026-06-20", next: "2026-12-20" },
  { name: "Error tracking (Sentry)", kind: "ops", status: "healthy", detail: "0 new S1/S2 in 7 d", keyRotated: "2026-06-20", next: "2026-12-20" },
];

export const tickets = [
  { id: "T-2291", at: "2026-09-21T10:50:00", from: "Mother · WhatsApp", subject: "Not receiving check-in messages", status: "open", agent: "—", session: false },
  { id: "T-2290", at: "2026-09-21T09:15:00", from: "CHW · Gacuriro", subject: "App says offline but I have data", status: "in progress", agent: "Grace M.", session: true },
  { id: "T-2288", at: "2026-09-20T16:00:00", from: "Family supporter", subject: "Code not accepted", status: "resolved", agent: "Grace M.", session: false },
];

export const billing = {
  period: "September 2026",
  partners: [
    { name: "RSSB (CBHI)", model: "Per covered life · opted-in", lives: 418, rate: 350, currency: "RWF", status: "reconciled 20 Sep" },
    { name: "MoH / RBC — Gasabo pilot", model: "District licence (grant-funded)", lives: 1842, rate: 0, currency: "RWF", status: "in-kind" },
  ],
  note: "Counts come from hashed member-ID reconciliation. No names leave the platform.",
};

export const featureFlags = [
  { key: "chat.voice_notes", on: false, desc: "Voice messages in the mother app (mobile only)" },
  { key: "risk.learned_model", on: false, desc: "Use risk model v0.1 alongside rules (shadow mode)" },
  { key: "chw.offline_photos", on: false, desc: "Attach photos to CHW visits (offline queue)" },
  { key: "insights.export", on: true, desc: "Aggregate exports for partner analysts" },
  { key: "family.report_risk_visibility", on: true, desc: "Mothers can let family see risk level" },
];
