import img1 from "./../assets/eg1.jpg";
import img2 from "./../assets/eg4.jpg";
import img3 from "./../assets/eg5.jpg";
import img4 from "./../assets/eg6.jpg";
import img5 from "./../assets/eg5.webp";
import img6 from "./../assets/eg3.jpg";

// Cycle the 3 available images across all 6 posts
const images = [img1, img2, img3, img4, img5, img6];

export const blogPosts = [
  {
    slug: "how-to-choose-meaningful-gifts",
    tag: "Gift Strategy",
    title: "How to Choose Meaningful Gifts People Actually Use",
    excerpt:
      "The most memorable gifts feel personal and intentional. Learn how to move beyond the ordinary and choose gifts that truly connect.",
    image: images[0],
    author: "Giftly Team",
    date: "March 16, 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "The Gift That Sits in a Drawer",
        body: "We've all received that gift — thoughtfully wrapped, beautifully presented, and yet perfectly suited for the back of a drawer. The candle that was never lit. The book you already owned. The gadget that missed the mark by an inch but felt like a mile. Meaningful gifting isn't about spending more. It's about paying closer attention.",
      },
      {
        heading: "Start With Active Listening",
        body: "The best gift-givers are the best listeners. Every person broadcasts clues about what they want — in conversation, on their phone, in offhand comments. Start keeping a mental (or actual) note when the people you love mention things they wish they had, experiences they want, or problems they're trying to solve.",
      },
      {
        heading: "Match the Gift to Their World, Not Yours",
        body: "A common gifting mistake is projecting our own taste onto others. The question to ask is not \"what would I love?\" but \"what does this specific person actually want more of in their life?\"",
      },
      {
        heading: "Three Questions That Always Work",
        isList: true,
        items: [
          { bold: "What do they do for fun?", text: " Hobbies are a goldmine — tools, accessories, and upgrades for a passion almost always land well." },
          { bold: "What problem do they have?", text: " Practical gifts that solve a daily frustration feel thoughtful and useful." },
          { bold: "What would they never buy for themselves?", text: " Small luxuries people deny themselves make deeply appreciated gifts." },
        ],
      },
      {
        heading: "The Budget Is Not the Message",
        body: "The amount you spend does not communicate the amount you care. A ₦5,000 gift that shows you listened is worth ten times more than a ₦50,000 gift that says \"I didn't know what else to get.\"",
      },
      {
        heading: "Use Giftly to Make It Effortless",
        body: "Once you know the basics — their age, relationship to you, interests, and your budget — our engine does the heavy lifting of matching the right products. You bring the attention; we bring the curation.",
      },
    ],
    cta: { heading: "Ready to find the perfect gift? 🎁", sub: "Put these principles into action — let Giftly help you find something they'll actually love." },
  },
  {
    slug: "budget-friendly-gift-ideas",
    tag: "Budget Tips",
    title: "Budget-Friendly Gifts That Feel Genuinely Expensive",
    excerpt:
      "Great gifts don't have to break the bank. Here are creative ways to show you care on any budget.",
    image: images[1],
    author: "Giftly Team",
    date: "March 8, 2026",
    readTime: "4 min read",
    sections: [
      {
        heading: "Presentation Is Half the Gift",
        body: "Before we even talk about what to buy — understand that how a gift is presented dramatically changes how it feels. A ₦3,000 item in a beautiful box with a handwritten note feels like a ₦15,000 gift. The packaging, the presentation, and the personal touch multiply perceived value by a factor of five.",
      },
      {
        heading: "Categories That Always Overdeliver",
        isList: true,
        items: [
          { bold: "Skincare & beauty sets —", text: " a curated mini-set looks incredibly luxurious even at ₦5,000–8,000." },
          { bold: "Candles & home fragrance —", text: " artisan candles with beautiful packaging feel premium for well under ₦5,000." },
          { bold: "Accessories —", text: " a carefully chosen pair of earrings, a wallet, or a scarf can look high-end at any budget." },
          { bold: "Experiences & vouchers —", text: " sometimes the most impactful gift costs nothing except time." },
        ],
      },
      { quote: "It's not about what you spent. It's about what it says." },
      {
        heading: "The ₦10,000 Sweet Spot",
        body: "For most relationships — friends, colleagues, siblings — a ₦8,000–12,000 budget hits the sweet spot. It's enough to get something genuinely good, and focused enough to push you toward specific, personal choices rather than generic ones.",
      },
      {
        heading: "What to Avoid on a Budget",
        body: "Avoid generic items that scream \"I grabbed this quickly\" — basic chocolate boxes, generic notebooks, and unbranded phone accessories. Instead, go specific, go personal, go small and beautiful.",
      },
    ],
    cta: { heading: "Shop smart with Giftly 🎁", sub: "Enter your budget and let our engine find you the best-value, most thoughtful gifts available." },
  },
  {
    slug: "why-thoughtful-gifting-matters",
    tag: "Culture & Meaning",
    title: "Why Thoughtful Gifting Is an Act of Love",
    excerpt:
      "Understanding the emotional science behind gift giving helps you choose presents that feel more personal, meaningful, and truly unforgettable.",
    image: images[2],
    author: "Giftly Team",
     date: "February 20, 2026",
   readTime: "6 min read",
    sections: [
      {
        heading: "The Psychology of Receiving a Gift",
        body: "Research in psychology consistently shows that receiving a thoughtful gift activates the same neural pathways as receiving an expression of love or care. The brain doesn't just register \"I got a thing.\" It registers \"someone thought about me.\"",
      },
      {
        heading: "Five Love Languages & Gifting",
        body: "Dr. Gary Chapman's \"Five Love Languages\" identifies gift-giving as one of the primary ways humans express affection. For people whose love language is gifts, receiving something — however small — is one of the most profound ways they feel cared for.",
      },
      { quote: "A gift is a visible symbol of thought and love." },
      {
        heading: "Gifting in Nigerian Culture",
        body: "In Nigeria, as in most of Africa, gift-giving holds deep cultural significance. From the kola nut offered to guests to the elaborate exchange of gifts at weddings and naming ceremonies — gifts have always been a language of belonging, respect, and relationship-building.",
      },
      {
        heading: "Why Thoughtfulness Matters More Than Price",
        body: "Several studies have found that gift recipients do not correlate the value of a gift with how much they feel cared for — but they do correlate it with how personalised the gift is. A cheap, specific, well-thought-out gift beats an expensive generic one almost every time.",
      },
      {
        heading: "Gifting as a Habit, Not an Event",
        body: "Small, frequent gestures of acknowledgment — a favourite snack, a book you knew they'd like, a card on an ordinary Tuesday — build stronger emotional bonds than grand gestures once a year. Giftly was built to make this kind of thoughtfulness effortless.",
      },
    ],
    cta: { heading: "Show someone you're thinking of them 💖", sub: "Find a thoughtful, personalized gift in seconds — no stress, no guessing." },
  },
  {
    slug: "birthday-gifts-for-every-relationship",
    tag: "Occasion Guide",
    title: "The Ultimate Guide to Birthday Gifts for Every Relationship",
    excerpt:
      "From best friend to boss — the unspoken rules of birthday gifting and what always lands, no matter the relationship.",
    image: images[3],
    author: "Giftly Team",
     date: "February 15, 2026",
     readTime: "7 min read",
    sections: [
      {
        heading: "Why Birthdays Hit Different",
        body: "A birthday is perhaps the most personal of all occasions. It's the one day that belongs entirely to one person — and your gift is a direct reflection of how well you know and value them.",
      },
      {
        heading: "For Your Best Friend",
        body: "Best friend birthdays have the highest bar and the most freedom. Go personal, go inside-joke, go specific. A custom playlist, their favourite restaurant experience, or something that references a shared memory will beat any generic gift.",
      },
      {
        heading: "For Your Partner",
        body: "Partner gifts should feel like they came from someone who has been paying attention all year. Think about what they've been wanting, what experience you could share, or what luxury they'd never buy themselves.",
      },
      {
        heading: "For a Parent",
        body: "The best gifts for parents are experiences (a nice dinner, a day trip), or something that shows you noticed a need — a comfortable item for their hobby, a subscription to something they love, or even just your time.",
      },
      {
        heading: "For a Colleague or Boss",
        body: "Keep it professional and warm. A quality food gift, a beautiful notebook, or a gift card to somewhere they'd enjoy strikes the right balance. ₦5,000–15,000 is the typical sweet spot.",
      },
      {
        heading: "The Universal Rule",
        body: "Across every relationship, the gifts that land best are the ones that feel considered. A small gift that shows you were paying attention beats a large gift that says \"I panicked.\" Always prioritise specificity over size.",
      },
    ],
    cta: { heading: "Find the right birthday gift now 🎂", sub: "Tell us about them and we'll suggest gifts perfectly matched to your relationship and budget." },
  },
  {
    slug: "top-gift-trends-nigeria-2024",
    tag: "Trends 2026",
    title: "Top Gift Trends in Nigeria This Year",
    excerpt:
      "From tech accessories to luxury self-care — what Nigerians are gifting this season and why these picks keep landing perfectly.",
    image: images[4],
    author: "Giftly Team",
    date: "January 27, 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "The Nigerian Gift Economy Is Evolving",
        body: "Gone are the days when a gift envelope was always the safe default. Today's Nigerian gift-giver is more intentional, more creative, and increasingly willing to go beyond cash.",
      },
      {
        heading: "1. Luxury Self-Care & Skincare",
        body: "The skincare boom is real. Beautifully packaged skincare sets have become the go-to gift for women across all age groups. Local brands like House of Tara and international names like CeraVe are flying off shelves as gift items.",
      },
      {
        heading: "2. Personalized & Custom Gifts",
        body: "Custom name necklaces, monogrammed wallets, and personalized photo books are having a massive moment. The ability to make something feel one-of-a-kind has elevated these from \"cute\" to \"deeply meaningful.\"",
      },
      {
        heading: "3. Experience Gifting",
        body: "Spa vouchers, cooking classes, wine tasting events, and concert tickets have overtaken physical items for millennials and Gen Z. Experiences create memories, and memories outlast things.",
      },
      {
        heading: "4. Tech Accessories",
        body: "Wireless earbuds, portable chargers, and smart home devices are consistently popular especially for men aged 18–35. They feel premium, they're genuinely useful, and they scale across budgets.",
      },
      {
        heading: "5. Home & Living",
        body: "With more young Nigerians setting up their own spaces, home gifts have surged. Aesthetic candles, quality kitchen tools, plush throw blankets, and decorative items are landing well across many occasions.",
      },
    ],
    cta: { heading: "Stay ahead of the trends 🔥", sub: "Giftly keeps up with what's current — find trending, well-reviewed gifts matched to your budget." },
  },
  {
    slug: "wellness-gifts-new-luxury",
    tag: "Self-Care",
    title: "Gifting Wellness: Why Self-Care Gifts Are the New Luxury",
    excerpt:
      "Wellness gifts have surpassed gadgets as the most appreciated presents. Here's how to give the gift of rest and renewal.",
    image: images[5],
    author: "Giftly Team",
     date: "December 12, 2025",
    readTime: "6 min read",
    sections: [
      {
        heading: "Why Wellness Became the Ultimate Gift",
        body: "In a culture of constant hustle, the greatest luxury is often permission to rest. Wellness gifts signal something money can't easily buy: the message that someone matters enough to be cared for.",
      },
      {
        heading: "Self-Care Gifts That Always Win",
        isList: true,
        items: [
          { bold: "Spa & massage vouchers —", text: " universally loved, especially for mothers, partners, and anyone who works hard." },
          { bold: "Premium body care sets —", text: " beautiful body scrubs, oils, and lotions packaged well feel incredibly luxurious." },
          { bold: "Sleep kits —", text: " silk eye masks, aromatherapy pillow sprays, and quality candles create a ritual of rest." },
          { bold: "Journaling sets —", text: " a beautiful notebook with quality pens appeals to the thoughtful and introspective." },
          { bold: "Fitness & movement gifts —", text: " yoga mats, resistance bands, and gym memberships for the health-conscious." },
        ],
      },
      { quote: "Giving someone the gift of rest is giving them back to themselves." },
      {
        heading: "Making Wellness Gifts Feel Personal",
        body: "Match the gift to their actual lifestyle. A gym-lover gets different gifts than a homebody who loves baths. Ask: where do they find peace? What does rest look like for them? That's where your answer lives.",
      },
      {
        heading: "Budget Ranges That Work",
        body: "At ₦5,000–10,000: a beautiful bath and body set. At ₦15,000–25,000: a full self-care hamper. At ₦30,000+: a spa day voucher or premium skincare kit. Almost every budget can deliver something genuinely indulgent.",
      },
      {
        heading: "The Deeper Message",
        body: "When you give a wellness gift, you're saying: slow down, you deserve this, I want you to feel good. In a world that rarely stops, that message lands deeply — which is why wellness gifts are remembered long after the product runs out.",
      },
    ],
    cta: { heading: "Give the gift of rest 🧖", sub: "Find wellness gifts matched to their personality and your budget — we'll handle the curation." },
  },
];