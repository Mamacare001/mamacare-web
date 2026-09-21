/** Role-aware notifications and help content. Replace with API calls. */
export type Notif = { id: string; at: string; kind: "escalation" | "feedback" | "circle" | "visit" | "system" | "approval" | "guidance"; title: string; text: string; href?: string; read: boolean };

const base = "2026-09-21";
export const notificationsByRole: Record<string, Notif[]> = {
  mother: [
    { id: "n1", at: `${base}T10:31:00`, kind: "guidance", title: "Rest, drink water, and see Marie within 2 days", text: "Based on your check-in this morning. Message again if anything changes.", href: "/app/timeline", read: false },
    { id: "n2", at: "2026-09-20T18:02:00", kind: "circle", title: "Mama Chantal wants to join your circle", text: "Approve or decline in My circle.", href: "/app/circle", read: false },
    { id: "n3", at: "2026-09-18T15:05:00", kind: "visit", title: "Marie recorded a home visit", text: "BP 118/76, baby moving well.", href: "/app/timeline", read: true },
    { id: "n4", at: "2026-09-17T08:00:00", kind: "visit", title: "ANC visit 4 in two weeks", text: "3 October at Kinyinya Health Centre. Bring your ANC card.", href: "/app/visits", read: true },
  ],
  family: [
    { id: "n1", at: `${base}T10:31:00`, kind: "guidance", title: "Uwase: guidance sent after a check-in", text: "Rest, water, avoid salty food. CHW notified.", href: "/family/m_01", read: false },
    { id: "n2", at: "2026-09-18T15:05:00", kind: "visit", title: "Marie visited Uwase", text: "BP normal, baby moving well.", href: "/family/m_01", read: true },
  ],
  chw: [
    { id: "n1", at: `${base}T10:31:00`, kind: "escalation", title: "HIGH · Uwase Claudine", text: "Headache, blurred vision, swelling. Visit today; check BP.", href: "/chw/escalations#esc_01", read: false },
    { id: "n2", at: `${base}T08:12:00`, kind: "escalation", title: "MODERATE · Mukamana Josiane", text: "Partner reports reduced fetal movement.", href: "/chw/escalations#esc_02", read: false },
    { id: "n3", at: "2026-09-18T11:00:00", kind: "feedback", title: "Clinic response: Kaliza Immaculée", text: "Seen 18 Sept. BP 132/84, protein negative. Continue routine ANC.", href: "/chw/mother/m_08", read: true },
    { id: "n4", at: "2026-09-16T09:00:00", kind: "system", title: "Rules updated to v0.4", text: "Kick-count thresholds and postnatal day-1/3/7 rules. See Learn.", href: "/chw/learn", read: true },
  ],
  supervisor: [
    { id: "n1", at: `${base}T12:00:00`, kind: "escalation", title: "Stalled 45 h: Mukashema Béatrice (Gacuriro)", text: "High-risk bleeding report, still open. CHW Claudine has not synced since 19 Sept.", href: "/supervisor/escalations?filter=stalled", read: false },
    { id: "n2", at: `${base}T11:00:00`, kind: "system", title: "Claudine Nyiraneza: no sync for 2 days", text: "11 mothers, 3 open alerts.", href: "/supervisor/chws", read: false },
  ],
  provider: [
    { id: "n1", at: `${base}T11:05:00`, kind: "escalation", title: "Incoming referral · HIGH · Uwase Claudine", text: "From CHW Marie. BP 152/96. ETA 11:40 by moto.", href: "/clinic/queue", read: false },
    { id: "n2", at: `${base}T09:00:00`, kind: "feedback", title: "3 referrals waiting for your feedback", text: "Oldest: Mukandayisenga Rose, 4 days.", href: "/clinic/close-loop", read: false },
  ],
  analyst: [{ id: "n1", at: `${base}T06:00:00`, kind: "system", title: "September aggregates refreshed", text: "Gasabo district as of 21 Sep 06:00.", href: "/insights", read: false }],
  "care-manager": [{ id: "n1", at: `${base}T11:10:00`, kind: "escalation", title: "Opted-in member now high risk: Uwase Claudine", text: "Referred to Kinyinya HC today. Suggested: confirm she was seen; arrange transport if referred up.", href: "/care/cm1", read: false }],
  researcher: [{ id: "n1", at: "2026-09-19T09:00:00", kind: "approval", title: "P-2026-05 extract refreshed", text: "9,310 conversations, pseudonymised. Expires 1 Mar 2027.", href: "/portal", read: true }],
  admin: [
    { id: "n1", at: `${base}T09:30:00`, kind: "approval", title: "Approval waiting: Midwife Chantal Ingabire (provider-hc)", text: "1 of 2 approvals. In-charge has approved.", href: "/admin/users", read: false },
    { id: "n2", at: "2026-09-20T22:14:00", kind: "system", title: "Break-glass used: BG-007", text: "pascal@ (sre) during INC-014. Review within 48 h.", href: "/admin/break-glass", read: false },
  ],
};

