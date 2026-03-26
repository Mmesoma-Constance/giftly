import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "./../data/blogs";

const Blogs = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/50 scroll-mt-21">
      <div className="container mx-auto px-6 lg:px-20">

        {/* 🔥 HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pb-14"
          id="blog"
        >
          <span className="text-[#C94B38] text-xs sm:text-sm font-bold uppercase tracking-widest">
            Gifting Wisdom
          </span>
          <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            Why thoughtful gifting matters
          </h2>
          <p className="text-black/90 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Ideas, tips, and inspiration to become the best gift-giver in any room.
          </p>
        </motion.div>

        {/* 🔥 BLOG GRID — show only first 3 on homepage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.slice(0, 3).map((b, i) => (
            <motion.div
              key={b.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${b.slug}`}
                className="group block h-full bg-white rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* 🖼 IMAGE (TOP) */}
                <div className="relative w-full h-44 md:h-48 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                </div>

                {/* 📝 CONTENT */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {b.excerpt}
                  </p>

                  {/* ⏱ FOOTER */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-black">
                      <Clock className="w-3 h-3" />
                      {b.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-black font-medium">
                      Read
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="flex justify-center items-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full mt-10
              text-sm sm:text-base text-[#C94B38] border border-[#C94B38] font-semibold
              hover:opacity-90 transition-all hover:bg-[#C94B38] hover:text-white
              hover:shadow-glow hover:scale-[1.02]"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;