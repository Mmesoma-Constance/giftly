import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroGift from "./../assets/images.png";

const Hero = () => {
  return (
    <section className="relative bg-amber-50 pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
           
            <h1 className="font-fraunces text-4xl md:text-6xl font-extrabold text-foreground leading-tighter mb-6">
              Find the  <span className="text-[#E8614D] ">Perfect</span>  Gift in{" "}
             
               <span className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1
                after:h-[4px] after:bg-gradient-to-r after:from-[#C94B38] after:to-[#EE8070] after:rounded">
    Seconds
  </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Stop stressing over gift ideas. Giftly uses smart AI logic to suggest thoughtful, personalized gifts for any person, any occasion — within your budget. </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/generator"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full 
                text-white bg-[#C94B38] font-semibold hover:opacity-90 transition-all hover:shadow-glow hover:scale-[1.02]"
              >
                Try It Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#examples"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-border text-foreground font-semibold hover:bg-secondary transition-all hover:scale-[1.02]"
              >
                See Examples
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl" />
              <img src={heroGift} alt="Gift box" className="relative w-80 md:w-96 animate-float" />
            </div>
            {/* Floating product cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-8 -left-4 md:left-0 bg-card rounded-2xl p-3 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">👜</div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Designer Bag</p>
                  <p className="text-xs text-muted-foreground">₦15,000</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-12 -right-4 md:right-0 bg-card rounded-2xl p-3 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-lg">⌚</div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Smart Watch</p>
                  <p className="text-xs text-muted-foreground">₦45,000</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;