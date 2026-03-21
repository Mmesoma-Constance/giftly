import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";

const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Testimonial", href: "#testimonials" },
  { label: "Trending",    href: "#trending" },
  { label: "Blog",        href: "#blog" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep saved count badge in sync with localStorage
  useEffect(() => {
    const sync = () => {
      try {
        const ids = JSON.parse(localStorage.getItem("giftly_saved") || "[]");
        setSavedCount(ids.length);
      } catch { setSavedCount(0); }
    };
    sync();
    window.addEventListener("storage", sync);
    // Poll every second for same-tab updates
    const iv = setInterval(sync, 1000);
    return () => { window.removeEventListener("storage", sync); clearInterval(iv); };
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-6 md:px-20 transition-all duration-300 ${
          scrolled
            ? "h-[68px] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "h-[72px] bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9 rounded-xl bg-[#B23C44] flex items-center justify-center
            text-white font-bold text-base md:text-2xl transition-transform duration-200
            group-hover:-rotate-6 group-hover:scale-105">
            G
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">Giftly</span>
        </a>

        {/* Nav Links — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              
              <a  href={href}
                className="text-[15px] text-gray-500 hover:text-gray-900 hover:bg-gray-100
                  px-4 py-2 rounded-lg transition-all duration-150"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">

          {/* Saved button with live badge */}
          <Link
            to="/saved-gifts"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full
              text-[#C94B38] border border-[#C94B38] font-semibold hover:opacity-90
              transition-all hover:scale-[1.02] relative text-[0.88rem]"
          >
            <Heart className="w-4 h-4" />
            Saved
            {savedCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white
                  text-[0.65rem] font-syne flex items-center justify-center"
                style={{ background: "#E8614D" }}
              >
                {savedCount > 9 ? "9+" : savedCount}
              </span>
            )}
          </Link>

          {/* Find a Gift CTA */}
          <Link
            to="/generate-gift"
            className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full
              text-white bg-[#C94B38] font-semibold hover:opacity-90 transition-all
              hover:scale-[1.02] text-[0.88rem]"
          >
            Find A Gift
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300
              origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}/>
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : ""}`}/>
            <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300
              origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}/>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[68px] left-0 right-0 z-40 bg-white/95
          backdrop-blur-md border-b border-gray-100 shadow-lg px-6 pt-3 pb-5
          flex flex-col gap-1 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          
            <a key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50
              px-3 py-2.5 rounded-lg transition-all duration-150"
          >
            {label}
          </a>
        ))}

        <Link
          to="/saved-gifts"
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full
            text-[#C94B38] border border-[#C94B38] font-semibold mt-2 text-[0.88rem]"
        >
          <Heart className="w-4 h-4" />
          Saved Gifts
          {savedCount > 0 && (
            <span
              className="ml-auto text-[0.72rem] font-syne px-2 py-0.5 rounded-full text-white"
              style={{ background: "#E8614D" }}
            >
              {savedCount}
            </span>
          )}
        </Link>

        <Link
          to="/generate-gift"
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full
            text-white bg-[#C94B38] font-semibold hover:opacity-90 transition-all text-[0.88rem]"
        >
          Find A Gift
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}