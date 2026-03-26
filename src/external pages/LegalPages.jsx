import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LAST_UPDATED = "January 1, 2026";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return <LegalPage title="Privacy Policy" lastUpdated={LAST_UPDATED} navigate={navigate}>
    <Section title="1. Information We Collect">
      <p>We collect information you provide directly to us when you use Giftly. This includes:</p>
      <ul>
        <li><strong>Usage data</strong> — gift search inputs such as age, gender, relationship, occasion, budget, and interests you enter into the gift finder.</li>
        <li><strong>Saved gifts</strong> — gift items you choose to save, stored locally in your browser via <code>localStorage</code>.</li>
        <li><strong>Device and browser data</strong> — standard information such as your browser type, operating system, referring URLs, and pages visited, collected automatically when you use our service.</li>
      </ul>
      <p>We do not require account registration. Giftly is designed to be used without creating a profile or submitting personal identifying information.</p>
    </Section>

    <Section title="2. How We Use Your Information">
      <p>We use the information we collect to:</p>
      <ul>
        <li>Generate personalised gift suggestions tailored to the inputs you provide</li>
        <li>Improve the accuracy and relevance of our gift recommendation engine</li>
        <li>Understand how users interact with Giftly in order to improve our product</li>
        <li>Detect and prevent fraudulent or abusive activity</li>
        <li>Comply with applicable legal obligations</li>
      </ul>
      <p>We do not sell your personal information to third parties. We do not use your data to serve targeted advertising.</p>
    </Section>

    <Section title="3. Cookies and Local Storage">
      <p>Giftly uses browser <strong>localStorage</strong> to store your saved gift items on your device. This data never leaves your browser and is not transmitted to our servers.</p>
      <p>We may also use cookies and similar technologies for analytics purposes (e.g., understanding page visits and usage patterns). You can disable cookies in your browser settings at any time, though this may affect some features of the service.</p>
    </Section>

    <Section title="4. Third-Party Services">
      <p>Our gift recommendations may include links to third-party retailers (such as Jumia, Amazon, and others). When you click a "Buy" link, you will be taken to that retailer's website. We are not responsible for the privacy practices of those third-party sites and encourage you to review their policies separately.</p>
      <p>We may use third-party analytics tools (such as Google Analytics) that collect anonymised usage data to help us understand how Giftly is used.</p>
    </Section>

    <Section title="5. Data Retention">
      <p>Because Giftly does not require account creation, we retain minimal server-side data. Gift search inputs may be retained in anonymised, aggregated form to improve our recommendation algorithms. Saved gifts data is stored only in your local browser and can be cleared at any time by clearing your browser data.</p>
    </Section>

    <Section title="6. Children's Privacy">
      <p>Giftly is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us and we will promptly delete it.</p>
    </Section>

    <Section title="7. Your Rights">
      <p>Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete information we hold about you. To exercise any of these rights, please contact us at the address below. We will respond to all requests within 30 days.</p>
    </Section>

    <Section title="8. Changes to This Policy">
      <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
    </Section>

    <Section title="9. Contact Us">
      <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
      <p className="mt-2">
        <strong>Giftly</strong><br />
        Email: <a href="mailto:privacy@giftly.app" className="text-[#E8614D] hover:underline">privacy@giftly.app</a>
      </p>
    </Section>
  </LegalPage>;
}

