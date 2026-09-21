import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/pages/Prose";

export const metadata: Metadata = { title: "Terms of use", description: "The terms under which MamaCare is provided." };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms of use" title={<>Plain terms for a <span className="text-coral">serious</span> service.</>} lead="Last updated: September 2026. Draft for the pilot phase." />
      <section className="bg-white py-20 md:py-28">
        <div className="container-x">
          <Prose>
            <h2>1. What MamaCare is, and is not</h2>
            <p>MamaCare is a decision-support tool that helps mothers, families and health workers recognise possible pregnancy risks earlier and act sooner. <strong>MamaCare is not a medical service, does not diagnose, and does not replace doctors, midwives or Community Health Workers.</strong> It is not an emergency service. In an emergency, call 912 or go to the nearest health facility.</p>

            <h2>2. Who may use it</h2>
            <p>Pregnant and postpartum women, family members they approve, and health workers authorised by their facility or programme. Health-worker accounts are issued and revoked by MamaCare administrators on request of the facility.</p>

            <h2>3. Your responsibilities</h2>
            <ul>
              <li>Provide information that is accurate to the best of your knowledge.</li>
              <li>Keep your account and phone secure; tell us if you lose access.</li>
              <li>Only link people the mother has agreed to link.</li>
              <li>Health workers: follow your professional protocols. MamaCare’s recommendations support, and do not replace, your judgement.</li>
            </ul>

            <h2>4. Our responsibilities</h2>
            <ul>
              <li>Keep medically reviewed rules current and versioned.</li>
              <li>Attribute every system recommendation so it can be reviewed.</li>
              <li>Protect your information as described in the <a href="/privacy">privacy policy</a>.</li>
              <li>Tell you promptly if something goes wrong that affects you.</li>
            </ul>

            <h2>5. Availability</h2>
            <p>We aim for the service to be available at all times, but messages can be delayed by networks we do not control. Never rely on MamaCare alone in an emergency.</p>

            <h2>6. Limits of liability</h2>
            <p>To the extent permitted by Rwandan law, MamaCare is not liable for outcomes arising from clinical decisions made by health workers, from inaccurate information provided to the system, or from network failures outside our control. Nothing in these terms limits liability that cannot be limited by law.</p>

            <h2>7. Ending use</h2>
            <p>You can stop using MamaCare at any time and request deletion of your data. We may suspend accounts that misuse the service or endanger others.</p>

            <h2>8. Governing law</h2>
            <p>These terms are governed by the laws of the Republic of Rwanda.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}
