import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function getSavedProducts() {
  try { return JSON.parse(localStorage.getItem("giftly_saved_products") || "[]"); }
  catch { return []; }
}
function setSavedProductsStore(products) {
  localStorage.setItem("giftly_saved_products", JSON.stringify(products));
}

function getSourceIcon(source) {
  const s = (source || "").toLowerCase();
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

function Toast({ msg, visible }) {
  return (
    <div className="fixed bottom-7 left-1/2 z-[9999] pointer-events-none flex items-center gap-2
        px-[22px] py-[12px] rounded-full font-bold text-[0.86rem] text-white whitespace-nowrap"
      style={{
        background: "#1C1410", boxShadow: "0 8px 32px rgba(28,20,16,.22)", maxWidth: "92vw",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
        transition: "opacity .35s ease, transform .35s ease",
      }}>
      {msg}
    </div>
  );
}

function ImagePlaceholder({ name }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#EDE8E3]">
      <span style={{ fontSize: 40 }}>🎁</span>
      <span className="text-[0.7rem] text-[#9C8B82] mt-2 px-3 text-center font-semibold line-clamp-2">{name}</span>
    </div>
  );
}

const CAT_META = {
  jewelry:     { label: "💍 Jewelry",          bg: "#FDF3E7", color: "#C8821A" },
  accessories: { label: "👜 Accessories",       bg: "#EEF2FF", color: "#4F52B2" },
  beauty:      { label: "💄 Beauty",            bg: "#FDF0F5", color: "#C2185B" },
  electronics: { label: "📱 Electronics",       bg: "#E8F5E9", color: "#2E7D32" },
  gifts:       { label: "🎁 Gifts & Keepsakes", bg: "#FFF3E0", color: "#E65100" },
};

