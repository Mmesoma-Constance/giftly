import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const CATS = [
  ["all",         "All"],
  ["jewelry",     "💍 Jewelry"],
  ["footwear",    "👟 Footwear"],
  ["clothes",     "👗 Clothes"],
  ["electronics", "📱 Electronics"],
  ["accessories", "👜 Accessories"],
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

// ── LOADING OVERLAY (used only for initial page load) ──
function LoadingOverlay({ show, label = "Finding your perfect gifts…" }) {
  const steps = [
    { id: "ls1", label: "Analysing your preferences…", icon: "🔍" },
    { id: "ls2", label: "Matching the right gifts…",   icon: "🎯" },
    { id: "ls3", label: "Ranking by relevance…",       icon: "✨" },
    { id: "ls4", label: "Almost ready for you…",       icon: "🎁" },
  ];
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!show) { setActiveStep(-1); return; }
    setActiveStep(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setActiveStep(i < steps.length ? i : steps.length);
    }, 520);
    return () => clearInterval(iv);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9900] flex flex-col items-center justify-center"
      style={{ background: "rgba(250,247,242,.97)", backdropFilter: "blur(16px)" }}
    >
      <div
        className="text-[5rem] mb-10"
        style={{ animation: "giftBounce 1.4s ease-in-out infinite" }}
      >
        🎁
      </div>
      <p
        className="text-[1.3rem] font-syne text-[#1C1410] mb-8 text-center px-4"
        style={{ fontFamily: "'Fraunces','Georgia',serif" }}
      >
        {label}
      </p>
      <div className="flex flex-col gap-3 w-[280px]">
        {steps.map((s, i) => {
          const isActive = activeStep === i;
          const isDone   = activeStep > i;
          return (
            <div
              key={s.id}
              className="flex items-center gap-[14px] px-[18px] py-[14px] rounded-2xl bg-white text-[0.92rem] font-semibold"
              style={{
                boxShadow: "0 2px 12px rgba(28,20,16,.07)",
                opacity:   isActive || isDone ? 1 : 0.35,
                transform: isActive ? "translateX(6px)" : "translateX(0)",
                transition: "all .4s ease",
                color: isActive ? "#1C1410" : isDone ? "#7A9E7E" : "#9C8B82",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[0.85rem] flex-shrink-0"
                style={{
                  background: isDone ? "#7A9E7E" : isActive ? "#E8614D" : "#F6F3F0",
                  animation:  isActive ? "spin .8s linear infinite" : "none",
                }}
              >
                {isDone ? "✓" : s.icon}
              </div>
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes giftBounce {
          0%,100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ── SKELETON CARD — mirrors ProductCard anatomy exactly ──
function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-[#EDE8E3]
        shadow-sm flex flex-col"
    >
      {/* Image area — 190px, matches card */}
      <div className="relative h-[190px] flex-shrink-0 overflow-hidden">
        <div className="skeleton-shimmer w-full h-full" />
        {/* Badge placeholder top-left */}
        <div
          className="absolute top-3 left-3 skeleton-shimmer rounded-full"
          style={{ width: 80, height: 22 }}
        />
        {/* Heart button placeholder top-right */}
        <div
          className="absolute top-3 right-3 skeleton-shimmer rounded-full"
          style={{ width: 36, height: 36 }}
        />
      </div>

      {/* Body */}
      <div className="p-[18px] flex flex-col flex-1 gap-[10px]">
        {/* Category label — small uppercase strip */}
        <div className="skeleton-shimmer rounded-full" style={{ width: 70, height: 13 }} />

        {/* Product name — two lines */}
        <div className="flex flex-col gap-[6px]">
          <div className="skeleton-shimmer rounded-md" style={{ width: "90%", height: 16 }} />
          <div className="skeleton-shimmer rounded-md" style={{ width: "65%", height: 16 }} />
        </div>

        {/* "Why" italic quote block */}
        <div
          className="rounded-[10px] border-l-2 border-[#EDE8E3] px-[10px] py-[10px] flex flex-col gap-[6px]"
          style={{ background: "#F6F3F0" }}
        >
          <div className="skeleton-shimmer rounded-md" style={{ width: "100%", height: 12 }} />
          <div className="skeleton-shimmer rounded-md" style={{ width: "80%", height: 12 }} />
        </div>

        {/* Source row */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#F6F3F0]">
          <div className="skeleton-shimmer rounded-full" style={{ width: 16, height: 16 }} />
          <div className="skeleton-shimmer rounded-md" style={{ width: 130, height: 12 }} />
        </div>

        {/* Stars + review count */}
        <div className="flex items-center gap-2">
          <div className="skeleton-shimmer rounded-md" style={{ width: 80, height: 13 }} />
          <div className="skeleton-shimmer rounded-md" style={{ width: 70, height: 12 }} />
        </div>

        {/* Price + Buy Now row */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[#F6F3F0]">
          <div className="flex flex-col gap-[5px]">
            {/* Main price */}
            <div className="skeleton-shimmer rounded-md" style={{ width: 90, height: 22 }} />
            {/* Old price + discount badge */}
            <div className="flex items-center gap-1">
              <div className="skeleton-shimmer rounded-md" style={{ width: 60, height: 12 }} />
              <div className="skeleton-shimmer rounded-full" style={{ width: 36, height: 18 }} />
            </div>
          </div>
          {/* Buy Now button */}
          <div
            className="skeleton-shimmer rounded-full flex-shrink-0"
            style={{ width: 100, height: 40 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── SKELETON GROUP — mirrors ProductGroup structure ──
function SkeletonGroup({ count = 4 }) {
  return (
    <div className="mt-12">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="skeleton-shimmer rounded-full" style={{ width: 180, height: 24 }} />
        <div className="skeleton-shimmer rounded-full" style={{ width: 80, height: 22 }} />
        <div className="flex-1 h-px bg-[#EDE8E3]" />
      </div>
      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// ── PRODUCT CARD ──
function ProductCard({ p, saved, onFav }) {
  const src      = SOURCES[p.source] || SOURCES.amazon;
  const isSaved  = saved.includes(p.id);
  const disc     = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const stars    = "★".repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? "½" : "");
  const badgeStyles = {
    top:  { bg: "#F0A830", color: "#1C1410", label: "⭐ Top Pick" },
    sale: { bg: "#E8614D", color: "white",   label: "🔥 Sale"     },
    new:  { bg: "#7A9E7E", color: "white",   label: "✨ New"       },
  };
  const bd = p.badge ? badgeStyles[p.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-transparent
        shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#EDE8E3]
        transition-all duration-[350ms] group flex flex-col"
    >
      {/* Image */}
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
          onClick={() => onFav(p.id)}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center
            justify-center text-[1rem] shadow-md transition-all duration-200
            hover:scale-110 border-none cursor-pointer
            ${isSaved ? "bg-[#E8614D]" : "bg-white/90 backdrop-blur-sm"}`}
        >
          {isSaved ? "❤️" : "🤍"}
        </button>
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
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
          <span className="text-[0.75rem] text-[#9C8B82]">
            ({p.reviews.toLocaleString()} reviews)
          </span>
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

// ── PRODUCT GROUP ──
function ProductGroup({ title, badge, badgeBg, badgeColor, items, saved, onFav }) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-4 mb-6">
        <span
          className="font-syne text-[1.25rem] text-[#1C1410] whitespace-nowrap"
          style={{ fontFamily: "'Fraunces','Georgia',serif" }}
        >
          {title}
        </span>
        {badge && (
          <span
            className="text-[0.72rem] font-syne uppercase tracking-[.06em] px-[10px] py-1 rounded-full"
            style={{ background: badgeBg, color: badgeColor }}
          >
            {badge}
          </span>
        )}
        <div className="flex-1 h-px bg-[#EDE8E3]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} saved={saved} onFav={onFav} />
        ))}
      </div>
    </div>
  );
}

// ── FILTER HELPER ──
function filterProducts({ relationship, gender, budget, interests, occasion, excludeIds = [] }) {
  let results = PRODUCTS.filter((p) => {
    if (excludeIds.includes(p.id)) return false;
    const okB = p.price <= budget && p.minBudget <= budget;
    const okR = !relationship || p.for.includes(relationship);
    const okG =
      !gender ||
      p.gender.includes(gender) ||
      p.gender.includes("any") ||
      gender === "any";
    return okB && okR && okG;
  });

  if (interests) {
    const words = interests.split(/[\s,]+/).filter((w) => w.length > 2);
    results = results
      .map((p) => ({
        ...p,
        _s: words.reduce(
          (s, w) =>
            s +
            (p.interests.some((i) => i.includes(w) || w.includes(i)) ? 2 : 0) +
            (p.name.toLowerCase().includes(w) ? 1 : 0),
          0
        ),
      }))
      .sort((a, b) => b._s - a._s);
  }

  if (occasion) {
    results = results
      .map((p) => ({ ...p, _o: p.occasions?.includes(occasion) ? 3 : 0 }))
      .sort((a, b) => (b._o || 0) - (a._o || 0));
  }

  return results;
}

function buildGroups(prods) {
  const groups = [];
  const romantic = prods
    .filter(
      (p) =>
        p.occasions?.some((o) => ["valentine", "anniversary"].includes(o)) &&
        p.badge === "top"
    )
    .slice(0, 4);
  if (romantic.length >= 2)
    groups.push({ title: "💖 Romantic Picks", badge: "Top Rated",    badgeBg: "#F0A830", badgeColor: "#1C1410", items: romantic });

  const sorted = [...prods].sort((a, b) => a.price - b.price);
  const bf     = sorted.slice(0, Math.max(3, Math.floor(sorted.length * 0.45)));
  if (bf.length >= 2)
    groups.push({ title: "💸 Budget Friendly", badge: "Best Value",   badgeBg: "#7A9E7E", badgeColor: "white",   items: bf.slice(0, 6) });

  const trending = prods.filter((p) => p.badge === "top" || p.rating >= 4.8).slice(0, 6);
  if (trending.length >= 2)
    groups.push({ title: "🔥 Trending Gifts",  badge: "Hot Right Now", badgeBg: "#1C1410", badgeColor: "white",   items: trending });

  groups.push({ title: "✨ All Suggestions", badge: null, items: prods });
  return groups;
}

// ── MAIN COMPONENT ──
export default function GiftResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const { age, gender, relationship, occasion, budget = 0, interests = "" } = formData;

  const [catFilter,      setCatFilter]      = useState("all");
  const [saved,          setSaved]          = useState(() => {
    try { return JSON.parse(localStorage.getItem("giftly_saved") || "[]"); }
    catch { return []; }
  });
  const [results,        setResults]        = useState(() =>
    filterProducts({ relationship, gender, budget, interests, occasion })
  );
  const [seenIds,        setSeenIds]        = useState(() =>
    filterProducts({ relationship, gender, budget, interests, occasion }).map((p) => p.id)
  );
  // When the user presses Back, location.key is not "default" and formData is already
  // populated — skip the loading overlay and render results immediately.
  const isReturning = !!(formData && Object.keys(formData).length && location.key !== "default");

  const [loading,         setLoading]         = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [loadingLabel,    setLoadingLabel]    = useState("Finding your perfect gifts…");
  const [isInitialLoad,   setIsInitialLoad]   = useState(!isReturning);
  const [toast,           setToast]           = useState({ msg: "", visible: false });
  const [activeBudget,    setActiveBudget]    = useState(budget);

  const [saveState, setSaveState] = useState(() => {
    try {
      const heading = `Perfect gifts for your ${
        relationship ? cap(relationship.replace("-", " ")) : "them"
      } under ₦${Number(budget).toLocaleString()}`;
      const searches = JSON.parse(localStorage.getItem("giftly_saved_searches") || "[]");
      return searches.some((s) => s.heading === heading) ? "saved" : "idle";
    } catch {
      return "idle";
    }
  });

  const toastTimer    = useRef(null);
  const unsaveTimer   = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Only show the loading overlay on a genuine fresh arrival (not back navigation)
  useEffect(() => {
    if (isReturning) return;
    setLoading(true);
    setLoadingLabel("Finding your perfect gifts…");
    const t = setTimeout(() => {
      setLoading(false);
      setIsInitialLoad(false);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(toastTimer.current);
      clearTimeout(unsaveTimer.current);
    };
  }, []);

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3000
    );
  }, []);

  const handleFav = (id) => {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id];
      localStorage.setItem("giftly_saved", JSON.stringify(next));
      showToast(prev.includes(id) ? "Removed from saved gifts" : "❤️ Saved to your collection!");
      return next;
    });
  };

  const heading = `Perfect gifts for your ${
    relationship ? cap(relationship.replace("-", " ")) : "them"
  } under ₦${Number(activeBudget).toLocaleString()}`;

  const handleSaveSearch = () => {
    if (saveState === "idle") {
      const searches = JSON.parse(localStorage.getItem("giftly_saved_searches") || "[]");
      const entry    = { id: Date.now(), heading, formData, ts: Date.now() };
      if (!searches.some((s) => s.heading === heading)) {
        searches.unshift(entry);
        localStorage.setItem("giftly_saved_searches", JSON.stringify(searches.slice(0, 20)));
      }
      setSaveState("saved");
      showToast("🔖 Search saved!");
      return;
    }
    if (saveState === "saved") {
      setSaveState("confirming");
      clearTimeout(unsaveTimer.current);
      unsaveTimer.current = setTimeout(() => { setSaveState("saved"); }, 4000);
      return;
    }
    if (saveState === "confirming") {
      clearTimeout(unsaveTimer.current);
      const searches = JSON.parse(localStorage.getItem("giftly_saved_searches") || "[]");
      const updated  = searches.filter((s) => s.heading !== heading);
      localStorage.setItem("giftly_saved_searches", JSON.stringify(updated));
      setSaveState("idle");
      showToast("Search removed");
    }
  };

  const saveButtonConfig = {
    idle:       { label: "🔖 Save This Search", bg: "#1C1410", color: "white" },
    saved:      { label: "✅ Saved!",            bg: "#7A9E7E", color: "white" },
    confirming: { label: "❌ Unsave Search?",    bg: "#E8614D", color: "white" },
  }[saveState];

  // ── Show More Ideas — now uses skeleton instead of full-page overlay ──
  const handleShowMore = () => {
    setShowMoreLoading(true);
    setCatFilter("all");
    // New search = reset save state entirely
    setSaveState("idle");
    clearTimeout(unsaveTimer.current);

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      const budgetVariants = [
        Math.round(budget * 0.5),
        Math.round(budget * 0.6),
        Math.round(budget * 0.75),
        Math.round(budget * 1.2),
        Math.round(budget * 1.5),
      ];
      const options      = budgetVariants.filter((b) => b !== activeBudget);
      const variedBudget = options[Math.floor(Math.random() * options.length)];

      setActiveBudget(variedBudget);

      let fresh = filterProducts({
        relationship,
        gender,
        budget: variedBudget,
        interests,
        occasion,
        excludeIds: seenIds,
      });

      if (fresh.length < 3) {
        fresh = filterProducts({
          relationship,
          gender,
          budget: variedBudget,
          interests,
          occasion,
          excludeIds: [],
        });
        fresh = [...fresh].sort(() => Math.random() - 0.5);
        setSeenIds(fresh.map((p) => p.id));
        showToast("✨ Showing you a fresh mix of ideas!");
      } else {
        setSeenIds((prev) => [...prev, ...fresh.map((p) => p.id)]);
        showToast(`🎯 Found ${fresh.length} more ideas for you!`);
      }

      try {
        localStorage.setItem("giftly_last_results", JSON.stringify(fresh.map((p) => p.id)));
      } catch (_) {}

      setResults(fresh);
      setShowMoreLoading(false);
    }, 2000);
  };

  const filtered = catFilter === "all" ? results : results.filter((p) => p.cat === catFilter);
  const relLabel = relationship ? cap(relationship.replace("-", " ")) : "them";

  return (
    <div
      className="min-h-screen mt-20"
      style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}
    >
      {/* Initial page-load overlay only */}
      <LoadingOverlay show={loading} label={loadingLabel} />
      <Toast msg={toast.msg} visible={toast.visible} />

      {/* ── Results header ── */}
      <div className="bg-white px-5 pt-10 pb-0 border-b border-[#EDE8E3]">
        <div className="max-w-[1320px] mx-auto">

          <div
            className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full
              font-bold text-[0.78rem] mb-4"
            style={{ background: "rgba(232,97,77,.08)", color: "#E8614D" }}
          >
            {results.length} personalized suggestions
          </div>

          <h1
            className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-syne leading-[1.12]
              tracking-[-0.03em] text-[#1C1410] mb-[10px]"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            {heading}
          </h1>

          <p className="text-[0.95rem] text-[#5C4A3F] mb-6">
            Based on your preferences, here are thoughtful ideas for your {relLabel} 💖{" "}
            <span className="text-[#E8614D] font-semibold">
              Curated using smart recommendations ✨
            </span>
          </p>

          {/* Controls row */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-[#F6F3F0]">
            <div className="flex gap-2 overflow-x-auto flex-wrap">
              {CATS.map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setCatFilter(val)}
                  disabled={showMoreLoading}
                  className="px-[18px] py-[9px] rounded-full font-bold cursor-pointer
                    text-[0.85rem] transition-all duration-200 whitespace-nowrap border-[1.5px]
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: catFilter === val ? "#E8614D" : "#EDE8E3",
                    background:  catFilter === val ? "#E8614D" : "transparent",
                    color:       catFilter === val ? "white"   : "#5C4A3F",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Show More Ideas */}
              <button
                onClick={handleShowMore}
                disabled={showMoreLoading || loading}
                className="flex items-center gap-2 px-[18px] py-[9px] rounded-full font-bold
                  text-[0.82rem] border-none cursor-pointer transition-all duration-200
                  text-[#1C1410] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: (showMoreLoading || loading)
                    ? "#EDE8E3"
                    : "linear-gradient(135deg,#F0A830,#f5c060)",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                {showMoreLoading ? (
                  <>
                    <span
                      className="w-3.5 h-3.5 rounded-full border-2 border-[#1C1410]/30
                        border-t-[#1C1410] inline-block"
                      style={{ animation: "spin .7s linear infinite" }}
                    />
                    Finding more…
                  </>
                ) : (
                  "✨ Show More Ideas"
                )}
              </button>

              {/* Save / Unsave Search */}
              <button
                onClick={handleSaveSearch}
                className="px-[18px] py-[9px] rounded-full font-bold text-[0.82rem]
                  border-none cursor-pointer transition-all duration-200"
                style={{
                  background: saveButtonConfig.bg,
                  color:      saveButtonConfig.color,
                  fontFamily: "'Syne',sans-serif",
                  animation: saveState === "confirming"
                    ? "savePulse 1s ease-in-out infinite"
                    : "none",
                }}
              >
                {saveButtonConfig.label}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results body ── */}
      <div className="max-w-[1320px] mx-auto px-5 pb-20">

        {/* ── SKELETON STATE — shown while Show More is loading ── */}
        {showMoreLoading && (
          <AnimatePresence>
            <motion.div
              key="skeleton-groups"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <SkeletonGroup count={4} />
              <SkeletonGroup count={4} />
              <SkeletonGroup count={4} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── REAL RESULTS — fades in when skeleton is done ── */}
        {!showMoreLoading && (
          <>
            {!isInitialLoad && !filtered.length ? (
              <div className="text-center py-20">
                <span className="text-[4.5rem] block mb-6">😅</span>
                <h3
                  className="text-[1.6rem] font-syne text-[#1C1410] mb-3"
                  style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                >
                  No perfect match found
                </h3>
                <p className="text-[#5C4A3F] mb-8">
                  Try increasing your budget or adjusting your filters.
                </p>
                <button
                  onClick={() => navigate("/generate-gift")}
                  className="px-7 py-3.5 rounded-full font-bold text-white text-[0.95rem]
                    border-none cursor-pointer hover:opacity-90 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg,#E8614D,#c94a38)",
                    boxShadow:  "0 6px 24px rgba(232,97,77,.32)",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  Refine Search 🎁
                </button>
              </div>
            ) : !isInitialLoad && catFilter !== "all" ? (
              <ProductGroup
                title={`${CATS.find((c) => c[0] === catFilter)?.[1] || ""} Gifts`}
                items={filtered}
                saved={saved}
                onFav={handleFav}
              />
            ) : !isInitialLoad ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={results.map(r => r.id).join("-")}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {buildGroups(filtered).map((g) => (
                    <ProductGroup
                      key={g.title}
                      title={g.title}
                      badge={g.badge}
                      badgeBg={g.badgeBg}
                      badgeColor={g.badgeColor}
                      items={g.items}
                      saved={saved}
                      onFav={handleFav}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : null}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes giftBounce {
          0%,100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes savePulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(0.97); }
        }

        /* ── Skeleton shimmer ──────────────────────────────────── */
        @keyframes skeletonShimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            #EDE8E3 0%,
            #F6F3F0 40%,
            #EDE8E3 80%
          );
          background-size: 600px 100%;
          animation: skeletonShimmer 1.6s ease-in-out infinite;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}