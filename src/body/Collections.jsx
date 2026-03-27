import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Collection.css";
import CollectionModal from "./CollectionModal";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const COLLECTIONS_META = [
  {
    tag:      "Popular",
    title:    "Gifts for Boyfriend",
    desc:     "Cool, stylish picks he'll actually use — from tech accessories to grooming essentials.",
    cacheKey: "gifts-for-boyfriend",
    preset:   { relationship: "boyfriend", gender: "male", budget: 20000, age: 25 },
  },
  {
    tag:      "Trending",
    title:    "Birthday Gifts for Mom",
    desc:     "Thoughtful, heartfelt gifts that show your mum exactly how much she means to you.",
    cacheKey: "birthday-gifts-for-mom",
    preset:   { relationship: "mom", gender: "female", budget: 25000, age: 50, occasion: "birthday" },
  },
  {
    tag:      "Budget-Friendly",
    title:    "Affordable Best Friend Gifts",
    desc:     "Great options that won't break the bank — because friendship deserves celebration.",
    cacheKey: "affordable-best-friend-gifts",
    preset:   { relationship: "best-friend", budget: 12000, age: 24 },
  },
  {
    tag:      "Romance",
    title:    "Valentine's Day for Her",
    desc:     "Romantic and luxurious picks to make her feel truly special and completely adored.",
    cacheKey: "valentines-day-for-her",
    preset:   { relationship: "girlfriend", gender: "female", budget: 30000, age: 26, occasion: "valentine" },
  },
  {
    tag:      "Professional",
    title:    "Corporate Gifts for Colleagues",
    desc:     "Tasteful, professional gifts perfect for the workplace — impressive without being too personal.",
    cacheKey: "corporate-gifts-colleagues",
    preset:   { relationship: "colleague", budget: 20000, age: 35, occasion: "just-because" },
  },
  {
    tag:      "For Dad",
    title:    "Father's Day Gift Ideas",
    desc:     "Practical and stylish gifts that show Dad you appreciate everything he does for you.",
    cacheKey: "fathers-day-gift-ideas",
    preset:   { relationship: "dad", gender: "male", budget: 25000, age: 55 },
  },
];

const TAG_COLORS = {
  "Popular":         { bg: "#FFF3E0", color: "#E65100" },
  "Trending":        { bg: "#FCE4EC", color: "#C2185B" },
  "Budget-Friendly": { bg: "#E8F5E9", color: "#2E7D32" },
  "Romance":         { bg: "#FCE4EC", color: "#E91E63" },
  "Professional":    { bg: "#EEF2FF", color: "#4F52B2" },
  "For Dad":         { bg: "#FDF3E7", color: "#C8821A" },
};