// ─── Terms of Use ─────────────────────────────────────────────────────────────
export function TermsOfUse() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return <LegalPage title="Terms of Use" lastUpdated={LAST_UPDATED} navigate={navigate}>
    <Section title="1. Acceptance of Terms">
      <p>By accessing or using Giftly ("the Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Service. These terms apply to all visitors, users, and others who access or use the Service.</p>
    </Section>

    <Section title="2. Description of Service">
      <p>Giftly is an AI-powered gift discovery platform that generates personalised gift suggestions based on information you provide. Gift recommendations include links to third-party retailers where items can be purchased. Giftly does not sell products directly and is not responsible for the fulfillment, quality, or delivery of any items purchased through third-party links.</p>
    </Section>

    <Section title="3. Use of the Service">
      <p>You agree to use Giftly only for lawful purposes and in a manner consistent with all applicable laws and regulations. You must not:</p>
      <ul>
        <li>Use the Service to engage in any fraudulent, deceptive, or harmful activity</li>
        <li>Attempt to scrape, reverse-engineer, or systematically extract data from the Service</li>
        <li>Interfere with or disrupt the integrity or performance of the Service</li>
        <li>Use automated tools, bots, or scripts to access the Service without our prior written consent</li>
        <li>Attempt to gain unauthorised access to any part of our systems or infrastructure</li>
      </ul>
    </Section>

    <Section title="4. Intellectual Property">
      <p>All content on Giftly — including text, graphics, logos, button icons, images, and software — is the property of Giftly or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content from the Service without our prior written permission.</p>
    </Section>

    <Section title="5. Disclaimer of Warranties">
      <p>The Service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. Gift recommendations are generated algorithmically and are not guaranteed to be suitable for your specific needs.</p>
    </Section>

    <Section title="6. Limitation of Liability">
      <p>To the fullest extent permitted by applicable law, Giftly shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising from your use of or inability to use the Service. Our total liability for any claims arising under these terms shall not exceed the amount you paid to use the Service (if any) in the twelve months preceding the claim.</p>
    </Section>

    <Section title="7. Third-Party Links">
      <p>Giftly contains links to third-party websites and retailers. These links are provided for convenience only. We have no control over the content, privacy policies, or practices of third-party sites and accept no responsibility for them. We encourage you to review the terms and privacy policies of any third-party sites you visit.</p>
    </Section>

    <Section title="8. Modifications to Terms">
      <p>We reserve the right to modify these Terms of Use at any time. Updated terms will be posted on this page with a revised "Last Updated" date. Your continued use of the Service after changes are posted constitutes your acceptance of the revised terms.</p>
    </Section>

    <Section title="9. Governing Law">
      <p>These Terms of Use are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.</p>
    </Section>

    <Section title="10. Contact">
      <p>Questions about these Terms? Contact us at <a href="mailto:legal@giftly.app" className="text-[#E8614D] hover:underline">legal@giftly.app</a>.</p>
    </Section>
  </LegalPage>;
}

// ─── Cookie Policy ────────────────────────────────────────────────────────────
export function CookiePolicy() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return <LegalPage title="Cookie Policy" lastUpdated={LAST_UPDATED} navigate={navigate}>
    <Section title="1. What Are Cookies?">
      <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you interact with them. Giftly uses cookies and similar technologies (such as localStorage) in a limited and purposeful way.</p>
    </Section>

    <Section title="2. How We Use Cookies">
      <p>We use the following types of cookies and storage:</p>
      <ul>
        <li>
          <strong>Essential localStorage</strong> — We use your browser's localStorage to save gift items you have chosen to save. This data stays entirely on your device and is never transmitted to our servers. You can clear it at any time from your browser settings.
        </li>
        <li>
          <strong>Session storage</strong> — We use sessionStorage to temporarily cache gift recommendation results during your session. This data is automatically deleted when you close your browser tab.
        </li>
        <li>
          <strong>Analytics cookies</strong> — We may use third-party analytics tools (e.g., Google Analytics) that set cookies to help us understand how users navigate Giftly — including which pages are visited and how long users spend on the site. This data is aggregated and anonymised.
        </li>
      </ul>
    </Section>

    <Section title="3. What We Do Not Use Cookies For">
      <p>We do not use cookies to:</p>
      <ul>
        <li>Track your activity across other websites</li>
        <li>Serve you targeted or behavioural advertisements</li>
        <li>Sell your data to third parties</li>
        <li>Build personal profiles linked to your identity</li>
      </ul>
    </Section>

    <Section title="4. Managing Cookies">
      <p>You can control and manage cookies in several ways:</p>
      <ul>
        <li><strong>Browser settings</strong> — All modern browsers allow you to block or delete cookies. Visit your browser's help documentation for instructions.</li>
        <li><strong>Opt-out tools</strong> — You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#E8614D] hover:underline">Google Analytics Opt-out Browser Add-on</a>.</li>
        <li><strong>localStorage</strong> — You can clear your saved gift data at any time by clearing your browser's site data in your browser settings.</li>
      </ul>
      <p>Please note that disabling certain cookies may affect the functionality of the Service.</p>
    </Section>

    <Section title="5. Changes to This Policy">
      <p>We may update this Cookie Policy from time to time. Any changes will be reflected on this page with a revised "Last Updated" date.</p>
    </Section>

    <Section title="6. Contact">
      <p>If you have questions about our use of cookies, email us at <a href="mailto:privacy@giftly.app" className="text-[#E8614D] hover:underline">privacy@giftly.app</a>.</p>
    </Section>
  </LegalPage>;
}

