const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ── Different query angle sets — rotated each "Show More" click ──
const QUERY_ANGLES = [
  // Angle 0 — occasion + relationship (default)
  ({ age, gender, relationship, occasion, interests }) => {
    const g   = gender === "female" ? "women" : gender === "male" ? "men" : "unisex";
    const rel = relationship || "friend";
    const occ = occasion || "gift";
    const queries = [];
    if (occasion && relationship) queries.push(`${occ} gift for ${rel} ${g}`);
    else queries.push(`best gift for ${rel} ${g}`);
    if (interests) {
      const top = interests.split(/[\s,]+/).filter(Boolean).slice(0, 2).join(" ");
      queries.push(`${top} gift ${g}`);
    } else {
      queries.push(`best gift for ${age} year old ${g}`);
    }
    const terms = ["unique", "popular", "top rated", "best selling"];
    queries.push(`${terms[0]} ${occ} gifts ${g}`);
    return queries;
  },

  // Angle 1 — interest-first, different phrasing
  ({ age, gender, relationship, occasion, interests }) => {
    const g   = gender === "female" ? "her" : gender === "male" ? "him" : "them";
    const occ = occasion || "special occasion";
    const queries = [];
    if (interests) {
      const list = interests.split(/[\s,]+/).filter(Boolean);
      const a = list[0] || "lifestyle";
      const b = list[1] || "fashion";
      queries.push(`${a} gift ideas for ${g}`);
      queries.push(`${b} presents for ${g}`);
    } else {
      queries.push(`thoughtful gift ideas for ${g}`);
      queries.push(`meaningful presents for ${age} year old`);
    }
    queries.push(`${occ} gift ideas ${g} ${age}s`);
    return queries;
  },

  // Angle 2 — price + category focus
  ({ age, gender, relationship, occasion, interests }) => {
    const g   = gender === "female" ? "women" : gender === "male" ? "men" : "people";
    const rel = relationship || "friend";
    const queries = [];
    queries.push(`luxury gift set for ${rel}`);
    queries.push(`affordable gift ideas for ${g} ${age}s`);
    if (interests) {
      const top = interests.split(/[\s,]+/).filter(Boolean).slice(0, 1).join(" ");
      queries.push(`premium ${top} gift ${g}`);
    } else {
      queries.push(`popular gift set ${g}`);
    }
    return queries;
  },

  // Angle 3 — trending + discovery angle
  ({ age, gender, relationship, occasion, interests }) => {
    const g   = gender === "female" ? "women" : gender === "male" ? "men" : "unisex";
    const occ = occasion || "birthday";
    const queries = [];
    queries.push(`trending ${occ} gifts ${g} 2025`);
    queries.push(`best seller gift ${g} ${age}`);
    if (interests) {
      const top = interests.split(/[\s,]+/).filter(Boolean).slice(0, 2).join(" ");
      queries.push(`${top} enthusiast gift ideas`);
    } else {
      queries.push(`unique gift ideas for ${g}`);
    }
    return queries;
  },

  // Angle 4 — highly specific niche
  ({ age, gender, relationship, occasion, interests }) => {
    const g   = gender === "female" ? "girlfriend" : gender === "male" ? "boyfriend" : "partner";
    const rel = relationship || g;
    const queries = [];
    queries.push(`handmade gift for ${rel}`);
    queries.push(`personalised gift ${rel} ${occasion || "birthday"}`);
    if (interests) {
      const top = interests.split(/[\s,]+/).filter(Boolean).slice(0, 2).join(" ");
      queries.push(`${top} lover gift basket`);
    } else {
      queries.push(`curated gift box for ${rel}`);
    }
    return queries;
  },
];

function buildQueries(formData, variation = 0) {
  const angleIndex = variation % QUERY_ANGLES.length;
  const queries    = QUERY_ANGLES[angleIndex](formData);
  console.log(`🔍 Giftly search queries [angle ${angleIndex}]:`, queries);
  return queries;
}

export async function searchGifts(formData, variation = 0) {
  const queries = buildQueries(formData, variation);

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