function SavedProductCard({ p, onRemove }) {
  const [imgError, setImgError] = useState(false);
  const sourceName   = p.source || "Store";
  const sourceIcon   = getSourceIcon(sourceName);
  const ratingNum    = parseFloat(p.rating) || 4;
  const stars        = "★".repeat(Math.floor(ratingNum)) + (ratingNum % 1 >= 0.5 ? "½" : "");
  const reviewCount  = typeof p.reviews === "number" ? p.reviews.toLocaleString() : p.reviews || "0";
  const displayPrice = p.price || "See price";
  const productUrl   = p.buyUrl && p.buyUrl.startsWith("http") ? p.buyUrl : null;
  const catKey       = p.cat || "gifts";
  const catMeta      = CAT_META[catKey] || CAT_META.gifts;

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      className="bg-white rounded-[22px] overflow-hidden border-[1.5px] border-transparent
        shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-[#EDE8E3]
        transition-all duration-[350ms] group flex flex-col"
    >
      <div className="relative overflow-hidden h-[190px] flex-shrink-0 bg-[#F6F3F0]">
        {/* Category pill */}
        <span className="absolute top-3 left-3 z-10 text-[0.65rem] font-bold px-[9px] py-[4px] rounded-full"
          style={{ background: catMeta.bg, color: catMeta.color }}>
          {catMeta.label}
        </span>
        {/* Remove button */}
        <button onClick={() => onRemove(p.id)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90
            backdrop-blur-sm flex items-center justify-center text-[0.85rem]
            shadow-md border-none cursor-pointer hover:bg-[#E8614D] hover:text-white
            hover:scale-110 transition-all duration-200 font-bold text-[#1C1410]"
          title="Remove from saved">
          ✕
        </button>
        {productUrl ? (
          <a href={productUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full" tabIndex={-1}>
            {imgError || !p.image ? <ImagePlaceholder name={p.name} /> : (
              <img src={p.image} alt={p.name} referrerPolicy="no-referrer" onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
            )}
          </a>
        ) : (
          imgError || !p.image ? <ImagePlaceholder name={p.name} /> : (
            <img src={p.image} alt={p.name} referrerPolicy="no-referrer" onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          )
        )}
      </div>

      <div className="p-[18px] flex flex-col flex-1">
        {productUrl ? (
          <a href={productUrl} target="_blank" rel="noopener noreferrer" className="no-underline group/title mb-2">
            <div className="font-bold text-[0.95rem] text-[#1C1410] leading-[1.35] line-clamp-2
              group-hover/title:text-[#E8614D] transition-colors cursor-pointer">{p.name}</div>
          </a>
        ) : (
          <div className="font-bold text-[0.95rem] text-[#1C1410] leading-[1.35] line-clamp-2 mb-2">{p.name}</div>
        )}

        <div className="flex items-center gap-[6px] text-[0.74rem] font-semibold text-[#9C8B82] py-[8px] mb-1 border-y border-[#F6F3F0]">
          <span>{sourceIcon}</span>
          <span>Available on{" "}
            {productUrl ? (
              <a href={productUrl} target="_blank" rel="noopener noreferrer"
                className="text-[#E8614D] hover:underline font-bold transition-colors">{sourceName}</a>
            ) : <span className="text-[#E8614D] font-bold">{sourceName}</span>}
          </span>
        </div>

        {p.delivery && <div className="text-[0.72rem] font-semibold text-[#7A9E7E] mt-1 mb-1">🚚 {p.delivery}</div>}

        <div className="flex items-center gap-[5px] mt-2 mb-3">
          <span className="text-[#F0A830] text-[0.8rem] tracking-[1px]">{stars}</span>
          <span className="text-[0.75rem] text-[#9C8B82]">({reviewCount} reviews)</span>
        </div>

        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[#F6F3F0]">
          <span className="text-[1.25rem] text-[#1C1410] leading-tight font-bold"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}>{displayPrice}</span>
          {productUrl ? (
            <a href={productUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold
                text-[0.85rem] text-white no-underline flex-shrink-0
                hover:opacity-90 hover:-translate-y-[1px] transition-all duration-200"
              style={{ background: "#E8614D", boxShadow: "0 4px 14px rgba(232,97,77,.35)" }}>
              Buy Now
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M2 11L11 2M11 2H5.5M11 2V7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <span className="flex items-center px-5 py-2.5 rounded-full font-bold text-[0.85rem]
              text-white flex-shrink-0 opacity-40 cursor-not-allowed"
              style={{ background: "#9C8B82" }}>Unavailable</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SavedSearchCard({ entry, onRerun, onDelete }) {
  const date = new Date(entry.ts).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  const forYourIdx  = entry.heading.indexOf("for your ");
  const underIdx    = entry.heading.lastIndexOf(" under ");
  const amountMatch = entry.heading.match(/(\$[\d,]+)$/);
  const parsed =
    forYourIdx !== -1 && underIdx !== -1 && underIdx > forYourIdx && amountMatch
      ? {
          prefix: entry.heading.slice(0, forYourIdx + "for your ".length),
          rel:    entry.heading.slice(forYourIdx + "for your ".length, underIdx),
          amount: amountMatch[1],
        }
      : null;

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      onClick={() => onRerun(entry)}
      className="flex flex-col bg-white rounded-[20px] border-[1.5px] border-[#EDE8E3]
        shadow-sm cursor-pointer group overflow-hidden
        hover:-translate-y-1 hover:shadow-lg hover:border-[#E8614D]
        transition-all duration-300"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[1.2rem] flex-shrink-0 mt-0.5"
            style={{ background: "linear-gradient(135deg,#E8614D)" }}>
            <Search className="w-5 h-5 text-white" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}
            className="w-7 h-7 rounded-full bg-[#F6F3F0] flex items-center justify-center
              text-[0.72rem] text-[#9C8B82] font-bold border-none cursor-pointer flex-shrink-0
              hover:bg-[#E8614D]/10 hover:text-[#E8614D] transition-all duration-200"
            title="Remove">✕</button>
        </div>

        <div className="text-[1rem] font-syne text-[#1C1410] leading-[1.4] mb-2"
          style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
          {parsed ? (() => {
            const afterPerfect = parsed.prefix.slice("Perfect ".length);
            const giftsIdx     = afterPerfect.indexOf("gifts for your ");
            const occasion     = giftsIdx > 0 ? afterPerfect.slice(0, giftsIdx).trim() : "";
            return (
              <>
                {"Perfect "}
                {occasion && <span className="text-[#E8614D]">{occasion} </span>}
                {"gifts for your "}
                <span className="text-[#E8614D]">{parsed.rel}</span>
                {" under "}
                <span className="inline-block px-2 py-0.5 rounded-full text-[0.82rem] ml-1 align-middle"
                  style={{ background: "rgba(232,97,77,.1)", color: "#E8614D", fontFamily: "'Syne',sans-serif" }}>
                  {parsed.amount}
                </span>
              </>
            );
          })() : entry.heading}
        </div>

        {/* ✅ Re-run hint with context */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F6F3F0]">
          <span className="text-[0.73rem] text-[#9C8B82] font-medium">🕐 Saved {date}</span>
          <span className="flex items-center gap-1 text-[0.75rem] font-bold text-[#E8614D]
            opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
            Re-run search
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="#E8614D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SavedGifts() {
  const navigate   = useNavigate();
  const toastTimer = useRef(null);

  const [savedProducts, setSavedProducts] = useState(() => getSavedProducts());
  const [savedSearches, setSavedSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("giftly_saved_searches") || "[]"); }
    catch { return []; }
  });
  const [toast,     setToast]     = useState({ msg: "", visible: false });
  const [activeTab, setActiveTab] = useState("gifts");

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const handleRemove = (id) => {
    setSavedProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setSavedProductsStore(updated);
      return updated;
    });
    showToast("Removed from saved gifts");
  };

  const handleClearAll = () => {
    setSavedProducts([]);
    setSavedProductsStore([]);
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

  // ✅ Rerun clears cache and passes isRerun flag so overlay shows correct message
  const handleRerun = (entry) => {
    sessionStorage.removeItem("giftly_result_visited");
    sessionStorage.removeItem("giftly_cached_results");
    navigate("/result", {
      state: {
        ...entry.formData,
        isRerun: true, // ✅ tells GiftResult to show "Re-running your saved search…"
      },
    });
  };

  const hasGifts    = savedProducts.length > 0;
  const hasSearches = savedSearches.length > 0;
  const hasAnything = hasGifts || hasSearches;

  return (
    <div className="min-h-screen mt-20" style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}>
      <Toast msg={toast.msg} visible={toast.visible} />

      <div className="md:px-20">
        
      </div>

      <div className="bg-white border-b border-[#EDE8E3] md:px-20">
        <div className="max-w-[1320px] mx-auto px-5 pt-10 pb-0">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#E8614D] font-bold text-[0.85rem]
              border-none bg-transparent cursor-pointer mb-6 hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Syne',sans-serif" }}>
            ← Back
          </button>

          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-[0.72rem] font-syne uppercase tracking-[.14em] text-[#E8614D] block mb-2">Your Collection</span>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-syne text-[#1C1410] leading-tight tracking-[-0.03em] mb-2"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
                Your Saved Gifts ❤️
              </h1>
              <p className="text-[0.95rem] text-[#5C4A3F]">
                All the gift ideas you've hearted — ready when you need them.
              </p>
            </div>
          </div>

          {hasAnything && (
            <div className="flex gap-2 pb-0">
              {[
                { id: "gifts",    label: `❤️ Saved Gifts (${savedProducts.length})` },
                { id: "searches", label: `🔖 Saved Searches (${savedSearches.length})` },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-3 font-bold text-[0.85rem] border-none cursor-pointer
                    transition-all duration-200 rounded-t-xl"
                  style={{
                    background:   activeTab === tab.id ? "white" : "transparent",
                    color:        activeTab === tab.id ? "#E8614D" : "#9C8B82",
                    borderBottom: activeTab === tab.id ? "2px solid #E8614D" : "2px solid transparent",
                    marginBottom: activeTab === tab.id ? "-1px" : "0",
                    fontFamily: "'Syne',sans-serif",
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 py-10 pb-24 md:px-20">

        {!hasAnything && (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="text-[5rem] mb-6 opacity-30">😢</div>
            <h2 className="text-[1.8rem] font-syne text-[#1C1410] mb-3" style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
              Nothing saved yet
            </h2>
            <p className="text-[#5C4A3F] mb-8 max-w-sm text-[0.95rem]">
              Start exploring gift ideas and heart the ones you love — they'll all live right here.
            </p>
            <button onClick={() => navigate("/generate-gift")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white
                text-[0.95rem] border-none cursor-pointer hover:opacity-90 transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#E8614D,#c94a38)", boxShadow: "0 6px 24px rgba(232,97,77,.32)", fontFamily: "'Syne',sans-serif" }}>
              Find Gifts 
            </button>
          </div>
        )}

        {hasAnything && activeTab === "gifts" && (
          <>
            {hasGifts ? (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-[0.88rem] text-[#9C8B82]">
                    {savedProducts.length} item{savedProducts.length !== 1 ? "s" : ""} in your collection
                  </p>
                  <button onClick={handleClearAll}
                    className="text-[0.82rem] font-bold text-[#9C8B82] border-none bg-transparent
                      cursor-pointer hover:text-[#E8614D] transition-colors"
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    Clear all
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {savedProducts.map((p) => <SavedProductCard key={p.id} p={p} onRemove={handleRemove} />)}
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-16">
                <div className="text-[4rem] mb-5 opacity-30">🤍</div>
                <h3 className="text-[1.4rem] font-syne text-[#1C1410] mb-2" style={{ fontFamily: "'Fraunces','Georgia',serif" }}>No saved gifts yet</h3>
                <p className="text-[#5C4A3F] mb-6 text-[0.9rem]">Heart any product while browsing results and it'll appear here.</p>
                <button onClick={() => navigate("/generate-gift")}
                  className="px-6 py-3 rounded-full font-bold text-white text-[0.88rem] border-none cursor-pointer hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#E8614D,#c94a38)", boxShadow: "0 6px 24px rgba(232,97,77,.28)", fontFamily: "'Syne',sans-serif" }}>
                  Browse Gift Ideas 
                </button>
              </div>
            )}
          </>
        )}

        {hasAnything && activeTab === "searches" && (
          <>
            {hasSearches ? (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-[0.88rem] text-[#9C8B82]">
                    {savedSearches.length} saved search{savedSearches.length !== 1 ? "es" : ""} — tap any to instantly re-run it
                  </p>
                  <button onClick={handleClearSearches}
                    className="text-[0.82rem] font-bold text-[#9C8B82] border-none bg-transparent
                      cursor-pointer hover:text-[#E8614D] transition-colors"
                    style={{ fontFamily: "'Syne',sans-serif" }}>
                    Clear all
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {savedSearches.map((entry) => (
                      <SavedSearchCard key={entry.id} entry={entry} onRerun={handleRerun} onDelete={handleDeleteSearch} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-16">
                <div className="text-[4rem] mb-5 opacity-30">🔖</div>
                <h3 className="text-[1.4rem] font-syne text-[#1C1410] mb-2" style={{ fontFamily: "'Fraunces','Georgia',serif" }}>No saved searches yet</h3>
                <p className="text-[#5C4A3F] mb-6 text-[0.9rem]">After generating results, click "Save This Search" to store it here for one-tap re-runs.</p>
                <button onClick={() => navigate("/generate-gift")}
                  className="px-6 py-3 rounded-full font-bold text-white text-[0.88rem] border-none cursor-pointer hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#E8614D,#c94a38)", boxShadow: "0 6px 24px rgba(232,97,77,.28)", fontFamily: "'Syne',sans-serif" }}>
                  Generate Gift Ideas 
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>
    </div>
  );
}