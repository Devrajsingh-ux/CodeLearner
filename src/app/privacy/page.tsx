import type { Metadata } from "next";
import {
  LegalLayout,
  LegalLi,
  LegalP,
  LegalSection,
  LegalStrong,
  LegalUl,
} from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Zentax",
  description: "How Zentax collects, uses, and protects your personal data.",
};

const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "data-collected", title: "Data we collect" },
  { id: "how-we-use", title: "How we use your data" },
  { id: "sharing", title: "Data sharing" },
  { id: "retention", title: "Data retention" },
  { id: "your-rights", title: "Your rights" },
  { id: "cookies", title: "Cookies" },
  { id: "security", title: "Security" },
  { id: "children", title: "Children's privacy" },
  { id: "international", title: "International transfers" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="This policy explains what personal data Zentax collects, why we collect it, and how you can control it."
      lastUpdated="February 1, 2026"
      sections={SECTIONS}
    >
      <LegalSection id="overview" title="Overview">
        <LegalP>
          Zentax (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
          committed to protecting your privacy. This Privacy Policy describes
          how we collect, use, disclose, and safeguard your personal data when
          you use our website located at{" "}
          <strong className="font-medium text-zinc-200">zentax.io</strong>{" "}
          and related services (collectively, the &quot;Platform&quot;).
        </LegalP>
        <LegalP>
          By creating an account or using our Platform you agree to the
          collection and use of information in accordance with this policy. If
          you do not agree, please do not use the Platform.
        </LegalP>
        <LegalP>
          We are the data controller for the purposes of the General Data
          Protection Regulation (GDPR), the UK GDPR, and the California Consumer
          Privacy Act (CCPA).
        </LegalP>
      </LegalSection>

      <LegalSection id="data-collected" title="Data we collect">
        <LegalP>
          <LegalStrong>Account data.</LegalStrong> When you register we collect
          your display name, email address, and a hashed password. If you sign
          in via GitHub or Google OAuth, we receive the profile data you
          authorise those providers to share.
        </LegalP>
        <LegalP>
          <LegalStrong>Usage data.</LegalStrong> We automatically log
          information about how you interact with the Platform, including pages
          visited, lessons started and completed, code submissions, time spent
          per lesson, and feature interactions. This data is used to improve
          content and personalise your learning path.
        </LegalP>
        <LegalP>
          <LegalStrong>Device and network data.</LegalStrong> We collect IP
          address, browser type and version, operating system, referring URL,
          and approximate geolocation derived from IP. We do not track precise
          GPS location.
        </LegalP>
        <LegalP>
          <LegalStrong>Payment data.</LegalStrong> Billing is processed by
          Stripe. We store only the last four digits of your card, card brand,
          and expiry month/year. Full card details are never held on our
          servers.
        </LegalP>
        <LegalP>
          <LegalStrong>Communications.</LegalStrong> If you contact us by email
          or submit a support ticket, we retain those messages for up to three
          years to resolve disputes and improve support quality.
        </LegalP>
        <LegalP>
          <LegalStrong>User-generated content.</LegalStrong> Code written in the
          in-browser editor, forum posts, project showcases, and community
          contributions are stored and may be visible to other users where you
          have made them public.
        </LegalP>
      </LegalSection>

      <LegalSection id="how-we-use" title="How we use your data">
        <LegalP>We use your personal data for the following purposes:</LegalP>
        <LegalUl>
          <LegalLi>Providing, maintaining, and improving the Platform.</LegalLi>
          <LegalLi>
            Personalising your learning dashboard, recommended tracks, and
            difficulty progression.
          </LegalLi>
          <LegalLi>
            Sending transactional emails (account confirmation, password reset,
            billing receipts) and, with your consent, product newsletters.
          </LegalLi>
          <LegalLi>
            Processing payments and managing subscriptions via Stripe.
          </LegalLi>
          <LegalLi>
            Detecting, investigating, and preventing abuse, fraud, and security
            incidents.
          </LegalLi>
          <LegalLi>
            Complying with legal obligations and enforcing our Terms of Service.
          </LegalLi>
          <LegalLi>
            Generating anonymised and aggregated analytics to understand usage
            trends (no individual is identifiable in these reports).
          </LegalLi>
        </LegalUl>
        <LegalP>
          The legal basis under GDPR for processing is (i) contract performance
          for account and service delivery, (ii) legitimate interests for
          security and analytics, and (iii) consent for marketing
          communications.
        </LegalP>
      </LegalSection>

      <LegalSection id="sharing" title="Data sharing">
        <LegalP>
          We <LegalStrong>do not sell</LegalStrong> your personal data. We share
          it only in the following limited circumstances:
        </LegalP>
        <LegalUl>
          <LegalLi>
            <LegalStrong>Service providers.</LegalStrong> We use sub-processors
            including Stripe (payments), Postmark (transactional email),
            Cloudflare (CDN and DDoS protection), and Vercel (hosting). Each is
            bound by data processing agreements and may only use your data to
            provide services to us.
          </LegalLi>
          <LegalLi>
            <LegalStrong>Legal requirements.</LegalStrong> We may disclose data
            to government authorities where required by applicable law or to
            protect the rights, property, or safety of Zentax, our users, or
            the public.
          </LegalLi>
          <LegalLi>
            <LegalStrong>Business transfers.</LegalStrong> In the event of a
            merger, acquisition, or asset sale, user data may be transferred. We
            will notify you via email and/or a prominent notice on the Platform
            before your data is subject to a different privacy policy.
          </LegalLi>
          <LegalLi>
            <LegalStrong>With your consent.</LegalStrong> We will share your
            data for any other purpose only with your explicit consent.
          </LegalLi>
        </LegalUl>
      </LegalSection>

      <LegalSection id="retention" title="Data retention">
        <LegalP>
          We retain your account data for as long as your account is active or
          as needed to provide services. If you delete your account, we will
          delete or anonymise your personal data within 30 days, except where we
          are legally obliged to retain it longer (e.g. billing records retained
          for 7 years for tax compliance).
        </LegalP>
        <LegalP>
          Anonymised usage analytics are retained indefinitely as they cannot be
          linked back to an individual.
        </LegalP>
      </LegalSection>

      <LegalSection id="your-rights" title="Your rights">
        <LegalP>
          Depending on your jurisdiction you have some or all of the following
          rights:
        </LegalP>
        <LegalUl>
          <LegalLi>
            <LegalStrong>Access.</LegalStrong> Request a copy of the personal
            data we hold about you.
          </LegalLi>
          <LegalLi>
            <LegalStrong>Rectification.</LegalStrong> Ask us to correct
            inaccurate or incomplete data.
          </LegalLi>
          <LegalLi>
            <LegalStrong>
              Erasure (&quot;right to be forgotten&quot;).
            </LegalStrong>{" "}
            Request deletion of your personal data, subject to legal retention
            obligations.
          </LegalLi>
          <LegalLi>
            <LegalStrong>Portability.</LegalStrong> Receive your personal data
            in a machine-readable format (JSON export available in Settings →
            Account → Export data).
          </LegalLi>
          <LegalLi>
            <LegalStrong>Restriction.</LegalStrong> Ask us to restrict
            processing while a dispute is being resolved.
          </LegalLi>
          <LegalLi>
            <LegalStrong>Object.</LegalStrong> Object to processing based on
            legitimate interests.
          </LegalLi>
          <LegalLi>
            <LegalStrong>Withdraw consent.</LegalStrong> Where processing is
            based on consent (e.g. marketing email), you may withdraw at any
            time via the unsubscribe link or in Settings → Notifications.
          </LegalLi>
        </LegalUl>
        <LegalP>
          To exercise any of these rights, email{" "}
          <strong className="font-medium text-violet-400">
            privacy@zentax.io
          </strong>
          . We will respond within 30 days (or 45 days where legally permitted
          for complex requests).
        </LegalP>
        <LegalP>
          If you are located in the European Economic Area, you also have the
          right to lodge a complaint with your local data protection authority.
        </LegalP>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies">
        <LegalP>
          We use cookies and similar technologies. See our{" "}
          <a
            href="/cookies"
            className="font-medium text-violet-400 transition-colors hover:text-violet-300"
          >
            Cookie Policy
          </a>{" "}
          for a full breakdown of what we set, why, and how to manage them.
        </LegalP>
      </LegalSection>

      <LegalSection id="security" title="Security">
        <LegalP>
          We implement technical and organisational measures proportionate to
          the risk of processing your personal data:
        </LegalP>
        <LegalUl>
          <LegalLi>All data in transit encrypted with TLS 1.3.</LegalLi>
          <LegalLi>All data at rest encrypted with AES-256.</LegalLi>
          <LegalLi>
            Passwords hashed with bcrypt at cost factor 14 — never stored in
            cleartext.
          </LegalLi>
          <LegalLi>
            Access to production databases restricted to a small on-call
            engineering team via short-lived credentials.
          </LegalLi>
          <LegalLi>
            Regular third-party penetration tests and SOC 2 Type II audit in
            progress.
          </LegalLi>
        </LegalUl>
        <LegalP>
          Despite these measures, no method of electronic transmission is 100%
          secure. We cannot guarantee absolute security. If you discover a
          vulnerability, please disclose it responsibly to{" "}
          <strong className="font-medium text-violet-400">
            security@zentax.io
          </strong>
          .
        </LegalP>
      </LegalSection>

      <LegalSection id="children" title="Children's privacy">
        <LegalP>
          The Platform is not directed to children under 13 (or 16 in the EU).
          We do not knowingly collect personal data from minors. If you believe
          a child has provided us personal data, please contact us immediately
          at{" "}
          <strong className="font-medium text-violet-400">
            privacy@zentax.io
          </strong>{" "}
          and we will delete it promptly.
        </LegalP>
      </LegalSection>

      <LegalSection id="international" title="International transfers">
        <LegalP>
          Our primary infrastructure is located in the United States (Vercel,
          AWS us-east-1). If you access the Platform from the European Economic
          Area, we rely on Standard Contractual Clauses approved by the European
          Commission to transfer data to the US lawfully.
        </LegalP>
        <LegalP>
          You may request a copy of the applicable SCCs by emailing
          privacy@zentax.io.
        </LegalP>
      </LegalSection>

      <LegalSection id="changes" title="Changes to this policy">
        <LegalP>
          We may update this policy from time to time. We will notify you of
          material changes by:
        </LegalP>
        <LegalUl>
          <LegalLi>
            Posting the revised policy with an updated &quot;Last updated&quot;
            date.
          </LegalLi>
          <LegalLi>
            Sending an email notification at least 14 days before material
            changes take effect.
          </LegalLi>
          <LegalLi>Showing an in-app banner on your next login.</LegalLi>
        </LegalUl>
        <LegalP>
          Continued use of the Platform after changes take effect constitutes
          acceptance of the updated policy.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="Contact us">
        <LegalP>
          Data controller: <LegalStrong>Zentax Inc.</LegalStrong>, 123 Market
          Street, Suite 400, San Francisco CA 94105, USA.
        </LegalP>
        <LegalP>
          Data Protection Officer:{" "}
          <strong className="font-medium text-violet-400">
            dpo@zentax.io
          </strong>
        </LegalP>
        <LegalP>
          General privacy enquiries:{" "}
          <strong className="font-medium text-violet-400">
            privacy@zentax.io
          </strong>
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
