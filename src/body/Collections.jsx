import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Collection.css";
import CollectionModal from "./CollectionModal";

import image1 from "../assets/img1.jpg";
import image2 from "../assets/sneakers.webp";
import image3 from "../assets/perf.jpg";
import image4 from "../assets/head.jpg";
import image5 from "../assets/skincare.jpg";
import image6 from "../assets/jewelry.webp";
import image7 from "../assets/wine.jpg";
import image8 from "../assets/game.jpg";

const COLLECTIONS = [
  {
    tag: "Popular",
    title: "Gifts for Boyfriend under ₦20,000",
    desc: "Cool, stylish picks he'll actually use — from tech accessories to grooming essentials.",
    images: [image1, image4, image2],
    products: [3, 16, 6],
    preset: { relationship: "boyfriend", gender: "male", budget: 20000 },
  },
  {
    tag: "Trending",
    title: "Birthday Gifts for Mom",
    desc: "Thoughtful, heartfelt gifts that show your mum exactly how much she means to you.",
    images: [image3, image7, image5],
    products: [25, 29, 28],
    preset: { relationship: "mom", gender: "female", budget: 25000, occasion: "birthday" },
  },
  {
    tag: "Budget-Friendly",
    title: "Affordable Gifts for Best Friend",
    desc: "Great options under ₦12,000 — because friendship deserves celebration without financial stress.",
    images: [image1, image2, image5],
    products: [23, 27, 11],
    preset: { relationship: "best-friend", budget: 12000 },
  },
  {
    tag: "Romance",
    title: "Valentine's Day for Her",
    desc: "Romantic and luxurious picks to make her feel truly special and completely adored.",
    images: [image6, image3, image5],
    products: [1, 5, 12],
    preset: { relationship: "girlfriend", gender: "female", budget: 30000, occasion: "valentine" },
  },
  {
    tag: "Professional",
    title: "Corporate Gifts for a Colleague",
    desc: "Tasteful, professional gifts perfect for the workplace — impressive without being too personal.",
    images: [image1, image4, image2],
    products: [17, 18, 24],
    preset: { relationship: "colleague", budget: 20000, occasion: "just-because" },
  },
  {
    tag: "For Dad",
    title: "Father's Day Gift Ideas",
    desc: "Practical and stylish gifts that show Dad you appreciate everything he does for you.",
    images: [image1, image2, image3],
    products: [13, 10, 26],
    preset: { relationship: "dad", gender: "male", budget: 25000 },
  },
  // Duplicated for seamless scroll loop
  {
    tag: "Popular",
    title: "Gifts for Boyfriend under ₦20,000",
    desc: "Cool, stylish picks he'll actually use — from tech accessories to grooming essentials.",
    images: [image1, image4, image2],
    products: [3, 16, 6],
    preset: { relationship: "boyfriend", gender: "male", budget: 20000 },
  },
  {
    tag: "Trending",
    title: "Birthday Gifts for Mom",
    desc: "Thoughtful, heartfelt gifts that show your mum exactly how much she means to you.",
    images: [image3, image7, image5],
    products: [25, 29, 28],
    preset: { relationship: "mom", gender: "female", budget: 25000, occasion: "birthday" },
  },
  {
    tag: "Budget-Friendly",
    title: "Affordable Gifts for Best Friend",
    desc: "Great options under ₦12,000 — because friendship deserves celebration without financial stress.",
    images: [image1, image2, image5],
    products: [23, 27, 11],
    preset: { relationship: "best-friend", budget: 12000 },
  },
  {
    tag: "Romance",
    title: "Valentine's Day for Her",
    desc: "Romantic and luxurious picks to make her feel truly special and completely adored.",
    images: [image6, image3, image5],
    products: [1, 5, 12],
    preset: { relationship: "girlfriend", gender: "female", budget: 30000, occasion: "valentine" },
  },
  {
    tag: "Professional",
    title: "Corporate Gifts for a Colleague",
    desc: "Tasteful, professional gifts perfect for the workplace — impressive without being too personal.",
    images: [image1, image4, image2],
    products: [17, 18, 24],
    preset: { relationship: "colleague", budget: 20000, occasion: "just-because" },
  },
  {
    tag: "For Dad",
    title: "Father's Day Gift Ideas",
    desc: "Practical and stylish gifts that show Dad you appreciate everything he does for you.",
    images: [image1, image2, image3],
    products: [13, 10, 26],
    preset: { relationship: "dad", gender: "male", budget: 25000 },
  },
];

const Collection = ({ onSeeAll }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section className="py-20" id="feed">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center px-4" id="collections"
      >
        <span className="text-[#C94B38] text-xs sm:text-sm font-bold uppercase tracking-widest">
          Curated Collections
        </span>
        <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
          Gift ideas we've hand-picked
        </h2>
        <p className="text-black/70 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Click any collection to preview the picks or jump straight to personalized results.
        </p>
      </motion.div>

      {/* ── Scrolling Feed ── */}
      <div className="relative overflow-hidden mt-12">

        {/* Left fade */}
        <div
          className="absolute top-0 bottom-0 left-0 w-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #F6F3F0, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute top-0 bottom-0 right-0 w-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #F6F3F0, transparent)" }}
        />

        {/* Track */}
        <div className="flex gap-5 w-max animate-feedScroll hover:pause-feedScroll py-3 px-2">
          {COLLECTIONS.map((c, i) => (
            <div
              key={i}
              onClick={() => setActiveModal(i)}
              className="w-[300px] flex-shrink-0 bg-white rounded-[22px] overflow-hidden cursor-pointer
                border-[1.5px] border-transparent shadow-sm
                hover:-translate-y-1.5 hover:shadow-xl hover:border-[#EDE8E3]
                transition-all duration-[350ms] group"
            >
              {/* Image Grid — replaces emoji grid */}
              <div className="grid grid-cols-3 h-[130px] gap-px bg-[#F6F3F0]">
                {c.images.map((img, j) => (
                  <div key={j} className="w-full h-full overflow-hidden">
                    <img
                      src={img}
                      alt={`${c.title} ${j + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="p-5">
                <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-[#E8614D] mb-[7px] block">
                  {c.tag}
                </span>
                <div className="font-bold text-[1rem] text-[#1C1410] mb-[7px] leading-[1.3]">
                  {c.title}
                </div>
                <p className="text-[0.86rem] text-[#5C4A3F] leading-[1.55]">{c.desc}</p>
              </div>

              {/* Footer */}
              <div className="px-5 py-[14px] border-t border-[#F6F3F0] flex justify-between items-center">
                <span className="text-[0.8rem] text-black/90 font-semibold">
                  {c.products.length} gift ideas
                </span>
                <div
                  className="w-[30px] h-[30px] rounded-full bg-[#E8614D] text-white
                    flex items-center justify-center text-[0.9rem]
                    transition-transform duration-300
                    group-hover:rotate-[-42deg] group-hover:scale-110"
                >
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      {activeModal !== null && (
        <CollectionModal
          collection={COLLECTIONS[activeModal]}
          collectionIndex={activeModal}
          onClose={() => setActiveModal(null)}
          onSeeAll={onSeeAll}
        />
      )}

    </section>
  );
};

export default Collection;