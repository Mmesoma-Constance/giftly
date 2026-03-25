import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: `When you use Giftly, we may collect the following types of information:

• **Usage data:** Pages visited, features used, gift searches performed, and interactions with our AI recommendation engine.
• **Device & technical data:** Browser type, operating system, IP address, and device identifiers used to ensure the service works correctly on your device.
• **Preferences & inputs:** Gift preferences, budgets, and recipient details you enter when using the Gift Finder — this data is used solely to generate your recommendations.
• **Saved items:** If you save gifts using the heart/save feature, these are stored in your browser's local storage and never transmitted to our servers unless you create an account.

We do not collect payment information. Any purchases are made directly through third-party retailers.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your information to:

• Power and improve the AI gift recommendation engine
• Personalise your experience and remember your preferences
• Analyse usage patterns to improve Giftly's features and performance
• Communicate service updates (only if you have opted in)
• Comply with legal obligations

We never sell your personal data to third parties. We do not use your gift search history for targeted advertising.`,
  },
  {
    title: "Cookies & Tracking",
    body: `Giftly uses cookies and similar technologies to:

• Keep you signed in between sessions
• Remember your currency preference and saved gifts
• Understand how people use the app (via anonymised analytics)

You can manage cookie preferences through your browser settings or via our Cookie Preferences panel. Disabling cookies may affect some features of the service.`,
  },
  {
    title: "Data Sharing",
    body: `We may share data with trusted third-party service providers who help us operate the platform (e.g. analytics, cloud hosting). These partners are contractually required to protect your data and may not use it for their own purposes.

We may disclose information when required by law or to protect the rights, safety, or property of Giftly and its users.

We do not share your personal gift search data with retailers or advertisers.`,
  },
  {
    title: "Data Retention",
    body: `We retain data only as long as necessary to provide the service or comply with legal requirements. Anonymised analytics data may be retained indefinitely. You may request deletion of your personal data at any time by contacting us at privacy@giftly.app.`,
  },
  {
    title: "Your Rights",
    body: `Depending on your location, you may have the right to:

• Access the personal data we hold about you
• Correct inaccurate data
• Request deletion of your data
• Object to or restrict how we process your data
• Data portability

To exercise any of these rights, contact us at privacy@giftly.app. We will respond within 30 days.`,
  },
  {
    title: "Children's Privacy",
    body: `Giftly is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately and we will delete it.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by displaying a notice on the app or by email if you have an account. Continued use of Giftly after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return <LegalPage title="Privacy Policy" lastUpdated="January 15, 2026" sections={SECTIONS} navigate={navigate} />;
}

// ── Shared layout for all legal pages ──
export function LegalPage({ title, lastUpdated, sections, navigate, intro }) {
  return (
    <div className="min-h-screen mt-16" style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}>

      {/* Hero band */}
      <div className="bg-[#180806] pt-16 pb-14 px-5">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-bold text-white/50
              mb-8 hover:text-white transition-colors duration-200 bg-transparent border-none
              cursor-pointer p-0"
          >
            ← Back
          </button>
          <h1
            className="text-[2.2rem] sm:text-[3rem] font-black text-white leading-none tracking-tight mb-3"
            style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}
          >
            {title}
          </h1>
          <p className="text-sm text-white/40">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 py-14 pb-24">
        {intro && (
          <p className="text-[1rem] text-[#2C1A12]/70 leading-[1.85] mb-10 p-6 rounded-2xl"
            style={{ background: "rgba(232,97,77,.06)", borderLeft: "3px solid #E8614D" }}>
            {intro}
          </p>
        )}

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2
                className="text-[1.25rem] font-black text-[#2C1A12] mb-3"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                {i + 1}. {s.title}
              </h2>
              <div className="text-[0.96rem] text-[#2C1A12]/68 leading-[1.85] whitespace-pre-line">
                {s.body.split(/(\*\*.*?\*\*)/).map((chunk, j) =>
                  chunk.startsWith("**") && chunk.endsWith("**")
                    ? <strong key={j} className="text-[#2C1A12]/90 font-bold">{chunk.slice(2, -2)}</strong>
                    : chunk
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-14 rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg,rgba(232,97,77,.07),rgba(240,168,48,.07))" }}>
          <p
            className="text-[1.1rem] font-black text-[#2C1A12] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            Questions about this policy?
          </p>
          <p className="text-sm text-[#2C1A12]/60 mb-4">
            Reach out and we'll get back to you within 2 business days.
          </p>
          <a
            href="mailto:privacy@giftly.app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold
              text-sm text-white transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg,#E8614D,#c94a38)", boxShadow: "0 6px 20px rgba(232,97,77,.28)" }}
          >
            privacy@giftly.app
          </a>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Syne:wght@500;700;800&display=swap');
      `}</style>
    </div>
  );
}