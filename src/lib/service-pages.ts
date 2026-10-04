// Shared SEO + content data for the individual service pages.
export const SITE_URL = "https://annapurna-event-aid.lovable.app";
export const BUSINESS = {
  name: "Annapurna Tent House and Caterings",
  phone: "7396627263",
  email: "yedla16manoj@gmail.com",
  locality: "Anakapalle, Andhra Pradesh",
  street: "Beside Shivalayam, Laxminarayana Nagar, Golla Vedi, Chinarajupeta",
};
export const WHATSAPP_URL = `https://wa.me/917396627263?text=${encodeURIComponent(
  "Hi, I would like to enquire about catering/tent house services for my event.",
)}`;

export type ServicePath =
  | "/catering-services-anakapalle"
  | "/tent-house-anakapalle"
  | "/wedding-catering-anakapalle"
  | "/function-catering-anakapalle"
  | "/birthday-catering-anakapalle"
  | "/housewarming-catering-anakapalle";

export type Block = { h2: string; paras?: string[]; list?: string[]; qa?: [string, string][] };

export type ServicePageData = {
  path: ServicePath;
  title: string;
  description: string;
  h1: string;
  crumb: string;
  cardTitle: string;
  cardText: string;
  serviceType: string;
  lead: string;
  image: "feast" | "tent" | "wedding" | "catering" | "birthday" | "housewarming";
  imageAlt: string;
  blocks: Block[];
  related: { path: ServicePath | "/contact"; label: string }[];
};

const bookingQA: [string, string] = [
  "How early should I book?",
  "Book as soon as your event date is fixed. Wedding and festival seasons in Anakapalle are busy, so an early call gives the most flexibility on dates, menu and equipment. For smaller functions, contact us with your date and we will tell you what is possible.",
];

