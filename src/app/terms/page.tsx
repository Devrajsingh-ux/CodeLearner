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
  title: "Terms of Service — Zentax",
  description:
    "The terms and conditions that govern your use of the Zentax platform.",
};

const SECTIONS = [
  { id: "acceptance", title: "Acceptance of terms" },
  { id: "accounts", title: "Accounts" },
  { id: "content", title: "Content & licences" },
  { id: "acceptable-use", title: "Acceptable use" },
  { id: "subscriptions", title: "Subscriptions & billing" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "ugc", title: "User-generated content" },
  { id: "warranties", title: "Disclaimers" },
  { id: "liability", title: "Limitation of liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "termination", title: "Termination" },
  { id: "governing-law", title: "Governing law" },
  { id: "changes", title: "Changes to terms" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using Zentax. By accessing or using the platform you agree to be bound by them."
      lastUpdated="February 1, 2026"
      sections={SECTIONS}
    >
      <LegalSection id="acceptance" title="Acceptance of terms">
        <LegalP>
          These Terms of Service (&quot;Terms&quot;) constitute a legally
          binding agreement between you (&quot;User&quot;, &quot;you&quot;) and
          Zentax Inc. (&quot;Zentax&quot;, &quot;we&quot;,
          &quot;our&quot;) governing your access to and use of the Zentax
          website and platform (the &quot;Service&quot;).
        </LegalP>
        <LegalP>
          By creating an account, clicking &quot;I agree&quot;, or otherwise
          accessing the Service, you confirm that you are at least 13 years old,
          have read and understood these Terms, and agree to be bound by them.
          If you are using the Service on behalf of an organisation, you
          represent that you have authority to bind that organisation.
        </LegalP>
        <LegalP>If you do not agree, do not use the Service.</LegalP>
      </LegalSection>

      <LegalSection id="accounts" title="Accounts">
        <LegalP>
          You must provide accurate, current, and complete information during
          registration and keep your account details up to date. You are
          responsible for maintaining the confidentiality of your password and
          for all activity that occurs under your account.
        </LegalP>
        <LegalUl>
          <LegalLi>
            You may not share your account credentials with any other person.
          </LegalLi>
          <LegalLi>
            You must notify us immediately at{" "}
            <LegalStrong>security@zentax.io</LegalStrong> if you suspect
            unauthorised access to your account.
          </LegalLi>
          <LegalLi>
            One person may not maintain more than one free account. Duplicate
            accounts created to circumvent plan limits will be suspended.
          </LegalLi>
          <LegalLi>
            Accounts created by automated means (bots) are prohibited.
          </LegalLi>
        </LegalUl>
      </LegalSection>

      <LegalSection id="content" title="Content & licences">
        <LegalP>
          <LegalStrong>Licence to use the Service.</LegalStrong> Subject to
          these Terms, Zentax grants you a limited, non-exclusive,
          non-transferable, revocable licence to access and use the Service for
          personal, non-commercial learning purposes.
        </LegalP>
        <LegalP>
          <LegalStrong>Course content.</LegalStrong> Lesson text, video content,
          exercise descriptions, and assessments are copyrighted by Zentax or
          its content providers. You may not reproduce, redistribute, sell, or
          republish any course material without express written permission.
        </LegalP>
        <LegalP>
          <LegalStrong>Open-source exercises.</LegalStrong> Exercises in our
          public GitHub repository are available under the MIT License as noted
          in that repository. This does not extend to lesson narrative, design
          assets, or certification infrastructure.
        </LegalP>
      </LegalSection>

      <LegalSection id="acceptable-use" title="Acceptable use">
        <LegalP>You agree not to:</LegalP>
        <LegalUl>
          <LegalLi>
            Use the Service for any illegal purpose or in violation of any
            local, state, national, or international law.
          </LegalLi>
          <LegalLi>
            Attempt to gain unauthorised access to any portion of the Service,
            other user accounts, or connected systems.
          </LegalLi>
          <LegalLi>
            Use automated scripts, bots, or scrapers to access or extract data
            from the Service at a rate that strains infrastructure.
          </LegalLi>
          <LegalLi>
            Reverse-engineer, decompile, or disassemble any software component
            of the Service except to the extent permitted by applicable law.
          </LegalLi>
          <LegalLi>
            Post, transmit, or distribute content that is unlawful, harmful,
            threatening, abusive, harassing, defamatory, or infringes a third
            party's intellectual property.
          </LegalLi>
          <LegalLi>
            Share solutions to graded exercises or assessments publicly in a way
            designed to circumvent the learning integrity system.
          </LegalLi>
          <LegalLi>
            Use the in-browser code execution environment to run malicious code,
            cryptocurrency mining, or attacks against third parties.
          </LegalLi>
        </LegalUl>
        <LegalP>
          Violation of this section may result in immediate account termination
          and, where applicable, reporting to law enforcement.
        </LegalP>
      </LegalSection>

      <LegalSection id="subscriptions" title="Subscriptions & billing">
        <LegalP>
          <LegalStrong>Free plan.</LegalStrong> Certain features are available
          free of charge subject to fair-use limits described on our Pricing
          page.
        </LegalP>
        <LegalP>
          <LegalStrong>Pro plan.</LegalStrong> The Pro plan is billed monthly or
          annually in advance. All fees are in US Dollars and are exclusive of
          applicable taxes. By providing a payment method you authorise us to
          charge recurring fees on the billing cycle you select.
        </LegalP>
        <LegalP>
          <LegalStrong>Cancellation.</LegalStrong> You may cancel at any time
          via Settings → Billing → Cancel subscription. Cancellation takes
          effect at the end of the current billing period; no partial refunds
          are issued unless required by law.
        </LegalP>
        <LegalP>
          <LegalStrong>Refunds.</LegalStrong> We offer a 14-day money-back
          guarantee on your first Pro subscription payment. Subsequent payments
          are non-refundable except where required by applicable consumer
          protection law.
        </LegalP>
        <LegalP>
          <LegalStrong>Price changes.</LegalStrong> We will provide at least 30
          days' notice before changing subscription prices, communicated by
          email and in-app banner.
        </LegalP>
      </LegalSection>

      <LegalSection id="intellectual-property" title="Intellectual property">
        <LegalP>
          The Zentax name, logo, brand assets, platform design, and all
          original course content are the intellectual property of Zentax
          Inc. or its licensors, protected by copyright, trademark, and other
          applicable laws.
        </LegalP>
        <LegalP>
          Nothing in these Terms transfers any intellectual property rights to
          you beyond the limited licence described in §3.
        </LegalP>
      </LegalSection>

      <LegalSection id="ugc" title="User-generated content">
        <LegalP>
          You retain ownership of content you create and post on the Service
          (forum posts, project showcases, code snippets shared publicly). By
          posting, you grant Zentax a worldwide, royalty-free, sublicensable
          licence to use, reproduce, modify, and display that content for the
          purpose of operating and promoting the Service.
        </LegalP>
        <LegalP>
          You represent that you have the rights to post such content and that
          it does not violate any third-party's rights.
        </LegalP>
        <LegalP>
          We reserve the right to remove any user content that violates these
          Terms or our Community Guidelines without notice.
        </LegalP>
      </LegalSection>

      <LegalSection id="warranties" title="Disclaimers">
        <LegalP>
          The Service is provided &quot;<LegalStrong>as is</LegalStrong>&quot;
          and &quot;
          <LegalStrong>as available</LegalStrong>&quot; without warranties of
          any kind, express or implied, including warranties of merchantability,
          fitness for a particular purpose, or non-infringement. We do not
          warrant that the Service will be uninterrupted, error-free, or free of
          viruses or other harmful components.
        </LegalP>
        <LegalP>
          While we strive for accuracy, course content may contain errors or
          become outdated. Learners are encouraged to verify information from
          official documentation and authoritative sources.
        </LegalP>
      </LegalSection>

      <LegalSection id="liability" title="Limitation of liability">
        <LegalP>
          To the maximum extent permitted by applicable law, Zentax and its
          directors, officers, employees, and contractors shall not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages arising out of or relating to your use of the Service,
          including loss of profits, data, goodwill, or business interruption.
        </LegalP>
        <LegalP>
          Our aggregate liability to you for any claim arising under these Terms
          shall not exceed the greater of (i) the total fees paid by you to
          Zentax in the 12 months preceding the claim, or (ii) USD 100.
        </LegalP>
        <LegalP>
          Some jurisdictions do not allow limitation of certain damages; in
          those jurisdictions our liability is limited to the fullest extent
          permitted by law.
        </LegalP>
      </LegalSection>

      <LegalSection id="indemnification" title="Indemnification">
        <LegalP>
          You agree to indemnify, defend, and hold harmless Zentax and its
          affiliates, officers, agents, and employees from any claim, liability,
          damage, loss, and expense (including reasonable legal fees) arising
          from your use of the Service, your violation of these Terms, or your
          infringement of any third-party right.
        </LegalP>
      </LegalSection>

      <LegalSection id="termination" title="Termination">
        <LegalP>
          We may suspend or terminate your account at any time, with or without
          cause, with or without notice, if we reasonably believe you have
          violated these Terms or our Community Guidelines.
        </LegalP>
        <LegalP>
          You may delete your account at any time via Settings → Account →
          Delete account. On deletion, your personal data will be handled as
          described in our Privacy Policy.
        </LegalP>
        <LegalP>
          Provisions of these Terms that by their nature should survive
          termination shall survive, including intellectual property, limitation
          of liability, indemnification, and governing law.
        </LegalP>
      </LegalSection>

      <LegalSection id="governing-law" title="Governing law">
        <LegalP>
          These Terms are governed by and construed in accordance with the laws
          of the State of California, USA, without regard to conflict of law
          provisions. Any dispute arising under these Terms shall be submitted
          to the exclusive jurisdiction of the state and federal courts located
          in San Francisco County, California.
        </LegalP>
        <LegalP>
          If you are a consumer resident in the European Union, you may also
          have the right to bring proceedings in the courts of your country of
          residence.
        </LegalP>
      </LegalSection>

      <LegalSection id="changes" title="Changes to terms">
        <LegalP>
          We reserve the right to modify these Terms at any time. When we do, we
          will update the &quot;Last updated&quot; date above and notify you by
          email and in-app notification at least 14 days before material changes
          take effect. Your continued use of the Service after changes take
          effect constitutes acceptance of the revised Terms.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <LegalP>
          For questions about these Terms, contact us at{" "}
          <strong className="font-medium text-violet-400">
            legal@zentax.io
          </strong>{" "}
          or by mail at Zentax Inc., 123 Market Street, Suite 400, San
          Francisco, CA 94105, USA.
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
