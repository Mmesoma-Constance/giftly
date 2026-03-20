import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/img1.jpg";
import image2 from "../assets/sneakers.webp";
import image3 from "../assets/perf.jpg";
import image4 from "../assets/head.jpg";  
import image5 from "../assets/skincare.jpg";
import image6 from "../assets/jewelry.webp";
import image7 from "../assets/wine.jpg";
import image8 from "../assets/game.jpg";
import { Dot } from "lucide-react";

const trendingItems = [
  { name: "Luxury Wrist Watch", price: "₦45,000", brand: "Amazon", saves: "120", image: image1 },
  { name: "Sneakers", price: "₦30,000", brand: "Amazon", saves: "114", image: image2 },
  { name: "Perfume Set", price: "₦25,000", brand: "Jumia", saves: "87", image: image3 },
  { name: "Smart Headphones", price: "₦60,000", brand: "Konga", saves: "75", image: image4 },
  { name: "Skincare Bundle", price: "₦18,000", brand: "Temu", saves: "70", image: image5 },
  { name: "Jewellery Box", price: "₦12,000", brand: "Amazon", saves: "69", image: image6 },
  { name: "Wine & Chocolates", price: "₦22,000", brand: "Jumia", saves: "53", image: image7 },
  { name: "Gaming Controller", price: "₦55,000", brand: "Amazon", saves: "44", image: image8 },
];

const ITEMS_PER_PAGE = 4;

const variants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const Trending = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalPages = Math.ceil(trendingItems.length / ITEMS_PER_PAGE);
  const currentItems = trendingItems.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const goNext = () => {
    if (page < totalPages - 1) { setDirection(1); setPage((p) => p + 1); }
  };

  const goPrev = () => {
    if (page > 0) { setDirection(-1); setPage((p) => p - 1); }
  };

  return (
    <section className="bg-[#180806] py-12 sm:py-16 md:py-32 overflow-hidden" id="trending">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* HEADER ROW */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[#EE8070] text-xs sm:text-sm font-bold uppercase tracking-widest">
              Most Saved This Week
            </span>
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
              Top picks right now
            </h2>
            <p className="text-white/50 mt-2 text-sm sm:text-base max-w-xl">
              The gifts everyone is saving this Ramadan.
            </p>
          </div>

          {/* PREV / NEXT BUTTONS */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={goPrev}
              disabled={page === 0}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200
                ${page === 0
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-white/20 text-white hover:bg-[#EE8070] hover:border-[#EE8070] hover:text-black active:scale-95"
                }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className="text-white/30 text-sm tabular-nums min-w-[36px] text-center">
              {page + 1} / {totalPages}
            </span>

            <button
              onClick={goNext}
              disabled={page === totalPages - 1}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center transition-all duration-200
                ${page === totalPages - 1
                  ? "border-white/10 text-white/20 cursor-not-allowed"
                  : "border-white/20 text-white hover:bg-[#EE8070] hover:border-[#EE8070] hover:text-black active:scale-95"
                }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ANIMATED GRID */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "tween",
                ease: [0.25, 0.46, 0.45, 0.94],
                duration: 0.32,
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
            >
              {currentItems.map((item, i) => (
                <div
                  key={i}
                  className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
                >
                  <img src={item.image} alt={item.name} className="h-24 sm:h-28 md:h-32 flex items-center w-full object-cover justify-center text-3xl sm:text-4xl bg-white/5" />
                  <div className="p-3 sm:p-4">
                    <h3 className="text-white font-bold text-xs sm:text-sm mb-1 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[#EE8070] font-bold text-sm sm:text-base mb-1 sm:mb-2">
                      {item.price}
                    </p>
                    <div className="text-white/40 text-xs uppercase tracking-wide font-bold flex items-center ">
                      {item.brand} <Dot /> {item.saves} saves
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DOT INDICATORS */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === page ? "w-6 h-2 bg-[#EE8070]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trending;