export const servicePages: ServicePageData[] = [
  {
    path: "/catering-services-anakapalle",
    title: "Catering Services in Anakapalle | Annapurna Caterings",
    description:
      "Andhra and South Indian catering in Anakapalle for weddings, functions, birthdays and housewarmings. Veg and non-veg menus planned with you. Call 7396627263.",
    h1: "Catering Services in Anakapalle",
    crumb: "Catering Services",
    cardTitle: "Catering Services",
    cardText: "Andhra and South Indian food for functions of every size, with veg and non-veg options.",
    serviceType: "Catering",
    lead: "Traditional Andhra and South Indian food, cooked and served for family functions and events in Anakapalle and nearby areas.",
    image: "feast",
    imageAlt: "Traditional Andhra meal served on a banana leaf",
    blocks: [
      {
        h2: "Food that feels like home, for every guest",
        paras: [
          "Annapurna Tent House and Caterings prepares food for occasions where taste and tradition matter. Our catering is rooted in the Andhra and South Indian dishes that families in Anakapalle grow up with, so the meal feels familiar and festive at the same time.",
          "Every function is different. A small pooja lunch for forty people needs a very different plan from a wedding feast for several hundred guests. That is why we do not push a fixed package. We talk to you about your guests, your budget, the type of function and any family preferences, and then suggest a menu that suits the occasion.",
        ],
      },
      {
        h2: "What food options are available?",
        paras: ["Menus are planned around your event. The categories we commonly prepare include:"],
        list: [
          "Traditional Andhra cuisine",
          "South Indian favourites",
          "Pure vegetarian menus",
          "Non-vegetarian menus",
          "Rice varieties and main courses",
          "Curries, dals and side dishes",
          "Snacks and starters",
          "Sweets and desserts",
        ],
      },
      {
        h2: "Who is our catering suitable for?",
        paras: [
          "Our catering is suited to families and organisers who want a proper traditional meal rather than a generic party menu. We cater weddings and marriages, engagements, birthday parties, housewarmings (gruhapravesam), religious functions, family get-togethers, community events and small corporate or office gatherings.",
          "If you are hosting at home, at a temple hall, in a function hall or at an open venue, tell us where the event is and we will plan cooking and serving accordingly.",
        ],
      },
      {
        h2: "Catering plus equipment from one place",
        paras: [
          "Because we also run a tent house, you can arrange food along with tents, tables and chairs, cooking vessels, gas stoves and serving equipment in a single conversation. This saves you from coordinating several vendors in the days before your function.",
        ],
      },
      {
        h2: "Common questions",
        qa: [
          ["Do you provide both veg and non-veg food?", "Yes. We prepare vegetarian and non-vegetarian menus. Many families choose a pure vegetarian menu for religious functions and housewarmings; tell us your preference while enquiring."],
          ["Can I choose the dishes?", "Yes. We discuss the menu with you and adjust it for your guests, budget and occasion. Final menu and pricing are confirmed directly with you."],
          bookingQA,
          ["What areas do you serve?", "We are based in Anakapalle and serve Anakapalle and nearby areas. Call us with your venue to confirm availability."],
        ],
      },
    ],
    related: [
      { path: "/wedding-catering-anakapalle", label: "Wedding catering services" },
      { path: "/function-catering-anakapalle", label: "Catering for family functions" },
      { path: "/tent-house-anakapalle", label: "Tent house services in Anakapalle" },
      { path: "/contact", label: "Contact Annapurna Tent House and Caterings" },
    ],
  },
  {
    path: "/tent-house-anakapalle",
    title: "Tent House in Anakapalle | Tents, Chairs & Equipment",
    description:
      "Tent house in Anakapalle for shamiana tents, tables, chairs, cooking vessels, gas stoves and serving equipment for weddings and functions. Call 7396627263.",
    h1: "Tent House Services in Anakapalle",
    crumb: "Tent House",
    cardTitle: "Tent House",
    cardText: "Tents and shamiana, tables, chairs, cooking vessels, gas stoves and serving equipment.",
    serviceType: "Tent and event equipment rental",
    lead: "Tents, seating, cooking and serving equipment for functions in Anakapalle, arranged by the same team that can cook your food.",
    image: "tent",
    imageAlt: "Shamiana tent set up with tables and chairs for a function",
    blocks: [
      {
        h2: "Everything your venue needs, without running around",
        paras: [
          "Hosting a function usually means arranging shade, seating, a cooking area and serving setup, often from different shops. Annapurna Tent House and Caterings brings these essentials together so you can plan the practical side of your event with one call.",
          "We supply items for weddings, engagements, housewarmings, religious functions, birthdays and community gatherings, whether the event is held at home, in a street-side shamiana, or at an open ground.",
        ],
      },
      {
        h2: "What is included in our tent house service?",
        list: [
          "Tents and shamiana for shade and covered seating",
          "Tables and chairs for guests and dining",
          "Cooking vessels suitable for large-quantity cooking",
          "Gas stoves for the cooking area",
          "Serving equipment for buffet or traditional serving",
          "Complete event setup when you need several items together",
        ],
        paras: ["Exact quantities depend on your guest count and venue. Share these details and we will suggest what you need."],
      },
      {
        h2: "Who uses our tent house?",
        paras: [
          "Families hosting functions at home are our most common customers — when the house is too small for all guests, a shamiana with chairs in front of the house solves the problem. Temple committees, community associations and organisers of local events also hire tents and seating from us.",
          "Some customers only need equipment and do their own cooking with family cooks. Others combine equipment with our catering. Both are welcome.",
        ],
      },
      {
        h2: "Planning tips for your setup",
        paras: [
          "Before calling, it helps to know the approximate number of guests, the space available at the venue, whether you need a separate cooking area, and the date and timing of the function. With these details we can tell you which items and quantities make sense.",
        ],
      },
      {
        h2: "Common questions",
        qa: [
          ["Can I hire only tables and chairs?", "Yes. You can hire individual items such as tables and chairs, cooking vessels or gas stoves without booking the full setup."],
          ["Do you also provide food?", "Yes. We are a combined tent house and catering service, so you can book food along with equipment if you wish."],
          bookingQA,
        ],
      },
    ],
    related: [
      { path: "/catering-services-anakapalle", label: "Catering services in Anakapalle" },
      { path: "/wedding-catering-anakapalle", label: "Wedding catering and setup" },
      { path: "/housewarming-catering-anakapalle", label: "Housewarming arrangements" },
      { path: "/contact", label: "Contact Annapurna Tent House and Caterings" },
    ],
  },
  {
    path: "/wedding-catering-anakapalle",
    title: "Wedding & Marriage Catering in Anakapalle | Annapurna",
    description:
      "Wedding and marriage catering in Anakapalle with traditional Andhra food, plus tents, seating and serving equipment from one team. Call 7396627263 to plan.",
    h1: "Wedding & Marriage Catering in Anakapalle",
    crumb: "Wedding Catering",
    cardTitle: "Wedding Catering",
    cardText: "Traditional Andhra wedding meals with tents and seating arranged together.",
    serviceType: "Wedding catering",
    lead: "Traditional food and practical event support for weddings, marriages and engagements in Anakapalle.",
    image: "wedding",
    imageAlt: "Sample photo of a traditional Indian wedding setup",
    blocks: [
      {
        h2: "A wedding meal your guests will remember",
        paras: [
          "In Andhra families, the wedding meal is one of the most talked-about parts of the celebration. Guests travel from other towns and villages, elders expect familiar traditional dishes, and the hosts want everyone to eat well and on time.",
          "Annapurna Tent House and Caterings helps families in Anakapalle plan this meal carefully — from choosing dishes that suit the family's customs to organising cooking and serving so that food reaches guests smoothly during the muhurtham rush.",
        ],
      },
      {
        h2: "What wedding catering includes",
        list: [
          "Menu planning based on your guest count, customs and budget",
          "Vegetarian or non-vegetarian menus, or both for different events",
          "Traditional Andhra and South Indian dishes, rice items, curries and sweets",
          "Cooking and serving arrangements for the main meal",
          "Optional tents, tables, chairs and serving equipment from our tent house",
        ],
      },
      {
        h2: "Catering for the whole wedding, not just one meal",
        paras: [
          "Weddings often involve several events — engagement, pre-wedding pooja, the wedding day itself and a reception or post-wedding function. Some events call for a simple vegetarian meal, others for a larger feast. Tell us the full schedule and we can discuss which events you would like us to cater.",
        ],
      },
      {
        h2: "Why combine catering and tent house?",
        paras: [
          "When the same team handles food and equipment, the dining area, cooking area and serving setup are planned together. There is one point of contact, fewer handovers and less for the family to coordinate during a busy week.",
        ],
      },
      {
        h2: "Common questions",
        qa: [
          ["How early should we book for a wedding?", "As soon as your muhurtham date is fixed. Popular wedding dates fill quickly, so early booking gives you the best chance of getting your preferred arrangements."],
          ["Can the menu follow our family traditions?", "Yes. Share any dishes, customs or restrictions that matter to your family and we will plan the menu around them."],
          ["How is pricing decided?", "Pricing depends on the menu, guest count and services you choose. Contact us with your requirements for a quote."],
        ],
      },
    ],
    related: [
      { path: "/catering-services-anakapalle", label: "All catering services" },
      { path: "/tent-house-anakapalle", label: "Wedding tent and seating" },
      { path: "/function-catering-anakapalle", label: "Engagement and family function catering" },
      { path: "/contact", label: "Book a wedding consultation" },
    ],
  },
  {
    path: "/function-catering-anakapalle",
    title: "Function Catering in Anakapalle | Family & Religious Events",
    description:
      "Catering in Anakapalle for family functions, religious events, poojas, community gatherings and get-togethers. Traditional food with equipment support. Call 7396627263.",
    h1: "Function Catering in Anakapalle",
    crumb: "Function Catering",
    cardTitle: "Function Catering",
    cardText: "Food for poojas, religious functions, family get-togethers and community events.",
    serviceType: "Event and function catering",
    lead: "Catering for poojas, religious functions, family get-togethers and community events in Anakapalle.",
    image: "catering",
    imageAlt: "Sample photo of catering staff serving food at a function",
    blocks: [
      {
        h2: "For the many functions families celebrate",
        paras: [
          "Beyond weddings, family life in Andhra is full of smaller celebrations — naming ceremonies, poojas and vratams, anniversaries, annual rituals, family reunions and community festivals. Each needs good food for guests, often at short notice and at a reasonable budget.",
          "Annapurna Tent House and Caterings provides catering for these functions in Anakapalle, with menus that suit the nature of the occasion.",
        ],
      },
      {
        h2: "Types of functions we cater",
        list: [
          "Religious functions, poojas and vratams",
          "Family functions and get-togethers",
          "Engagements and small ceremonies",
          "Community and association events",
          "Office and corporate gatherings",
          "Other special occasions",
        ],
      },
      {
        h2: "Menus suited to the occasion",
        paras: [
          "Religious functions usually call for a pure vegetarian, traditional meal, often served on banana leaves. Family get-togethers may include non-vegetarian dishes. Community events may need simple, filling food for a large number of people. We discuss these differences with you and plan accordingly.",
        ],
      },
      {
        h2: "Equipment support for the venue",
        paras: [
          "If your function is at home or in an open space, you can also hire tents, tables, chairs, cooking vessels, gas stoves and serving equipment from us, so food and setup are planned together.",
        ],
      },
      {
        h2: "Common questions",
        qa: [
          ["Do you cater small functions?", "Yes. Contact us with your guest count and requirements — we cater functions of different sizes."],
          ["Can you serve a traditional banana-leaf meal?", "Traditional serving can be discussed when you plan your menu. Tell us how you would like food to be served."],
          bookingQA,
        ],
      },
    ],
    related: [
      { path: "/catering-services-anakapalle", label: "Catering services in Anakapalle" },
      { path: "/housewarming-catering-anakapalle", label: "Housewarming catering" },
      { path: "/tent-house-anakapalle", label: "Tents, tables and chairs" },
      { path: "/contact", label: "Contact us about your function" },
    ],
  },
  {
    path: "/birthday-catering-anakapalle",
    title: "Birthday Party Catering in Anakapalle | Annapurna",
    description:
      "Birthday party catering in Anakapalle for kids and family celebrations. Snacks, starters, meals and sweets, with tables and chairs available. Call 7396627263.",
    h1: "Birthday Party Catering in Anakapalle",
    crumb: "Birthday Catering",
    cardTitle: "Birthday Catering",
    cardText: "Snacks, meals and sweets for children's and family birthday celebrations.",
    serviceType: "Birthday party catering",
    lead: "Food and seating for birthday celebrations at home or at a venue in Anakapalle.",
    image: "birthday",
    imageAlt: "Sample photo of a family birthday celebration setup",
    blocks: [
      {
        h2: "Relax and enjoy the celebration",
        paras: [
          "Whether it is a first birthday with relatives from both families, a child's party with school friends, or a milestone birthday for a parent, the host usually ends up busy in the kitchen instead of with the guests. Our birthday catering takes the cooking and serving off your hands.",
        ],
      },
      {
        h2: "Food options for birthday parties",
        paras: ["Birthday menus are usually a mix of something to snack on and a proper meal. Depending on your guests, we can plan:"],
        list: [
          "Snacks and starters for when guests arrive",
          "A vegetarian or non-vegetarian meal",
          "Rice items, curries and side dishes",
          "Sweets and desserts to go with the cake",
        ],
      },
      {
        h2: "Who is it suitable for?",
        paras: [
          "Birthday catering suits families celebrating at home, in an apartment common area, at a function hall or on a terrace. First birthdays (often larger family events in Andhra) and smaller evening parties can both be planned — share the expected guest count and timing.",
        ],
      },
      {
        h2: "Tables, chairs and serving setup",
        paras: [
          "If you do not have enough seating at home, you can hire tables, chairs and serving equipment along with the food. For larger first-birthday functions, a shamiana tent can also be arranged through our tent house.",
        ],
      },
      {
        h2: "Common questions",
        qa: [
          ["Do you make birthday cakes?", "Cakes are not listed among our services. Please arrange the cake separately; we can plan the rest of the food around it."],
          ["Is there a minimum number of guests?", "Contact us with your guest count and we will let you know what we can arrange for your party."],
          bookingQA,
        ],
      },
    ],
    related: [
      { path: "/function-catering-anakapalle", label: "Family function catering" },
      { path: "/tent-house-anakapalle", label: "Tables, chairs and tents" },
      { path: "/catering-services-anakapalle", label: "Our full catering menu categories" },
      { path: "/contact", label: "Enquire about your birthday party" },
    ],
  },
  {
    path: "/housewarming-catering-anakapalle",
    title: "Housewarming Catering in Anakapalle | Gruhapravesam Food",
    description:
      "Housewarming (gruhapravesam) catering in Anakapalle with traditional vegetarian meals, plus tents, chairs and serving equipment. Call 7396627263 to book.",
    h1: "Housewarming Catering in Anakapalle",
    crumb: "Housewarming Catering",
    cardTitle: "Housewarming Catering",
    cardText: "Traditional gruhapravesam meals with tent and seating support at your new home.",
    serviceType: "Housewarming catering",
    lead: "Traditional food and setup for gruhapravesam ceremonies at your new home in Anakapalle.",
    image: "housewarming",
    imageAlt: "Sample photo of a housewarming ceremony setup",
    blocks: [
      {
        h2: "Celebrate your new home with a traditional meal",
        paras: [
          "A gruhapravesam brings together family, neighbours and friends for the pooja and a meal afterwards. Most families prefer a pure vegetarian, traditional Andhra menu, and food often needs to be ready soon after the muhurtham, which may be early in the morning.",
          "Annapurna Tent House and Caterings helps families in Anakapalle plan this meal and the space around it, so you can focus on the ceremony.",
        ],
      },
      {
        h2: "What is included",
        list: [
          "Traditional vegetarian menu planned with you",
          "Rice items, curries, dals, side dishes and sweets",
          "Cooking and serving arrangements",
          "Optional shamiana tent in front of the house",
          "Tables, chairs and serving equipment",
        ],
      },
      {
        h2: "Why a tent and seating often help",
        paras: [
          "New houses — especially apartments or homes still being furnished — rarely have space to seat every guest. A shamiana with tables and chairs outside the house creates a comfortable dining area and keeps the pooja space free. Since we run both a tent house and catering, these can be planned together.",
        ],
      },
      {
        h2: "Planning around the muhurtham",
        paras: [
          "Share the muhurtham time, expected number of guests and the address of the new house when you enquire. This helps us plan when cooking should start, how the dining area should be set up and when serving can begin.",
        ],
      },
      {
        h2: "Common questions",
        qa: [
          ["Can you manage an early-morning muhurtham?", "Tell us the muhurtham time when you enquire and we will discuss how cooking and serving can be planned around it."],
          ["Do you provide only vegetarian food for housewarmings?", "Most families choose a vegetarian menu for gruhapravesam; we follow your preference."],
          bookingQA,
        ],
      },
    ],
    related: [
      { path: "/function-catering-anakapalle", label: "Pooja and religious function catering" },
      { path: "/tent-house-anakapalle", label: "Tent house services in Anakapalle" },
      { path: "/catering-services-anakapalle", label: "Catering services" },
      { path: "/contact", label: "Contact Annapurna Tent House and Caterings" },
    ],
  },
];

export const getServicePage = (path: ServicePath) => servicePages.find((p) => p.path === path)!;

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/favicon.png`,
    telephone: "+91-7396627263",
    email: BUSINESS.email,
    slogan: "Traditional Taste. Complete Event Support.",
    servesCuisine: ["Andhra", "South Indian"],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: "Anakapalle",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Anakapalle" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering and tent house services",
      itemListElement: servicePages.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.cardTitle, url: `${SITE_URL}${p.path}` },
      })),
    },
  };
}

export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export function pageHead(o: { title: string; description: string; path: string; crumb: string; extra?: object[] }) {
  const url = `${SITE_URL}${o.path}`;
  return {
    meta: [
      { title: o.title },
      { name: "description", content: o.description },
      { property: "og:title", content: o.title },
      { property: "og:description", content: o.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [o.extra ?? [], [breadcrumbJsonLd(o.crumb, o.path)]].flat().map((d) => ({
      type: "application/ld+json",
      children: JSON.stringify(d),
    })),
  };
}
