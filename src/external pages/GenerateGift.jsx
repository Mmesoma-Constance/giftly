import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const INTERESTS_PLACEHOLDER = "e.g. music, skincare, gaming, cooking, fashion, fitness…";

const RELATIONSHIP_BY_GENDER = {
  female: [
    { group: "Partner",          options: [["girlfriend","Girlfriend"],["wife","Wife"]] },
    { group: "Family",           options: [["mom","Mom"],["sister","Sister"],["grandparent","Grandparent"],["child","Child"]] },
    { group: "Friends & Others", options: [["best-friend","Best Friend"],["friend","Friend"],["colleague","Colleague"],["boss","Boss"]] },
  ],
  male: [
    { group: "Partner",          options: [["boyfriend","Boyfriend"],["husband","Husband"]] },
    { group: "Family",           options: [["dad","Dad"],["brother","Brother"],["grandparent","Grandparent"],["child","Child"]] },
    { group: "Friends & Others", options: [["best-friend","Best Friend"],["friend","Friend"],["colleague","Colleague"],["boss","Boss"]] },
  ],
  nonbinary: [
    { group: "Partner",          options: [["girlfriend","Girlfriend"],["boyfriend","Boyfriend"],["wife","Wife"],["husband","Husband"]] },
    { group: "Family",           options: [["mom","Mom"],["dad","Dad"],["sister","Sister"],["brother","Brother"],["grandparent","Grandparent"],["child","Child"]] },
    { group: "Friends & Others", options: [["best-friend","Best Friend"],["friend","Friend"],["colleague","Colleague"],["boss","Boss"]] },
  ],
  "": [
    { group: "Partner",          options: [["girlfriend","Girlfriend"],["boyfriend","Boyfriend"],["wife","Wife"],["husband","Husband"]] },
    { group: "Family",           options: [["mom","Mom"],["dad","Dad"],["sister","Sister"],["brother","Brother"],["grandparent","Grandparent"],["child","Child"]] },
    { group: "Friends & Others", options: [["best-friend","Best Friend"],["friend","Friend"],["colleague","Colleague"],["boss","Boss"]] },
  ],
};

const RELATIONSHIPS_FEMALE    = ["girlfriend","wife","mom","sister","grandparent","child","best-friend","friend","colleague","boss"];
const RELATIONSHIPS_MALE      = ["boyfriend","husband","dad","brother","grandparent","child","best-friend","friend","colleague","boss"];
const RELATIONSHIPS_NONBINARY = ["girlfriend","boyfriend","wife","husband","mom","dad","sister","brother","grandparent","child","best-friend","friend","colleague","boss"];

const AGES = [
  8, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 32, 34, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 65, 70,
];

const GENDERS = ["female", "male", "nonbinary"];

const OCCASIONS = [
  "birthday", "anniversary", "valentine", "christmas", "graduation",
  "wedding", "just-because", "fathers-day", "mothers-day",
  "back-to-school", "halloween", "baby-shower", "housewarming",
  "promotion", "engagement", "get-well-soon", "thank-you",
];

const BUDGETS = [
  3000, 5000, 7000, 8000, 10000, 12000, 15000, 18000,
  20000, 25000, 30000, 35000, 40000, 50000, 60000, 75000, 100000,
];

const INTEREST_POOL = [
  "skincare", "yoga", "reading", "coffee", "candles", "journaling",
  "football", "tech gadgets", "grilling", "podcasts", "chess", "cars",
  "anime", "streetwear", "music production", "sneakers", "afrobeats",
  "gardening", "cooking", "Nollywood", "church", "knitting", "baking",
  "gaming", "basketball", "fashion", "makeup", "travel", "photography",
  "fitness", "gym", "cycling", "hiking", "swimming", "dancing",
  "movies", "series", "k-drama", "art", "painting", "design",
  "music", "guitar", "piano", "singing", "writing", "poetry",
  "wine", "cocktails", "fine dining", "interior design", "plants",
  "astrology", "crystals", "meditation", "self-care", "luxury",
  "investing", "crypto", "coding", "robotics", "science",
  "tennis", "golf", "motorsport", "boxing", "MMA",
  "perfume", "jewellery", "watches", "bags", "shoes",
  "cats", "dogs", "animals", "nature", "sustainability",
  "volunteering", "entrepreneurship",
];

