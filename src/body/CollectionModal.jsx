import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CAT_META = {
  jewelry:     { label: "💍 Jewelry",          bg: "#FDF3E7", color: "#C8821A" },
  accessories: { label: "👜 Accessories",       bg: "#EEF2FF", color: "#4F52B2" },
  beauty:      { label: "💄 Beauty",            bg: "#FDF0F5", color: "#C2185B" },
  electronics: { label: "📱 Electronics",       bg: "#E8F5E9", color: "#2E7D32" },
  gifts:       { label: "🎁 Gifts & Keepsakes", bg: "#FFF3E0", color: "#E65100" },
};

function detectCategory(name = "") {
  const n = name.toLowerCase();
  if (/ring|necklace|bracelet|earring|pendant|locket|jewel|bangle|chain|pearl|anklet|brooch/.test(n))
    return "jewelry";
  if (/headphone|earbuds|speaker|tablet|laptop|charger|cable|power.?bank|gadget|camera|gaming|smartwatch|charging|wireless/.test(n))
    return "electronics";
  if (/perfume|cologne|candle|skincare|serum|moisturizer|makeup|lipstick|lotion|soap|bath|sunscreen|spa|robe|blush|mascara/.test(n))
    return "beauty";
  if (/bag|wallet|purse|tote|backpack|clutch|keychain|belt|scarf|hat|sunglasses|luggage|pouch|organis/.test(n))
    return "accessories";
  return "gifts";
}

function getSourceIcon(source) {
  const s = (source || "").toLowerCase();
  if (s.includes("amazon"))    return "🛒";
  if (s.includes("jumia"))     return "🛍️";
  if (s.includes("sephora"))   return "💄";
  if (s.includes("target"))    return "🎯";
  if (s.includes("walmart"))   return "🏬";
  if (s.includes("ulta"))      return "💅";
  if (s.includes("nordstrom")) return "👜";
  if (s.includes("etsy"))      return "🎨";
  if (s.includes("ebay"))      return "🏷️";
  if (s.includes("nike"))      return "👟";
  if (s.includes("macy"))      return "🛍️";
  return "🛒";
}

const TAG_COLORS = {
  "Popular":         { bg: "#FFF3E0", color: "#E65100" },
  "Trending":        { bg: "#FCE4EC", color: "#C2185B" },
  "Budget-Friendly": { bg: "#E8F5E9", color: "#2E7D32" },
  "Romance":         { bg: "#FCE4EC", color: "#E91E63" },
  "Professional":    { bg: "#EEF2FF", color: "#4F52B2" },
  "For Dad":         { bg: "#FDF3E7", color: "#C8821A" },
};

const MODAL_PREVIEW_COUNT = 3;

