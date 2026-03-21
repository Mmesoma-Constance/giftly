import { useState, useRef } from "react";

const INTERESTS_PLACEHOLDER = "e.g. music, skincare, gaming, cooking, fashion, fitness…";

const RANDOM_PROFILES = [
  { age: 27, gender: "female", relationship: "girlfriend", occasion: "birthday", budget: 35000, interests: "skincare, yoga, reading, coffee" },
  { age: 34, gender: "male", relationship: "husband", occasion: "anniversary", budget: 60000, interests: "football, tech gadgets, grilling, podcasts" },
  { age: 19, gender: "nonbinary", relationship: "best-friend", occasion: "graduation", budget: 15000, interests: "anime, streetwear, music production" },
  { age: 55, gender: "female", relationship: "mom", occasion: "birthday", budget: 40000, interests: "gardening, cooking, Nollywood, church" },
  { age: 22, gender: "male", relationship: "brother", occasion: "just-because", budget: 12000, interests: "gaming, sneakers, afrobeats, basketball" },
];

const BUDGET_MIN = 2000;
const BUDGET_MAX = 100000;
const BUDGET_DEFAULT = 20000;

function formatNaira(val) {
  return "₦" + Number(val).toLocaleString("en-NG");
}

function sliderPercent(val) {
  return ((val - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
}

export default function GenerateGift({ onBack, onGenerate }) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relationship, setRelationship] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState(BUDGET_DEFAULT);
  const [interests, setInterests] = useState("");
  const [shaking, setShaking] = useState(false);
  const sliderRef = useRef(null);

  const pct = sliderPercent(budget);

  function syncFromSlider(v) {
    setBudget(Number(v));
  }
  function syncFromInput(v) {
    const n = Math.min(BUDGET_MAX, Math.max(BUDGET_MIN, Number(v) || BUDGET_MIN));
    setBudget(n);
  }

  function surpriseMe() {
    const p = RANDOM_PROFILES[Math.floor(Math.random() * RANDOM_PROFILES.length)];
    setAge(p.age);
    setGender(p.gender);
    setRelationship(p.relationship);
    setOccasion(p.occasion);
    setBudget(p.budget);
    setInterests(p.interests);
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  }

  function clearForm() {
    setAge(""); setGender(""); setRelationship("");
    setOccasion(""); setBudget(BUDGET_DEFAULT); setInterests("");
  }

  function handleSubmit() {
    if (!age || !gender || !relationship || !budget) return;
    if (onGenerate) onGenerate({ age, gender, relationship, occasion, budget, interests });
  }

  const valid = age && gender && relationship && budget;

  return (
    <div
      className="min-h-screen w-full mt-20"
      style={{ background: "#FAF7F2", fontFamily: "'Syne', 'DM Sans', sans-serif" }}
    >
    

      {/* Hero */}
      <div className="max-w-xl mx-auto px-5 pt-14 pb-10 text-center">
        <span
          className="inline-block text-xs font-black tracking-[.18em] uppercase mb-4 px-4 py-1.5 rounded-full border border-[#E8614D]/30 text-[#E8614D]"
          style={{ background: "rgba(232,97,77,.07)" }}
        >
          AI Gift Finder
        </span>
        <h1
          className="text-[2.5rem] sm:text-[3.1rem] font-black leading-none tracking-tight
           text-[#2C1A12] mb-4"
          style={{ fontFamily: "'Fraunces', 'Georgia', serif", letterSpacing: "-.03em" }}
        >
          Describe your person 
        </h1>
        <p className="text-base text-[#2C1A12]/60 leading-relaxed max-w-md mx-auto">
          Fill in what you know — the more detail you share, the more personalized and spot-on your gift suggestions will be.
        </p>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-5 pb-24">
        <div
          className="rounded-3xl border border-[#2C1A12]/10 bg-white p-8 sm:p-12"
          style={{ boxShadow: "0 8px 48px rgba(44,26,18,.09), 0 1.5px 6px rgba(44,26,18,.05)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Age */}
            <FormGroup label="Age" required>
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="e.g. 25"
                min={1} max={110}
                className={inputCls}
              />
            </FormGroup>

            {/* Gender */}
            <FormGroup label="Gender" required>
              <SelectInput value={gender} onChange={setGender}>
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
                <optgroup label="Partner">
                  <option value="girlfriend">Girlfriend</option>
                  <option value="boyfriend">Boyfriend</option>
                  <option value="wife">Wife</option>
                  <option value="husband">Husband</option>
                </optgroup>
                <optgroup label="Family">
                  <option value="mom">Mom</option>
                  <option value="dad">Dad</option>
                  <option value="sister">Sister</option>
                  <option value="brother">Brother</option>
                  <option value="grandparent">Grandparent</option>
                  <option value="child">Child</option>
                </optgroup>
                <optgroup label="Friends & Others">
                  <option value="best-friend">Best Friend</option>
                  <option value="friend">Friend</option>
                  <option value="colleague">Colleague</option>
                  <option value="boss">Boss</option>
                </optgroup>
              </SelectInput>
            </FormGroup>

            {/* Occasion */}
            <FormGroup label="Occasion">
              <SelectInput value={occasion} onChange={setOccasion}>
                <option value="">Select occasion (optional)</option>
                <option value="birthday">🎂 Birthday</option>
                <option value="anniversary">💍 Anniversary</option>
                <option value="valentine">💝 Valentine's Day</option>
                <option value="christmas">🎄 Christmas</option>
                <option value="graduation">🎓 Graduation</option>
                <option value="wedding">💒 Wedding</option>
                <option value="just-because">💛 Just Because</option>
              </SelectInput>
            </FormGroup>

            {/* Budget — full width */}
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-base font-syne tracking-wide text-[#2C1A12] uppercase">
                Budget <span className="text-[#E8614D]">*</span>
              </label>
              {/* Input row */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#2C1A12]/40 text-sm pointer-events-none select-none">₦</span>
                <input
                  type="number"
                  value={budget}
                  onChange={e => syncFromInput(e.target.value)}
                  placeholder="e.g. 20000"
                  min={BUDGET_MIN}
                  className={inputCls + " pl-8"}
                />
              </div>
              {/* Slider */}
              <div className="mt-1">
                <div className="relative w-full">
                  <input
                    ref={sliderRef}
                    type="range"
                    min={BUDGET_MIN}
                    max={BUDGET_MAX}
                    step={1000}
                    value={budget}
                    onChange={e => syncFromSlider(e.target.value)}
                    className="w-full h-[5px] rounded-full outline-none cursor-pointer appearance-none"
                    style={{
                      background: `linear-gradient(to right, #E8614D ${pct}%, rgba(44,26,18,.12) ${pct}%)`,
                      WebkitAppearance: "none",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[.72rem] font-bold text-[#2C1A12]/40 tracking-wide">
                  <span>₦2,000</span><span>₦50,000</span><span>₦100,000</span>
                </div>
                <div
                  className="text-center mt-1 text-xl font-black"
                  style={{ fontFamily: "'Fraunces','Georgia',serif", color: "#E8614D" }}
                >
                  {formatNaira(budget)}
                </div>
              </div>
            </div>

            {/* Interests — full width */}
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-base font-syne tracking-wide text-[#2C1A12] uppercase">
                Interests &amp; Hobbies
              </label>
              <input
                type="text"
                value={interests}
                onChange={e => setInterests(e.target.value)}
                placeholder={INTERESTS_PLACEHOLDER}
                className={inputCls}
              />
              <span className="text-[.74rem] text-[#2C1A12]/35 leading-relaxed">
                Optional — helps us personalize far better ✨
              </span>
            </div>

            {/* Divider */}
            <div className="sm:col-span-2 h-px bg-[#2C1A12]/07 my-1" />

            {/* Surprise bar */}
            <div
              className={`sm:col-span-2 flex flex-col md:flex-row items-center gap-3 px-5 py-4 rounded-2xl border border-dashed border-[#2C1A12]/15 transition-transform ${shaking ? "animate-[wiggle_.5s_ease]" : ""}`}
              style={{ background: "linear-gradient(135deg,rgba(232,97,77,.04),rgba(240,168,48,.04))" }}
            >
              <span className="flex-1 text-sm text-[#2C1A12]/60 leading-snug min-w-0">
                🎲 <strong className="text-[#2C1A12]/80">Not sure?</strong> Let us pick a random profile and generate surprise results for you!
              </span>
              <button
                onClick={surpriseMe}
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-black tracking-wide text-white transition-all duration-200 active:scale-95 hover:brightness-110"
                style={{ background: "linear-gradient(135deg,#F0A830,#E8614D)", boxShadow: "0 4px 14px rgba(240,168,48,.35)" }}
              >
                Surprise Me 
              </button>
            </div>

            {/* Actions */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={handleSubmit}
                disabled={!valid}
                className="flex-1 flex justify-center items-center gap-2 px-6 py-4 rounded-full font-syne text-lg font-bold
                 text-white tracking-wide transition-all duration-200 active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: valid
                    ? "linear-gradient(135deg,#E8614D 0%,#c94a38 100%)"
                    : "#180806",
                  boxShadow: valid ? "0 6px 24px rgba(232,97,77,.32)" : "none",
                }}
              >
                Find Perfect Gift 
              </button>
              <button
                onClick={clearForm}
                className="px-6 py-4 rounded-2xl font-bold text-sm text-[#2C1A12]/50 border border-[#2C1A12]/10 bg-transparent hover:bg-[#2C1A12]/04 transition-all duration-200"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Slider thumb global style injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=Syne:wght@500;700;800;900&display=swap');
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          background: #E8614D;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(232,97,77,.45);
          cursor: pointer;
          transition: transform .15s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
        input[type=range]::-moz-range-thumb {
          width: 20px; height: 20px;
          background: #E8614D;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 8px rgba(232,97,77,.45);
          cursor: pointer;
        }
        @keyframes wiggle {
          0%,100%{transform:rotate(0deg)}
          20%{transform:rotate(-3deg)}
          40%{transform:rotate(3deg)}
          60%{transform:rotate(-2deg)}
          80%{transform:rotate(2deg)}
        }
      `}</style>
    </div>
  );
}

/* ── Shared input class ── */
const inputCls = [
  "w-full px-[18px] py-[13px]",
  "border-[1.5px] border-[#2C1A12]/12",
  "rounded-xl bg-[#FAF7F2]",
  "text-[.92rem] font-semibold text-[#2C1A12]",
  "outline-none transition-all duration-200",
  "placeholder:text-[#2C1A12]/25",
  "focus:border-[#E8614D] focus:bg-white focus:shadow-[0_0_0_4px_rgba(232,97,77,.10)]",
].join(" ");

/* ── Wrapper label+children ── */
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

/* ── Styled select ── */
function SelectInput({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={inputCls + " pr-10 cursor-pointer appearance-none"}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2C1A12]/40">
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}