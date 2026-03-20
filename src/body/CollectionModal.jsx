import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  { id:1,  name:"Pearl Drop Earrings",           price:12500, image:image6, bg:"#fce4ec", source:"jumia"  },
  { id:3,  name:"Men's Stainless Steel Watch",   price:22000, image:image1, bg:"#eceff1", source:"amazon" },
  { id:5,  name:"Couple Locket Necklace",        price:11000, image:image6, bg:"#fce4ec", source:"amazon" },
  { id:6,  name:"Classic White Sneakers",        price:17500, image:image2, bg:"#f5f5f5", source:"jumia"  },
  { id:10, name:"Premium Leather Loafers",       price:21000, image:image2, bg:"#efebe9", source:"amazon" },
  { id:11, name:"Oversized Comfort Hoodie",      price:8500,  image:image1, bg:"#e3f2fd", source:"jumia"  },
  { id:12, name:"Silk Satin Robe & Nightwear",   price:13000, image:image5, bg:"#fce4ec", source:"amazon" },
  { id:13, name:"Premium Linen Button-Up Shirt", price:10500, image:image1, bg:"#e8f5e9", source:"zara"   },
  { id:16, name:"Wireless Earbuds",              price:25000, image:image4, bg:"#e8f5e9", source:"amazon" },
  { id:17, name:"Smart Ambient Desk Lamp",       price:12000, image:image8, bg:"#fff3e0", source:"amazon" },
  { id:18, name:"Portable Power Bank 20,000mAh", price:14500, image:image8, bg:"#eceff1", source:"konga"  },
  { id:23, name:"Canvas Tote Bag",               price:5500,  image:image1, bg:"#f1f8e9", source:"konga"  },
  { id:24, name:"Genuine Leather Bifold Wallet", price:8000,  image:image1, bg:"#efebe9", source:"amazon" },
  { id:25, name:"Luxury Perfume Gift Set",       price:22000, image:image3, bg:"#fce4ec", source:"glam"   },
  { id:26, name:"Signature Men's Cologne",       price:18500, image:image3, bg:"#eceff1", source:"amazon" },
  { id:27, name:"Premium UV400 Sunglasses",      price:9500,  image:image1, bg:"#fff3e0", source:"jumia"  },
  { id:28, name:"Complete Skincare Gift Set",    price:16000, image:image5, bg:"#fce4ec", source:"glam"   },
  { id:29, name:"Artisan Scented Candle Set",    price:7800,  image:image7, bg:"#fff8e1", source:"konga"  },
];

const CollectionModal = ({ collection,  onClose, onSeeAll }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!collection) return null;

  const featuredProducts = collection.products
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const handleSeeAll = () => {
    onClose();
    if (onSeeAll) {
      onSeeAll(collection.preset);
    } else {
      const { relationship, gender, budget, occasion } = collection.preset;
      const params = new URLSearchParams();
      if (relationship) params.set("relationship", relationship);
      if (gender)       params.set("gender", gender);
      if (budget)       params.set("budget", String(budget));
      if (occasion)     params.set("occasion", occasion);
      navigate(`/results?${params.toString()}`);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-9800 flex items-center justify-center p-5"
        style={{
          background: "rgba(28,20,16,.55)",
          backdropFilter: "blur(8px)",
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="bg-[#FFFDF9] rounded-4xl w-full max-w-130 max-h-[88vh] overflow-y-auto"
          style={{
            boxShadow: "0 12px 40px rgba(28,20,16,.12), 0 24px 64px rgba(28,20,16,.08)",
          }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── HEAD ── */}
          <div className="flex justify-between items-start pt-7 px-7">
            <div>
              <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-[#E8614D] block mb-1">
                {collection.tag}
              </span>
              <h2 className="font-fraunces text-[1.3rem] font-extrabold text-[#1C1410] leading-snug">
                {collection.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8.5 h-8.5 rounded-full bg-[#F6F3F0] border-none cursor-pointer
                flex items-center justify-center text-[1.1rem] text-[#1C1410] shrink-0
                hover:bg-[#EDE8E3] hover:scale-110 transition-all duration-200"
            >
              ✕
            </button>
          </div>

          {/* ── BODY ── */}
          <div className="px-7 pt-5 pb-7">

            {/* Image grid — 3 columns using collection images */}
            <div className="grid grid-cols-3 gap-1.5 rounded-1.5 overflow-hidden h-35 mb-5">
              {collection.images.map((img, i) => (
                <div key={i} className="w-full h-full overflow-hidden">
                  <img
                    src={img}
                    alt={`collection-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-[0.9rem] text-[#5C4A3F] leading-[1.7] mb-6">
              {collection.desc}
            </p>

            {/* Featured picks label */}
            <div className="font-bold text-[0.84rem] text-[#1C1410] mb-3.5">
              ✨ Featured Picks
            </div>

            {/* Product rows */}
            <div>
              {featuredProducts.map((p, i) => {
                const src = SOURCES[p.source] || SOURCES.amazon;
                return (
                  <div
                    key={p.id}
                    className={`flex items-center gap-3 py-3 ${
                      i < featuredProducts.length - 1
                        ? "border-b border-[#F6F3F0]"
                        : ""
                    }`}
                  >
                    {/* Product thumbnail image */}
                    <div className="w-12 h-12 rounded-[10px] overflow-hidden shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name + source */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[0.88rem] text-[#1C1410] leading-snug truncate">
                        {p.name}
                      </div>
                      <div className="text-[0.75rem] text-[#9C8B82] mt-0.5">
                        {src.icon} {src.name}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="font-fraunces font-bold text-[#E8614D] text-[0.95rem] shrink-0">
                      ₦{p.price.toLocaleString()}
                    </div>

                    {/* Buy button */}
                    
                     <a href={`https://${src.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 px-3 py-1.5 rounded-full bg-[#E8614D] text-white
                        font-bold text-[0.76rem] no-underline
                        hover:bg-[#C94B38] hover:-translate-y-px
                        transition-all duration-200"
                      style={{ boxShadow: "0 4px 12px rgba(232,97,77,.3)" }}
                    >
                      Buy →
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── FOOTER ACTIONS ── */}
          <div className="flex gap-3 px-7 pb-7">
            <button
              onClick={onClose}
              className="px-5 py-2.75 rounded-full bg-transparent text-[#5C4A3F] font-bold
                border-[1.5px] border-[#EDE8E3] cursor-pointer text-[0.82rem]
                hover:bg-[#F6F3F0] transition-all duration-200"
            >
              Close
            </button>
            <button
              onClick={handleSeeAll}
              className="flex-1 py-2.75 rounded-full bg-[#E8614D] text-white font-bold
                border-none cursor-pointer text-[0.9rem]
                hover:bg-[#C94B38] hover:-translate-y-px
                transition-all duration-250"
              style={{ boxShadow: "0 8px 32px rgba(232,97,77,.28)" }}
            >
              See All Suggestions 
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CollectionModal;