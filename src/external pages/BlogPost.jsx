import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { blogPosts } from "./../data/blogs";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const post      = blogPosts.find((p) => p.slug === slug);

  // ── Always scroll to top when post loads or slug changes ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center cursor-pointer"
        style={{ background: "#FAF7F2" }}>
        <div className="text-center">
          <p className="text-2xl mb-4">Post not found 🤷</p>
          <button onClick={() => navigate("/blog")} className="text-[#E8614D] font-bold underline">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const initial = post.author.charAt(0).toUpperCase();

  return (
    <div
      className="min-h-screen w-full mt-20 md:px-20"
      style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}
    >
      {/* Back bar */}
      <div className="max-w-5xl mx-auto px-5 pt-14">
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2C1A12]/70
            px-4 py-2.5 rounded-full border border-[#2C1A12]/15 bg-white
            hover:text-[#2C1A12] hover:border-[#2C1A12]/30 hover:-translate-x-0.5
            transition-all duration-200"
          style={{ boxShadow: "0 2px 8px rgba(44,26,18,.07)" }}
        >
          ← Back to Blog
        </button>
      </div>

      {/* Post */}
      <div className="max-w-[740px] mx-auto px-5 md:px-20 pt-10 pb-24">

        {/* Tag */}
        <span
          className="inline-block text-[.68rem]  tracking-[.12em] uppercase
            px-3 py-1 rounded-full mb-5"
          style={{ background: "rgba(232,97,77,.09)", color: "#E8614D" }}
        >
          {post.tag}
        </span>

        {/* Title */}
        <h1
          className="text-[2rem] sm:text-[2.8rem] font-black text-[#2C1A12] leading-none tracking-tight mb-5"
          style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[#2C1A12]/10">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center
              text-white text-base flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#E8614D)" }}
          >
            {initial}
          </div>
          <div>
            <p className="text-sm font-bold text-[#2C1A12]">{post.author}</p>
            <p className="text-xs text-[#2C1A12]/45">{post.date} · {post.readTime}</p>
          </div>
        </div>

        {/* Real hero image */}
        <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content sections */}
        <div>
          {post.sections.map((section, i) => {
            if (section.quote) {
              return (
                <blockquote
                  key={i}
                  className="border-l-[3px] border-[#E8614D] pl-5 py-3 my-8 rounded-r-xl"
                  style={{
                    background: "rgba(232,97,77,.05)",
                    fontFamily: "'Fraunces','Georgia',serif",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "#2C1A12",
                    lineHeight: 1.6,
                  }}
                >
                  "{section.quote}"
                </blockquote>
              );
            }
            return (
              <div key={i}>
                {section.heading && (
                  <h2
                    className="text-[1.4rem] font-bold text-[#2C1A12] mt-9 mb-3"
                    style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.02em" }}
                  >
                    {section.heading}
                  </h2>
                )}
                {section.body && (
                  <p className="text-[1rem] text-[#2C1A12]/70 leading-[1.8] mb-5">
                    {section.body}
                  </p>
                )}
                {section.isList && section.items && (
                  <ul className="pl-5 mb-5 space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-[1rem] text-[#2C1A12]/70 leading-[1.75] list-disc">
                        <strong className="text-[#2C1A12]/90">{item.bold}</strong>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl p-8 sm:p-10 text-center mt-12"
          style={{ background: "linear-gradient(135deg,rgba(232,97,77,.07),rgba(240,168,48,.07))" }}
        >
          <h3
            className="text-[1.3rem] font-black text-[#2C1A12] mb-2"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            {post.cta.heading}
          </h3>
          <p className="text-sm text-[#2C1A12]/60 mb-6">{post.cta.sub}</p>
          <button
            onClick={() => navigate("/generate")}
            className="px-8 py-3.5 rounded-full font-fraunce font-bold text-base text-white tracking-wide
              hover:opacity-90
              transition-all hover:scale-[1.02] duration-200"
            style={{
              background: "linear-gradient(135deg,#E8614D)",
              boxShadow: "0 6px 24px rgba(232,97,77,.32)",
            }}
          >
            Try Giftly Now →
          </button>
        </div>

        {/* Related posts */}
        <div className="mt-16">
          <h3
            className="text-lg font-black text-[#2C1A12] mb-6"
            style={{ fontFamily: "'Fraunces','Georgia',serif" }}
          >
            More from the Journal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((related) => (
                <div
                  key={related.slug}
                  onClick={() => {
                    navigate(`/blog/${related.slug}`);
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer
                    border border-[#2C1A12]/08 group flex gap-0
                    hover:-translate-y-0.5 transition-all duration-200"
                  style={{ boxShadow: "0 3px 16px rgba(44,26,18,.06)" }}
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-full shrink-0 overflow-hidden self-stretch">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Text */}
                  <div className="p-3 min-w-0">
                    <span className="text-[.6rem]  tracking-widest uppercase text-[#E8614D]">
                      {related.tag}
                    </span>
                    <p
                      className="text-sm font-black text-[#2C1A12] leading-snug line-clamp-2 
                        group-hover:text-[#E8614D] transition-colors duration-200"
                      style={{ fontFamily: "'Fraunces','Georgia',serif" }}
                    >
                      {related.title}
                    </p>
                    <p className="text-[.68rem] text-[#2C1A12]/40 mt-0.5">{related.readTime}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
      `}</style>
    </div>
  );
}