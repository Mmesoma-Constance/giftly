import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
  <section className="text-center px-5 py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,rgba(232,97,77,.05),rgba(240,168,48,.05))' }}>
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-175 h-175 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,97,77,.07) 0%, transparent 60%)' }} />
      <span className="text-[.72rem] font-bold tracking-[.14em] uppercase text-rose mb-[14px] block ">Start Free · No Account Needed</span>
      <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold text-ink leading-[1.12] tracking-[-0.03em] mb-4">
        Ready to find the<br /><em className="text-[#E8614D] not-italic">perfect gift</em>? 
      </h2>
      <p className="text-[1.05rem] text-ink-70 mb-10 max-w-[480px] mx-auto">
        Join 50,000+ happy gifters who never stress about presents again.
      </p>
      <div className="flex gap-[14px] justify-center flex-wrap">
       <Link
                to="/generate-gift"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full 
                text-white bg-[#C94B38] font-semibold hover:opacity-90 transition-all hover:shadow-glow hover:scale-[1.02]"
              >
                Try It Now
                
              </Link>
        <a href="#how-it-works"
          className="inline-flex items-center justify-center bg-white text-ink font-bold text-[1rem] px-9 py-3 sm:py-4.25 
            rounded-full border-[1.5px] border-ink-15 cursor-pointer shadow-s1 hover:border-ink-30 hover:-translate-y-0.5 hover:shadow-s2 transition-all">
          How It Works
        </a>
      </div>
    </section>
  );
};

export default CTASection;