const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

function buildQueries({ age, gender, relationship, occasion, interests }) {
  const queries = [];
  const g   = gender === "female" ? "women" : gender === "male" ? "men" : "unisex";
  const rel = relationship || "friend";
  const occ = occasion || "gift";

  // Query 1 — occasion + relationship + gender (most specific)
  if (occasion && relationship) {
    queries.push(`${occ} gift for ${rel} ${g}`);
  } else if (relationship) {
    queries.push(`best gift for ${rel} ${g}`);
  }

  // Query 2 — interest-based (pulls completely different products)
  if (interests) {
    const interestList = interests
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter((w) => w.length > 2);
    const picked = interestList
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .join(" ");
    queries.push(`${picked} gift ${g}`);
  } else {
    // fallback: age + gender
    queries.push(`best gift for ${age} year old ${g}`);
  }

  // Query 3 — trending angle (always different from above)
  const trendingTerms = ["unique", "popular", "top rated", "best selling"];
  const term = trendingTerms[Math.floor(Math.random() * trendingTerms.length)];
  queries.push(`${term} ${occ} gifts ${g} ${age}s`);

  console.log("🔍 Giftly search queries:", queries);
  return queries;
}

export async function searchGifts(formData) {
  const queries = buildQueries(formData);

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/search-products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        queries,
        budget_max: formData.budget,
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("❌ API error response:", errText);
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  console.log(`✅ Products received: ${data.products?.length ?? 0}`);
  return data.products || [];
}