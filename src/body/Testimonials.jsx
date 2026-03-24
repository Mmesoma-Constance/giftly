import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    name: "Amaka O.",
    role: "Found a gift for her husband",
    text: "I was stuck for weeks trying to find an anniversary gift. Giftly gave me 5 perfect options in seconds. My husband loved the watch!",
    rating: 5,
  },
  {
    name: "Tunde A.",
    role: "Birthday gift for girlfriend",
    text: "The suggestions were spot-on. It felt like the app actually understood what she'd like. Saved me hours of browsing random stores.",
    rating: 5,
  },
  {
    name: "Chioma E.",
    role: "Gift for best friend",
    text: "Affordable, thoughtful, and unique — that's what I got from Giftly. My friend was so surprised. I'll definitely use this again!",
    rating: 5,
  },
];

const POSITIONS = {
  left:   { x: "-72%", rotate: -10, scale: 0.88, zIndex: 10, opacity: 0.6 },
  center: { x: "0%",   rotate: 0,   scale: 1.12, zIndex: 30, opacity: 1   },
  right:  { x: "72%",  rotate: 10,  scale: 0.88, zIndex: 10, opacity: 0.6 },
};

export default function Testimonials() {
  const [order, setOrder] = useState([0, 1, 2]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setOrder(([a, b, c]) => [b, c, a]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (clickedIndex) => {
    if (clickedIndex === 1) return; // already center
    setDirection(clickedIndex === 2 ? 1 : -1);
    setOrder((prev) => {
      const newOrder = [...prev];
      const clickedValue = newOrder[clickedIndex];
      newOrder.splice(clickedIndex, 1);
      newOrder.splice(1, 0, clickedValue);
      return newOrder;
    });
  };

  const posKeys = ["left", "center", "right"];

  return (
    <section className="py-24 md:py-28 flex flex-col items-center scroll-mt-21 overflow-hidden"
     style={{ background: 'linear-gradient(135deg,rgba(232,97,77,.05),rgba(240,168,48,.05))' }}
     
    id="testimonials">

      {/* HEADING */}
    
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        > 
            <span className="text-[#C94B38] text-xs sm:text-sm font-bold uppercase tracking-widest">
              Loved by Gifters
            </span>
            <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
              Real stories, real joy
            </h2>
            <p className="text-black/90 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Real stories from happy users who found the perfect gift effortlessly
            </p>
          </motion.div>

      {/* CARDS */}
      <div className="relative w-full max-w-275 h-105 flex justify-center items-center">
        {order.map((testimonialIndex, slotIndex) => {
          const t = testimonials[testimonialIndex];
          const posKey = posKeys[slotIndex];
          const pos = POSITIONS[posKey];
          const isCenter = slotIndex === 1;

          return (
            <motion.div
              key={testimonialIndex}
              onClick={() => handleClick(slotIndex)}
              initial={{
                x: direction > 0 ? "130%" : "-130%",
                rotate: direction > 0 ? 15 : -15,
                scale: 0.75,
                opacity: 0,
              }}
              animate={{
                x: pos.x,
                rotate: pos.rotate,
                scale: pos.scale,
                opacity: pos.opacity,
                zIndex: pos.zIndex,
              }}
              exit={{
                x: direction > 0 ? "-130%" : "130%",
                rotate: direction > 0 ? -15 : 15,
                scale: 0.75,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 22,
                mass: 0.8,
              }}
              whileHover={{
                scale: isCenter ? 1.15 : 0.92,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              style={{ position: "absolute" }}
              className="w-65 md:w-85 bg-white rounded-2xl shadow-2xl 
              p-6 md:p-8 flex flex-col justify-between cursor-pointer"
            >
              {/* ⭐ Rating */}
              <div className="flex mb-3 text-lg">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>

              {/* 💬 Text */}
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                "{t.text}"
              </p>

              {/* 👤 User */}
              <div className="mt-auto">
                <h3 className="font-bold text-base md:text-lg">{t.name}</h3>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* DOT INDICATORS */}
      <div className="flex gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const currentCenter = order[1];
              if (currentCenter === i) return;
              const slotIndex = order.indexOf(i);
              handleClick(slotIndex);
            }}
            className={`rounded-full transition-all duration-300 ${
              order[1] === i
                ? "w-6 h-2.5 bg-[#C94B38]"
                : "w-2.5 h-2.5 bg-[#c97366]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}