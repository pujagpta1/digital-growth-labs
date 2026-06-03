// All client-specific copy for Digital Growth Labs lives here.
// A premium Vancouver-based digital growth studio for local Canadian brands.
// Swap text to re-skin the site; the components read everything from here.

export const brand = {
  name: "Digital Growth Labs",
  monogram: "DGL",
  location: "Vancouver · BC",
  email: "dglabs.van@gmail.com",
  phone: "778-323-1804",
  phoneHref: "tel:+17783231804",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Google", href: "https://google.com" },
  ],
};

export const nav = {
  links: [
    { label: "Services", href: "/#services" },
    { label: "Approach", href: "/#approach" },
    { label: "Results", href: "/#results" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Free Audit", href: "/#contact" },
};

export const home = {
  hero: {
    eyebrow: "Digital Growth Studio",
    line1: "GROWTH, ENGINEERED",
    line2Pre: "WITH",
    line2Accent: "precision",
    line3: "& RESTRAINT.",
    tagline:
      "We help local brands across Canada become impossible to overlook online — from Google Business Profile and search to paid media, web, social and delivery platforms. Whatever it takes to grow your presence, we do it.",
    primary: { label: "Book a free audit", href: "/#contact" },
    secondary: { label: "Explore services", href: "/#services" },
    scrollLabel: "(Scroll)",
    stats: [
      { value: 180, prefix: "+", suffix: "%", label: "Avg. local search visibility lift" },
      { value: 40, suffix: "+", label: "Local brands grown & managed" },
      { value: 6, suffix: "", label: "Channels under one roof" },
    ],
  },

  clients: [
    "Restaurants",
    "Salons & Spas",
    "Florists",
    "Retail",
    "Hospitality",
    "Local Services",
    "Multi-Location Brands",
  ],

  services: {
    num: "(01)",
    label: "Capabilities",
    titlePre: "A FULL-STACK GROWTH TEAM,",
    titleAccent: "on demand.",
    lead:
      "Every channel a local business needs to win — strategised, built and managed by one accountable studio in Vancouver.",
    items: [
      {
        title: "Google Business Profile",
        desc: "Optimised, posted, monitored and reviewed — so you own the map pack and convert local searchers into customers.",
        tags: ["Local SEO", "Posts", "Reviews", "Q&A"],
      },
      {
        title: "Search Engine Optimization",
        desc: "Technical, on-page and local SEO that gets you found for what you actually sell.",
        tags: ["Technical SEO", "Local", "Content"],
      },
      {
        title: "Google & Meta Ads",
        desc: "Profitable paid campaigns with relentless testing and transparent ROAS reporting.",
        tags: ["PPC", "Retargeting", "Creative"],
      },
      {
        title: "Web Design & Development",
        desc: "Fast, beautiful, conversion-focused websites — animated, built to perform and integrated with your POS system.",
        tags: ["UX", "Animation", "POS Integration", "Speed"],
      },
      {
        title: "Social Media Marketing",
        desc: "On-brand content and community management that keeps you top of mind.",
        tags: ["Content", "Strategy", "Community"],
      },
      {
        title: "Delivery Platform Management",
        desc: "Uber Eats & DoorDash listings, menus and promos tuned to maximise orders.",
        tags: ["Uber Eats", "DoorDash", "Menus"],
      },
    ],
  },

  approach: {
    num: "(02)",
    label: "How we work",
    titlePre: "A METHOD,",
    titleAccent: "not a guess.",
    lead:
      "A repeatable system that turns scattered marketing into compounding growth — with clear reporting at every step.",
    steps: [
      { n: "01", title: "Audit", body: "We map your full digital presence, benchmark competitors and find the fastest wins." },
      { n: "02", title: "Strategy", body: "A focused growth plan with clear priorities, channels and measurable targets." },
      { n: "03", title: "Build & Run", body: "We execute across channels — design, content, campaigns and POS — as one team." },
      { n: "04", title: "Report & Scale", body: "Transparent reporting, continuous optimisation and compounding momentum." },
    ],
    link: { label: "Explore the full method", href: "/process" },
  },

  results: {
    num: "(03)",
    label: "Outcomes",
    titlePre: "NUMBERS OUR",
    titleAccent: "clients feel.",
    lead:
      "We optimise for revenue and reputation — the metrics that actually move a local business forward.",
    items: [
      {
        value: 312,
        prefix: "+",
        suffix: "%",
        decimals: 0,
        label: "Increase in Google Business Profile actions for a multi-location restaurant client.",
      },
      {
        value: 4.9,
        suffix: "★",
        decimals: 1,
        label: "Average review rating maintained across managed locations & delivery platforms.",
      },
      {
        value: 2.7,
        suffix: "×",
        decimals: 1,
        label: "Return on ad spend delivered through tightly managed Google & Meta campaigns.",
      },
    ],
  },

  fullService: {
    num: "(04)",
    label: "Our promise",
    titlePre: "WHATEVER IT TAKES TO MAKE YOU",
    titleAccent: "unmissable.",
    body:
      "We do anything and everything it takes to improve your business's online presence. One accountable studio that fixes what's broken, builds what's missing, and keeps optimising — so you never have to juggle five vendors again.",
    points: [
      "One accountable team across every channel — not a patchwork of freelancers",
      "We diagnose first, then fix what's broken and build what's missing",
      "Proactive, hands-on management — never set-and-forget",
      "Transparent reporting so you always know exactly what's working",
    ],
    cta: { label: "Book a free audit", href: "/#contact" },
    visual: {
      metric: "360°",
      metricLabel: "online presence",
      caption: "Search · Social · Ads · Web · Listings",
    },
  },

  quote: {
    stars: 5,
    pre: "They didn't just manage our marketing — they rebuilt how we ",
    accent: "show up everywhere",
    post: ". Calls, orders and reviews all climbed in the first quarter.",
    avatar: "H",
    author: "Owner — Multi-location Restaurant Group",
    location: "Vancouver Island & Lower Mainland, BC",
  },

  reviewsHeading: {
    kicker: "Testimonials",
    title: "What our clients are saying",
  },

  reviews: [
    {
      headline: "They made us impossible to miss",
      body: "Within a quarter we were ranking in the map pack for every search that matters. Calls, reservations and walk-ins all climbed — and for the first time I actually understood why.",
      role: "Owner",
      org: "Bistro, Vancouver",
    },
    {
      headline: "Our delivery orders nearly doubled",
      body: "They rebuilt our DoorDash and Uber Eats listings from the ground up — photos, menu, promos, the works. Orders nearly doubled in two months and the kitchen hasn't stopped since.",
      role: "Founder",
      org: "Restaurant, Burnaby",
    },
    {
      headline: "Finally, marketing that pays for itself",
      body: "We'd burned cash on two agencies before this. Digital Growth Labs got our Google and Meta ads profitable in weeks and showed us the numbers every step of the way. No fluff.",
      role: "Director",
      org: "Auto Shop, Surrey",
    },
    {
      headline: "Reviews went from a worry to a weapon",
      body: "Their review system turned our happy customers into a steady stream of five-star ratings. We went from 3.9 to 4.8 stars and we're now the top-rated salon in the neighbourhood.",
      role: "Owner",
      org: "Hair Salon, Richmond",
    },
  ],

  cta: {
    eyebrow: "Free · No obligation",
    titlePre: "SEE EXACTLY WHERE YOUR",
    titleAccent: "business stands.",
    body:
      "Book a free business audit and we'll show you precisely how your online presence is performing today — and the fastest path to grow it. No fluff, no pressure.",
    primary: { label: "Book my free audit" },
    secondary: { label: "Call the studio", href: "tel:+17783231804" },
    callNote: "Prefer to talk? Call the studio directly at 778-323-1804.",
  },

  // Copy + fields for the "Book a free audit" modal form.
  auditForm: {
    eyebrow: "Free · No obligation",
    title: "Book your free audit",
    intro:
      "Tell us a little about your business and we'll put together a free audit of your online presence — usually within one business day.",
    successTitle: "Request sent.",
    successBody:
      "Thanks — we'll review your details and get back to you within one business day. Prefer to talk now? Call the studio at 778-323-1804.",
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, placeholder: "Jane Smith" },
      { name: "phone", label: "Phone number", type: "tel", required: true, placeholder: "778-323-1804" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@business.com" },
      {
        name: "business",
        label: "Business name(s)",
        type: "text",
        required: true,
        placeholder: "Your business — list a few if you have multiple",
      },
      {
        name: "google",
        label: "Google Business Profile link(s)",
        type: "text",
        required: false,
        placeholder: "Paste your Google profile link(s) — if you have them",
      },
      {
        name: "website",
        label: "Website link(s)",
        type: "text",
        required: false,
        placeholder: "Paste your website link(s) — if you have them",
      },
    ],
    submitLabel: "Send my request",
    sendingLabel: "Sending…",
    errorTitle: "Couldn't send that.",
    errorBody:
      "Something went wrong on our end. Please email us directly or call the studio at 778-323-1804 and we'll get you sorted.",
    // Paste your Formspree form URL here to capture submissions automatically,
    // e.g. "https://formspree.io/f/abcdwxyz". Can also be set via the
    // NEXT_PUBLIC_FORMSPREE_ENDPOINT env var. Empty = falls back to the
    // visitor's email app (mailto).
    endpoint: "",
  },

  footer: {
    blurb:
      "A premium digital growth studio helping local Canadian brands dominate search, social, paid media and the web — we do anything and everything it takes to grow your online presence.",
    columns: [
      {
        heading: "Services",
        links: [
          { label: "Google Business Profile", href: "/#services" },
          { label: "SEO & Local Search", href: "/#services" },
          { label: "Google & Meta Ads", href: "/#services" },
          { label: "Web Design & Build", href: "/#services" },
        ],
      },
      {
        heading: "Studio",
        links: [
          { label: "Our Approach", href: "/process" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/#contact" },
          { label: "dglabs.van@gmail.com", href: "mailto:dglabs.van@gmail.com" },
        ],
      },
    ],
  },
};

export const process = {
  hero: {
    accent: "our",
    main: "METHOD",
    tagline:
      "A method, not a guess — a repeatable system that turns scattered marketing into compounding growth.",
    scrollLabel: "(Scroll to the system)",
  },
  contrast: {
    line1: "MOST AGENCIES SELL ONE CHANNEL AND CALL IT A STRATEGY",
    line2Pre: "WE GROW YOUR WHOLE PRESENCE",
    line2Accent: "as a system",
  },
  system: {
    label: "How We Work",
    steps: [
      {
        title: "WE AUDIT YOUR FULL DIGITAL PRESENCE FIRST",
        body: "Before a dollar moves, we map every channel — Google Business Profile, search, ads, web, social and delivery platforms. We benchmark your competitors and find the fastest wins hiding in plain sight.",
      },
      {
        title: "WE BUILD A FOCUSED GROWTH STRATEGY",
        body: "No scattershot tactics. We set clear priorities, choose the channels that matter for your business, and define measurable targets so everyone knows what winning looks like.",
      },
      {
        title: "WE BUILD AND RUN IT AS ONE TEAM",
        body: "Design, content, campaigns, listings and POS — executed by one accountable studio instead of five disconnected vendors. Everything is built to work together and convert.",
      },
      {
        title: "WE REPORT IN PLAIN LANGUAGE",
        body: "Every report ties back to what matters: calls, orders, reviews, revenue and return. No vanity charts. You'll always know exactly what's working and why.",
      },
      {
        title: "WE OPTIMISE AND SCALE WHAT WORKS",
        body: "We keep testing, keep tuning and pour fuel on the channels delivering returns. Growth compounds because the system is always improving — never set-and-forget.",
      },
    ],
  },
  benefits: {
    label: "What You Get Is One Accountable Team",
    items: [
      {
        num: "(01)",
        title: "ONE TEAM ACROSS EVERY CHANNEL",
        body: "Not a patchwork of freelancers. One studio owns your whole online presence and answers for the results.",
      },
      {
        num: "(02)",
        title: "WE DIAGNOSE BEFORE WE SPEND",
        body: "We fix what's broken and build what's missing — in the right order — instead of throwing budget at the loudest channel.",
      },
      {
        num: "(03)",
        title: "PROACTIVE, HANDS-ON MANAGEMENT",
        body: "We don't set it and forget it. Your presence is monitored, posted, optimised and defended week in, week out.",
      },
      {
        num: "(04)",
        title: "TRANSPARENT REPORTING, ALWAYS",
        body: "You always know exactly what's working, what's next and what it's doing for the business. No black boxes.",
      },
    ],
  },
  reality: {
    label: "Reality Check",
    note: "literally us as a studio saying all this",
    items: [
      {
        num: "(01)",
        text: "We don't promise overnight miracles. Local search and reputation compound over a few months of disciplined work — not a weekend.",
      },
      {
        num: "(02)",
        text: "We can't fix a product or service people don't want. Great marketing amplifies a great business; it can't rescue a bad one.",
      },
      {
        num: "(03)",
        text: "If the margins don't support acquisition, no campaign saves you. We'll run the numbers early and tell you the truth, even when it costs us the deal.",
      },
    ],
  },
};

export const about = {
  hero: {
    label: "About",
    people: [{ note: "growth & strategy" }, { note: "design & build" }],
  },
  tagline: {
    pre: "WE'RE A VANCOUVER STUDIO THAT TREATS YOUR ONLINE PRESENCE LIKE",
    accent: "our own",
    post: ".",
  },
  workWith: {
    pre: "WE WORK WITH LOCAL BRANDS WHO",
    lines: [
      "are done juggling five vendors",
      "want results they can measure",
      "expect us to do whatever it takes",
    ],
  },
  stats: [
    { value: "40+", label: "Local brands grown & managed" },
    { value: "6", label: "Channels under one roof" },
    { value: "+180%", label: "Avg. local search visibility lift" },
  ],
  note: [
    "We started Digital Growth Labs because local businesses kept getting sold single channels and disconnected tactics instead of real growth. We bundled search, social, ads, web, listings and delivery platforms under one accountable roof.",
    "We're blunt, fast and allergic to jargon. If a channel doesn't move calls, orders, reviews or revenue, we don't waste your money on it.",
  ],
  philosophy: {
    label: "How We Think About Growth",
    items: [
      {
        num: "(01)",
        title: "WHATEVER IT TAKES",
        body: "We do anything and everything to improve your online presence — no task too small, no channel off-limits.",
      },
      {
        num: "(02)",
        title: "ONE ACCOUNTABLE TEAM",
        body: "One studio owns the whole picture, so nothing falls through the cracks between vendors.",
      },
      {
        num: "(03)",
        title: "DIAGNOSE BEFORE YOU SPEND",
        body: "We find what's actually broken first, then fix it in the order that moves the needle fastest.",
      },
      {
        num: "(04)",
        title: "REPUTATION IS REVENUE",
        body: "For a local business, reviews and how you show up everywhere are the growth engine. We protect both.",
      },
    ],
  },
};
