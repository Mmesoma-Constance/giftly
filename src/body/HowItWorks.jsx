
import { motion } from "motion/react";
import { ClipboardList, Sparkles, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Enter Details",
    description: "Tell us about the recipient — age, interests, budget, and relationship.",
  },
  {
    icon: Sparkles,
    title: "We Generate Ideas",
    description: "Our smart engine finds the most relevant and thoughtful gift suggestions.",
  },
  {
    icon: ShoppingBag,
    title: "Choose & Shop",
    description: "Browse curated products and buy directly from trusted stores.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-[#180806] text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        > 
            <span className="text-[#EE8070] text-xs sm:text-sm font-bold uppercase tracking-widest">
              Simple Process
            </span>
            <h2 className="text-white font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
              Three steps to the perfect gift
            </h2>
            <p className="text-white/50 mt-2 text-sm sm:text-base max-w-xl mx-auto">
             From clueless to confidently gifted in under a minute.
            </p>
          </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-[#EE8070]" />
              </div>
              <div className="text-sm font-bold text-primary mb-2">Step {i + 1}</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;