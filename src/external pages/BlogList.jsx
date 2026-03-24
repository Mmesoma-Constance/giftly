import { useNavigate } from "react-router-dom";
import { blogPosts } from "./BlogPosts";

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full mt-20"
      style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}
    >
      {/* ── Back bar ── */}
      <div className="max-w-6xl mx-auto px-5 pt-14">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2C1A12]/70
            px-4 py-2.5 rounded-full border border-[#2C1A12]/15 bg-white
            hover:text-[#2C1A12] hover:border-[#2C1A12]/30 hover:-translate-x-0.5
            transition-all duration-200"
          style={{ boxShadow: "0 2px 8px rgba(44,26,18,.07)" }}
        >
          ← Back to Home
        </button>
      </div>

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-5 pt-10 pb-4 text-center">
        <span
          className="inline-block text-xs font-bold tracking-[.18em] uppercase mb-4
            px-4 py-1.5 rounded-full border border-[#E8614D]/30 text-[#E8614D]"
          style={{ background: "rgba(232,97,77,.07)" }}
        >
          Giftly Journal
        </span>
        <h1
          className="text-[2.5rem] sm:text-[3.4rem] font-black leading-none tracking-tight text-[#2C1A12] mb-4"
          style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}
        >
          Gifting wisdom &amp;<br className="hidden sm:block" /> inspiration
        </h1>
        <p className="text-base text-[#2C1A12]/60 leading-relaxed max-w-md mx-auto mb-12">
          Deep dives into the art and psychology of thoughtful giving.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-5 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} onClick={() => navigate(`/blog/${post.slug}`)} />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
      `}</style>
    </div>
  );
}

function BlogCard({ post, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer
        border border-[#2C1A12]/08 group
        transition-all duration-300 hover:-translate-y-1.5"
      style={{ boxShadow: "0 4px 24px rgba(44,26,18,.07),0 1px 4px rgba(44,26,18,.04)" }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 16px 48px rgba(44,26,18,.14),0 2px 8px rgba(44,26,18,.06)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 24px rgba(44,26,18,.07),0 1px 4px rgba(44,26,18,.04)")}
    >
      {/* Hero area */}
      <div
        className="w-full h-44 flex items-center justify-center text-6xl"
        style={{ background: post.bg }}
      >
        {post.icon}
      </div>

      {/* Body */}
      <div className="p-6">
        <span
          className="inline-block text-[.68rem] font-black tracking-[.12em] uppercase
            px-3 py-1 rounded-full mb-3"
          style={{ background: "rgba(232,97,77,.09)", color: "#E8614D" }}
        >
          {post.tag}
        </span>

        <h2
          className="text-[1.05rem] font-black text-[#2C1A12] leading-snug mb-2 line-clamp-2
            group-hover:text-[#E8614D] transition-colors duration-200"
          style={{ fontFamily: "'Fraunces','Georgia',serif" }}
        >
          {post.title}
        </h2>

        <p className="text-sm text-[#2C1A12]/55 leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#2C1A12]/70">{post.author}</p>
            <p className="text-[.7rem] text-[#2C1A12]/40">{post.date} · {post.readTime}</p>
          </div>
          <span
            className="text-xs font-black text-[#E8614D] tracking-wide
              group-hover:translate-x-1 transition-transform duration-200"
          >
            Read →
          </span>
        </div>
      </div>
    </div>
  );
}