// ─── About Us ─────────────────────────────────────────────────────────────────
export function AboutUs() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen mt-20" style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}>
      <div className="max-w-3xl mx-auto px-5 pt-14 pb-24">
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2C1A12]/70
            px-4 py-2.5 rounded-full border border-[#2C1A12]/15 bg-white mb-10
            hover:text-[#2C1A12] hover:border-[#2C1A12]/30 hover:-translate-x-0.5 transition-all duration-200"
          style={{ boxShadow: "0 2px 8px rgba(44,26,18,.07)" }}>
          ← Back
        </button>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-2xl bg-[#B23C44] flex items-center justify-center
            text-white font-bold text-3xl mx-auto mb-6">G</div>
          <span className="inline-block text-xs font-bold tracking-[.18em] uppercase mb-4
            px-4 py-1.5 rounded-full border border-[#E8614D]/30 text-[#E8614D]"
            style={{ background: "rgba(232,97,77,.07)" }}>
            Our Story
          </span>
          <h1 className="text-[2.5rem] sm:text-[3rem] font-black text-[#2C1A12] leading-none tracking-tight mb-5"
            style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}>
            We built Giftly<br />because gifting is <em className="text-[#E8614D] not-italic">hard</em>
          </h1>
          <p className="text-base text-[#2C1A12]/60 leading-relaxed max-w-xl mx-auto">
            Every year, people spend hours searching for the perfect gift — and still end up unsure. We decided to fix that.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 mb-8 border border-[#2C1A12]/08"
          style={{ boxShadow: "0 4px 24px rgba(44,26,18,.07)" }}>
          <h2 className="text-xl font-black text-[#2C1A12] mb-4"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}>Our Mission</h2>
          <p className="text-[#2C1A12]/70 leading-relaxed mb-4">
            Giftly exists to make thoughtful gifting effortless. We believe the best gifts aren't the most expensive ones — they're the ones that show you were paying attention. Our AI-powered platform takes the stress out of gift-giving by matching the right gift to the right person, every time.
          </p>
          <p className="text-[#2C1A12]/70 leading-relaxed">
            We're a team of designers, engineers, and gift-giving enthusiasts based in Lagos, Nigeria, building tools that make the people in your life feel genuinely seen and valued.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "💡", title: "Intentionality", body: "Every feature we build is designed to help you give gifts that mean something." },
            { icon: "🤝", title: "Accessibility", body: "Great gifting shouldn't require a big budget. We serve every price range with equal care." },
            { icon: "🌍", title: "Local Roots", body: "Built for Nigeria, with deep respect for the culture of giving that defines our communities." },
          ].map(({ icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-[#2C1A12]/08"
              style={{ boxShadow: "0 3px 16px rgba(44,26,18,.05)" }}>
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-black text-[#2C1A12] mb-1"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}>{title}</h3>
              <p className="text-sm text-[#2C1A12]/60 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg,rgba(232,97,77,.07),rgba(240,168,48,.07))" }}>
          <h3 className="text-[1.3rem] font-black text-[#2C1A12] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
            Ready to find the perfect gift? 🎁
          </h3>
          <p className="text-sm text-[#2C1A12]/60 mb-6">No account needed. Free to use. Results in seconds.</p>
          
           <button
            onClick={() => navigate("/generate-gift")}
            className="px-8 py-3.5 rounded-full font-fraunce font-bold text-base text-white tracking-wide
              hover:opacity-90 cursor-pointer
              transition-all hover:scale-[1.02] duration-200"
            style={{
              background: "#C94B38",
              boxShadow: "0 6px 24px rgba(232,97,77,.32)",
            }}
          >
            Try Giftly Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export function Contact() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen mt-20" style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}>
      <div className="max-w-2xl mx-auto px-5 pt-14 pb-24">
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2C1A12]/70
            px-4 py-2.5 rounded-full border border-[#2C1A12]/15 bg-white mb-10
            hover:text-[#2C1A12] hover:border-[#2C1A12]/30 hover:-translate-x-0.5 transition-all duration-200"
          style={{ boxShadow: "0 2px 8px rgba(44,26,18,.07)" }}>
          ← Back
        </button>

        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-[.18em] uppercase mb-4
            px-4 py-1.5 rounded-full border border-[#E8614D]/30 text-[#E8614D]"
            style={{ background: "rgba(232,97,77,.07)" }}>
            Get in Touch
          </span>
          <h1 className="text-[2.5rem] sm:text-[3rem] font-black text-[#2C1A12] leading-none tracking-tight mb-4"
            style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}>
            We'd love to<br />hear from you
          </h1>
          <p className="text-base text-[#2C1A12]/60 leading-relaxed max-w-md mx-auto">
            Whether you have a question, feedback, or just want to say hello — we're here.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: "📧", title: "Email Us", value: "hello@giftly.app", sub: "We reply within 24 hours", href: "mailto:hello@giftly.app" },
            { icon: "🐛", title: "Report a Bug", value: "bugs@giftly.app", sub: "Help us improve the product", href: "mailto:bugs@giftly.app" },
            { icon: "💼", title: "Partnerships", value: "partners@giftly.app", sub: "For retailers & brand collaborations", href: "mailto:partners@giftly.app" },
            { icon: "⚖️", title: "Legal Inquiries", value: "legal@giftly.app", sub: "Privacy, terms & compliance", href: "mailto:legal@giftly.app" },
          ].map(({ icon, title, value, sub, href }) => (
            <a key={title} href={href}
              className="bg-white rounded-2xl p-5 border border-[#2C1A12]/08 group
                hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ boxShadow: "0 3px 16px rgba(44,26,18,.06)" }}>
              <div className="text-2xl mb-3">{icon}</div>
              <p className="font-black text-sm text-[#2C1A12] mb-0.5"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}>{title}</p>
              <p className="text-sm font-bold text-[#E8614D] group-hover:underline">{value}</p>
              <p className="text-xs text-[#2C1A12]/45 mt-1">{sub}</p>
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="bg-white rounded-3xl p-8 text-center border border-[#2C1A12]/08"
          style={{ boxShadow: "0 4px 24px rgba(44,26,18,.07)" }}>
          <h3 className="font-black text-[#2C1A12] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}>Follow us</h3>
          <p className="text-sm text-[#2C1A12]/55 mb-5">Stay up to date with gifting tips, trends, and product updates.</p>
          <div className="flex items-center justify-center gap-4">
            {[
              { label: "Twitter / X", href: "https://twitter.com" },
              { label: "Instagram",   href: "https://instagram.com" },
              { label: "LinkedIn",    href: "https://linkedin.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold text-[#E8614D] hover:underline">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shared layout components ─────────────────────────────────────────────────
function LegalPage({ title, lastUpdated, navigate, children }) {
  return (
    <div className="min-h-screen mt-20" style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}>
      <div className="max-w-3xl mx-auto px-5 pt-14 pb-24">
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2C1A12]/70
            px-4 py-2.5 rounded-full border border-[#2C1A12]/15 bg-white mb-10
            hover:text-[#2C1A12] hover:border-[#2C1A12]/30 hover:-translate-x-0.5 transition-all duration-200"
          style={{ boxShadow: "0 2px 8px rgba(44,26,18,.07)" }}>
          ← Back
        </button>

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block text-xs font-bold tracking-[.18em] uppercase mb-4
            px-4 py-1.5 rounded-full border border-[#E8614D]/30 text-[#E8614D]"
            style={{ background: "rgba(232,97,77,.07)" }}>
            Legal
          </span>
          <h1 className="text-[2.2rem] sm:text-[2.8rem] font-black text-[#2C1A12] leading-none tracking-tight mb-3"
            style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}>
            {title}
          </h1>
          <p className="text-sm text-[#2C1A12]/40">Last updated: {lastUpdated}</p>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#2C1A12]/08 space-y-0"
          style={{ boxShadow: "0 4px 24px rgba(44,26,18,.07)" }}>
          {children}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8 last:mb-0 pb-8 last:pb-0 border-b border-[#2C1A12]/06 last:border-0">
      <h2 className="text-[1.1rem] font-black text-[#2C1A12] mb-3"
        style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
        {title}
      </h2>
      <div className="text-[0.92rem] text-[#2C1A12]/65 leading-relaxed space-y-3 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:list-disc [&_strong]:text-[#2C1A12]/85 [&_code]:bg-[#FAF7F2] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono">
        {children}
      </div>
    </div>
  );
}