// ✅ Currency config — rate = how many local units = $1 USD
// Update the rates periodically or fetch live if you have an API
const CURRENCIES = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira",    rate: 1580,  budgetMin: 2000,    budgetMax: 500000,  budgetDefault: 20000,  step: 1000  },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi",     rate: 15.5,  budgetMin: 20,      budgetMax: 5000,    budgetDefault: 200,    step: 10    },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", rate: 129,   budgetMin: 200,     budgetMax: 65000,   budgetDefault: 2000,   step: 100   },
  { code: "ZAR", symbol: "R",  name: "South African Rand",rate: 18.5, budgetMin: 50,      budgetMax: 10000,   budgetDefault: 500,    step: 50    },
  { code: "GBP", symbol: "£",  name: "British Pound",     rate: 0.79,  budgetMin: 5,       budgetMax: 2000,    budgetDefault: 50,     step: 5     },
  { code: "EUR", symbol: "€",  name: "Euro",              rate: 0.92,  budgetMin: 5,       budgetMax: 2000,    budgetDefault: 50,     step: 5     },
  { code: "USD", symbol: "$",  name: "US Dollar",         rate: 1,     budgetMin: 5,       budgetMax: 1000,    budgetDefault: 30,     step: 5     },
];

function toUSD(amount, rate) {
  return (amount / rate).toFixed(2);
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function pickMultiple(arr, min = 2, max = 4) {
  const count    = min + Math.floor(Math.random() * (max - min + 1));
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(", ");
}

function generateRandomProfile(currency) {
  const gender = pick(GENDERS);
  const relationshipPool =
    gender === "female"   ? RELATIONSHIPS_FEMALE    :
    gender === "male"     ? RELATIONSHIPS_MALE      :
    RELATIONSHIPS_NONBINARY;
  // Pick a random budget within the currency's range
  const randomBudget = pick(BUDGETS.map(b => Math.round((b / 1580) * currency.rate / currency.step) * currency.step)
    .filter(b => b >= currency.budgetMin && b <= currency.budgetMax));
  return {
    age:          pick(AGES),
    gender,
    relationship: pick(relationshipPool),
    occasion:     pick(OCCASIONS),
    budget:       randomBudget || currency.budgetDefault,
    interests:    pickMultiple(INTEREST_POOL, 2, 4),
  };
}

function formatWithCommas(val) {
  if (!val && val !== 0) return "";
  return Number(val).toLocaleString("en-NG");
}

function stripCommas(val) {
  return val.replace(/,/g, "");
}

function sliderPercent(val, min, max) {
  return ((val - min) / (max - min)) * 100;
}

export default function GenerateGift() {
  const navigate = useNavigate();

  // ✅ Currency state
  const [currencyCode,  setCurrencyCode]  = useState("NGN");
  const currency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];

  const [age,           setAge]           = useState("");
  const [gender,        setGender]        = useState("");
  const [relationship,  setRelationship]  = useState("");
  const [occasion,      setOccasion]      = useState("");
  const [budget,        setBudget]        = useState(currency.budgetDefault);
  const [budgetDisplay, setBudgetDisplay] = useState(formatWithCommas(currency.budgetDefault));
  const [interests,     setInterests]     = useState("");
  const [shaking,       setShaking]       = useState(false);
  const sliderRef = useRef(null);

  const pct = sliderPercent(budget, currency.budgetMin, currency.budgetMax);
  const usdEquivalent = toUSD(budget, currency.rate);

  // ✅ When currency changes, reset budget to new default
  function handleCurrencyChange(code) {
    const newCurrency = CURRENCIES.find(c => c.code === code) || CURRENCIES[0];
    setCurrencyCode(code);
    setBudget(newCurrency.budgetDefault);
    setBudgetDisplay(formatWithCommas(newCurrency.budgetDefault));
  }

  function syncFromSlider(v) {
    const n = Number(v);
    setBudget(n);
    setBudgetDisplay(formatWithCommas(n));
  }

  function handleBudgetInputChange(e) {
    const raw     = stripCommas(e.target.value);
    const numeric = raw.replace(/[^0-9]/g, "");
    if (numeric === "") { setBudgetDisplay(""); return; }
    const n = Math.min(currency.budgetMax, Number(numeric));
    setBudget(n);
    setBudgetDisplay(formatWithCommas(n));
  }

  function handleBudgetInputBlur() {
    const clamped = Math.max(currency.budgetMin, budget || currency.budgetMin);
    setBudget(clamped);
    setBudgetDisplay(formatWithCommas(clamped));
  }

  function handleGenderChange(val) {
    setGender(val);
    const validGroups  = RELATIONSHIP_BY_GENDER[val] || RELATIONSHIP_BY_GENDER[""];
    const validOptions = validGroups.flatMap((g) => g.options.map((o) => o[0]));
    if (relationship && !validOptions.includes(relationship)) setRelationship("");
  }

  function surpriseMe() {
    const p = generateRandomProfile(currency);
    setAge(p.age);
    setGender(p.gender);
    setRelationship(p.relationship);
    setOccasion(p.occasion);
    setBudget(p.budget);
    setBudgetDisplay(formatWithCommas(p.budget));
    setInterests(p.interests);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  }

  function clearForm() {
    setAge(""); setGender(""); setRelationship("");
    setOccasion(""); setBudget(currency.budgetDefault);
    setBudgetDisplay(formatWithCommas(currency.budgetDefault)); setInterests("");
  }

  function handleSubmit() {
    if (!age || !gender || !relationship || !budget) return;
    sessionStorage.removeItem("giftly_result_visited");
    sessionStorage.removeItem("giftly_cached_results");
    // ✅ Pass budgetUSD so the result page can filter by dollar value
    navigate("/result", {
      state: {
        age, gender, relationship, occasion,
        budget,
        budgetUSD: parseFloat(usdEquivalent),
        currency: currency.code,
        currencySymbol: currency.symbol,
        interests,
      }
    });
  }

  const valid = age && gender && relationship && budget;
  const relationshipGroups = RELATIONSHIP_BY_GENDER[gender] || RELATIONSHIP_BY_GENDER[""];

  return (
    <div className="min-h-screen w-full mt-20"
      style={{ background: "#FAF7F2", fontFamily: "'Syne','DM Sans',sans-serif" }}>

      {/* Hero */}
      <div className="max-w-xl mx-auto px-5 pt-14 pb-10 text-center">
        <span className="inline-block text-xs font-syne tracking-[.18em] uppercase mb-4
            px-4 py-1.5 rounded-full border border-[#E8614D]/30 text-[#E8614D]"
          style={{ background: "rgba(232,97,77,.07)" }}>
          Your Gift Assistant
        </span>
        <h1 className="text-[2.5rem] sm:text-[3.1rem] font-black leading-none tracking-tight
            text-[#2C1A12] mb-4"
          style={{ fontFamily: "'Fraunces','Georgia',serif", letterSpacing: "-.03em" }}>
          Describe your person
        </h1>
        <p className="text-base text-[#2C1A12]/60 leading-relaxed max-w-md mx-auto">
          Fill in what you know — the more detail you share, the more personalized
          and spot-on your gift suggestions will be.
        </p>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-5 pb-24">
        <div className="rounded-3xl border border-[#2C1A12]/10 bg-white p-8 sm:p-12"
          style={{ boxShadow: "0 8px 48px rgba(44,26,18,.09),0 1.5px 6px rgba(44,26,18,.05)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Age */}
            <FormGroup label="Age" required>
              <input type="number" value={age} onChange={e => setAge(e.target.value)}
                placeholder="e.g. 25" min={1} max={110} className={inputCls} />
            </FormGroup>

            {/* Gender */}
            <FormGroup label="Gender" required>
              <SelectInput value={gender} onChange={handleGenderChange}>
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary / Any</option>
              </SelectInput>
            </FormGroup>

            {/* Relationship */}
            <FormGroup label="Relationship" required>
              <SelectInput value={relationship} onChange={setRelationship}>
                <option value="">Select relationship</option>
                {relationshipGroups.map(({ group, options }) => (
                  <optgroup key={group} label={group}>
                    {options.map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </optgroup>
                ))}
              </SelectInput>
            </FormGroup>

            {/* Occasion */}
            <FormGroup label="Occasion">
              <SelectInput value={occasion} onChange={setOccasion}>
                <option value="">Select occasion (optional)</option>
                <optgroup label="Celebrations">
                  <option value="birthday">🎂 Birthday</option>
                  <option value="anniversary">💍 Anniversary</option>
                  <option value="graduation">🎓 Graduation</option>
                  <option value="wedding">💒 Wedding</option>
                  <option value="engagement">💎 Engagement</option>
                  <option value="baby-shower">🍼 Baby Shower</option>
                  <option value="housewarming">🏠 Housewarming</option>
                  <option value="promotion">🚀 Promotion / New Job</option>
                </optgroup>
                <optgroup label="Holidays & Seasons">
                  <option value="valentine">💝 Valentine's Day</option>
                  <option value="mothers-day">💐 Mother's Day</option>
                  <option value="fathers-day">👔 Father's Day</option>
                  <option value="christmas">🎄 Christmas</option>
                  <option value="halloween">🎃 Halloween</option>
                  <option value="back-to-school">🎒 Back to School</option>
                </optgroup>
                <optgroup label="Just Because">
                  <option value="just-because">💛 Just Because</option>
                  <option value="thank-you">🙏 Thank You</option>
                  <option value="get-well-soon">🌸 Get Well Soon</option>
                  <option value="last-minute">⚡ Last Minute</option>
                  <option value="farewell">👋 Farewell</option>
                  <option value="new-year">🎆 New Year</option>
                </optgroup>
              </SelectInput>
            </FormGroup>

            {/* ✅ Budget — now with currency selector + USD conversion */}
            <div className="sm:col-span-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-base font-syne tracking-wide text-[#2C1A12] uppercase">
                  Budget <span className="text-[#E8614D]">*</span>
                </label>
                {/* ✅ Currency Selector */}
                <div className="relative">
                  <select
                    value={currencyCode}
                    onChange={e => handleCurrencyChange(e.target.value)}
                    className="text-[.8rem] font-bold text-[#2C1A12] bg-[#FAF7F2] border border-[#2C1A12]/15
                      rounded-lg px-3 py-1.5 pr-7 appearance-none cursor-pointer outline-none
                      focus:border-[#E8614D] transition-colors"
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.symbol} {c.code}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#2C1A12]/40">
                    <svg width="10" height="6" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black
                  text-[#2C1A12]/40 text-sm pointer-events-none select-none">
                  {currency.symbol}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={budgetDisplay}
                  onChange={handleBudgetInputChange}
                  onBlur={handleBudgetInputBlur}
                  placeholder={`e.g. ${formatWithCommas(currency.budgetDefault)}`}
                  className={inputCls + " pl-8"}
                />
              </div>

              <div className="mt-1">
                <input
                  ref={sliderRef}
                  type="range"
                  min={currency.budgetMin}
                  max={currency.budgetMax}
                  step={currency.step}
                  value={budget}
                  onChange={e => syncFromSlider(e.target.value)}
                  className="w-full h-[5px] rounded-full outline-none cursor-pointer appearance-none"
                  style={{
                    background: `linear-gradient(to right,#E8614D ${pct}%,rgba(44,26,18,.12) ${pct}%)`,
                    WebkitAppearance: "none",
                  }}
                />
                <div className="flex justify-between mt-2 text-[.72rem] font-bold text-[#2C1A12]/40 tracking-wide">
                  <span>{currency.symbol}{formatWithCommas(currency.budgetMin)}</span>
                  <span>{currency.symbol}{formatWithCommas(Math.round((currency.budgetMin + currency.budgetMax) / 2))}</span>
                  <span>{currency.symbol}{formatWithCommas(currency.budgetMax)}</span>
                </div>

                {/* ✅ Budget display + USD conversion */}
                <div className="text-center mt-2">
                  <div className="text-xl font-black"
                    style={{ fontFamily: "'Fraunces','Georgia',serif", color: "#E8614D" }}>
                    {currency.symbol}{formatWithCommas(budget)}
                  </div>
                  {/* ✅ Only show USD conversion if not already in USD */}
                  {currency.code !== "USD" && (
                    <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      bg-[#F0F7FF] border border-[#DBEAFE]">
                      <span className="text-[.72rem] text-[#3B82F6]/70">≈</span>
                      <span className="text-[.78rem] font-bold text-[#2563EB]">
                        ${usdEquivalent} USD
                      </span>
                      <span className="text-[.68rem] text-[#3B82F6]/50">
                        · store prices are in dollars
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-base font-syne tracking-wide text-[#2C1A12] uppercase">
                Interests &amp; Hobbies
              </label>
              <input type="text" value={interests} onChange={e => setInterests(e.target.value)}
                placeholder={INTERESTS_PLACEHOLDER} className={inputCls} />
              <span className="text-[.74rem] text-[#2C1A12]/35 leading-relaxed">
                Optional — helps us personalise far better ✨
              </span>
            </div>

            <div className="sm:col-span-2 h-px bg-[#2C1A12]/07 my-1" />

            {/* Surprise Me bar */}
            <div className={`sm:col-span-2 flex flex-col md:flex-row items-center gap-3
                px-5 py-4 rounded-2xl border border-dashed border-[#2C1A12]/15
                transition-transform ${shaking ? "animate-[wiggle_.5s_ease]" : ""}`}
              style={{ background: "linear-gradient(135deg,rgba(232,97,77,.04),rgba(240,168,48,.04))" }}>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#2C1A12]/60 leading-snug">
                  <strong className="text-[#2C1A12]/80">Not sure?</strong>{" "}
                  We'll generate a completely random profile — every click is different!
                </p>
                {age && gender && relationship && (
                  <p className="text-[0.72rem] text-[#E8614D] font-semibold mt-1.5">
                    → {age}yr {gender} · {relationship} · {occasion || "no occasion"} · {currency.symbol}{Number(budget).toLocaleString()}
                  </p>
                )}
              </div>
              <button onClick={surpriseMe}
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-black tracking-wide
                  text-white transition-all duration-200 active:scale-95 hover:brightness-110"
                style={{ background: "linear-gradient(135deg,#E8614D)", boxShadow: "0 4px 14px rgba(240,168,48,.35)" }}>
                Surprise Me 
              </button>
            </div>

            {/* Actions */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
              <button onClick={handleSubmit} disabled={!valid}
                className="flex-1 flex justify-center items-center gap-2 px-6 py-4
                  rounded-full font-syne text-lg font-bold text-white tracking-wide
                  transition-all duration-200 active:scale-[.98]
                  disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: valid ? "linear-gradient(135deg,#E8614D 0%,#c94a38 100%)" : "#180806",
                  boxShadow:  valid ? "0 6px 24px rgba(232,97,77,.32)" : "none",
                }}>
                Find Perfect Gift 
              </button>
              <button onClick={clearForm}
                className="px-6 py-4 rounded-2xl font-bold text-sm text-[#2C1A12]/50
                  border border-[#2C1A12]/10 bg-transparent
                  hover:bg-[#2C1A12]/04 transition-all duration-200">
                Clear
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance:none; width:20px; height:20px; background:#E8614D;
          border-radius:50%; box-shadow:0 2px 8px rgba(232,97,77,.45);
          cursor:pointer; transition:transform .15s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform:scale(1.2); }
        input[type=range]::-moz-range-thumb {
          width:20px; height:20px; background:#E8614D; border-radius:50%;
          border:none; box-shadow:0 2px 8px rgba(232,97,77,.45); cursor:pointer;
        }
        @keyframes wiggle {
          0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-3deg)}
          40%{transform:rotate(3deg)} 60%{transform:rotate(-2deg)} 80%{transform:rotate(2deg)}
        }
      `}</style>
    </div>
  );
}

const inputCls = [
  "w-full px-[18px] py-[13px]",
  "border-[1.5px] border-[#2C1A12]/12",
  "rounded-xl bg-[#FAF7F2]",
  "text-[.92rem] font-semibold text-[#2C1A12]",
  "outline-none transition-all duration-200",
  "placeholder:text-[#2C1A12]/25",
  "focus:border-[#E8614D] focus:bg-white focus:shadow-[0_0_0_4px_rgba(232,97,77,.10)]",
].join(" ");

function FormGroup({ label, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-syne tracking-wide text-[#2C1A12] uppercase">
        {label}{required && <span className="text-[#E8614D] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className={inputCls + " pr-10 cursor-pointer appearance-none"}>
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2C1A12]/40">
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}