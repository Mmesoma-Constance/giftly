import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Testimonial", href: "#testimonials" },
  { label: "Trending", href: "#trending" },
  { label: "Blog", href: "#blog" },
//   { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 transition-all duration-300 ${
          scrolled
            ? "h-22 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "h-22.5 bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group select-none">
          <div className="w-9 h-9 rounded-xl bg-[#B23C44] flex items-center justify-center text-white
           font-bold text-base md:text-2xl transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
            G
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Giftly
          </span>
        </a>

        {/* Nav Links — desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-[15px] text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-all duration-150"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          
        <Link
                to="/generate-gift"
                className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full 
                text-white bg-[#C94B38] font-semibold hover:opacity-90 transition-all hover:shadow-glow hover:scale-[1.02]"
              >
                Find A Gift
                <ArrowRight className="w-4 h-4" />
              </Link>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col gap-1.25 p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg px-6 pt-3 pb-5 flex flex-col gap-1 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2.5 rounded-lg transition-all duration-150"
          >
            {label}
          </a>
        ))}
        <Link
                to="/generator"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full 
                text-white bg-[#C94B38] font-semibold hover:opacity-90 transition-all hover:shadow-glow hover:scale-[1.02]"
              >
                Find A Gift
                <ArrowRight className="w-4 h-4" />
              </Link>
      </div>
    </>
  );
}