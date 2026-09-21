import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/pages/Prose";

export const metadata: Metadata = { title: "Privacy", description: "How MamaCare collects, uses, protects and shares information." };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title={<>Your information, <span className="text-coral">your control</span>.</>} lead="Last updated: September 2026. This policy is a draft for the pilot phase and will be reviewed with the Data Protection Office and RNEC before launch." />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Prose>
            <h2>1. Who we are</h2>
            <p>MamaCare is a maternal-health early-warning platform developed in Kigali, Rwanda. We are the data controller for information you share with MamaCare. Our Data Protection Officer can be reached through the <a href="/contact">contact page</a>.</p>

            <h2>2. What we collect</h2>
            <ul>
              <li><strong>Account details:</strong> name, phone number, preferred language, channel (web, app, WhatsApp, SMS), and, for health workers, facility and role.</li>
              <li><strong>Pregnancy and health information you or your care circle share:</strong> symptoms, pregnancy stage and history, measurements, visit observations, clinical data entered by a provider.</li>
              <li><strong>Conversations:</strong> the messages you exchange with MamaCare, and the structured summary the system extracts from them.</li>
              <li><strong>System records:</strong> risk levels, recommended actions, escalations, who viewed your record and when.</li>
              <li><strong>Technical data:</strong> device and connection information needed to deliver messages.</li>
            </ul>

            <h2>3. Why we use it</h2>
            <ul>
              <li>To understand what you tell us and ask useful follow-up questions.</li>
              <li>To assess risk and guide the next action through medically reviewed rules.</li>
              <li>To alert the Community Health Worker and facility you are linked to.</li>
              <li>To let you and your care circle see one continuous picture of the pregnancy.</li>
              <li>To improve safety: reviewing cases where the system was wrong, and validating the platform under ethics approval.</li>
            </ul>
            <p>We do not use your information for advertising, and we do not sell it.</p>

            <h2>4. Legal basis</h2>
            <p>We process personal and health data under Rwanda’s Law No. 058/2021 relating to the protection of personal data and privacy, on the basis of your explicit consent, and, for health workers, the performance of their role. Health data is treated as sensitive data with additional safeguards.</p>

            <h2>5. Who can see your information</h2>
            <p>Only the people in your care circle whom you have approved: your Community Health Worker, your health facility, and any family member you link. Access is per person, logged, and revocable by you at any time. Details are on the <a href="/consent">consent page</a>.</p>
            <p>Partners such as the Ministry of Health, insurers and research institutions receive <strong>only de-identified, aggregated figures</strong> with a minimum group size, unless you separately opt in to a specific care-management programme.</p>

            <h2>6. Automated decision-making</h2>
            <p>MamaCare uses a language model to understand what you say and a risk model to assess your situation. <strong>No decision about your care is made by the system alone.</strong> Recommended actions pass through medically reviewed rules and are carried out by a named health worker. You can ask for a human review of any recommendation.</p>

            <h2>7. Security</h2>
            <p>Data is encrypted in transit and at rest. Staff have no standing access to identified records; emergency access requires a stated reason, triggers an alert, and is reviewed. Every access to a record is logged, and you can request the log of who viewed yours.</p>

            <h2>8. Retention</h2>
            <p>Pregnancy records are retained for the duration of care and a defined period after, aligned with health-record requirements agreed with health authorities. Conversation text is minimised after structuring. You may request deletion; where a health-record obligation prevents full deletion, we will tell you what is kept and why.</p>

            <h2>9. Your rights</h2>
            <ul>
              <li>See what we hold about you and who has accessed it.</li>
              <li>Correct inaccurate information.</li>
              <li>Withdraw consent for any linked person or partner.</li>
              <li>Export your data.</li>
              <li>Request deletion.</li>
              <li>Complain to the National Cyber Security Authority’s Data Protection Office.</li>
            </ul>

            <h2>10. Changes</h2>
            <p>We will notify you through your chosen channel before any change that affects how your information is used.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