const CollectionModal = ({ collection, onClose }) => {
  const navigate = useNavigate();

  const allProducts     = collection?.products || [];
  const enrichedAll     = allProducts.map((p) => ({ ...p, cat: p.cat || detectCategory(p.name) }));
  const previewProducts = enrichedAll.slice(0, MODAL_PREVIEW_COUNT);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!collection) return null;

  const tagStyle = TAG_COLORS[collection.tag] || { bg: "#F6F3F0", color: "#5C4A3F" };

  const handleSeeAll = () => {
    onClose();
    sessionStorage.removeItem("giftly_result_visited");
    sessionStorage.removeItem("giftly_cached_results");
    sessionStorage.removeItem("giftly_original_results");
    try {
      sessionStorage.setItem("giftly_cached_results",   JSON.stringify(enrichedAll));
      sessionStorage.setItem("giftly_original_results", JSON.stringify(enrichedAll));
      sessionStorage.setItem("giftly_result_visited",   "true");
    } catch (e) {
      console.warn("Could not cache collection products:", e);
    }
    navigate("/result", {
      state: {
        ...collection.preset,
        interests:         "",
        isCollection:      true,
        collectionTitle:   collection.title,
        preloadedProducts: enrichedAll,
      },
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9800] flex items-end sm:items-center justify-center p-0 sm:p-5"
        style={{ background: "rgba(28,20,16,.55)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="bg-[#FFFDF9] w-full sm:rounded-3xl sm:max-w-lg
            rounded-t-3xl rounded-b-none
            max-h-[92vh] sm:max-h-[88vh] overflow-y-auto"
          style={{ boxShadow: "0 12px 40px rgba(28,20,16,.12), 0 24px 64px rgba(28,20,16,.08)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Head ── */}
          <div className="flex justify-between items-start pt-6 px-5 sm:pt-7 sm:px-7">
            <div>
              <span
                className="text-[0.7rem] font-bold uppercase tracking-[0.08em]
                  block mb-2 px-2 py-0.5 rounded-full w-fit"
                style={{ background: tagStyle.bg, color: tagStyle.color }}
              >
                {collection.tag}
              </span>
              <h2
                className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-[#1C1410] leading-snug"
                style={{ fontFamily: "'Fraunces','Georgia',serif" }}
              >
                {collection.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F6F3F0] border-none cursor-pointer
                flex items-center justify-center text-[1.1rem] text-[#1C1410] flex-shrink-0
                hover:bg-[#EDE8E3] hover:scale-110 transition-all duration-200 mt-1 ml-3"
            >
              ✕
            </button>
          </div>

          {/* ── Body ── */}
          <div className="px-5 sm:px-7 pt-5 pb-2">

            {/* 3-image grid */}
            <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden h-32 sm:h-36 mb-5">
              {previewProducts.map((p, i) => (
                <div key={i} className="w-full h-full overflow-hidden bg-[#F6F3F0]">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.style.background = "#EDE8E3";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-[#EDE8E3]">🎁</div>
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-[0.88rem] sm:text-[0.9rem] text-[#5C4A3F] leading-[1.7] mb-5">
              {collection.desc}
            </p>

            {/* Section label */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-[0.82rem] sm:text-[0.84rem] text-[#1C1410]">
                ✨ Featured Picks
              </span>
              <span className="text-[0.7rem] sm:text-[0.72rem] text-[#9C8B82]">
                {MODAL_PREVIEW_COUNT} of {enrichedAll.length} · click to buy
              </span>
            </div>

            {/* Product list */}
            {enrichedAll.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-3xl block mb-2">🎁</span>
                <p className="text-[0.85rem] text-[#9C8B82]">
                  Products haven't been seeded yet. Please run the seed script.
                </p>
              </div>
            ) : (
              <div>
                {previewProducts.map((p, i) => {
                  const catMeta    = CAT_META[p.cat] || CAT_META.gifts;
                  const sourceIcon = getSourceIcon(p.source);
                  const productUrl = p.buyUrl;
                  const ratingNum  = parseFloat(p.rating) || 4;
                  const stars      = "★".repeat(Math.floor(ratingNum));

                  return (
                    <div
                      key={p.id || i}
                      className={`flex items-center gap-2.5 sm:gap-3 py-3 ${
                        i < previewProducts.length - 1 ? "border-b border-[#F6F3F0]" : ""
                      }`}
                    >
                      {/* Product image */}
                      <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-[10px] overflow-hidden flex-shrink-0 bg-[#F6F3F0]">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentNode.innerHTML =
                                '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;background:#EDE8E3">🎁</div>';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl bg-[#EDE8E3]">🎁</div>
                        )}
                      </div>

                      {/* Name + meta — flex-1 with min-w-0 prevents overflow */}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[0.8rem] sm:text-[0.84rem] text-[#1C1410] leading-snug line-clamp-2">
                          {p.name}
                        </div>
                        {/* Category + source stacked on mobile */}
                        <div className="flex flex-wrap items-center gap-1 mt-0.5">
                          <span
                            className="text-[0.6rem] sm:text-[0.65rem] font-bold px-[5px] py-[2px] rounded-full whitespace-nowrap"
                            style={{ background: catMeta.bg, color: catMeta.color }}
                          >
                            {catMeta.label}
                          </span>
                          <span className="text-[0.65rem] sm:text-[0.7rem] text-[#9C8B82] truncate max-w-[90px] sm:max-w-none">
                            {sourceIcon} {p.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span className="text-[0.63rem] sm:text-[0.67rem] text-[#F0A830]">{stars}</span>
                          {p.reviews > 0 && (
                            <span className="text-[0.63rem] sm:text-[0.67rem] text-[#9C8B82]">
                              ({typeof p.reviews === "number" ? p.reviews.toLocaleString() : p.reviews})
                            </span>
                          )}
                          {p.delivery?.toLowerCase().includes("free") && (
                            <span className="text-[0.6rem] sm:text-[0.65rem] text-green-600 font-semibold">
                              🚚 Free
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price + Buy — right-aligned, never wrap */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <div
                          className="font-bold text-[#C94B38] text-[0.85rem] sm:text-[0.9rem] whitespace-nowrap"
                          style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                        >
                          {p.price || "—"}
                        </div>
                        <a
                          href={productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[#C94B38] text-white
                            font-bold text-[0.7rem] sm:text-[0.74rem] no-underline whitespace-nowrap
                            hover:bg-[#C94B38] hover:-translate-y-px transition-all duration-200"
                          style={{ boxShadow: "0 4px 12px rgba(232,97,77,.28)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Buy →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="flex gap-3 px-5 sm:px-7 py-4 sm:py-5 border-t border-[#F6F3F0] sticky bottom-0 bg-[#FFFDF9]">
            <button
              onClick={onClose}
              className="px-4 sm:px-5 py-3 rounded-full bg-transparent text-[#5C4A3F] font-bold
                border-[1.5px] border-[#EDE8E3] cursor-pointer text-[0.8rem] sm:text-[0.82rem]
                hover:bg-[#F6F3F0] transition-all duration-200 whitespace-nowrap"
            >
              Close
            </button>
            <button
              onClick={handleSeeAll}
              className="flex-1 py-3 rounded-full bg-[#C94B38] text-white font-bold
                border-none cursor-pointer text-[0.82rem] sm:text-[0.9rem]
                hover:bg-[#C94B38] hover:-translate-y-px transition-all duration-200"
              style={{ boxShadow: "0 8px 32px rgba(232,97,77,.28)" }}
            >
              See All Suggestions
            </button>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default CollectionModal;