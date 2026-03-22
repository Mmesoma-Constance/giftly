import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/sneakers.webp";
import image3 from "../assets/perf.jpg";
import image4 from "../assets/head.jpg";
import image5 from "../assets/skincare.jpg";
import image6 from "../assets/jewelry.webp";
import image7 from "../assets/wine.jpg";
import image8 from "../assets/game.jpg";

const SOURCES = {
  amazon: { name: "Amazon", url: "amazon.com", icon: "🛒" },
  jumia:  { name: "Jumia",  url: "jumia.com.ng", icon: "🛍️" },
  konga:  { name: "Konga",  url: "konga.com", icon: "🏪" },
  zara:   { name: "Zara",   url: "zara.com", icon: "👗" },
  glam:   { name: "GlamHub", url: "glamhub.ng", icon: "💄" },
};

const PRODUCTS = [
  { id:1,  name:"Pearl Drop Earrings",             price:12500, oldPrice:15000, cat:"jewelry",     image:image6, source:"jumia",  badge:"top",  rating:4.8, reviews:247,  for:["girlfriend","wife","sister","mom","best-friend","friend"], gender:["female","any"], minBudget:8000,  interests:["fashion","accessories","jewellery"], occasions:["birthday","anniversary","valentine"], why:"A timeless romantic piece she'll treasure for years" },
  { id:2,  name:"Gold Layered Necklace",            price:9800,  oldPrice:null,  cat:"jewelry",     image:image6, source:"jumia",  badge:"sale", rating:4.7, reviews:183,  for:["girlfriend","wife","sister","mom","best-friend"], gender:["female","any"], minBudget:6000,  interests:["fashion","jewellery"], occasions:["birthday","valentine","anniversary"], why:"Elegant everyday wear that completes any outfit" },
  { id:3,  name:"Men's Stainless Steel Watch",      price:22000, oldPrice:28000, cat:"jewelry",     image:image1, source:"amazon", badge:null,   rating:4.9, reviews:412,  for:["boyfriend","husband","brother","dad","colleague","boss"], gender:["male","any"], minBudget:15000, interests:["fashion","tech","accessories"], occasions:["birthday","anniversary","graduation"], why:"Classic sophistication for any professional or style-conscious man" },
  { id:4,  name:"Crystal Friendship Bracelet",      price:7500,  oldPrice:null,  cat:"jewelry",     image:image6, source:"jumia",  badge:null,   rating:4.6, reviews:96,   for:["girlfriend","wife","sister","best-friend","friend"], gender:["female","any"], minBudget:5000,  interests:["fashion","accessories"], occasions:["birthday","just-because"], why:"Sparkly and sentimental — perfect for celebrating connection" },
  { id:5,  name:"Couple Locket Necklace",           price:11000, oldPrice:14000, cat:"jewelry",     image:image6, source:"amazon", badge:"top",  rating:5.0, reviews:321,  for:["girlfriend","wife","boyfriend","husband"], gender:["female","male","any"], minBudget:8000, interests:["romance","jewellery"], occasions:["anniversary","valentine"], why:"A deeply romantic keepsake for someone special" },
  { id:6,  name:"Classic White Leather Sneakers",   price:17500, oldPrice:null,  cat:"footwear",    image:image2, source:"jumia",  badge:null,   rating:4.7, reviews:538,  for:["boyfriend","girlfriend","brother","sister","friend","best-friend"], gender:["male","female","any"], minBudget:12000, interests:["fashion","sports","streetwear"], occasions:["birthday","graduation","just-because"], why:"Versatile, timeless, and loved by absolutely everyone" },
  { id:7,  name:"Suede Chelsea Boots",              price:24000, oldPrice:30000, cat:"footwear",    image:image2, source:"amazon", badge:"sale", rating:4.8, reviews:174,  for:["boyfriend","husband","dad","brother","boss"], gender:["male","any"], minBudget:18000, interests:["fashion"], occasions:["birthday","anniversary","christmas"], why:"Sharp and versatile — a wardrobe upgrade he'll wear everywhere" },
  { id:8,  name:"Strappy Heeled Sandals",           price:14000, oldPrice:null,  cat:"footwear",    image:image2, source:"zara",   badge:null,   rating:4.5, reviews:129,  for:["girlfriend","wife","sister","mom","best-friend"], gender:["female","any"], minBudget:10000, interests:["fashion"], occasions:["birthday","anniversary","valentine"], why:"Elegant evening footwear she'll wear to every occasion" },
  { id:9,  name:"Performance Running Shoes",        price:19500, oldPrice:25000, cat:"footwear",    image:image2, source:"amazon", badge:"top",  rating:4.9, reviews:621,  for:["boyfriend","girlfriend","brother","sister","friend","husband","wife"], gender:["male","female","any"], minBudget:14000, interests:["fitness","sports","gym"], occasions:["birthday","graduation","just-because"], why:"Perfect for the active person who loves a great workout" },
  { id:10, name:"Premium Leather Loafers",          price:21000, oldPrice:null,  cat:"footwear",    image:image2, source:"amazon", badge:null,   rating:4.7, reviews:208,  for:["dad","boss","colleague","husband","boyfriend"], gender:["male","any"], minBudget:15000, interests:["fashion","work"], occasions:["birthday","graduation","christmas"], why:"Smart and comfortable for the man who takes his style seriously" },
  { id:11, name:"Oversized Comfort Hoodie",         price:8500,  oldPrice:null,  cat:"clothes",     image:image1, source:"jumia",  badge:null,   rating:4.6, reviews:392,  for:["boyfriend","girlfriend","brother","sister","friend","best-friend"], gender:["male","female","any"], minBudget:6000,  interests:["fashion","comfort","streetwear"], occasions:["birthday","christmas","just-because"], why:"The gift that gets worn every single day — cozy and cool" },
  { id:12, name:"Silk Satin Robe & Nightwear Set",  price:13000, oldPrice:17000, cat:"clothes",     image:image5, source:"amazon", badge:"sale", rating:4.8, reviews:265,  for:["girlfriend","wife","mom","sister"], gender:["female","any"], minBudget:9000,  interests:["fashion","comfort","self-care"], occasions:["birthday","anniversary","valentine","christmas"], why:"A luxurious self-care treat she absolutely deserves" },
  { id:13, name:"Premium Linen Button-Up Shirt",    price:10500, oldPrice:null,  cat:"clothes",     image:image1, source:"zara",   badge:null,   rating:4.6, reviews:157,  for:["boyfriend","husband","dad","brother","boss","colleague"], gender:["male","any"], minBudget:7000,  interests:["fashion","work"], occasions:["birthday","graduation","christmas"], why:"Effortlessly stylish — perfect for any smart-casual occasion" },
  { id:14, name:"Floral Print Midi Dress",          price:11800, oldPrice:15000, cat:"clothes",     image:image1, source:"jumia",  badge:"top",  rating:4.7, reviews:304,  for:["girlfriend","wife","sister","best-friend","mom"], gender:["female","any"], minBudget:8000,  interests:["fashion"], occasions:["birthday","valentine","anniversary"], why:"Breezy and beautiful — a dress she'll want to wear immediately" },
  { id:15, name:"Streetwear Cargo Pants",           price:9200,  oldPrice:null,  cat:"clothes",     image:image1, source:"jumia",  badge:null,   rating:4.5, reviews:188,  for:["boyfriend","brother","friend","best-friend"], gender:["male","any"], minBudget:6500,  interests:["fashion","streetwear"], occasions:["birthday","just-because"], why:"On-trend, comfortable, and exactly what streetwear fans crave" },
  { id:16, name:"Wireless Noise-Cancelling Earbuds",price:25000, oldPrice:32000, cat:"electronics", image:image4, source:"amazon", badge:"top",  rating:4.9, reviews:847,  for:["boyfriend","girlfriend","brother","sister","friend","best-friend","husband","wife"], gender:["male","female","any"], minBudget:18000, interests:["music","tech","fitness"], occasions:["birthday","christmas","graduation","anniversary"], why:"Great for tech lovers and anyone who travels or works out" },
  { id:17, name:"Smart Ambient Desk Lamp",          price:12000, oldPrice:null,  cat:"electronics", image:image8, source:"amazon", badge:null,   rating:4.7, reviews:219,  for:["colleague","boss","friend","brother","sister"], gender:["male","female","any"], minBudget:8000,  interests:["tech","work","studying"], occasions:["birthday","graduation","just-because"], why:"Practical and elegant — perfect for the ambitious student or professional" },
  { id:18, name:"Portable Power Bank 20,000mAh",    price:14500, oldPrice:18000, cat:"electronics", image:image8, source:"konga",  badge:"sale", rating:4.8, reviews:563,  for:["boyfriend","girlfriend","dad","mom","friend","colleague"], gender:["male","female","any"], minBudget:10000, interests:["tech","travel"], occasions:["birthday","graduation","just-because"], why:"The gift every phone user secretly needs — practical and appreciated" },
  { id:19, name:"Compact Bluetooth Speaker",        price:19000, oldPrice:null,  cat:"electronics", image:image8, source:"amazon", badge:null,   rating:4.7, reviews:332,  for:["boyfriend","girlfriend","brother","sister","best-friend"], gender:["male","female","any"], minBudget:13000, interests:["music","tech"], occasions:["birthday","christmas","graduation"], why:"Brings music anywhere — ideal for music lovers and party-starters" },
  { id:20, name:"Gaming Controller Pro Edition",    price:28000, oldPrice:35000, cat:"electronics", image:image8, source:"amazon", badge:"top",  rating:5.0, reviews:1042, for:["boyfriend","brother","friend"], gender:["male","any"], minBudget:20000, interests:["gaming","tech"], occasions:["birthday","christmas"], why:"The ultimate gift for any gamer — they've been wanting this" },
  { id:21, name:"Digital Drawing Tablet",           price:32000, oldPrice:null,  cat:"electronics", image:image8, source:"amazon", badge:"new",  rating:4.8, reviews:178,  for:["girlfriend","sister","friend","best-friend"], gender:["female","male","any"], minBudget:25000, interests:["art","design","creativity"], occasions:["birthday","graduation","christmas"], why:"A creative dream gift for artists, designers, and visual thinkers" },
  { id:22, name:"Leather Crossbody Bag",            price:15000, oldPrice:20000, cat:"accessories", image:image1, source:"jumia",  badge:"sale", rating:4.7, reviews:287,  for:["girlfriend","wife","sister","mom","best-friend"], gender:["female","any"], minBudget:10000, interests:["fashion","accessories"], occasions:["birthday","anniversary","valentine"], why:"Stylish and functional — a daily staple she'll reach for every time" },
  { id:23, name:"Canvas Tote Bag (Minimal)",        price:5500,  oldPrice:null,  cat:"accessories", image:image1, source:"konga",  badge:null,   rating:4.4, reviews:112,  for:["friend","best-friend","colleague","sister","girlfriend"], gender:["female","any"], minBudget:4000,  interests:["fashion","sustainability"], occasions:["birthday","just-because"], why:"Trendy, eco-friendly, and surprisingly versatile for everyday use" },
  { id:24, name:"Genuine Leather Bifold Wallet",    price:8000,  oldPrice:10500, cat:"accessories", image:image1, source:"amazon", badge:null,   rating:4.6, reviews:341,  for:["boyfriend","husband","dad","brother","colleague"], gender:["male","any"], minBudget:5500,  interests:["fashion","accessories"], occasions:["birthday","anniversary","christmas"], why:"A practical upgrade for any man who still carries his old worn wallet" },
  { id:25, name:"Luxury Perfume Gift Set",          price:22000, oldPrice:null,  cat:"accessories", image:image3, source:"glam",   badge:"top",  rating:4.9, reviews:458,  for:["girlfriend","wife","mom","sister","best-friend","colleague"], gender:["female","any"], minBudget:15000, interests:["beauty","self-care","luxury"], occasions:["birthday","anniversary","valentine","christmas"], why:"Fragrance is deeply personal — this luxe set makes an unforgettable impression" },
  { id:26, name:"Signature Men's Cologne",          price:18500, oldPrice:24000, cat:"accessories", image:image3, source:"amazon", badge:null,   rating:4.8, reviews:296,  for:["boyfriend","husband","dad","brother"], gender:["male","any"], minBudget:12000, interests:["grooming","luxury"], occasions:["birthday","anniversary","christmas","valentine"], why:"A confident, long-lasting scent that makes a statement" },
  { id:27, name:"Premium UV400 Sunglasses",         price:9500,  oldPrice:null,  cat:"accessories", image:image1, source:"jumia",  badge:null,   rating:4.5, reviews:193,  for:["boyfriend","girlfriend","friend","best-friend","brother","sister"], gender:["male","female","any"], minBudget:6000,  interests:["fashion","beach","travel"], occasions:["birthday","graduation","just-because"], why:"Cool, stylish, and genuinely useful — a gift they'll wear all summer" },
  { id:28, name:"Complete Skincare Gift Set",       price:16000, oldPrice:21000, cat:"accessories", image:image5, source:"glam",   badge:"top",  rating:4.9, reviews:512,  for:["girlfriend","wife","mom","sister","best-friend"], gender:["female","any"], minBudget:11000, interests:["beauty","skincare","self-care"], occasions:["birthday","valentine","anniversary"], why:"Treat her skin and her soul — a self-care ritual she'll love you for" },
  { id:29, name:"Artisan Scented Candle Set",       price:7800,  oldPrice:null,  cat:"accessories", image:image7, source:"konga",  badge:null,   rating:4.7, reviews:234,  for:["mom","wife","girlfriend","best-friend","colleague"], gender:["female","any"], minBudget:5000,  interests:["home","self-care","wellness"], occasions:["birthday","christmas","just-because","anniversary"], why:"Creates an atmosphere — thoughtful, beautiful, and universally loved" },
  { id:30, name:"Pro Gym Bag + Water Bottle Set",   price:12000, oldPrice:15000, cat:"accessories", image:image1, source:"konga",  badge:"sale", rating:4.6, reviews:178,  for:["boyfriend","girlfriend","brother","sister","friend"], gender:["male","female","any"], minBudget:8500,  interests:["fitness","sports","gym"], occasions:["birthday","graduation","just-because"], why:"Motivates fitness goals and makes their gym routine look sharp" },
];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ── TOAST ──
function Toast({ msg, visible }) {
  return (
    <div
      className="fixed bottom-7 left-1/2 z-[9999] pointer-events-none flex items-center gap-2
        px-[22px] py-[12px] rounded-full font-bold text-[0.86rem] text-white whitespace-nowrap"
      style={{
        background: "#1C1410",
        boxShadow: "0 8px 32px rgba(28,20,16,.22)",
        maxWidth: "92vw",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(20px)",
        transition: "opacity .35s ease, transform .35s ease",
      }}
    >
      {msg}
    </div>
  );
}

