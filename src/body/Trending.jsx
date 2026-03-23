import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dot } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── Season detector — returns professional sentence headings ──
function getCurrentSeason() {
  const now   = new Date();
  const month = now.getMonth() + 1;
  const day   = now.getDate();

  if (month === 10 && day === 1)
    return {
      key:     "independence",
      heading: "Top Gift Picks for Nigeria's Independence Day 🇳🇬",
      label:   "October 1st Special",
      sub:     "Celebrate Nigeria's special day with meaningful gifts your loved ones will cherish.",
      };

  if (month === 12)
    return {
      key:     "detty-december",
      heading: "The Hottest Gift Ideas for Detty December",
      label:   "Detty December Edition",
      sub:     "It's the most exciting month of the year — shop the gifts everyone is gifting right now.",
        };

  if (month === 1 && day <= 10)
    return {
      key:     "new-year",
      heading: "Fresh Year, Fresh Gifts — Top New Year Picks",
      label:   "New Year Special",
      sub:     "Start the year on a high note with gifts that inspire, motivate, and delight.",
       };

  if (month === 2 && day >= 7 && day <= 17)
    return {
      key:     "valentine",
      heading: "Most Loved Valentine's Day Gifts This Season",
      label:   "Valentine's Day Edition",
      sub:     "The most romantic and thoughtful gifts trending this Valentine's season.",
     };

  if ((month === 3 && day >= 15) || (month === 4 && day <= 20))
    return {
      key:     "easter",
      heading: "Trending Gift Ideas for the Easter Season",
      label:   "Easter Season Picks",
      sub:     "Thoughtful Easter gifts your family and friends will absolutely love this season.",
      };

  if (month === 5 && day <= 14)
    return {
      key:     "mothers-day",
      heading: "The Best Gifts to Celebrate Mum This Mother's Day",
      label:   "Mother's Day Edition",
      sub:     "Show her how much she means to you with the most-saved gifts this Mother's Day.",
      };

  if (month === 6 && day >= 8 && day <= 21)
    return {
      key:     "fathers-day",
      heading: "Gift Ideas Every Dad Will Actually Love This June",
      label:   "Father's Day Picks",
      sub:     "The most thoughtful and practical gifts trending for Father's Day right now.",
     };

  if (month === 8 || month === 9)
    return {
      key:     "back-to-school",
      heading: "Top Gifts for Students Heading Back to School",
      label:   "Back to School Season",
      sub:     "Practical, fun, and useful gifts that every student will appreciate this season.",
   };

  if (month === 10)
    return {
      key:     "halloween",
      heading: "Spooky Season Gift Picks Everyone Is Saving",
      label:   "Halloween Edition",
      sub:     "The most popular Halloween-themed gifts and spooky season surprises right now.",
     };

  if (month === 11)
    return {
      key:     "black-friday",
      heading: "The Best Gift Deals Everyone Is Shopping This November",
      label:   "Black Friday Season",
      sub:     "The biggest deals and most-saved gift picks of the entire year.",
     };

  if (month >= 6 && month <= 9)
    return {
      key:     "rainy-season",
      heading: "Cosy Gift Ideas Perfect for the Rainy Season",
      label:   "Rainy Season Picks",
      sub:     "Stay warm and thoughtful — the most-loved gifts for Nigeria's rainy season.",
      };

  if (month >= 3 && month <= 5)
    return {
      key:     "summer",
      heading: "Hot Picks for the Sunny Dry Season",
      label:   "Dry Season Edition",
      sub:     "Fresh, vibrant gift ideas that perfectly match the energy of the season.",
      };

  if (month === 1)
    return {
      key:     "new-year",
      heading: "Fresh Year, Fresh Gifts — Top New Year Picks",
      label:   "New Year Special",
      sub:     "Start the year on a high note with gifts that inspire, motivate, and delight.",
     };

  if (month === 2)
    return {
      key:     "valentine",
      heading: "Most Loved Valentine's Day Gifts This Season",
      label:   "Valentine's Day Edition",
      sub:     "The most romantic and thoughtful gifts trending this Valentine's season.",
    };

  return {
    key:     "trending",
    heading: "The Most Saved Gift Ideas Right Now",
    label:   "Trending This Week",
    sub:     "Discover the gifts everyone is saving, sharing, and buying this week.",
   };
}

