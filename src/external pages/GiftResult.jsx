import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { searchGifts } from "../searchGifts";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const OCCASION_LABELS = {
  birthday:       "Birthday",
  anniversary:    "Anniversary",
  valentine:      "Valentine's",
  christmas:      "Christmas",
  graduation:     "Graduation",
  wedding:        "Wedding",
  "just-because": "Just Because",
};
const fmtOccasion = (o) => OCCASION_LABELS[o] || cap(o.replace("-", " "));

const CATS = [
  ["all",         "All"],
  ["jewelry",     "💍 Jewelry"],
  ["footwear",    "👟 Footwear"],
  ["clothes",     "👗 Clothes"],
  ["electronics", "📱 Electronics"],
  ["accessories", "👜 Accessories"],
];

function ImagePlaceholder({ name }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#EDE8E3]">
      <span style={{ fontSize: 48 }}>🎁</span>
      <span className="text-[0.7rem] text-[#9C8B82] mt-2 px-3 text-center font-semibold line-clamp-2">
        {name}
      </span>
    </div>
  );
}

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
        transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
        transition: "opacity .35s ease, transform .35s ease",
      }}
    >
      {msg}
    </div>
  );
}

const LOAD_PHRASES = [
  "Reading between the lines…",
  "Finding something they'll love…",
  "Almost ready for you…",
];