export const homeByRole: Record<string, string> = { mother: "/app", family: "/family", chw: "/chw", supervisor: "/supervisor", provider: "/clinic", analyst: "/insights", "care-manager": "/care", researcher: "/portal", admin: "/admin" };
export const roleLabel: Record<string, string> = { mother: "Mother", family: "Family supporter", chw: "Community Health Worker", supervisor: "CHW supervisor", provider: "Health-facility provider", analyst: "Partner analyst", "care-manager": "Care manager (insurer)", researcher: "Researcher", admin: "MamaCare admin" };

export type HelpSection = { title: string; items: { q: string; a: string }[] };
const common: HelpSection[] = [
  { title: "Account", items: [{ q: "I changed my phone number", a: "Sign in with your old number if you still can and update it under Profile. If not, contact support — we will verify you by the details on your record and re-issue a code." }, { q: "Switch language", a: "Tap RW / EN at the top of any page. The choice is saved on this device." }, { q: "Sign out on a shared phone", a: "Use Sign out in the menu. On shared phones, always sign out; MamaCare also signs you out after inactivity." }] },
  { title: "Emergency", items: [{ q: "Someone is bleeding, having fits, or unconscious", a: "Do not use the app. Call 912 or go to the nearest health facility now." }] },
];
export const helpByRole: Record<string, HelpSection[]> = {
  mother: [
    { title: "Check-ins", items: [{ q: "How do I report how I feel?", a: "Open Chat and write in your own words, or tap a quick reply. MamaCare asks follow-up questions, then tells you what to do next. A person always decides what happens after." }, { q: "I did not get a reply", a: "Replies can take a minute on a slow network. If you have not heard back in 10 minutes and you feel unwell, call your CHW or the facility directly — their numbers are on your Home page." }] },
    { title: "My circle", items: [{ q: "Who can see my information?", a: "Only the people listed in My circle: your CHW, your facility, and family members you approved. You can remove any family member and see who viewed your record." }, { q: "How does my husband join?", a: "Give him your code from My circle. He requests to join; nothing is shared until you approve." }] },
    ...common,
  ],
  family: [{ title: "Reporting", items: [{ q: "What should I report?", a: "Anything that seems different: headache, swelling, tiredness, less movement, fever. Tick the signs you saw and send. It reaches her CHW and she is told you reported." }, { q: "Why can’t I see her risk level?", a: "She controls that. She can turn it on for you in her circle settings." }] }, ...common],
  chw: [
    { title: "Offline", items: [{ q: "The app says offline", a: "Anything you record is saved on the phone and sent automatically when you have network. The badge at the top shows how many items are waiting; tap it to sync now." }, { q: "A visit did not sync", a: "Open Profile → Saved on this phone. Items stay until sent. If one keeps failing, discard it only after re-recording it — or call your supervisor." }] },
    { title: "Alerts", items: [{ q: "What do the alert states mean?", a: "Open: nobody has seen it. Acknowledged: you have seen it. Acted: you visited or referred. Closed: the clinic recorded what happened. Your supervisor sees anything that stalls." }, { q: "The recommendation looks wrong", a: "Use your judgement and follow your protocol. Then tell us: Profile → report a system-wrong case. Every report is reviewed by the clinical lead." }] },
    ...common,
  ],
  supervisor: [{ title: "Stalled alerts", items: [{ q: "What counts as stalled?", a: "Open past its SLA (high 2 h, moderate 24 h, low 72 h), acknowledged for twice that, or acted with no clinic outcome after 48 h." }, { q: "Reassigning a mother", a: "Reassign → choose from/to CHW, tick the mothers, give a reason. Both CHWs and each mother are notified; the reason is audit-logged." }] }, ...common],
  provider: [{ title: "Closing the loop", items: [{ q: "Why does the encounter form ask for CHW feedback?", a: "It is the single largest gap CHWs reported. One line — what you found, what happened, what to do at the next visit — closes the escalation on their side and reaches their phone." }, { q: "Decision-support hints", a: "They follow Rwanda ANC/EmONC protocols and are reviewed by the clinical lead. They never replace your judgement; your impression is what is recorded." }] }, ...common],
  analyst: [{ title: "Aggregates", items: [{ q: "Why do I see “< 20”?", a: "Any figure describing fewer than 20 people is suppressed to protect privacy. Exports apply the same rule server-side." }] }, ...common],
  "care-manager": [{ title: "Members", items: [{ q: "Why is a member missing?", a: "Only members who opted in to insurer care management appear. A member can withdraw at any time; she then disappears from your list." }, { q: "What am I allowed to see?", a: "Risk level, ANC status and contact history — never her conversation or clinical notes. This view is separate from pricing and claims and may not be used for them." }] }, ...common],
  researcher: [{ title: "Data access", items: [{ q: "How do I get an extract?", a: "Through an approved protocol. Extracts are pseudonymised with a key held by the DPO; analysis runs in the sandbox; exports enforce a minimum cell size of 20." }] }, ...common],
  admin: [{ title: "Access control", items: [{ q: "Why two approvers?", a: "Privileged roles (providers, care managers, researchers, internal privileged) need two different people to approve, so no single account can grant itself access to identified data." }, { q: "Break-glass", a: "Emergency access with a stated reason. Alerts security-lead and DPO, expires in 60 min, must be reviewed within 48 h." }] }, ...common],
};