// ── Season-specific SerpAPI queries ──
const SEASON_QUERIES = {
  "independence":   ["Nigerian independence day gift", "patriotic gift Nigeria", "October 1 gift ideas"],
  "detty-december": ["December party gift Nigeria", "detty december gifts", "festive season gift set"],
  "new-year":       ["new year gift ideas", "new year celebration gift", "fresh start gift set"],
  "valentine":      ["valentine's day gift for her", "romantic gift for him", "valentine gift set couples"],
  "easter":         ["easter gift ideas", "easter basket gift", "spring gift set"],
  "mothers-day":    ["mothers day gift for mom", "gift for mum birthday", "luxury spa gift for women"],
  "fathers-day":    ["fathers day gift for dad", "gift for dad men", "premium gift for him"],
  "back-to-school": ["back to school gift student", "study gift set", "school supplies gift"],
  "halloween":      ["halloween gift ideas", "spooky gift set", "october gift ideas"],
  "black-friday":   ["best seller gift black friday", "popular gift deals", "trending gift ideas sale"],
  "rainy-season":   ["cosy gift rainy day", "indoor gift set", "warm gift ideas"],
  "summer":         ["summer gift ideas", "outdoor gift set", "beach gift ideas"],
  "trending":       ["trending gift ideas 2025", "most popular gift set", "best selling gift"],
};

// ── Fetch with Supabase daily cache ──
async function getTrendingProducts(seasonKey) {
  const queries = SEASON_QUERIES[seasonKey] || SEASON_QUERIES["trending"];

  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/trending_cache?season=eq.${seasonKey}&fetched_at=gte.${yesterday}&select=products&limit=1`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (res.ok) {
      const rows = await res.json();
      if (rows.length > 0 && rows[0].products?.length > 0) {
        console.log(`✅ Trending cache hit for ${seasonKey}`);
        return rows[0].products;
      }
    }
  } catch (e) {
    console.warn("Cache read failed:", e.message);
  }

  console.log(`🔍 Fetching fresh trending for ${seasonKey}`);
  const response = await fetch(`${SUPABASE_URL}/functions/v1/search-products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_KEY}` },
    body: JSON.stringify({ queries, budget_max: null }),
  });
  if (!response.ok) throw new Error("SerpAPI fetch failed");

  const data     = await response.json();
  const products = (data.products || []).filter((p) => p.buyUrl?.startsWith("http")).slice(0, 8);

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/trending_cache`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({ season: seasonKey, products, fetched_at: new Date().toISOString() }),
    });
  } catch (e) {
    console.warn("Cache write failed:", e.message);
  }

  return products;
}

function getSourceIcon(source) {
  const s = (source || "").toLowerCase();
  if (s.includes("amazon"))  return "🛒";
  if (s.includes("jumia"))   return "🛍️";
  if (s.includes("sephora")) return "💄";
  if (s.includes("target"))  return "🎯";
  if (s.includes("walmart")) return "🏬";
  if (s.includes("etsy"))    return "🎨";
  if (s.includes("ebay"))    return "🏷️";
  return "🛒";
}

const ITEMS_PER_PAGE = 4;