function GiftLoadingOverlay({ show }) {
  const [visible,    setVisible]    = useState(show);
  const [bgIn,       setBgIn]       = useState(false);
  const [lineDrawn,  setLineDrawn]  = useState(false);
  const [dotVisible, setDotVisible] = useState(false);
  const [phraseIdx,  setPhraseIdx]  = useState(0);
  const [wordIdx,    setWordIdx]    = useState(0);
  const [barWidth,   setBarWidth]   = useState(0);

  useEffect(() => {
    if (!show) {
      setVisible(false); setBgIn(false); setLineDrawn(false);
      setDotVisible(false); setPhraseIdx(0); setWordIdx(0); setBarWidth(0);
      return;
    }
    setVisible(true);
    const t1 = setTimeout(() => setBgIn(true), 30);
    const t2 = setTimeout(() => setLineDrawn(true), 400);
    const t3 = setTimeout(() => setDotVisible(true), 900);
    let p = 0;
    const phraseTimer = setInterval(() => {
      p = (p + 1) % LOAD_PHRASES.length;
      setPhraseIdx(p); setWordIdx(0);
    }, 1800);
    let w = 0;
    const barTimer = setInterval(() => {
      w = Math.min(w + 1.2 + Math.random() * 0.8, 90);
      setBarWidth(w);
    }, 80);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearInterval(phraseTimer); clearInterval(barTimer);
    };
  }, [show]);

  const phrase = LOAD_PHRASES[phraseIdx];
  const words  = phrase.split(" ");

  useEffect(() => {
    if (!visible) return;
    setWordIdx(0);
    let w = 0;
    const iv = setInterval(() => {
      w++; setWordIdx(w);
      if (w >= words.length) clearInterval(iv);
    }, 110);
    return () => clearInterval(iv);
  }, [phraseIdx, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9950] flex flex-col items-center justify-center"
      style={{
        background: bgIn ? "linear-gradient(135deg,rgba(232,97,77,.05),rgba(240,168,48,.05)),#FAF7F2" : "rgba(250,247,242,0)",
        transition: "background 0.5s ease",
      }}>
      <div style={{ position:"relative", width:72, height:72, marginBottom:36 }}>
        <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:72, height:72 }}>
          <rect x="10" y="32" width="52" height="34" rx="4" stroke="#E8614D" strokeWidth="2.2" fill="none"
            strokeDasharray="172" strokeDashoffset="172"
            style={{ transition: lineDrawn?"stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)":"none", strokeDashoffset: lineDrawn?0:172 }}/>
          <rect x="6" y="22" width="60" height="12" rx="3" stroke="#F0A830" strokeWidth="2.2" fill="none"
            strokeDasharray="148" strokeDashoffset="148"
            style={{ transition: lineDrawn?"stroke-dashoffset 0.7s 0.2s cubic-bezier(.4,0,.2,1)":"none", strokeDashoffset: lineDrawn?0:148 }}/>
          <line x1="36" y1="22" x2="36" y2="66" stroke="#F0A830" strokeWidth="2.2" strokeLinecap="round"
            strokeDasharray="44" strokeDashoffset="44"
            style={{ transition: lineDrawn?"stroke-dashoffset 0.4s 0.6s ease":"none", strokeDashoffset: lineDrawn?0:44 }}/>
          <line x1="10" y1="44" x2="62" y2="44" stroke="#F0A830" strokeWidth="2.2" strokeLinecap="round"
            strokeDasharray="52" strokeDashoffset="52"
            style={{ transition: lineDrawn?"stroke-dashoffset 0.4s 0.65s ease":"none", strokeDashoffset: lineDrawn?0:52 }}/>
          <path d="M36 22 C28 14 14 14 18 22" stroke="#E8614D" strokeWidth="2.2" fill="none" strokeLinecap="round"
            strokeDasharray="32" strokeDashoffset="32"
            style={{ transition: lineDrawn?"stroke-dashoffset 0.45s 0.8s ease":"none", strokeDashoffset: lineDrawn?0:32 }}/>
          <path d="M36 22 C44 14 58 14 54 22" stroke="#E8614D" strokeWidth="2.2" fill="none" strokeLinecap="round"
            strokeDasharray="32" strokeDashoffset="32"
            style={{ transition: lineDrawn?"stroke-dashoffset 0.45s 0.85s ease":"none", strokeDashoffset: lineDrawn?0:32 }}/>
          <circle cx="36" cy="22" r="3.5" fill={dotVisible?"#F0A830":"transparent"} style={{ transition:"fill 0.3s ease" }}/>
        </svg>
      </div>
      <div style={{ minHeight:36, display:"flex", alignItems:"center", justifyContent:"center", gap:6, flexWrap:"wrap", marginBottom:32, padding:"0 24px", textAlign:"center" }}>
        {words.map((word,i) => (
          <span key={phraseIdx+"-"+i} style={{
            fontFamily:"'Fraunces','Georgia',serif", fontSize:"clamp(1.1rem,3vw,1.4rem)", fontWeight:700,
            color: i===words.length-1?"#E8614D":"#1C1410", letterSpacing:"-0.01em",
            opacity: i<wordIdx?1:0, transform: i<wordIdx?"translateY(0)":"translateY(8px)",
            transition:"opacity 0.25s ease,transform 0.25s ease", display:"inline-block",
          }}>{word}</span>
        ))}
      </div>
      <div style={{ width:"min(260px,70vw)", height:2, background:"rgba(28,20,16,0.10)", borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${barWidth}%`, borderRadius:99, background:"linear-gradient(90deg,#E8614D,#F0A830)", transition:"width 0.12s linear", boxShadow:"0 0 8px rgba(240,168,48,0.5)" }}/>
      </div>
      <p style={{ marginTop:28, fontSize:"0.65rem", color:"rgba(28,20,16,0.25)", letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'Syne',sans-serif", fontWeight:700 }}>
        Giftly ✦
      </p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-[#EDE8E3] shadow-sm flex flex-col">
      <div className="relative h-[190px] flex-shrink-0 overflow-hidden">
        <div className="skeleton-shimmer w-full h-full"/>
        <div className="absolute top-3 right-3 skeleton-shimmer rounded-full" style={{ width:36, height:36 }}/>
      </div>
      <div className="p-[18px] flex flex-col flex-1 gap-[10px]">
        <div className="flex flex-col gap-[6px]">
          <div className="skeleton-shimmer rounded-md" style={{ width:"90%", height:16 }}/>
          <div className="skeleton-shimmer rounded-md" style={{ width:"65%", height:16 }}/>
        </div>
        <div className="flex items-center gap-2 py-2 border-y border-[#F6F3F0]">
          <div className="skeleton-shimmer rounded-full" style={{ width:16, height:16 }}/>
          <div className="skeleton-shimmer rounded-md" style={{ width:150, height:13 }}/>
        </div>
        <div className="flex items-center gap-2">
          <div className="skeleton-shimmer rounded-md" style={{ width:80, height:13 }}/>
          <div className="skeleton-shimmer rounded-md" style={{ width:70, height:12 }}/>
        </div>
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[#F6F3F0]">
          <div className="skeleton-shimmer rounded-md" style={{ width:70, height:22 }}/>
          <div className="skeleton-shimmer rounded-full flex-shrink-0" style={{ width:100, height:40 }}/>
        </div>
      </div>
    </div>
  );
}

function SkeletonGroup({ count=4 }) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="skeleton-shimmer rounded-full" style={{ width:180, height:24 }}/>
        <div className="skeleton-shimmer rounded-full" style={{ width:80, height:22 }}/>
        <div className="flex-1 h-px bg-[#EDE8E3]"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length:count }).map((_,i) => <SkeletonCard key={i}/>)}
      </div>
    </div>
  );
}

function getSourceIcon(source) {
  const s = (source||"").toLowerCase();
  if (s.includes("amazon"))    return "🛒";
  if (s.includes("jumia"))     return "🛍️";
  if (s.includes("konga"))     return "🏪";
  if (s.includes("zara"))      return "👗";
  if (s.includes("sephora"))   return "💄";
  if (s.includes("target"))    return "🎯";
  if (s.includes("walmart"))   return "🏬";
  if (s.includes("ulta"))      return "💅";
  if (s.includes("macy"))      return "🛍️";
  if (s.includes("etsy"))      return "🎨";
  if (s.includes("nordstrom")) return "👜";
  if (s.includes("best buy"))  return "📱";
  if (s.includes("uncommon"))  return "✨";
  if (s.includes("ebay"))      return "🏷️";
  if (s.includes("wayfair"))   return "🏠";
  if (s.includes("shein"))     return "👘";
  if (s.includes("asos"))      return "🧥";
  return "🛒";
}

// ── PRODUCT CARD ──
function ProductCard({ p, saved, onFav }) {
  const [imgError, setImgError] = useState(false);

  const sourceName  = p.source || "Store";
  const sourceIcon  = getSourceIcon(sourceName);
  const isSaved     = saved.includes(p.id);
  const ratingNum   = parseFloat(p.rating) || 4;
  const stars       = "★".repeat(Math.floor(ratingNum)) + (ratingNum % 1 >= 0.5 ? "½" : "");
  const reviewCount = typeof p.reviews === "number" ? p.reviews.toLocaleString() : p.reviews || "0";
  const displayPrice = p.price || "See price";

  // ✅ FIX: use the real product URL — must be a full http link
  const productUrl = p.buyUrl && p.buyUrl.startsWith("http") ? p.buyUrl : null;

  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-transparent
        shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#EDE8E3]
        transition-all duration-[350ms] group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-[190px] flex-shrink-0 bg-[#F6F3F0]">

        {/* ❤️ Save — no store badge on image anymore */}
        <button
          onClick={() => onFav(p.id)}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center
            justify-center text-[1rem] shadow-md transition-all duration-200
            hover:scale-110 border-none cursor-pointer
            ${isSaved ? "bg-[#E8614D]" : "bg-white/90 backdrop-blur-sm"}`}
        >
          {isSaved ? "❤️" : "🤍"}
        </button>

        {/* Clicking image → real product page */}
        {productUrl ? (
          <a href={productUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full" tabIndex={-1}>
            {imgError || !p.image ? <ImagePlaceholder name={p.name}/> : (
              <img src={p.image} alt={p.name} referrerPolicy="no-referrer" onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"/>
            )}
          </a>
        ) : (
          imgError || !p.image ? <ImagePlaceholder name={p.name}/> : (
            <img src={p.image} alt={p.name} referrerPolicy="no-referrer" onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
          )
        )}
      </div>

      {/* Body */}
      <div className="p-[18px] flex flex-col flex-1">

        {/* Product name — clicks to real product */}
        {productUrl ? (
          <a href={productUrl} target="_blank" rel="noopener noreferrer" className="no-underline group/title mb-2">
            <div className="font-bold text-[0.95rem] text-[#1C1410] leading-[1.35] line-clamp-2
              group-hover/title:text-[#E8614D] transition-colors cursor-pointer">
              {p.name}
            </div>
          </a>
        ) : (
          <div className="font-bold text-[0.95rem] text-[#1C1410] leading-[1.35] line-clamp-2 mb-2">
            {p.name}
          </div>
        )}

        {/* ✅ "Available on [Store]" — store name is clickable */}
        <div className="flex items-center gap-[6px] text-[0.74rem] font-semibold
          text-[#9C8B82] py-[8px] mb-1 border-y border-[#F6F3F0]">
          <span>{sourceIcon}</span>
          <span>
            Available on{" "}
            {productUrl ? (
              <a href={productUrl} target="_blank" rel="noopener noreferrer"
                className="text-[#E8614D] hover:underline font-bold transition-colors">
                {sourceName}
              </a>
            ) : (
              <span className="text-[#E8614D] font-bold">{sourceName}</span>
            )}
          </span>
        </div>

        {/* Delivery */}
        {p.delivery && (
          <div className="text-[0.72rem] font-semibold text-[#7A9E7E] mt-1 mb-1">
            🚚 {p.delivery}
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-[5px] mt-2 mb-3">
          <span className="text-[#F0A830] text-[0.8rem] tracking-[1px]">{stars}</span>
          <span className="text-[0.75rem] text-[#9C8B82]">({reviewCount} reviews)</span>
        </div>

        {/* Price + Buy Now */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[#F6F3F0]">
          <span className="text-[1.25rem] text-[#1C1410] leading-tight font-bold"
            style={{ fontFamily:"'Fraunces','Georgia',serif" }}>
            {displayPrice}
          </span>

          {/* ✅ Plain "Buy Now" — no store name on button */}
          {productUrl ? (
            <a href={productUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold
                text-[0.85rem] text-white no-underline flex-shrink-0
                hover:opacity-90 hover:-translate-y-[1px] transition-all duration-200"
              style={{ background:"#E8614D", boxShadow:"0 4px 14px rgba(232,97,77,.35)" }}>
              Buy Now
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M2 11L11 2M11 2H5.5M11 2V7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <span className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold
              text-[0.85rem] text-white flex-shrink-0 opacity-50 cursor-not-allowed"
              style={{ background:"#9C8B82" }}>
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProductGroup({ title, badge, badgeBg, badgeColor, items, saved, onFav }) {
  return (
    <div className="mt-12">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-syne text-[1.25rem] text-[#1C1410] whitespace-nowrap"
          style={{ fontFamily:"'Fraunces','Georgia',serif" }}>
          {title}
        </span>
        {badge && (
          <span className="text-[0.72rem] font-syne uppercase tracking-[.06em] px-[10px] py-1 rounded-full"
            style={{ background:badgeBg, color:badgeColor }}>
            {badge}
          </span>
        )}
        <div className="flex-1 h-px bg-[#EDE8E3]"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((p) => <ProductCard key={p.id} p={p} saved={saved} onFav={onFav}/>)}
      </div>
    </div>
  );
}

function buildGroups(prods) {
  const groups = [];
  const topRated = prods.filter((p) => (parseFloat(p.rating)||0) >= 4.8).slice(0,4);
  if (topRated.length >= 2)
    groups.push({ title:"⭐ Top Rated", badge:"Highly Reviewed", badgeBg:"#F0A830", badgeColor:"#1C1410", items:topRated });
  const freeShip = prods.filter((p) => p.delivery && p.delivery.toLowerCase().includes("free")).slice(0,4);
  if (freeShip.length >= 2)
    groups.push({ title:"🚚 Free Delivery", badge:"Ships Free", badgeBg:"#7A9E7E", badgeColor:"white", items:freeShip });
  groups.push({ title:"✨ All Suggestions", badge:null, items:prods });
  return groups;
}

export default function GiftResult() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const formData  = location.state || {};
  const { age, gender, relationship, occasion, budget = 0, interests = "" } = formData;

  const [catFilter,       setCatFilter]       = useState("all");
  const [saved,           setSaved]           = useState(() => {
    try { return JSON.parse(localStorage.getItem("giftly_saved")||"[]"); } catch { return []; }
  });
  const [results,         setResults]         = useState([]);
  const [seenIds,         setSeenIds]         = useState([]);
  const isReturning = sessionStorage.getItem("giftly_result_visited") === "true";
  const [loading,         setLoading]         = useState(!isReturning);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [isInitialLoad,   setIsInitialLoad]   = useState(!isReturning);
  const [toast,           setToast]           = useState({ msg:"", visible:false });
  const [apiError,        setApiError]        = useState(false);

  const [saveState, setSaveState] = useState(() => {
    try {
      const occasionLabel = occasion ? fmtOccasion(occasion)+" " : "";
      const heading = `Perfect ${occasionLabel}gifts for your ${relationship ? cap(relationship.replace("-"," ")) : "them"} under $${Number(budget).toLocaleString()}`;
      const searches = JSON.parse(localStorage.getItem("giftly_saved_searches")||"[]");
      return searches.some((s) => s.heading === heading) ? "saved" : "idle";
    } catch { return "idle"; }
  });

  const toastTimer  = useRef(null);
  const unsaveTimer = useRef(null);

  useEffect(() => { window.scrollTo({ top:0, behavior:"instant" }); }, []);

  useEffect(() => {
    if (isReturning) return;
    sessionStorage.setItem("giftly_result_visited","true");
    setLoading(true);
    setApiError(false);

    searchGifts({ age, gender, relationship, occasion, budget, interests })
      .then((products) => {
        // ✅ Filter out products with no real URL and filter by price if possible
        const valid = products.filter((p) => p.buyUrl && p.buyUrl.startsWith("http"));
        setResults(valid);
        setSeenIds(valid.map((p) => p.id));
      })
      .catch((err) => {
        console.error("searchGifts error:", err);
        setApiError(true);
        setResults([]);
      })
      .finally(() => {
        setLoading(false);
        setIsInitialLoad(false);
      });
  }, []);

  useEffect(() => {
    return () => { clearTimeout(toastTimer.current); clearTimeout(unsaveTimer.current); };
  }, []);

  const showToast = useCallback((msg) => {
    setToast({ msg, visible:true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible:false })), 3000);
  }, []);

  const handleFav = (id) => {
    setSaved((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s!==id) : [...prev,id];
      localStorage.setItem("giftly_saved", JSON.stringify(next));
      showToast(prev.includes(id) ? "Removed from saved gifts" : "❤️ Saved to your collection!");
      return next;
    });
  };

  const occasionLabel = occasion ? fmtOccasion(occasion)+" " : "";
  // ✅ Budget shown in heading
  const heading = `Perfect ${occasionLabel}gifts for your ${
    relationship ? cap(relationship.replace("-"," ")) : "them"
  } under $${Number(budget).toLocaleString()}`;

  const handleSaveSearch = () => {
    if (saveState === "idle") {
      const searches = JSON.parse(localStorage.getItem("giftly_saved_searches")||"[]");
      const entry = { id:Date.now(), heading, formData, ts:Date.now() };
      if (!searches.some((s) => s.heading===heading)) {
        searches.unshift(entry);
        localStorage.setItem("giftly_saved_searches", JSON.stringify(searches.slice(0,20)));
      }
      setSaveState("saved"); showToast("🔖 Search saved!"); return;
    }
    if (saveState === "saved") {
      setSaveState("confirming"); clearTimeout(unsaveTimer.current);
      unsaveTimer.current = setTimeout(() => setSaveState("saved"), 4000); return;
    }
    if (saveState === "confirming") {
      clearTimeout(unsaveTimer.current);
      const searches = JSON.parse(localStorage.getItem("giftly_saved_searches")||"[]");
      localStorage.setItem("giftly_saved_searches", JSON.stringify(searches.filter((s) => s.heading!==heading)));
      setSaveState("idle"); showToast("Search removed");
    }
  };

  const saveButtonConfig = {
    idle:       { label:"🔖 Save This Search", bg:"#1C1410", color:"white" },
    saved:      { label:"✅ Saved!",            bg:"#7A9E7E", color:"white" },
    confirming: { label:"❌ Unsave Search?",    bg:"#E8614D", color:"white" },
  }[saveState];

  const handleShowMore = async () => {
    setShowMoreLoading(true); setCatFilter("all"); setSaveState("idle");
    clearTimeout(unsaveTimer.current);
    window.scrollTo({ top:0, behavior:"smooth" });
    try {
      const fresh   = await searchGifts({ age, gender, relationship, occasion, budget, interests });
      const valid   = fresh.filter((p) => p.buyUrl && p.buyUrl.startsWith("http"));
      const newOnes = valid.filter((p) => !seenIds.includes(p.id));
      const toShow  = newOnes.length >= 3 ? newOnes : valid;
      setSeenIds((prev) => [...prev, ...toShow.map((p) => p.id)]);
      setResults(toShow);
      showToast(`🎯 Found ${toShow.length} more ideas for you!`);
    } catch {
      showToast("Couldn't load more — try again");
    } finally {
      setShowMoreLoading(false);
    }
  };

  const filtered = catFilter === "all" ? results : results.filter((p) => (p.cat||"").toLowerCase()===catFilter);
  const relLabel = relationship ? cap(relationship.replace("-"," ")) : "them";

  return (
    <div className="min-h-screen mt-20" style={{ background:"#FAF7F2", fontFamily:"'Syne','DM Sans',sans-serif" }}>
      <GiftLoadingOverlay show={loading}/>
      <Toast msg={toast.msg} visible={toast.visible}/>

      {/* Header */}
      <div className="bg-white px-5 pt-10 pb-0 border-b border-[#EDE8E3]">
        <div className="max-w-[1320px] mx-auto">

          <div className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full font-bold text-[0.78rem] mb-4"
            style={{ background:"rgba(232,97,77,.08)", color:"#E8614D" }}>
            {loading ? "Searching live products…" : `${results.length} personalized suggestions`}
          </div>

          {/* ✅ Budget in heading */}
          <h1 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-syne leading-[1.12] tracking-[-0.03em] text-[#1C1410] mb-[10px]"
            style={{ fontFamily:"'Fraunces','Georgia',serif" }}>
            {heading}
          </h1>

          <p className="text-[0.95rem] text-[#5C4A3F] mb-6">
            Based on your preferences, here are thoughtful ideas for your {relLabel} 💖{" "}
            <span className="text-[#E8614D] font-semibold">Powered by live product search ✨</span>
          </p>

          <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-[#F6F3F0]">
            <div className="flex gap-2 overflow-x-auto flex-wrap">
              {CATS.map(([val,label]) => (
                <button key={val} onClick={() => setCatFilter(val)} disabled={showMoreLoading}
                  className="px-[18px] py-[9px] rounded-full font-bold cursor-pointer text-[0.85rem]
                    transition-all duration-200 whitespace-nowrap border-[1.5px] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: catFilter===val?"#E8614D":"#EDE8E3",
                    background:  catFilter===val?"#E8614D":"transparent",
                    color:       catFilter===val?"white":"#5C4A3F",
                    fontFamily:"'Syne',sans-serif",
                  }}>
                  {label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={handleShowMore} disabled={showMoreLoading||loading}
                className="flex items-center gap-2 px-[18px] py-[9px] rounded-full font-bold
                  text-[0.82rem] border-none cursor-pointer transition-all duration-200
                  text-[#1C1410] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: (showMoreLoading||loading)?"#EDE8E3":"linear-gradient(135deg,#F0A830,#f5c060)",
                  fontFamily:"'Syne',sans-serif",
                }}>
                {showMoreLoading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-[#1C1410]/30 border-t-[#1C1410] inline-block"
                      style={{ animation:"spin .7s linear infinite" }}/>
                    Finding more…
                  </>
                ) : "✨ Show More Ideas"}
              </button>

              <button onClick={handleSaveSearch}
                className="px-[18px] py-[9px] rounded-full font-bold text-[0.82rem] border-none cursor-pointer transition-all duration-200"
                style={{
                  background: saveButtonConfig.bg, color: saveButtonConfig.color,
                  fontFamily:"'Syne',sans-serif",
                  animation: saveState==="confirming"?"savePulse 1s ease-in-out infinite":"none",
                }}>
                {saveButtonConfig.label}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1320px] mx-auto px-5 pb-20">
        {showMoreLoading && (
          <AnimatePresence>
            <motion.div key="skeletons" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
              <SkeletonGroup count={4}/><SkeletonGroup count={4}/>
            </motion.div>
          </AnimatePresence>
        )}

        {!showMoreLoading && (
          <>
            {!isInitialLoad && apiError && (
              <div className="text-center py-20">
                <span className="text-[4.5rem] block mb-6">⚠️</span>
                <h3 className="text-[1.6rem] font-syne text-[#1C1410] mb-3" style={{ fontFamily:"'Fraunces','Georgia',serif" }}>
                  Couldn't load products
                </h3>
                <p className="text-[#5C4A3F] mb-8">There was a problem connecting. Please try again.</p>
                <button onClick={() => navigate("/generate-gift")}
                  className="px-7 py-3.5 rounded-full font-bold text-white text-[0.95rem] border-none cursor-pointer hover:opacity-90"
                  style={{ background:"linear-gradient(135deg,#E8614D,#c94a38)", fontFamily:"'Syne',sans-serif" }}>
                  Try Again 🎁
                </button>
              </div>
            )}

            {!isInitialLoad && !apiError && !results.length && (
              <div className="text-center py-20">
                <span className="text-[4.5rem] block mb-6">😅</span>
                <h3 className="text-[1.6rem] font-syne text-[#1C1410] mb-3" style={{ fontFamily:"'Fraunces','Georgia',serif" }}>
                  No perfect match found
                </h3>
                <p className="text-[#5C4A3F] mb-8">Try adjusting your search or increasing your budget.</p>
                <button onClick={() => navigate("/generate-gift")}
                  className="px-7 py-3.5 rounded-full font-bold text-white text-[0.95rem] border-none cursor-pointer hover:opacity-90"
                  style={{ background:"linear-gradient(135deg,#E8614D,#c94a38)", fontFamily:"'Syne',sans-serif" }}>
                  Refine Search 🎁
                </button>
              </div>
            )}

            {!isInitialLoad && !apiError && results.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div key={results.map(r=>r.id).join("-")}
                  initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.35, ease:"easeOut" }}>
                  {buildGroups(catFilter==="all" ? results : filtered).map((g) => (
                    <ProductGroup key={g.title} title={g.title} badge={g.badge}
                      badgeBg={g.badgeBg} badgeColor={g.badgeColor}
                      items={g.items} saved={saved} onFav={handleFav}/>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes savePulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.8; transform:scale(0.97); }
        }
        @keyframes skeletonShimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg,#EDE8E3 0%,#F6F3F0 40%,#EDE8E3 80%);
          background-size: 600px 100%;
          animation: skeletonShimmer 1.6s ease-in-out infinite;
          border-radius: 8px;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}