// ── PRODUCT CARD ──
function ProductCard({ p, onRemove }) {
  const src  = SOURCES[p.source] || SOURCES.amazon;
  const disc = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const stars = "★".repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? "½" : "");
  const badgeStyles = {
    top:  { bg: "#F0A830", color: "#1C1410", label: "⭐ Top Pick" },
    sale: { bg: "#E8614D", color: "white",   label: "🔥 Sale"     },
    new:  { bg: "#7A9E7E", color: "white",   label: "✨ New"       },
  };
  const bd = p.badge ? badgeStyles[p.badge] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-transparent
        shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#EDE8E3]
        transition-all duration-[350ms] group flex flex-col"
    >
      <div className="relative overflow-hidden h-[190px] flex-shrink-0">
        {bd && (
          <span
            className="absolute top-3 left-3 z-10 text-[0.68rem] font-syne uppercase
              tracking-[.06em] px-[10px] py-1 rounded-full"
            style={{ background: bd.bg, color: bd.color }}
          >
            {bd.label}
          </span>
        )}
        <button
          onClick={() => onRemove(p.id)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90
            backdrop-blur-sm flex items-center justify-center text-[0.85rem]
            shadow-md border-none cursor-pointer hover:bg-[#E8614D] hover:text-white
            hover:scale-110 transition-all duration-200 font-bold text-[#1C1410]"
          title="Remove from saved"
        >
          ✕
        </button>
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-[18px] flex flex-col flex-1">
        <span className="text-[0.7rem] font-syne uppercase tracking-[.08em] text-[#E8614D] mb-[6px] block">
          {p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}
        </span>
        <div className="font-bold text-[0.95rem] text-[#1C1410] leading-[1.35] mb-2">
          {p.name}
        </div>
        <div
          className="text-[0.78rem] text-[#9C8B82] leading-[1.5] mb-[10px] px-[10px] py-[7px]
            rounded-[10px] border-l-2 border-[#F0A830] italic flex-shrink-0"
          style={{ background: "#F6F3F0" }}
        >
          "{p.why}"
        </div>
        <div className="flex items-center gap-[6px] text-[0.74rem] font-semibold text-[#9C8B82]
          mb-[10px] pt-2 border-t border-[#F6F3F0]">
          <span>{src.icon}</span>
          <span>
            Available on{" "}
            <a href={`https://${src.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C4A3F] hover:text-[#E8614D] transition-colors"
            >
              {src.name}
            </a>
          </span>
        </div>
        <div className="flex items-center gap-[5px] mb-3">
          <span className="text-[#F0A830] text-[0.8rem] tracking-[1px]">{stars}</span>
          <span className="text-[0.75rem] text-[#9C8B82]">({p.reviews.toLocaleString()} reviews)</span>
        </div>
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[#F6F3F0]">
          <div className="flex flex-col">
            <span
              className="text-[1.2rem] font-syne text-[#1C1410] leading-tight"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              ₦{p.price.toLocaleString()}
            </span>
            {p.oldPrice && (
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[0.78rem] text-[#CFC4BE] line-through">
                  ₦{p.oldPrice.toLocaleString()}
                </span>
                <span className="text-[0.68rem] font-syne text-[#7A9E7E] bg-[#7A9E7E]/10
                  px-[6px] py-[1px] rounded-full">
                  -{disc}%
                </span>
              </div>
            )}
          </div>
          <a href={`https://www.${src.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold
              text-[0.85rem] text-white no-underline flex-shrink-0
              hover:opacity-90 hover:-translate-y-[1px] transition-all duration-200"
            style={{ background: "#E8614D", boxShadow: "0 4px 14px rgba(232,97,77,.35)" }}
          >
            Buy Now
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 11L11 2M11 2H5.5M11 2V7.5" stroke="white"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── SAVED SEARCH CARD ──
function SavedSearchCard({ entry, onRerun, onDelete }) {
  const date = new Date(entry.ts).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  // NEW regex: handles both formats:
  //   "Perfect gifts for your [Rel] under ₦[Amount]"
  //   "Perfect Birthday gifts for your [Rel] under ₦[Amount]"
  //
  // Groups:
  // Split the heading into three semantic parts:
  //   prefix → "Perfect Birthday gifts for your " (everything up to the relationship)
  //   rel    → "Girlfriend"                        (highlighted in coral)
  //   amount → "₦17,500"                           (rendered as a pill)
  const forYourIdx  = entry.heading.indexOf("for your ");
  const underIdx    = entry.heading.lastIndexOf(" under ");
  const amountMatch = entry.heading.match(/(₦[\d,]+)$/);
  const parsed =
    forYourIdx !== -1 && underIdx !== -1 && underIdx > forYourIdx && amountMatch
      ? {
          prefix: entry.heading.slice(0, forYourIdx + "for your ".length),
          rel:    entry.heading.slice(forYourIdx + "for your ".length, underIdx),
          amount: amountMatch[1],
        }
      : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      onClick={() => onRerun(entry)}
      className="flex flex-col bg-white rounded-[20px] border-[1.5px] border-[#EDE8E3]
        shadow-sm cursor-pointer group overflow-hidden
        hover:-translate-y-1 hover:shadow-lg hover:border-[#E8614D]
        transition-all duration-300"
    >
      <div className="p-5">
        {/* Icon + delete row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center
              text-[1.2rem] flex-shrink-0 mt-0.5"
            style={{ background: "linear-gradient(135deg,#E8614D,#F0A830)" }}
          >
            🔍
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
            className="w-7 h-7 rounded-full bg-[#F6F3F0] flex items-center justify-center
              text-[0.72rem] text-[#9C8B82] font-bold border-none cursor-pointer flex-shrink-0
              hover:bg-[#E8614D]/10 hover:text-[#E8614D] transition-all duration-200"
            title="Remove"
          >
            ✕
          </button>
        </div>

        {/* Heading — always styled, zero regex risk */}
        <div
          className="text-[1rem] font-syne text-[#1C1410] leading-[1.4] mb-2"
          style={{ fontFamily: "'Fraunces','Georgia',serif" }}
        >
          {parsed ? (() => {
              // Split prefix into "Perfect " + occasion (if any) + "gifts for your "
              // prefix example: "Perfect Birthday gifts for your "
              const afterPerfect = parsed.prefix.slice("Perfect ".length); // "Birthday gifts for your "
              const giftsIdx = afterPerfect.indexOf("gifts for your ");
              const occasion = giftsIdx > 0 ? afterPerfect.slice(0, giftsIdx).trim() : "";
              const giftsFor = "gifts for your ";
              return (
                <>
                  {"Perfect "}
                  {/* occasion word in coral if present e.g. "Birthday" */}
                  {occasion && (
                    <span className="text-[#E8614D]">{occasion} </span>
                  )}
                  {giftsFor}
                  {/* relationship in coral */}
                  <span className="text-[#E8614D]">{parsed.rel}</span>
                  {" under "}
                  {/* amount pill */}
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-[0.82rem] font-syne
                      ml-1 align-middle"
                    style={{
                      background: "rgba(232,97,77,.1)",
                      color: "#E8614D",
                      fontFamily: "'Syne',sans-serif",
                    }}
                  >
                    {parsed.amount}
                  </span>
                </>
              );
            })() : (
            entry.heading
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F6F3F0]">
          <span className="text-[0.73rem] text-[#9C8B82] font-medium">
            🕐 Saved {date}
          </span>
          <span
            className="flex items-center gap-1 text-[0.75rem] font-bold text-[#E8614D]
              opacity-0 group-hover:opacity-100 transition-all duration-200
              translate-x-1 group-hover:translate-x-0"
          >
            Re-run
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="#E8614D"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ──
export default function SavedGifts() {
  const navigate = useNavigate();
  const toastTimer = useRef(null);

  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("giftly_saved") || "[]"); }
    catch { return []; }
  });
  const [savedSearches, setSavedSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("giftly_saved_searches") || "[]"); }
    catch { return []; }
  });
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [activeTab, setActiveTab] = useState("gifts");

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3000
    );
  }, []);

  const handleRemove = (id) => {
    setSavedIds((prev) => {
      const next = prev.filter((s) => s !== id);
      localStorage.setItem("giftly_saved", JSON.stringify(next));
      return next;
    });
    showToast("Removed from saved gifts");
  };

  const handleClearAll = () => {
    setSavedIds([]);
    localStorage.setItem("giftly_saved", "[]");
    showToast("All saved gifts cleared");
  };

  const handleDeleteSearch = (id) => {
    setSavedSearches((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem("giftly_saved_searches", JSON.stringify(next));
      return next;
    });
    showToast("Search removed");
  };

  const handleClearSearches = () => {
    setSavedSearches([]);
    localStorage.removeItem("giftly_saved_searches");
    showToast("All saved searches cleared");
  };

  const handleRerun = (entry) => {
    navigate("/result", { state: entry.formData });
  };

  const savedProducts = PRODUCTS.filter((p) => savedIds.includes(p.id));
  const hasGifts    = savedProducts.length > 0;
  const hasSearches = savedSearches.length > 0;
  const hasAnything = hasGifts || hasSearches;

  return (
    <div
      className="min-h-screen mt-20"
      style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}
    >
      <Toast msg={toast.msg} visible={toast.visible} />

      {/* ── Page header ── */}
      <div className="bg-white border-b border-[#EDE8E3]">
        <div className="max-w-[1320px] mx-auto px-5 pt-10 pb-0">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#E8614D] font-bold text-[0.85rem]
              border-none bg-transparent cursor-pointer mb-6 hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            ← Back
          </button>

          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-[0.72rem] font-syne uppercase tracking-[.14em]
                text-[#E8614D] block mb-2">
                Your Collection
              </span>
              <h1
                className="text-[clamp(2rem,4vw,3rem)] font-syne text-[#1C1410]
                  leading-tight tracking-[-0.03em] mb-2"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                Your Saved Gifts ❤️
              </h1>
              <p className="text-[0.95rem] text-[#5C4A3F]">
                All the gift ideas you've hearted — ready when you need them.
              </p>
            </div>
          </div>

          {/* Tabs */}
          {hasAnything && (
            <div className="flex gap-2 pb-0">
              {[
                { id: "gifts",    label: `❤️ Saved Gifts (${savedProducts.length})` },
                { id: "searches", label: `🔖 Saved Searches (${savedSearches.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-3 font-bold text-[0.85rem] border-none cursor-pointer
                    transition-all duration-200 rounded-t-xl"
                  style={{
                    background:   activeTab === tab.id ? "white" : "transparent",
                    color:        activeTab === tab.id ? "#E8614D" : "#9C8B82",
                    borderBottom: activeTab === tab.id ? "2px solid #E8614D" : "2px solid transparent",
                    marginBottom: activeTab === tab.id ? "-1px" : "0",
                    fontFamily:  "'Syne',sans-serif",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1320px] mx-auto px-5 py-10 pb-24">

        {/* Empty — nothing at all */}
        {!hasAnything && (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="text-[5rem] mb-6 opacity-30">😢</div>
            <h2
              className="text-[1.8rem] font-syne text-[#1C1410] mb-3"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}
            >
              Nothing saved yet
            </h2>
            <p className="text-[#5C4A3F] mb-8 max-w-sm text-[0.95rem]">
              Start exploring gift ideas and heart the ones you love — they'll all live right here.
            </p>
            <button
              onClick={() => navigate("/generate-gift")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold
                text-white text-[0.95rem] border-none cursor-pointer
                hover:opacity-90 transition-all duration-200"
              style={{
                background: "linear-gradient(135deg,#E8614D,#c94a38)",
                boxShadow:  "0 6px 24px rgba(232,97,77,.32)",
                fontFamily: "'Syne',sans-serif",
              }}
            >
              Find Gifts 🎁
            </button>
          </div>
        )}

        {/* TAB: Saved Gifts */}
        {hasAnything && activeTab === "gifts" && (
          <>
            {hasGifts ? (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-[0.88rem] text-[#9C8B82]">
                    {savedProducts.length} item{savedProducts.length !== 1 ? "s" : ""} in your collection
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="text-[0.82rem] font-bold text-[#9C8B82] border-none bg-transparent
                      cursor-pointer hover:text-[#E8614D] transition-colors"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    Clear all
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  >
                    {savedProducts.map((p) => (
                      <ProductCard key={p.id} p={p} onRemove={handleRemove} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-16">
                <div className="text-[4rem] mb-5 opacity-30">🤍</div>
                <h3
                  className="text-[1.4rem] font-syne text-[#1C1410] mb-2"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  No saved gifts yet
                </h3>
                <p className="text-[#5C4A3F] mb-6 text-[0.9rem]">
                  Heart any product while browsing results and it'll appear here.
                </p>
                <button
                  onClick={() => navigate("/generate-gift")}
                  className="px-6 py-3 rounded-full font-bold text-white text-[0.88rem]
                    border-none cursor-pointer hover:opacity-90 transition-all"
                  style={{
                    background: "linear-gradient(135deg,#E8614D,#c94a38)",
                    boxShadow: "0 6px 24px rgba(232,97,77,.28)",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  Browse Gift Ideas 🎁
                </button>
              </div>
            )}
          </>
        )}

        {/* TAB: Saved Searches */}
        {hasAnything && activeTab === "searches" && (
          <>
            {hasSearches ? (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-[0.88rem] text-[#9C8B82]">
                    {savedSearches.length} saved search{savedSearches.length !== 1 ? "es" : ""} — tap any to instantly re-run it
                  </p>
                  <button
                    onClick={handleClearSearches}
                    className="text-[0.82rem] font-bold text-[#9C8B82] border-none bg-transparent
                      cursor-pointer hover:text-[#E8614D] transition-colors"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    Clear all
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {savedSearches.map((entry) => (
                      <SavedSearchCard
                        key={entry.id}
                        entry={entry}
                        onRerun={handleRerun}
                        onDelete={handleDeleteSearch}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-16">
                <div className="text-[4rem] mb-5 opacity-30">🔖</div>
                <h3
                  className="text-[1.4rem] font-syne text-[#1C1410] mb-2"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  No saved searches yet
                </h3>
                <p className="text-[#5C4A3F] mb-6 text-[0.9rem]">
                  After generating results, click "Save This Search" to store it here for one-tap re-runs.
                </p>
                <button
                  onClick={() => navigate("/generate-gift")}
                  className="px-6 py-3 rounded-full font-bold text-white text-[0.88rem]
                    border-none cursor-pointer hover:opacity-90 transition-all"
                  style={{
                    background: "linear-gradient(135deg,#E8614D,#c94a38)",
                    boxShadow: "0 6px 24px rgba(232,97,77,.28)",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  Generate Gift Ideas 🎁
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
      `}</style>
    </div>
  );
}