import { useMemo, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { servicePages } from "@/lib/service-pages";
import {
  Armchair, CalendarDays, Check, ChefHat, ChevronRight, CookingPot, Flame,
  HandPlatter, Heart, Mail, MapPin, Menu, MessageCircle, Phone, Sparkles,
  TableProperties, TentTree, Users, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { submitEnquiry, type EnquiryInput } from "@/lib/enquiries.functions";
import heroImage from "@/assets/annapurna-hero.webp";
import feastImage from "@/assets/andhra-feast.webp";
import tentImage from "@/assets/tent-setup.webp";
import galleryFood from "@/assets/gallery/andhra-food.webp";
import galleryBuffet from "@/assets/gallery/wedding-buffet.webp";
import galleryCatering from "@/assets/gallery/catering-service.webp";
import galleryWedding from "@/assets/gallery/wedding.webp";
import galleryEngagement from "@/assets/gallery/engagement.webp";
import galleryBirthday from "@/assets/gallery/birthday.webp";
import galleryHousewarming from "@/assets/gallery/housewarming.webp";
import galleryReligious from "@/assets/gallery/religious-function.webp";
import galleryEquipment from "@/assets/gallery/equipment.webp";

type Language = "en" | "te";

const PHONE = "7396627263";
const WHATSAPP = `https://wa.me/917396627263?text=${encodeURIComponent("Hi, I would like to enquire about catering/tent house services for my event.")}`;
const ADDRESS = "Anakapalle, beside Shivalayam, Laxminarayana Nagar, Golla Vedi, Chinarajupeta, Andhra Pradesh, India";

const copy = {
  en: {
    nav: ["Home", "About", "Catering", "Tent & Equipment", "Events", "Gallery", "Contact"],
    quote: "Get a Quote", heroH1: "Catering Services & Tent House in Anakapalle", heroTitle: "Traditional Taste. Complete Event Support.",
    heroSub: "Authentic Andhra & South Indian Catering, Tents and Event Equipment for Weddings, Functions & Every Special Occasion.",
    freeQuote: "Get a Free Quote", whatsapp: "WhatsApp Us", serving: "Serving Anakapalle & Nearby Areas",
    trust: "Food • Tents • Tables & Chairs • Cooking Equipment • Serving Equipment",
    aboutEyebrow: "About Annapurna", aboutTitle: "Everything You Need for a Successful Function",
    about: ["Annapurna Tent House and Caterings provides catering and event-support services for weddings, marriages, family functions, religious occasions, parties and other special events.", "From authentic Andhra and South Indian food to tents, tables, chairs, cooking vessels, gas stoves and serving equipment, we help make your event arrangements simpler and more convenient.", "Whether you are planning an intimate family function or a large celebration, contact us to discuss your requirements and get a customised quotation."],
    plan: "Plan Your Event With Us", cateringTitle: "Authentic Andhra & South Indian Catering", cateringSub: "Traditional flavours prepared for memorable occasions.",
    cateringText: "Catering planned around your event, guest count and preferences—from close family gatherings to large celebrations.",
    askCatering: "Ask About Catering Packages", equipmentTitle: "Complete Tent House & Event Equipment Services", equipmentSub: "Convenient event essentials from one place.",
    eventsTitle: "Made for Every Celebration", eventsSub: "Thoughtful food and event support for life’s meaningful occasions.", tell: "Tell Us About Your Event",
    whyTitle: "One Team for Your Food & Event Requirements", whyText: "Planning an event involves many arrangements. Annapurna brings catering and essential event equipment together, helping you simplify your function arrangements.",
    galleryTitle: "A Glimpse of the Experience", galleryLabel: "Sample Gallery — Replace with Actual Business Photos",
    formTitle: "Planning an Event?", formSub: "Tell us what you need and we’ll help you plan the arrangements.",
    success: "Thank you! Your enquiry has been received. Annapurna Tent House and Caterings will contact you shortly.",
    submit: "Get My Free Quote", contactTitle: "Let’s Plan Your Event", call: "Call Now", footerLine: "Traditional Taste. Complete Event Support.",
  },
  te: {
    nav: ["హోమ్", "మా గురించి", "కేటరింగ్", "టెంట్ & సామగ్రి", "వేడుకలు", "గ్యాలరీ", "సంప్రదించండి"],
    quote: "ధర వివరాలు పొందండి", heroH1: "అనకాపల్లిలో కేటరింగ్ సేవలు & టెంట్ హౌస్", heroTitle: "సాంప్రదాయ రుచి. సంపూర్ణ వేడుక సహాయం.",
    heroSub: "వివాహాలు, శుభకార్యాలు మరియు ప్రతి ప్రత్యేక సందర్భానికి ఆంధ్ర & దక్షిణ భారత వంటకాలు, టెంట్లు, వేడుక సామగ్రి.",
    freeQuote: "ఉచిత కోట్ పొందండి", whatsapp: "వాట్సాప్ చేయండి", serving: "అనకాపల్లి మరియు సమీప ప్రాంతాలకు సేవలు",
    trust: "ఆహారం • టెంట్లు • టేబుళ్లు & కుర్చీలు • వంట సామగ్రి • వడ్డింపు సామగ్రి",
    aboutEyebrow: "అన్నపూర్ణ గురించి", aboutTitle: "మీ శుభకార్యానికి కావాల్సినవన్నీ ఒకేచోట",
    about: ["Annapurna Tent House and Caterings వివాహాలు, కుటుంబ వేడుకలు, ఆధ్యాత్మిక కార్యక్రమాలు, పార్టీలు మరియు ఇతర ప్రత్యేక సందర్భాలకు కేటరింగ్, వేడుక సహాయ సేవలు అందిస్తుంది.", "అసలైన ఆంధ్ర, దక్షిణ భారత వంటకాల నుంచి టెంట్లు, టేబుళ్లు, కుర్చీలు, వంట పాత్రలు, గ్యాస్ స్టౌలు, వడ్డింపు సామగ్రి వరకు మీ ఏర్పాట్లను సులభం చేస్తాము.", "చిన్న కుటుంబ వేడుకైనా, పెద్ద సంబరమైనా—మీ అవసరాలు మాతో పంచుకుని ప్రత్యేక ధర వివరాలు పొందండి."],
    plan: "మీ వేడుకను ప్లాన్ చేద్దాం", cateringTitle: "అసలైన ఆంధ్ర & దక్షిణ భారత కేటరింగ్", cateringSub: "మధుర జ్ఞాపకాల కోసం సాంప్రదాయ రుచులు.",
    cateringText: "మీ వేడుక, అతిథుల సంఖ్య, అభిరుచులకు అనుగుణంగా—చిన్న కుటుంబ కలయికల నుంచి పెద్ద సంబరాల వరకు కేటరింగ్ ఏర్పాట్లు.",
    askCatering: "కేటరింగ్ ప్యాకేజీలు అడగండి", equipmentTitle: "పూర్తి టెంట్ హౌస్ & వేడుక సామగ్రి సేవలు", equipmentSub: "వేడుకకు కావాల్సినవన్నీ ఒకేచోట.",
    eventsTitle: "ప్రతి సంబరానికి సిద్ధం", eventsSub: "జీవితంలోని ప్రత్యేక సందర్భాలకు ఆహారం, వేడుక సహాయం.", tell: "మీ వేడుక గురించి చెప్పండి",
    whyTitle: "ఆహారం & వేడుక అవసరాలకు ఒకే బృందం", whyText: "ఒక వేడుకకు ఎన్నో ఏర్పాట్లు అవసరం. కేటరింగ్‌తో పాటు అవసరమైన సామగ్రిని ఒకేచోట అందిస్తూ మీ పనిని సులభం చేస్తుంది అన్నపూర్ణ.",
    galleryTitle: "మా సేవల ఓ చిన్న చూపు", galleryLabel: "నమూనా గ్యాలరీ — వ్యాపార ఫోటోలతో మార్చాలి",
    formTitle: "వేడుక ప్లాన్ చేస్తున్నారా?", formSub: "మీ అవసరాలు చెప్పండి—ఏర్పాట్లను ప్లాన్ చేయడంలో మేము సహాయం చేస్తాము.",
    success: "ధన్యవాదాలు! మీ వివరాలు అందాయి. Annapurna Tent House and Caterings త్వరలో మిమ్మల్ని సంప్రదిస్తుంది.",
    submit: "ఉచిత కోట్ పొందండి", contactTitle: "మీ వేడుకను కలిసి ప్లాన్ చేద్దాం", call: "ఇప్పుడే కాల్ చేయండి", footerLine: "సాంప్రదాయ రుచి. సంపూర్ణ వేడుక సహాయం.",
  },
};

const anchors = ["home", "about", "catering", "equipment", "events", "gallery", "contact"];
type ServiceCard = [LucideIcon, string, string, string, string];
type EquipmentItem = [LucideIcon, string, string, string];

const serviceCards: ServiceCard[] = [
  [ChefHat, "Andhra & South Indian Catering", "ఆంధ్ర & దక్షిణ భారత కేటరింగ్", "Traditional food prepared for functions and celebrations.", "వేడుకలు, శుభకార్యాలకు సాంప్రదాయ వంటకాలు."],
  [TentTree, "Tent House Services", "టెంట్ హౌస్ సేవలు", "Tents and event setup requirements.", "టెంట్లు మరియు వేడుక ఏర్పాట్లు."],
  [TableProperties, "Complete Event Equipment", "పూర్తి వేడుక సామగ్రి", "Tables, chairs, vessels, gas stoves and serving equipment.", "టేబుళ్లు, కుర్చీలు, పాత్రలు, గ్యాస్ స్టౌలు, వడ్డింపు సామగ్రి."],
  [Sparkles, "Custom Event Packages", "ప్రత్యేక వేడుక ప్యాకేజీలు", "Solutions based on event type, guest count and requirements.", "వేడుక, అతిథుల సంఖ్య, అవసరాలకు తగిన పరిష్కారాలు."],
];
const cateringItems = ["Traditional Andhra Cuisine", "South Indian Favourites", "Vegetarian Options", "Non-Vegetarian Options", "Rice & Main Courses", "Curries & Side Dishes", "Snacks & Starters", "Sweets & Desserts"];
const cateringTe = ["సాంప్రదాయ ఆంధ్ర వంటకాలు", "దక్షిణ భారత ప్రత్యేకాలు", "శాకాహార ఎంపికలు", "మాంసాహార ఎంపికలు", "అన్నం & ప్రధాన వంటకాలు", "కూరలు & పక్క వంటకాలు", "స్నాక్స్ & స్టార్టర్స్", "స్వీట్లు & డెజర్ట్స్"];
const equipment: EquipmentItem[] = [
  [TentTree, "Tents & Shamiana", "టెంట్లు & షామియానా", "Comfortable event spaces for functions and celebrations."],
  [Armchair, "Tables & Chairs", "టేబుళ్లు & కుర్చీలు", "Seating and table arrangements for your guests."],
  [CookingPot, "Cooking Vessels", "వంట పాత్రలు", "Equipment for large-scale event cooking."],
  [Flame, "Gas Stoves", "గ్యాస్ స్టౌలు", "Cooking equipment for function requirements."],
  [HandPlatter, "Serving Equipment", "వడ్డింపు సామగ్రి", "Essentials for smooth event dining."],
  [Sparkles, "Complete Event Setup", "పూర్తి వేడుక ఏర్పాటు", "A customised solution for your event."],
];
const eventCards = [
  ["Wedding & Marriage", "వివాహం & పెళ్లి", galleryWedding], ["Engagement", "నిశ్చితార్థం", galleryEngagement],
  ["Birthday Party", "పుట్టినరోజు వేడుక", galleryBirthday], ["Housewarming", "గృహప్రవేశం", galleryHousewarming],
  ["Religious Functions", "ఆధ్యాత్మిక కార్యక్రమాలు", galleryReligious], ["Family Functions", "కుటుంబ వేడుకలు", galleryCatering],
  ["Community Events", "సామూహిక కార్యక్రమాలు", galleryBuffet], ["Other Special Events", "ఇతర ప్రత్యేక వేడుకలు", tentImage],
];
const benefits = ["Traditional Food", "Complete Event Support", "Flexible Requirements", "One Place for Catering & Equipment", "Local Service in Anakapalle", "Personalised Event Enquiries"];
const benefitsTe = ["సాంప్రదాయ వంటకాలు", "పూర్తి వేడుక సహాయం", "అవసరాలకు అనుగుణంగా", "కేటరింగ్ & సామగ్రి ఒకేచోట", "అనకాపల్లిలో స్థానిక సేవ", "వ్యక్తిగత వేడుక సంప్రదింపులు"];
const gallery = [
  [galleryFood, "Traditional Andhra food"], [galleryBuffet, "Indian wedding buffet"], [galleryCatering, "Catering service"],
  [tentImage, "Wedding tent and dining arrangement"], [galleryEquipment, "Cooking and serving equipment"], [galleryWedding, "Indian wedding function"],
];

function Brand() {
  return <a href="#home" className="brand" aria-label="Annapurna home"><span className="brand-mark"><CookingPot size={19}/></span><span><b>Annapurna</b><small>TENT HOUSE &amp; CATERINGS</small></span></a>;
}

function CTA({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <a href={href} className={secondary ? "btn btn-secondary" : "btn btn-primary"}>{children}<ChevronRight size={18}/></a>;
}

export function AnnapurnaSite() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const isTe = language === "te";

  return <div className={isTe ? "telugu" : "english"}>
    <header className="site-header">
      <div className="header-inner"><Brand/><nav className="desktop-nav" aria-label="Primary navigation">{t.nav.map((item, i) => <a key={item} href={`#${anchors[i]}`}>{item}</a>)}</nav>
        <div className="header-actions"><div className="language-switch" aria-label="Choose language"><button type="button" className={!isTe ? "active" : ""} onClick={()=>setLanguage("en")}>EN</button><span/> <button type="button" className={isTe ? "active" : ""} onClick={()=>setLanguage("te")}>తెలుగు</button></div><CTA href="#enquiry">{t.quote}</CTA><button className="menu-button" type="button" aria-label="Toggle menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
      </div>
      {menuOpen && <nav className="mobile-menu">{t.nav.map((item, i) => <a key={item} href={`#${anchors[i]}`} onClick={()=>setMenuOpen(false)}>{item}</a>)}</nav>}
    </header>

    <main>
      <section id="home" className="hero" style={{backgroundImage:`url(${heroImage})`}}>
        <div className="hero-overlay"/><div className="hero-content"><p className="eyebrow light"><MapPin size={16}/>{t.serving}</p><h1>{t.heroH1}</h1><p className="hero-copy"><strong>{t.heroTitle}</strong> {t.heroSub}</p><div className="hero-actions"><CTA href="#enquiry">{t.freeQuote}</CTA><CTA href={WHATSAPP} secondary><MessageCircle size={18}/>{t.whatsapp}</CTA></div><p className="trust-line">{t.trust}</p></div>
      </section>

      <section className="service-strip" aria-label="Our main services"><div className="section-inner service-grid">{serviceCards.map(([Icon,en,te,descEn,descTe]) => <article className="service-card" key={String(en)}><div className="icon-box"><Icon size={25}/></div><div><h3>{isTe?te:en}</h3><p>{isTe?descTe:descEn}</p></div></article>)}</div></section>

      <section id="about" className="section about-section"><div className="section-inner split"><div className="image-frame"><img src={feastImage} loading="lazy" width="1408" height="1200" alt="Traditional Andhra meal served on a banana leaf"/><span className="image-note">Andhra tradition, served with warmth</span></div><div className="content"><p className="eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2>{t.about.map(p=><p key={p}>{p}</p>)}<CTA href="#enquiry">{t.plan}</CTA></div></div></section>

      <section id="catering" className="section catering-section"><div className="section-inner"><div className="section-heading centered"><p className="eyebrow">Catering</p><h2>{t.cateringTitle}</h2><p>{t.cateringSub}</p></div><div className="catering-layout"><div className="catering-copy"><ChefHat size={40}/><p>{t.cateringText}</p><div className="occasion-list">{(isTe?["వివాహాలు","నిశ్చితార్థాలు","పుట్టినరోజులు","గృహప్రవేశాలు","ఆధ్యాత్మిక కార్యక్రమాలు","కుటుంబ వేడుకలు","సామూహిక & ఇతర కార్యక్రమాలు"]:["Weddings & Marriages","Engagements","Birthday Celebrations","Housewarmings","Religious Functions","Family Gatherings","Community & Other Events"]).map(x=><span key={x}><Check size={15}/>{x}</span>)}</div></div><div className="food-grid">{(isTe?cateringTe:cateringItems).map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3></div>)}</div></div><div className="center-cta"><CTA href="#enquiry">{t.askCatering}</CTA></div></div></section>

      <section id="equipment" className="section equipment-section"><div className="section-inner"><div className="section-heading"><p className="eyebrow">Tent House</p><h2>{t.equipmentTitle}</h2><p>{t.equipmentSub}</p></div><div className="equipment-layout"><img src={tentImage} loading="lazy" width="1408" height="1104" alt="Elegant wedding shamiana with tables and chairs"/><div className="equipment-grid">{equipment.map(([Icon,en,te,desc])=><article key={String(en)}><Icon size={24}/><h3>{isTe?te:en}</h3><p>{isTe?"మీ వేడుక అవసరాలకు అనుగుణమైన సౌకర్యవంతమైన ఏర్పాటు.":desc}</p></article>)}</div></div><div className="center-cta"><CTA href="#enquiry">{t.tell}</CTA></div></div></section>

      <section id="events" className="section events-section"><div className="section-inner"><div className="section-heading centered"><p className="eyebrow">Occasions</p><h2>{t.eventsTitle}</h2><p>{t.eventsSub}</p></div><div className="event-grid">{eventCards.map(([en,te,img])=><article key={String(en)}><img src={String(img)} loading="lazy" width="602" height="602" alt={`Sample photo of a ${String(en).toLowerCase()} setup`}/><div><h3>{isTe?te:en}</h3><a href="#enquiry" aria-label={`Enquire for ${en}`}><ChevronRight/></a></div></article>)}</div><div className="center-cta"><CTA href="#enquiry">{t.tell}</CTA></div></div></section>

      <section className="section why-section"><div className="section-inner why-layout"><div><p className="eyebrow">Why Annapurna</p><h2>{t.whyTitle}</h2><p>{t.whyText}</p></div><div className="benefit-list">{(isTe?benefitsTe:benefits).map(x=><div key={x}><Check size={18}/><span>{x}</span></div>)}</div></div></section>

      <section id="services" className="section services-links-section"><div className="section-inner"><div className="section-heading centered"><p className="eyebrow">{isTe?"మా సేవలు":"Our Services in Anakapalle"}</p><h2>{isTe?"అనకాపల్లిలో కేటరింగ్ & టెంట్ హౌస్ సేవలు":"Catering & Tent House Services in Anakapalle"}</h2><p>{isTe?"ప్రతి సేవ గురించి పూర్తి వివరాలు చదవండి లేదా నేరుగా మమ్మల్ని సంప్రదించండి.":"Read more about each service, what is included, and how to book with Annapurna Tent House and Caterings."}</p></div><div className="service-link-grid">{servicePages.map(p=><Link key={p.path} to={p.path} className="service-link-card"><h3>{p.cardTitle}</h3><p>{p.cardText}</p><span>{isTe?"వివరాలు చూడండి":"Learn more"} <ChevronRight size={16}/></span></Link>)}</div><p className="service-area-note"><MapPin size={16}/>{isTe?"సేవా ప్రాంతం: అనకాపల్లి మరియు సమీప ప్రాంతాలు. మీ ప్రాంతానికి సేవ అందుబాటులో ఉందో లేదో కాల్ చేసి నిర్ధారించుకోండి.":"Service area: Anakapalle and nearby areas. Call to confirm availability for your venue."} <Link to="/contact">{isTe?"సంప్రదించండి":"Contact Annapurna Tent House and Caterings"}</Link></p></div></section>

      <section id="gallery" className="section gallery-section"><div className="section-inner"><div className="section-heading"><p className="eyebrow">Gallery</p><h2>{t.galleryTitle}</h2><p className="gallery-label">{t.galleryLabel}</p></div><div className="gallery-grid">{gallery.map(([img,alt],i)=><figure key={String(alt)} className={`gallery-${i+1}`}><img src={String(img)} loading="lazy" width="602" height="602" alt={String(alt)}/></figure>)}</div><div className="center-cta"><CTA href="#enquiry">{t.freeQuote}</CTA></div></div></section>

      <EnquirySection language={language} t={t}/>

      <section id="contact" className="section contact-section"><div className="section-inner contact-grid"><div><p className="eyebrow light">Contact Annapurna</p><h2>{t.contactTitle}</h2><h3>Annapurna Tent House and Caterings</h3><a href={`tel:+91${PHONE}`}><Phone size={19}/>{PHONE}</a><a href="mailto:yedla16manoj@gmail.com"><Mail size={19}/>yedla16manoj@gmail.com</a><p className="address"><MapPin size={20}/>{ADDRESS}</p><div className="contact-actions"><CTA href={`tel:+91${PHONE}`}>{t.call}</CTA><CTA href={WHATSAPP} secondary>{t.whatsapp}</CTA></div></div><div className="map-placeholder"><MapPin size={34}/><h3>{isTe?"అనకాపల్లి, ఆంధ్రప్రదేశ్":"Anakapalle, Andhra Pradesh"}</h3><p>{isTe?"ధృవీకరించిన మ్యాప్ లొకేషన్ అందుబాటులోకి వచ్చిన తర్వాత ఇక్కడ మ్యాప్ జోడించవచ్చు.":"Map can be added here once the exact verified business location is available."}</p></div></div></section>
    </main>

    <footer><div className="section-inner footer-grid"><div><Brand/><p>{t.footerLine}</p></div><div><h3>{isTe?"త్వరిత లింకులు":"Quick Links"}</h3>{t.nav.map((x,i)=><a key={x} href={`#${anchors[i]}`}>{x}</a>)}</div><div><h3>{isTe?"సేవలు":"Services"}</h3>{(isTe?["కేటరింగ్","టెంట్ హౌస్","టేబుళ్లు & కుర్చీలు","వంట సామగ్రి","వడ్డింపు సామగ్రి"]:["Catering","Tent House","Tables & Chairs","Cooking Equipment","Serving Equipment"]).map(x=><span key={x}>{x}</span>)}{servicePages.map(p=><Link key={p.path} to={p.path}>{p.cardTitle}</Link>)}<Link to="/contact">{isTe?"సంప్రదింపు పేజీ":"Contact page"}</Link></div><div><h3>{isTe?"సంప్రదించండి":"Contact"}</h3><a href={`tel:+91${PHONE}`}>{PHONE}</a><a href="mailto:yedla16manoj@gmail.com">yedla16manoj@gmail.com</a><span>Anakapalle, Andhra Pradesh</span></div></div><div className="footer-bottom">© 2026 Annapurna Tent House and Caterings. All rights reserved.</div></footer>
    <a className="floating-whatsapp" href={WHATSAPP} aria-label="WhatsApp Annapurna"><MessageCircle/></a>
    <div className="mobile-action-bar"><a href={`tel:+91${PHONE}`}><Phone/><span>{t.call}</span></a><a href={WHATSAPP}><MessageCircle/><span>WhatsApp</span></a><a href="#enquiry"><CalendarDays/><span>{t.quote}</span></a></div>
  </div>;
}

function EnquirySection({language,t}:{language:Language;t:typeof copy.en}) {
  const send = useServerFn(submitEnquiry);
  const startedAt = useMemo(()=>Date.now(),[]);
  const [services,setServices]=useState<string[]>([]);
  const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError]=useState("");
  const isTe=language==="te";
  const options=["Wedding / Marriage","Engagement","Birthday","Housewarming","Religious Function","Family Function","Community Event","Other"];
  const serviceOptions=["Catering","Tents","Tables & Chairs","Cooking Vessels","Gas Stoves","Serving Equipment","Complete Event Requirements"];
  const labels=isTe?{name:"పూర్తి పేరు",phone:"ఫోన్ నంబర్",event:"వేడుక రకం",date:"వేడుక తేదీ",guests:"అతిథుల సంఖ్య",services:"కావాల్సిన సేవలు",message:"సందేశం / అవసరాలు"}:{name:"Full Name",phone:"Phone Number",event:"Event Type",date:"Event Date",guests:"Number of Guests",services:"Services Required",message:"Message / Requirements"};
  async function handleSubmit(e:FormEvent<HTMLFormElement>){e.preventDefault();setError("");if(!services.length){setError(isTe?"కనీసం ఒక సేవను ఎంచుకోండి.":"Please select at least one service.");return}const form=new FormData(e.currentTarget);setStatus("sending");try{await send({data:{fullName:String(form.get("fullName")),phone:String(form.get("phone")),eventType:String(form.get("eventType")) as EnquiryInput["eventType"],eventDate:String(form.get("eventDate")||"")||undefined,guestCount:form.get("guestCount")?Number(form.get("guestCount")):undefined,services:services as EnquiryInput["services"],message:String(form.get("message")||"")||undefined,language,website:String(form.get("website")||""),startedAt}});setStatus("success");e.currentTarget.reset();setServices([])}catch(err){setStatus("error");setError(err instanceof Error?err.message:"Please try again.")}}
  return <section id="enquiry" className="section enquiry-section"><div className="section-inner enquiry-layout"><div className="enquiry-intro"><p className="eyebrow light">Free Event Quote</p><h2>{t.formTitle}</h2><p>{t.formSub}</p><div className="enquiry-contact"><a href={`tel:+91${PHONE}`}><Phone/>+91 {PHONE}</a><a href={WHATSAPP}><MessageCircle/>WhatsApp</a></div></div><div className="form-panel">{status==="success"?<div className="success-state"><span><Check/></span><h3>{isTe?"మీ అభ్యర్థన అందింది":"Enquiry received"}</h3><p>{t.success}</p><button type="button" className="btn btn-primary" onClick={()=>setStatus("idle")}>{isTe?"మరో అభ్యర్థన":"Send another enquiry"}</button></div>:<form onSubmit={handleSubmit}><div className="form-grid"><label>{labels.name} *<input name="fullName" required minLength={2} maxLength={100}/></label><label>{labels.phone} *<input name="phone" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" required placeholder="10-digit mobile number"/></label><label>{labels.event} *<select name="eventType" required defaultValue=""><option value="" disabled>{isTe?"ఎంచుకోండి":"Select event"}</option>{options.map(x=><option key={x}>{x}</option>)}</select></label><label>{labels.date}<input name="eventDate" type="date"/></label><label className="full-field">{labels.guests}<input name="guestCount" type="number" min="1" max="100000"/></label></div><fieldset><legend>{labels.services} *</legend><div className="check-grid">{serviceOptions.map(x=><label key={x}><input type="checkbox" checked={services.includes(x)} onChange={()=>setServices(s=>s.includes(x)?s.filter(v=>v!==x):[...s,x])}/><span>{x}</span></label>)}</div></fieldset><label>{labels.message}<textarea name="message" rows={4} maxLength={1500}/></label><label className="honey" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>{error&&<p className="form-error" role="alert">{error}</p>}<button className="btn btn-primary submit-button" disabled={status==="sending"}>{status==="sending"?(isTe?"పంపుతున్నాం...":"Sending..."):t.submit}<ChevronRight/></button></form>}</div></div></section>
}