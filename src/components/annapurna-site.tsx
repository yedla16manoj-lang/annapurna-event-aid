import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { servicePages } from "@/lib/service-pages";
import {
  Armchair, Check, ChefHat, ChevronRight, CookingPot, Cylinder, Flame, HandHeart,
  Home, Mail, MapPin, Menu, MessageCircle, Phone, Soup, TableProperties, Tent,
  PanelsLeftRight, Truck, Users, X, PartyPopper, Cake, Landmark, HeartHandshake, Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { submitEnquiry, type EnquiryInput } from "@/lib/enquiries.functions";
import heroImage from "@/assets/v2-hero-tent.webp";
import cookingImage from "@/assets/v2-cooking.webp";
import autoImage from "@/assets/v2-auto.webp";
import inventoryImage from "@/assets/v2-inventory.webp";
import feastImage from "@/assets/andhra-feast.webp";

type Language = "en" | "te";

const PHONE = "7396627263";
const EMAIL = "yedla16manoj@gmail.com";
const WHATSAPP = `https://wa.me/917396627263?text=${encodeURIComponent("Hi, I would like to enquire about catering/tent house services for my event.")}`;
const ADDRESS = "Anakapalle, beside Shivalayam, Laxminarayana Nagar, Golla Vedi, Chinarajupeta, Andhra Pradesh, India";

const nav = {
  en: ["Home", "About", "Services", "What We Provide", "Catering", "Contact"],
  te: ["హోమ్", "మా గురించి", "సేవలు", "మా సామగ్రి", "కేటరింగ్", "సంప్రదించండి"],
};
const anchors = ["home", "about", "services", "equipment", "catering", "contact"];

type Card = [LucideIcon, string, string, string, string];
const services: Card[] = [
  [Tent, "Indian-Style Tent Supply", "టెంట్ సరఫరా", "Red and blue traditional tent arrangements suitable for local functions.", "స్థానిక శుభకార్యాలకు సరిపడే ఎరుపు, నీలం రంగుల సాంప్రదాయ టెంట్ ఏర్పాట్లు."],
  [PanelsLeftRight, "Tent Sidewalls", "టెంట్ సైడ్‌వాల్స్", "Sidewalls for added privacy and protection around the tent setup.", "టెంట్ చుట్టూ గోప్యత, రక్షణ కోసం సైడ్‌వాల్స్."],
  [Armchair, "Plastic Chairs", "ప్లాస్టిక్ కుర్చీలు", "Normal blue plastic chairs suitable for guests at functions.", "అతిథుల కోసం సాధారణ నీలం ప్లాస్టిక్ కుర్చీలు."],
  [TableProperties, "Serving Tables", "వడ్డింపు టేబుళ్లు", "Tables for arranging and serving food and other function requirements.", "భోజనం వడ్డించడానికి, ఇతర అవసరాలకు టేబుళ్లు."],
  [CookingPot, "Cooking Vessels", "వంట పాత్రలు", "Cooking vessels and utensils for preparing food for functions.", "శుభకార్యాల వంటకు కావాల్సిన పెద్ద పాత్రలు, సామగ్రి."],
  [Cylinder, "Drums & Containers", "డ్రమ్ములు & కంటైనర్లు", "Large drums and containers used for cooking, storing and serving requirements.", "వంట, నిల్వ, వడ్డింపు అవసరాలకు పెద్ద డ్రమ్ములు, కంటైనర్లు."],
  [Flame, "Gas Stoves", "గ్యాస్ స్టౌలు", "Cooking stoves suitable for function catering and large-scale cooking.", "పెద్ద ఎత్తున వంటకు సరిపడే గ్యాస్ స్టౌలు."],
  [ChefHat, "Catering & Cooking", "కేటరింగ్ & వంట", "Catering and cooking services for functions, gatherings and local events.", "శుభకార్యాలు, కలయికలు, స్థానిక కార్యక్రమాలకు వంట, కేటరింగ్ సేవలు."],
  [Truck, "Equipment Transportation", "సామగ్రి రవాణా", "We use our own auto to transport our tent and cooking equipment to the function location.", "మా సొంత ఆటోలో టెంట్, వంట సామగ్రిని మీ కార్యక్రమ స్థలానికి చేరుస్తాము."],
  [HandHeart, "Complete Practical Function Support", "శుభకార్యానికి పూర్తి సహాయం", "Tent, cooking equipment and catering support for families who need practical function arrangements.", "టెంట్, వంట సామగ్రి, కేటరింగ్—కుటుంబాలకు కావాల్సిన ఏర్పాట్లన్నీ ఒకేచోట."],
];

const inventory: [string, string, string][] = [
  ["Red tent", "ఎరుపు టెంట్", "tent-red"], ["Blue tent", "నీలం టెంట్", "tent-blue"], ["Sidewalls", "సైడ్‌వాల్స్", "walls"],
  ["Blue plastic chairs", "నీలం ప్లాస్టిక్ కుర్చీలు", "chairs"], ["Serving tables", "వడ్డింపు టేబుళ్లు", "tables"], ["Cooking vessels", "వంట పాత్రలు", "vessels"],
  ["Drums", "డ్రమ్ములు", "drums"], ["Gas stoves", "గ్యాస్ స్టౌలు", "stoves"], ["Cooking equipment", "వంట సామగ్రి", "cooking"],
];
const invIcons: Record<string, LucideIcon> = { "tent-red": Tent, "tent-blue": Tent, walls: PanelsLeftRight, chairs: Armchair, tables: TableProperties, vessels: CookingPot, drums: Cylinder, stoves: Flame, cooking: Soup };

const occasions: [LucideIcon, string, string][] = [
  [Home, "Family Functions", "కుటుంబ శుభకార్యాలు"], [HeartHandshake, "Weddings", "పెళ్లిళ్లు"], [Cake, "Birthday Functions", "పుట్టినరోజు వేడుకలు"],
  [Landmark, "Religious Functions", "ఆధ్యాత్మిక కార్యక్రమాలు"], [Users, "Community Gatherings", "సామూహిక కలయికలు"], [Tent, "Small & Medium Functions", "చిన్న & మధ్యస్థ కార్యక్రమాలు"],
  [MapPin, "Local Events", "స్థానిక కార్యక్రమాలు"], [PartyPopper, "Other Family Celebrations", "ఇతర కుటుంబ వేడుకలు"],
];

function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("a-js");
    const els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function Brand() {
  return <a href="#home" className="a-brand" aria-label="Annapurna Tent House and Caterings home"><span className="a-brand-mark"><Tent size={20} /></span><span><b>Annapurna</b><small>TENT HOUSE &amp; CATERINGS</small></span></a>;
}

function Btn({ href, kind = "primary", icon: Icon, children }: { href: string; kind?: "primary" | "navy" | "ghost" | "light"; icon?: LucideIcon; children: ReactNode }) {
  return <a href={href} className={`a-btn a-btn-${kind}`}>{Icon && <Icon size={18} />}{children}<ChevronRight size={17} className="a-btn-arrow" /></a>;
}

function Head({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return <div className={`a-head rv${center ? " center" : ""}`}><p className="a-eyebrow">{eyebrow}</p><h2>{title}</h2>{sub && <p className="a-sub">{sub}</p>}</div>;
}

function Actions({ te, light }: { te: boolean; light?: boolean }) {
  return <div className="a-actions">
    <Btn href="#enquiry">{te ? "కోట్ పొందండి" : "Get a Quote"}</Btn>
    <Btn href={`tel:+91${PHONE}`} kind={light ? "light" : "navy"} icon={Phone}>{te ? "కాల్ చేయండి" : "Call Now"}</Btn>
    <Btn href={WHATSAPP} kind="ghost" icon={MessageCircle}>WhatsApp</Btn>
  </div>;
}

export function AnnapurnaSite() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const te = language === "te";
  const L = (en: string, tel: string) => (te ? tel : en);
  useReveal();

  return <div className={`a2 ${te ? "telugu" : "english"}`}>
    <header className="a-header">
      <div className="a-header-inner">
        <Brand />
        <nav className="a-nav" aria-label="Primary navigation">{nav[language].map((n, i) => <a key={n} href={`#${anchors[i]}`}>{n}</a>)}</nav>
        <div className="a-header-actions">
          <div className="a-lang" aria-label="Choose language">
            <button type="button" className={!te ? "on" : ""} onClick={() => setLanguage("en")}>EN</button>
            <button type="button" className={te ? "on" : ""} onClick={() => setLanguage("te")}>తెలుగు</button>
          </div>
          <a href="#enquiry" className="a-btn a-btn-primary a-header-cta">{L("Get a Quote", "కోట్ పొందండి")}</a>
          <button className="a-menu" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <nav className="a-mobile-menu">{nav[language].map((n, i) => <a key={n} href={`#${anchors[i]}`} onClick={() => setMenuOpen(false)}>{n}</a>)}<a href="#enquiry" onClick={() => setMenuOpen(false)}>{L("Get a Quote", "కోట్ పొందండి")}</a></nav>}
    </header>

    <main>
      {/* HERO */}
      <section id="home" className="a-hero">
        <div className="a-hero-bg"><img src={heroImage} alt="Red and blue Indian-style tent with sidewalls, blue plastic chairs, serving tables, cooking vessels and a drum set up for a local function" width={1600} height={1008} fetchPriority="high" /></div>
        <div className="a-hero-shade" />
        <span className="a-float f1" aria-hidden="true"><CookingPot size={22} /></span>
        <span className="a-float f2" aria-hidden="true"><Armchair size={20} /></span>
        <span className="a-float f3" aria-hidden="true"><Flame size={18} /></span>
        <div className="a-hero-inner">
          <p className="a-pill a-in d1"><MapPin size={15} />{L("Tent House in Anakapalle", "అనకాపల్లిలో టెంట్ హౌస్")}</p>
          <h1 className="a-in d2">Annapurna Tent House <span>&amp; Caterings</span></h1>
          <p className="a-hero-sub a-in d3">{L("Practical Tent, Catering & Cooking Equipment for Functions in Anakapalle", "అనకాపల్లిలో శుభకార్యాలకు టెంట్, కేటరింగ్ & వంట సామగ్రి")}</p>
          <ul className="a-hero-tags a-in d4">
            {(te ? ["టెంట్లు & సైడ్‌వాల్స్", "కుర్చీలు & టేబుళ్లు", "వంట పాత్రలు & డ్రమ్ములు", "గ్యాస్ స్టౌలు", "కేటరింగ్ & వంట", "ఆటోలో రవాణా"] : ["Tents & Sidewalls", "Chairs & Tables", "Vessels & Drums", "Gas Stoves", "Catering & Cooking", "Transport by Auto"]).map((x) => <li key={x}><Check size={14} />{x}</li>)}
          </ul>
          <div className="a-in d5"><Actions te={te} light /></div>
        </div>
      </section>

      {/* QUICK STRIP */}
      <section className="a-strip" aria-label="Main services">
        <div className="a-wrap a-strip-grid">
          {([[Tent, "Tents", "టెంట్లు"], [Armchair, "Chairs & Tables", "కుర్చీలు & టేబుళ్లు"], [CookingPot, "Cooking Equipment", "వంట సామగ్రి"], [ChefHat, "Catering", "కేటరింగ్"]] as [LucideIcon, string, string][]).map(([I, en, tel], i) => <div key={en} className="rv" style={{ ["--i" as string]: i }}><I size={22} /><span>{L(en, tel)}</span></div>)}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="a-section">
        <div className="a-wrap a-split">
          <figure className="a-photo rv"><img src={inventoryImage} loading="lazy" width={1200} height={912} alt="Blue plastic chairs, tables, aluminium cooking vessels, blue drums, gas stoves and rolled tent cloth ready for functions" /><figcaption>{L("Tents, chairs, vessels, drums & stoves — ready for your function", "టెంట్లు, కుర్చీలు, పాత్రలు, డ్రమ్ములు, స్టౌలు—మీ శుభకార్యానికి సిద్ధం")}</figcaption></figure>
          <div className="rv">
            <p className="a-eyebrow">{L("About Annapurna", "అన్నపూర్ణ గురించి")}</p>
            <h2>{L("A local tenthouse & catering service for families in Anakapalle", "అనకాపల్లి కుటుంబాల కోసం స్థానిక టెంట్ హౌస్ & కేటరింగ్")}</h2>
            <p className="a-text">{L("Annapurna Tent House and Caterings is a local tenthouse and catering business serving families and functions in and around Anakapalle. We supply the practical things a function needs — tents, sidewalls, chairs, tables, cooking vessels, drums and gas stoves — and we also provide catering and cooking support.", "Annapurna Tent House and Caterings అనకాపల్లి మరియు చుట్టుపక్కల కుటుంబాలకు, శుభకార్యాలకు సేవలందించే స్థానిక టెంట్ హౌస్ & కేటరింగ్ వ్యాపారం. టెంట్లు, సైడ్‌వాల్స్, కుర్చీలు, టేబుళ్లు, వంట పాత్రలు, డ్రమ్ములు, గ్యాస్ స్టౌలు అందిస్తాము; వంట, కేటరింగ్ సహాయం కూడా చేస్తాము.")}</p>
            <p className="a-text">{L("We bring the equipment to your location in our own auto, so families can arrange their function simply and at a reasonable cost.", "మా సొంత ఆటోలో సామగ్రిని మీ స్థలానికి తీసుకువస్తాము—కుటుంబాలు తమ శుభకార్యాన్ని సులభంగా, అందుబాటు ఖర్చుతో ఏర్పాటు చేసుకోవచ్చు.")}</p>
            <ul className="a-checks">
              {(te ? ["ఆచరణాత్మక సేవ", "స్థానిక కుటుంబాలకు అందుబాటు ధరలు", "టెంట్ సరఫరా", "వంట సామగ్రి", "కేటరింగ్ & వంట సహాయం", "సామగ్రి రవాణా"] : ["Practical service", "Affordable for local families", "Tent supply", "Cooking equipment", "Catering & cooking support", "Equipment transportation"]).map((x) => <li key={x}><Check size={16} />{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="a-section a-tint">
        <div className="a-wrap">
          <Head center eyebrow={L("Our Services", "మా సేవలు")} title={L("Tent, Equipment & Catering Services", "టెంట్, సామగ్రి & కేటరింగ్ సేవలు")} sub={L("Everything is practical and function-focused — supplied, transported and set up for your occasion.", "అన్నీ శుభకార్య అవసరాలకు తగినవి—సరఫరా, రవాణా, ఏర్పాటు.")} />
          <div className="a-cards">
            {services.map(([I, en, tel, dEn, dTe], i) => <article key={en} className="a-card rv" style={{ ["--i" as string]: i % 5 }}><span className="a-card-icon"><I size={24} /></span><h3>{L(en, tel)}</h3><p>{L(dEn, dTe)}</p></article>)}
          </div>
          <div className="a-center rv"><Btn href="#enquiry">{L("Ask for a Quote", "కోట్ అడగండి")}</Btn></div>
        </div>
      </section>

      {/* WHAT WE PROVIDE */}
      <section id="equipment" className="a-section">
        <div className="a-wrap">
          <Head eyebrow={L("Inventory", "మా సామగ్రి")} title={L("What We Provide", "మేము అందించేవి")} sub={L("Our tent and cooking equipment for functions in Anakapalle.", "అనకాపల్లిలో శుభకార్యాల కోసం మా టెంట్ & వంట సామగ్రి.")} />
          <div className="a-provide">
            <figure className="a-photo a-provide-photo rv"><img src={heroImage} loading="lazy" width={1600} height={1008} alt="Red and blue tent with blue chairs and serving tables at a function" /></figure>
            <div className="a-inv">
              {inventory.map(([en, tel, k], i) => { const I = invIcons[k] ?? Tent; return <div key={k} className={`a-inv-item rv ${k}`} style={{ ["--i" as string]: i % 3 }}><I size={26} /><span>{L(en, tel)}</span></div>; })}
            </div>
          </div>
        </div>
      </section>

      {/* CATERING */}
      <section id="catering" className="a-section a-navy">
        <div className="a-wrap a-split reverse">
          <div className="rv">
            <p className="a-eyebrow light">{L("Catering", "కేటరింగ్")}</p>
            <h2>{L("Cooking & Catering for Your Function", "మీ శుభకార్యానికి వంట & కేటరింగ్")}</h2>
            <p className="a-text">{L("Along with tents and cooking equipment, Annapurna provides cooking and catering support for functions. Tell us your function type, date and number of guests, and we will discuss the food and arrangements you need.", "టెంట్లు, వంట సామగ్రితో పాటు అన్నపూర్ణ శుభకార్యాలకు వంట, కేటరింగ్ సహాయం అందిస్తుంది. మీ కార్యక్రమం, తేదీ, అతిథుల సంఖ్య చెప్పండి—మీకు కావాల్సిన భోజనం, ఏర్పాట్ల గురించి మాట్లాడుకుందాం.")}</p>
            <ul className="a-checks light">
              {(te ? ["శుభకార్యాలకు వంట సేవ", "సాంప్రదాయ ఆంధ్ర భోజనం", "మా సొంత వంట పాత్రలు & స్టౌలు", "చిన్న, మధ్యస్థ కార్యక్రమాలకు"] : ["Cooking service for functions", "Traditional Andhra food", "Our own vessels & stoves", "For small and medium functions"]).map((x) => <li key={x}><Check size={16} />{x}</li>)}
            </ul>
            <Btn href="#enquiry">{L("Ask About Catering", "కేటరింగ్ గురించి అడగండి")}</Btn>
          </div>
          <div className="a-stack rv">
            <figure className="a-photo"><img src={cookingImage} loading="lazy" width={1200} height={912} alt="Cooks preparing rice and curry in large vessels on gas stoves for a function" /></figure>
            <figure className="a-photo a-stack-small"><img src={feastImage} loading="lazy" width={1408} height={1200} alt="Traditional Andhra meal served on a banana leaf" /></figure>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="a-section">
        <div className="a-wrap">
          <Head center eyebrow={L("Who We Serve", "ఎవరి కోసం")} title={L("For Every Family Function", "ప్రతి కుటుంబ శుభకార్యానికి")} sub={L("You organise the function — we supply the tent, equipment, cooking and catering it needs.", "కార్యక్రమం మీది—దానికి కావాల్సిన టెంట్, సామగ్రి, వంట, కేటరింగ్ మావి.")} />
          <div className="a-occ">
            {occasions.map(([I, en, tel], i) => <div key={en} className="rv" style={{ ["--i" as string]: i % 4 }}><I size={22} /><span>{L(en, tel)}</span></div>)}
          </div>
        </div>
      </section>

      {/* LOCAL */}
      <section className="a-section a-tint">
        <div className="a-wrap a-split">
          <figure className="a-photo rv"><img src={autoImage} loading="lazy" width={1200} height={912} alt="Blue auto carrying blue plastic chairs, red tent cloth and cooking vessels to a function location" /></figure>
          <div className="rv">
            <p className="a-eyebrow">{L("Local Service", "స్థానిక సేవ")}</p>
            <h2>{L("Serving Functions in and around Anakapalle", "అనకాపల్లి మరియు చుట్టుపక్కల శుభకార్యాలకు సేవ")}</h2>
            <p className="a-text">{L("Looking for a tenthouse near you? Annapurna is a tenthouse and catering service in Anakapalle, offering tent and cooking equipment rental along with catering services for local functions.", "మీ దగ్గర టెంట్ హౌస్ కోసం చూస్తున్నారా? అన్నపూర్ణ అనకాపల్లిలో టెంట్ హౌస్ & కేటరింగ్ సేవ—స్థానిక శుభకార్యాలకు టెంట్, వంట సామగ్రి అద్దెతో పాటు కేటరింగ్.")}</p>
            <p className="a-text">{L("We carry our tents, chairs, vessels and cooking equipment to your function location in our own blue auto.", "మా సొంత నీలం ఆటోలో టెంట్లు, కుర్చీలు, పాత్రలు, వంట సామగ్రిని మీ స్థలానికి తీసుకువస్తాము.")}</p>
            <p className="a-address"><MapPin size={18} /><span>{ADDRESS}</span></p>
            <p className="a-small">{L("If your venue is outside Anakapalle, call us to check availability for your date.", "మీ స్థలం అనకాపల్లి బయట ఉంటే, మీ తేదీకి అందుబాటు కోసం కాల్ చేయండి.")}</p>
          </div>
        </div>
      </section>

      {/* SERVICE PAGES (internal links) */}
      <section className="a-section a-links-section">
        <div className="a-wrap">
          <Head center eyebrow={L("More Details", "మరిన్ని వివరాలు")} title={L("Tent House & Catering in Anakapalle", "అనకాపల్లిలో టెంట్ హౌస్ & కేటరింగ్")} />
          <div className="a-links">
            {servicePages.map((p, i) => <Link key={p.path} to={p.path} className="a-link-card rv" style={{ ["--i" as string]: i % 4 }}><h3>{p.cardTitle}</h3><p>{p.cardText}</p><span>{L("Learn more", "వివరాలు చూడండి")} <ChevronRight size={15} /></span></Link>)}
          </div>
        </div>
      </section>

      <EnquirySection language={language} />

      {/* FINAL CTA + CONTACT */}
      <section id="contact" className="a-section a-cta">
        <div className="a-wrap a-cta-grid">
          <div className="rv">
            <p className="a-eyebrow light">{L("Contact", "సంప్రదించండి")}</p>
            <h2>{L("Planning a Function in Anakapalle?", "అనకాపల్లిలో శుభకార్యం ప్లాన్ చేస్తున్నారా?")}</h2>
            <p className="a-text">{L("Need a tent, cooking equipment or catering? Contact Annapurna Tent House & Caterings.", "టెంట్, వంట సామగ్రి లేదా కేటరింగ్ కావాలా? Annapurna Tent House & Caterings ను సంప్రదించండి.")}</p>
            <Actions te={te} light />
          </div>
          <div className="a-contact-card rv">
            <h3>Annapurna Tent House and Caterings</h3>
            <a href={`tel:+91${PHONE}`}><Phone size={18} />+91 {PHONE}</a>
            <a href={WHATSAPP}><MessageCircle size={18} />WhatsApp</a>
            <a href={`mailto:${EMAIL}`}><Mail size={18} />{EMAIL}</a>
            <p><MapPin size={18} /><span>{ADDRESS}</span></p>
          </div>
        </div>
      </section>
    </main>

    <footer className="a-footer">
      <div className="a-wrap a-footer-grid">
        <div><Brand /><p>{L("Tents, cooking equipment and catering for functions in and around Anakapalle.", "అనకాపల్లి మరియు చుట్టుపక్కల శుభకార్యాలకు టెంట్లు, వంట సామగ్రి, కేటరింగ్.")}</p></div>
        <div><h3>{L("Services", "సేవలు")}</h3>{servicePages.map((p) => <Link key={p.path} to={p.path}>{p.cardTitle}</Link>)}</div>
        <div><h3>{L("Quick Links", "త్వరిత లింకులు")}</h3>{nav[language].map((n, i) => <a key={n} href={`#${anchors[i]}`}>{n}</a>)}<Link to="/contact">{L("Contact page", "సంప్రదింపు పేజీ")}</Link></div>
        <div><h3>{L("Contact", "సంప్రదించండి")}</h3><a href={`tel:+91${PHONE}`}>{PHONE}</a><a href={WHATSAPP}>WhatsApp</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>{ADDRESS}</span></div>
      </div>
      <div className="a-footer-bottom">© 2026 Annapurna Tent House and Caterings. All rights reserved.</div>
    </footer>

    <a className="a-fab" href={WHATSAPP} aria-label="WhatsApp Annapurna"><MessageCircle /></a>
    <div className="a-mbar">
      <a href={`tel:+91${PHONE}`}><Phone /><span>{L("Call", "కాల్")}</span></a>
      <a href={WHATSAPP}><MessageCircle /><span>WhatsApp</span></a>
      <a href="#enquiry" className="hi"><Sparkles /><span>{L("Get Quote", "కోట్")}</span></a>
    </div>
  </div>;
}

const eventOptions: [EnquiryInput["eventType"], string][] = [
  ["Wedding / Marriage", "పెళ్లి / వివాహం"], ["Engagement", "నిశ్చితార్థం"], ["Birthday", "పుట్టినరోజు"], ["Housewarming", "గృహప్రవేశం"],
  ["Religious Function", "ఆధ్యాత్మిక కార్యక్రమం"], ["Family Function", "కుటుంబ శుభకార్యం"], ["Community Event", "సామూహిక కార్యక్రమం"], ["Other", "ఇతర"],
];
// [id, label en, label te, stored service value or null (extra noted in message)]
const needOptions: [string, string, string, EnquiryInput["services"][number]][] = [
  ["tents", "Tents", "టెంట్లు", "Tents"], ["walls", "Sidewalls", "సైడ్‌వాల్స్", "Tents"], ["chairs", "Chairs & Tables", "కుర్చీలు & టేబుళ్లు", "Tables & Chairs"],
  ["vessels", "Cooking Vessels", "వంట పాత్రలు", "Cooking Vessels"], ["drums", "Drums", "డ్రమ్ములు", "Serving Equipment"], ["stoves", "Gas Stoves", "గ్యాస్ స్టౌలు", "Gas Stoves"],
  ["catering", "Catering & Cooking", "కేటరింగ్ & వంట", "Catering"], ["transport", "Transport by Auto", "ఆటోలో రవాణా", "Complete Event Requirements"], ["all", "Complete Function Support", "పూర్తి సహాయం", "Complete Event Requirements"],
];

function EnquirySection({ language }: { language: Language }) {
  const send = useServerFn(submitEnquiry);
  const startedAt = useMemo(() => Date.now(), []);
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const te = language === "te";
  const L = (en: string, tel: string) => (te ? tel : en);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError("");
    if (!picked.length) { setError(L("Please select at least one service.", "కనీసం ఒక సేవను ఎంచుకోండి.")); return; }
    const form = new FormData(e.currentTarget);
    const chosen = needOptions.filter((o) => picked.includes(o[0]));
    const svc = Array.from(new Set(chosen.map((o) => o[3])));
    const location = String(form.get("location") || "").trim();
    const note = String(form.get("message") || "").trim();
    const message = [location && `Location: ${location}`, `Needs: ${chosen.map((o) => o[1]).join(", ")}`, note].filter(Boolean).join("\n").slice(0, 1500);
    setStatus("sending");
    try {
      await send({ data: { fullName: String(form.get("fullName")), phone: String(form.get("phone")), eventType: String(form.get("eventType")) as EnquiryInput["eventType"], eventDate: String(form.get("eventDate") || "") || undefined, guestCount: form.get("guestCount") ? Number(form.get("guestCount")) : undefined, services: svc, message, language, website: String(form.get("website") || ""), startedAt } });
      setPicked([]); setStatus("success");
    } catch (err) { setStatus("error"); setError(err instanceof Error ? err.message : "Please try again."); }
  }

  return <section id="enquiry" className="a-section a-enquiry">
    <div className="a-wrap a-enq-grid">
      <div className="rv">
        <p className="a-eyebrow">{L("Free Quote", "ఉచిత కోట్")}</p>
        <h2>{L("Request a Quote", "కోట్ కోసం అడగండి")}</h2>
        <p className="a-text">{L("Tell us your function details and what you need. We will call you back with availability and price.", "మీ శుభకార్య వివరాలు, అవసరాలు చెప్పండి. అందుబాటు, ధర వివరాలతో మేము మీకు కాల్ చేస్తాము.")}</p>
        <div className="a-enq-quick"><a href={`tel:+91${PHONE}`}><Phone size={18} />+91 {PHONE}</a><a href={WHATSAPP}><MessageCircle size={18} />WhatsApp</a></div>
      </div>
      <div className="a-form rv">
        {status === "success" ? <div className="a-success"><span><Check /></span><h3>{L("Enquiry received", "మీ అభ్యర్థన అందింది")}</h3><p>{L("Thank you! Your enquiry has been received. Annapurna Tent House and Caterings will contact you shortly.", "ధన్యవాదాలు! మీ వివరాలు అందాయి. Annapurna Tent House and Caterings త్వరలో మిమ్మల్ని సంప్రదిస్తుంది.")}</p><button type="button" className="a-btn a-btn-primary" onClick={() => setStatus("idle")}>{L("Send another enquiry", "మరో అభ్యర్థన")}</button></div> :
          <form onSubmit={handleSubmit}>
            <div className="a-fgrid">
              <label>{L("Name", "పేరు")} *<input name="fullName" required minLength={2} maxLength={100} autoComplete="name" /></label>
              <label>{L("Phone", "ఫోన్")} *<input name="phone" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" required placeholder={L("10-digit mobile number", "10 అంకెల మొబైల్ నంబర్")} autoComplete="tel" /></label>
              <label>{L("Function type", "కార్యక్రమం రకం")} *<select name="eventType" required defaultValue=""><option value="" disabled>{L("Select", "ఎంచుకోండి")}</option>{eventOptions.map(([v, tel]) => <option key={v} value={v}>{te ? tel : v}</option>)}</select></label>
              <label>{L("Date", "తేదీ")}<input name="eventDate" type="date" /></label>
              <label>{L("Location", "స్థలం")}<input name="location" maxLength={120} placeholder={L("Village / area", "ఊరు / ప్రాంతం")} /></label>
              <label>{L("Number of guests", "అతిథుల సంఖ్య")}<input name="guestCount" type="number" min="1" max="100000" /></label>
            </div>
            <fieldset><legend>{L("Required services / equipment", "కావాల్సిన సేవలు / సామగ్రి")} *</legend>
              <div className="a-chips">{needOptions.map(([id, en, tel]) => <label key={id} className={picked.includes(id) ? "on" : ""}><input type="checkbox" checked={picked.includes(id)} onChange={() => setPicked((s) => s.includes(id) ? s.filter((v) => v !== id) : [...s, id])} /><span>{L(en, tel)}</span></label>)}</div>
            </fieldset>
            <label>{L("Message", "సందేశం")}<textarea name="message" rows={3} maxLength={1200} /></label>
            <label className="honey" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            {error && <p className="a-error" role="alert">{error}</p>}
            <button className="a-btn a-btn-primary a-submit" disabled={status === "sending"}>{status === "sending" ? L("Sending...", "పంపుతున్నాం...") : L("Get My Free Quote", "ఉచిత కోట్ పొందండి")}<ChevronRight size={17} className="a-btn-arrow" /></button>
          </form>}
      </div>
    </div>
  </section>;
}