export const statusPage = {
  overall: "operational" as "operational" | "degraded" | "outage",
  updated: "2026-09-21T15:40:00",
  components: [
    { name: "Web app & APIs", status: "operational", uptime90d: 99.95 },
    { name: "WhatsApp channel", status: "operational", uptime90d: 99.9 },
    { name: "SMS channel", status: "degraded", uptime90d: 99.6, note: "Elevated delivery retries on one carrier since 14:10. Messages are being delivered with delay." },
    { name: "Risk engine & rules", status: "operational", uptime90d: 100 },
    { name: "CHW sync", status: "operational", uptime90d: 99.8 },
    { name: "Escalation notifications", status: "operational", uptime90d: 99.97 },
  ],
  incidents: [
    { at: "2026-09-21T14:10:00", title: "SMS delivery delays (one carrier)", status: "monitoring", updates: ["14:10 — Elevated retries detected on MTN routes.", "14:35 — Carrier confirmed congestion; WhatsApp unaffected.", "15:40 — Delivery times improving; monitoring."] },
    { at: "2026-09-19T15:40:00", title: "CHW sync failures — Gacuriro cell", status: "resolved", updates: ["15:40 — Sync failures reported by 3 CHWs.", "16:20 — Root cause: carrier data outage in the area. Offline queue held all records.", "20 Sep 09:00 — All queued records synced. Resolved."] },
  ],
};
