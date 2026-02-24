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
  title: "Cookie Policy — CodeLearn",
  description:
    "What cookies CodeLearn sets, why we use them, and how to control them.",
};

const SECTIONS = [
  { id: "what-are-cookies", title: "What are cookies?" },
  { id: "types", title: "Types of cookies we use" },
  { id: "third-party", title: "Third-party cookies" },
  { id: "managing", title: "Managing cookies" },
  { id: "do-not-track", title: "Do Not Track" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact" },
];

// Inline table-like structure using divs for the cookie table
function CookieTable({
  rows,
}: {
  rows: Array<{
    name: string;
    purpose: string;
    duration: string;
    type: "Essential" | "Functional" | "Analytics" | "Third-party";
  }>;
}) {
  const typeColor: Record<string, string> = {
    Essential: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    Functional: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    Analytics: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "Third-party": "text-pink-400 bg-pink-500/10 border-pink-500/20",
  };
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8 bg-white/3">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 whitespace-nowrap">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Purpose
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 whitespace-nowrap">
              Duration
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row) => (
            <tr key={row.name} className="transition-colors hover:bg-white/2">
              <td className="px-4 py-3 font-mono text-xs text-zinc-300 whitespace-nowrap">
                {row.name}
              </td>
              <td className="px-4 py-3 text-xs leading-relaxed text-zinc-400">
                {row.purpose}
              </td>
              <td className="px-4 py-3 text-xs text-zinc-500 whitespace-nowrap">
                {row.duration}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${typeColor[row.type]}`}
                >
                  {row.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="This policy explains exactly what cookies and similar technologies CodeLearn sets, why, and how you can control them."
      lastUpdated="February 1, 2026"
      sections={SECTIONS}
    >
      <LegalSection id="what-are-cookies" title="What are cookies?">
        <LegalP>
          Cookies are small text files placed on your device by websites you
          visit. They are widely used to make websites work correctly, to
          personalise the experience, and to provide analytical information to
          site owners.
        </LegalP>
        <LegalP>
          Alongside traditional cookies, we use similar technologies including
          localStorage (for client-side session state) and service workers (for
          offline caching of lesson content). This policy covers all such
          technologies collectively.
        </LegalP>
        <LegalP>
          Cookies set by CodeLearn.io are &quot;first-party&quot; cookies.
          Cookies set by our partners and service providers are
          &quot;third-party&quot; cookies.
        </LegalP>
      </LegalSection>

      <LegalSection id="types" title="Types of cookies we use">
        <LegalP>
          <LegalStrong>1. Strictly necessary cookies</LegalStrong>
        </LegalP>
        <LegalP>
          These are required for the Platform to function. They cannot be
          disabled and do not require consent under ePrivacy Directive
          exemptions.
        </LegalP>
        <CookieTable
          rows={[
            {
              name: "cl_session",
              purpose:
                "Authenticates your logged-in session. Without this cookie, you cannot access your account.",
              duration: "7 days (with refresh)",
              type: "Essential",
            },
            {
              name: "cl_csrf",
              purpose:
                "CSRF protection token used on all state-changing requests.",
              duration: "Session",
              type: "Essential",
            },
            {
              name: "cl_cookie_consent",
              purpose: "Stores your cookie preference choices.",
              duration: "1 year",
              type: "Essential",
            },
          ]}
        />

        <div className="mt-6">
          <LegalP>
            <LegalStrong>2. Functional cookies</LegalStrong>
          </LegalP>
          <LegalP>
            These remember your preferences to enhance your experience. They can
            be disabled but doing so may degrade functionality.
          </LegalP>
          <CookieTable
            rows={[
              {
                name: "cl_theme",
                purpose:
                  "Stores your UI theme preference (dark/light, accent colour).",
                duration: "1 year",
                type: "Functional",
              },
              {
                name: "cl_editor_prefs",
                purpose:
                  "Saves your code editor settings (font size, tab width, key bindings).",
                duration: "1 year",
                type: "Functional",
              },
              {
                name: "cl_track_state",
                purpose:
                  "Persists unsaved editor state when navigating between lessons.",
                duration: "Session",
                type: "Functional",
              },
            ]}
          />
        </div>

        <div className="mt-6">
          <LegalP>
            <LegalStrong>3. Analytics cookies</LegalStrong>
          </LegalP>
          <LegalP>
            These help us understand how learners use the Platform so we can
            improve it. All analytics data is anonymised before storage — IP
            addresses are truncated to /24. These cookies require your consent.
          </LegalP>
          <CookieTable
            rows={[
              {
                name: "cl_analytics_id",
                purpose:
                  "Randomly-generated anonymous session identifier used to aggregate usage metrics.",
                duration: "2 years",
                type: "Analytics",
              },
              {
                name: "cl_perf",
                purpose:
                  "Collects Web Vitals (LCP, CLS, FID) to monitor Platform performance.",
                duration: "30 days",
                type: "Analytics",
              },
            ]}
          />
        </div>
      </LegalSection>

      <LegalSection id="third-party" title="Third-party cookies">
        <LegalP>
          Our service providers may set cookies on our pages. We have data
          processing agreements with all of them and they are listed below.
        </LegalP>
        <CookieTable
          rows={[
            {
              name: "__stripe_mid / __stripe_sid",
              purpose:
                "Stripe payment fraud prevention. Set on the checkout flow only.",
              duration: "1 year / Session",
              type: "Third-party",
            },
            {
              name: "_cf_clearance",
              purpose:
                "Cloudflare bot-management challenge verification. Not used for tracking.",
              duration: "30 minutes",
              type: "Third-party",
            },
          ]}
        />
        <LegalP>
          We do not use Google Analytics, Facebook Pixel, or any advertising
          network cookies. We will update this table if that ever changes.
        </LegalP>
      </LegalSection>

      <LegalSection id="managing" title="Managing cookies">
        <LegalP>
          <LegalStrong>In-platform preference centre.</LegalStrong> You can
          manage your non-essential cookie preferences at any time via the
          banner that appears on first visit, or through Settings → Privacy →
          Cookie preferences.
        </LegalP>
        <LegalP>
          <LegalStrong>Browser settings.</LegalStrong> All major browsers allow
          you to view, block, and delete cookies. Instructions for popular
          browsers:
        </LegalP>
        <LegalUl>
          <LegalLi>
            <LegalStrong>Chrome:</LegalStrong> Settings → Privacy and security →
            Cookies and other site data
          </LegalLi>
          <LegalLi>
            <LegalStrong>Firefox:</LegalStrong> Settings → Privacy & Security →
            Cookies and Site Data
          </LegalLi>
          <LegalLi>
            <LegalStrong>Safari:</LegalStrong> Preferences → Privacy → Manage
            Website Data
          </LegalLi>
          <LegalLi>
            <LegalStrong>Edge:</LegalStrong> Settings → Cookies and site
            permissions → Manage and delete cookies
          </LegalLi>
        </LegalUl>
        <LegalP>
          Note: blocking strictly necessary cookies will prevent you from
          logging in and using core Platform features.
        </LegalP>
        <LegalP>
          <LegalStrong>localStorage.</LegalStrong> You can clear localStorage
          via your browser's developer tools (Application → Storage → Local
          Storage). Doing so will reset your editor preferences and any unsaved
          lesson states.
        </LegalP>
      </LegalSection>

      <LegalSection id="do-not-track" title="Do Not Track">
        <LegalP>
          Some browsers include a &quot;Do Not Track&quot; (DNT) signal. As
          there is no consistent industry standard for how DNT should be
          interpreted, we do not currently alter our behaviour in response to
          DNT signals. However, our analytics are already anonymised and we do
          not engage in cross-site tracking regardless of DNT status.
        </LegalP>
      </LegalSection>

      <LegalSection id="changes" title="Changes to this policy">
        <LegalP>
          We will update this policy when we add or remove cookies or similar
          technologies. The &quot;Last updated&quot; date at the top reflects
          the most recent revision. For material changes, we will obtain fresh
          consent via the cookie banner.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" title="Contact">
        <LegalP>
          For questions about our use of cookies, contact us at{" "}
          <strong className="font-medium text-violet-400">
            privacy@codelearn.io
          </strong>
          .
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