async function fetchAllCollectionProducts() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/collection_products?select=collection,products`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  if (!res.ok) throw new Error("Failed to fetch collections from Supabase");
  const rows = await res.json();
  const map = {};
  rows.forEach((row) => { map[row.collection] = row.products; });
  return map;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 h-[130px] gap-px bg-[#F6F3F0]">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-full h-full"
          style={{ background: "linear-gradient(90deg,#EDE8E3 0%,#F6F3F0 50%,#EDE8E3 100%)", backgroundSize: "200% 100%", animation: "collCardShimmer 1.4s ease-in-out infinite" }} />
      ))}
    </div>
  );
}

const Collection = () => {
  const [activeModal,   setActiveModal]   = useState(null);
  const [productsMap,   setProductsMap]   = useState({});
  const [loadingImages, setLoadingImages] = useState(true);

  const trackRef        = useRef(null);
  const isDragging      = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartOffset = useRef(0);    // offset at the moment drag began
  const offsetRef       = useRef(0);    // ✅ THE single source of truth for scroll position
  const autoScrollRef   = useRef(null);
  const pauseTimeout    = useRef(null);
  const isPaused        = useRef(false);
  // ✅ Track whether the pointer moved enough to count as a drag (vs a click)
  const didDrag         = useRef(false);

  useEffect(() => {
    fetchAllCollectionProducts()
      .then(setProductsMap)
      .catch((err) => console.warn("Could not load collection images:", err))
      .finally(() => setLoadingImages(false));
  }, []);

  // ✅ Auto-scroll — reads & writes offsetRef directly, no separate variable
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.6;

    function step() {
      if (!isPaused.current && track) {
        offsetRef.current += speed;
        const half = track.scrollWidth / 2;
        if (offsetRef.current >= half) offsetRef.current = 0;
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      autoScrollRef.current = requestAnimationFrame(step);
    }

    autoScrollRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, []);

  function resumeAutoScroll() {
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      isPaused.current = false;
    }, 1200);
  }

  // ── Mouse handlers ──
  function handleMouseDown(e) {
    isDragging.current     = true;
    didDrag.current        = false;
    isPaused.current       = true;
    dragStartX.current     = e.pageX;
    dragStartOffset.current = offsetRef.current; // ✅ snapshot current offset
    if (trackRef.current) {
      trackRef.current.style.cursor     = "grabbing";
      trackRef.current.style.userSelect = "none";
    }
  }

  function handleMouseMove(e) {
    if (!isDragging.current) return;
    const dx = e.pageX - dragStartX.current;
    if (Math.abs(dx) > 4) didDrag.current = true; // moved enough → it's a drag
    const half = trackRef.current.scrollWidth / 2;
    let newOffset = dragStartOffset.current - dx; // ✅ based on snapshot, not live value
    if (newOffset < 0) newOffset = 0;
    if (newOffset >= half) newOffset = half - 1;
    offsetRef.current = newOffset;                // ✅ update the single source of truth
    trackRef.current.style.transform = `translateX(-${newOffset}px)`;
  }

  function handleMouseUp() {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor     = "grab";
      trackRef.current.style.userSelect = "";
    }
    resumeAutoScroll(); // ✅ rAF will now continue from offsetRef.current — no snap
  }

  function handleMouseLeave() {
    if (isDragging.current) handleMouseUp();
  }

  // ── Touch handlers ──
  function handleTouchStart(e) {
    isDragging.current      = true;
    didDrag.current         = false;
    isPaused.current        = true;
    dragStartX.current      = e.touches[0].pageX;
    dragStartOffset.current = offsetRef.current; // ✅ snapshot
  }

  function handleTouchMove(e) {
    if (!isDragging.current) return;
    const dx = e.touches[0].pageX - dragStartX.current;
    if (Math.abs(dx) > 4) didDrag.current = true;
    const half = trackRef.current.scrollWidth / 2;
    let newOffset = dragStartOffset.current - dx; // ✅ snapshot-based
    if (newOffset < 0) newOffset = 0;
    if (newOffset >= half) newOffset = half - 1;
    offsetRef.current = newOffset;
    trackRef.current.style.transform = `translateX(-${newOffset}px)`;
  }

  function handleTouchEnd() {
    isDragging.current = false;
    resumeAutoScroll(); // ✅ continues from offsetRef.current
  }

  const SCROLL_COLLECTIONS = [...COLLECTIONS_META, ...COLLECTIONS_META];

  return (
    <section className="py-20 scroll-mt-21" id="feed">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center px-4" id="collections">
        <span className="text-[#C94B38] text-xs sm:text-sm font-bold uppercase tracking-widest">
          Curated Collections
        </span>
        <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          Gift ideas we've hand-picked
        </h2>
        <p className="text-black/70 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Click any collection to preview real picks or jump straight to personalized results.
        </p>
      </motion.div>

      <div className="relative overflow-hidden mt-12 select-none" style={{ cursor: "grab" }}>

        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #F6F3F0, transparent)" }} />
        <div className="absolute top-0 bottom-0 right-0 w-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #F6F3F0, transparent)" }} />

        <div
          ref={trackRef}
          className="flex gap-5 w-max py-3 px-2"
          style={{ willChange: "transform", cursor: "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {SCROLL_COLLECTIONS.map((c, i) => {
            const realIndex  = i % COLLECTIONS_META.length;
            const tagStyle   = TAG_COLORS[c.tag] || { bg: "#F6F3F0", color: "#5C4A3F" };
            const products   = productsMap[c.cacheKey] || [];
            const cardImages = products.slice(0, 3).map((p) => p.image).filter(Boolean);

            return (
              <div
                key={i}
                onClick={() => {
                  // ✅ Only open modal if the user didn't drag
                  if (!didDrag.current) setActiveModal(realIndex);
                }}
                className="w-[370px] shrink-0 bg-white rounded-[22px] overflow-hidden
                  border-[1.5px] border-transparent shadow-sm
                  hover:-translate-y-1.5 hover:shadow-xl hover:border-[#EDE8E3]
                  transition-all duration-[350ms] group"
                style={{ cursor: "grab" }}
              >
                {loadingImages || cardImages.length < 3 ? (
                  <SkeletonGrid />
                ) : (
                  <div className="grid grid-cols-3 h-[130px] gap-px bg-[#F6F3F0]">
                    {cardImages.map((src, j) => (
                      <div key={j} className="w-full h-full overflow-hidden bg-[#EDE8E3]">
                        <img src={src} alt={`${c.title} product ${j + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          draggable="false"
                          loading="lazy"
                          onError={(e) => { e.target.style.display = "none"; e.target.parentNode.style.background = "#EDE8E3"; }} />
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-5">
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.08em]
                      mb-[7px] block px-2 py-0.5 rounded-full w-fit"
                    style={{ background: tagStyle.bg, color: tagStyle.color }}>
                    {c.tag}
                  </span>
                  <div className="font-bold text-[1rem] text-[#1C1410] mb-[7px] leading-[1.3]">
                    {c.title}
                  </div>
                  <p className="text-[0.86rem] text-[#5C4A3F] leading-[1.55]">{c.desc}</p>
                </div>

                <div className="px-5 py-[14px] border-t border-[#F6F3F0] flex justify-between items-center">
                  <span className="text-[0.8rem] text-black/90 font-semibold">
                    {products.length > 0 ? `${products.length} real picks` : "See gift picks"}
                  </span>
                  <div className="w-[30px] h-[30px] rounded-full bg-[#E8614D] text-white
                    flex items-center justify-center text-[0.9rem]
                    transition-transform duration-300
                    group-hover:rotate-[-42deg] group-hover:scale-110">
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeModal !== null && (
        <CollectionModal
          collection={{ ...COLLECTIONS_META[activeModal], products: productsMap[COLLECTIONS_META[activeModal].cacheKey] || [] }}
          onClose={() => setActiveModal(null)}
        />
      )}

      <style>{`
        @keyframes collCardShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Collection;