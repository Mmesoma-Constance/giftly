import { useNavigate, useLocation } from "react-router-dom";

const NAV_HEIGHT = 72;

export default function Footer() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === "/";

  function scrollToSection(id) {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 12;
      window.scrollTo({ top, behavior: "smooth" });
    };
    if (isHome) {
      doScroll();
    } else {
      navigate("/");
      setTimeout(doScroll, 120);
    }
  }

  const productLinks = [
    { label: "Gift Finder",    action: () => navigate("/generate-gift") },
    { label: "Collections",   action: () => scrollToSection("collections") },
    { label: "Trending Gifts", action: () => scrollToSection("trending") },
    { label: "Saved Gifts",   action: () => navigate("/saved-gifts") },
  ];

  const companyLinks = [
    { label: "About Us", action: () => navigate("/about") },
    { label: "Blog",     action: () => navigate("/blog") },
    { label: "Contact",  action: () => navigate("/contact") },
  ];

  const legalLinks = [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use",   to: "/terms" },
    { label: "Cookie Policy",  to: "/cookies" },
  ];

  return (
    <footer className="bg-[#180806] md:px-10">
      <div className="max-w-site mx-auto px-5 md:px-[72px] pt-16 pb-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 lg:gap-12 pb-12 border-b border-white/[0.07]">

          {/* Brand */}
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
                else { navigate("/"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 80); }
              }}
              className="flex items-center gap-2.5 group select-none mb-5"
            >
              <div className="w-9 h-9 rounded-xl bg-[#B23C44] flex items-center justify-center
                text-white font-bold text-base md:text-2xl transition-transform duration-200
                group-hover:-rotate-6 group-hover:scale-105">
                G
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Giftly</span>
            </a>
            <p className="text-[.86rem] text-white/42 leading-[1.75] mb-6">
              AI-powered gift discovery that helps you find thoughtful, personalized gifts for anyone - in seconds. No stress, no guesswork.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[.8rem] font-extrabold tracking-[.1em] uppercase text-white/50 mb-[18px]">Product</h4>
            <ul className="list-none">
              {productLinks.map(({ label, action }) => (
                <li key={label} className="mb-[10px]">
                  <button
                    onClick={action}
                    className="text-[.85rem] text-white/42 no-underline cursor-pointer hover:text-white transition-colors bg-transparent border-none p-0 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[.8rem] font-extrabold tracking-[.1em] uppercase text-white/50 mb-[18px]">Company</h4>
            <ul className="list-none">
              {companyLinks.map(({ label, action }) => (
                <li key={label} className="mb-[10px]">
                  <button
                    onClick={action}
                    className="text-[.85rem] text-white/42 no-underline cursor-pointer hover:text-white transition-colors bg-transparent border-none p-0 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[.8rem] font-extrabold tracking-[.1em] uppercase text-white/50 mb-[18px]">Legal</h4>
            <ul className="list-none">
              {legalLinks.map(({ label, to }) => (
                <li key={label} className="mb-[10px]">
                  <button
                    onClick={() => navigate(to)}
                    className="text-[.85rem] text-white/42 no-underline cursor-pointer hover:text-white transition-colors bg-transparent border-none p-0 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-7 text-center justify-between items-center gap-3 flex-wrap">
          <p className="text-[.78rem] text-white/25">© 2026 Giftly · All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}