const variants = {
  enter:  (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="h-24 sm:h-28 md:h-32 w-full"
        style={{ background: "linear-gradient(90deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.08) 40%,rgba(255,255,255,.04) 80%)", backgroundSize: "400px 100%", animation: "trendShimmer 1.6s ease-in-out infinite" }} />
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <div className="h-3 rounded-md" style={{ width: "70%", background: "rgba(255,255,255,.08)", animation: "trendShimmer 1.6s ease-in-out infinite" }} />
        <div className="h-3 rounded-md" style={{ width: "40%", background: "rgba(255,255,255,.08)", animation: "trendShimmer 1.6s ease-in-out infinite" }} />
        <div className="h-2.5 rounded-md" style={{ width: "55%", background: "rgba(255,255,255,.05)", animation: "trendShimmer 1.6s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

const Trending = () => {
  const [page,      setPage]      = useState(0);
  const [direction, setDirection] = useState(1);
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);

  const season = getCurrentSeason();

  useEffect(() => {
    setLoading(true); setError(false); setPage(0);
    getTrendingProducts(season.key)
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const totalPages   = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentItems = loading ? Array(4).fill(null) : products.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  const goNext = () => { if (page < totalPages - 1) { setDirection(1); setPage((p) => p + 1); } };
  const goPrev = () => { if (page > 0) { setDirection(-1); setPage((p) => p - 1); } };

  return (
    <section className="bg-[#180806] py-12 sm:py-16 md:py-32 overflow-hidden" id="trending">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            {/* ✅ Professional label */}
            <span className="text-[#EE8070] text-xs sm:text-sm font-bold uppercase tracking-widest">
              {season.label}
            </span>
            {/* ✅ Full sentence heading */}
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mt-2 max-w-2xl leading-tight"
              style={{ fontFamily: "'Fraunces','Georgia',serif" }}>
              {season.heading}
            </h2>
            <p className="text-white/50 mt-3 text-sm sm:text-base max-w-xl leading-relaxed">
              {season.sub}
            </p>
          </div>

          {!loading && products.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={goPrev} disabled={page === 0}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200
                  ${page === 0 ? "border-white/10 text-white/20 cursor-not-allowed" : "border-white/20 text-white hover:bg-[#EE8070] hover:border-[#EE8070] hover:text-black active:scale-95"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <span className="text-white/30 text-sm tabular-nums min-w-[36px] text-center">{page + 1} / {totalPages}</span>
              <button onClick={goNext} disabled={page === totalPages - 1}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200
                  ${page === totalPages - 1 ? "border-white/10 text-white/20 cursor-not-allowed" : "border-white/20 text-white hover:bg-[#EE8070] hover:border-[#EE8070] hover:text-black active:scale-95"}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          )}
        </div>

        {/* ERROR */}
        {error && !loading && (
          <div className="text-center py-12">
            <span className="text-4xl block mb-3">😕</span>
            <p className="text-white/50 text-sm">Couldn't load trending gifts right now.</p>
            <button onClick={() => { setError(false); setLoading(true); getTrendingProducts(season.key).then(setProducts).catch(() => setError(true)).finally(() => setLoading(false)); }}
              className="mt-4 px-5 py-2 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-all">
              Try again
            </button>
          </div>
        )}

        {/* GRID */}
        {!error && (
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={loading ? "skeleton" : page}
                custom={direction}
                variants={loading ? {} : variants}
                initial={loading ? false : "enter"}
                animate="center"
                exit="exit"
                transition={{ type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.32 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
              >
                {loading ? (
                  Array(4).fill(null).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  currentItems.map((item, i) => {
                    const productUrl = item.buyUrl?.startsWith("http") ? item.buyUrl : null;
                    const sourceIcon = getSourceIcon(item.source);
                    const ratingNum  = parseFloat(item.rating) || 4;
                    const stars      = "★".repeat(Math.floor(ratingNum));

                    return (
                      <div key={item.id || i}
                        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden
                          cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                        {productUrl ? (
                          <a href={productUrl} target="_blank" rel="noopener noreferrer" className="block">
                            <div className="h-24 sm:h-28 md:h-32 w-full overflow-hidden bg-white/5">
                              {item.image ? (
                                <img src={item.image} alt={item.name} referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  onError={(e) => { e.target.style.display = "none"; e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem">🎁</div>'; }} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl">🎁</div>
                              )}
                            </div>
                          </a>
                        ) : (
                          <div className="h-24 sm:h-28 md:h-32 w-full bg-white/5 flex items-center justify-center text-3xl">🎁</div>
                        )}

                        <div className="p-3 sm:p-4">
                          <h3 className="text-white font-bold text-xs sm:text-sm mb-1 leading-snug line-clamp-2">{item.name}</h3>
                          <p className="text-[#EE8070] font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.price || "See price"}</p>
                          <div className="text-white/40 text-xs uppercase tracking-wide font-bold flex items-center flex-wrap gap-0.5">
                            <span>{sourceIcon} {item.source || "Store"}</span>
                            <Dot className="w-3 h-3" />
                            <span className="text-yellow-400/70">{stars}</span>
                            {item.reviews > 0 && (
                              <><Dot className="w-3 h-3" /><span>{typeof item.reviews === "number" ? item.reviews.toLocaleString() : item.reviews}</span></>
                            )}
                          </div>
                          {item.delivery?.toLowerCase().includes("free") && (
                            <div className="text-green-400/70 text-[0.68rem] font-bold mt-1">🚚 Free delivery</div>
                          )}
                          {productUrl && (
                            <a href={productUrl} target="_blank" rel="noopener noreferrer"
                              className="mt-2.5 flex items-center justify-center gap-1 w-full py-1.5 rounded-lg
                                bg-[#EE8070]/15 text-[#EE8070] text-[0.75rem] font-bold
                                hover:bg-[#EE8070] hover:text-black transition-all duration-200"
                              onClick={(e) => e.stopPropagation()}>
                              Buy Now →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                className={`rounded-full transition-all duration-300 ${i === page ? "w-6 h-2 bg-[#EE8070]" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`} />
            ))}
          </div>
        )}

       
      </div>

      <style>{`
        @keyframes trendShimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Trending;