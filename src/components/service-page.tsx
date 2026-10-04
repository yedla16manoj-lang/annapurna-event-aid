import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CookingPot, MessageCircle, Phone, ChevronRight, Mail, MapPin, CalendarDays } from "lucide-react";
import feast from "@/assets/andhra-feast.webp";
import tent from "@/assets/tent-setup.webp";
import wedding from "@/assets/gallery/wedding.webp";
import catering from "@/assets/gallery/catering-service.webp";
import birthday from "@/assets/gallery/birthday.webp";
import housewarming from "@/assets/gallery/housewarming.webp";
import { BUSINESS, WHATSAPP_URL, servicePages, type ServicePageData } from "@/lib/service-pages";

const images = { feast, tent, wedding, catering, birthday, housewarming };

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <header className="sp-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="Annapurna Tent House and Caterings home">
            <span className="brand-mark"><CookingPot size={19} /></span>
            <span><b>Annapurna</b><small>TENT HOUSE &amp; CATERINGS</small></span>
          </Link>
          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary">Book Now<ChevronRight size={18} /></Link>
          </div>
        </div>
      </header>
      {children}
      <footer>
        <div className="section-inner footer-grid">
          <div><p>{BUSINESS.name}</p><p>Traditional Taste. Complete Event Support.</p></div>
          <div><h3>Services</h3>{servicePages.map((p) => <Link key={p.path} to={p.path}>{p.cardTitle}</Link>)}</div>
          <div><h3>Quick Links</h3><Link to="/">Home</Link><Link to="/contact">Contact</Link></div>
          <div><h3>Contact</h3><a href={`tel:+91${BUSINESS.phone}`}>{BUSINESS.phone}</a><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><span>{BUSINESS.locality}</span></div>
        </div>
        <div className="footer-bottom">© 2026 Annapurna Tent House and Caterings. All rights reserved.</div>
      </footer>
      <a className="floating-whatsapp" href={WHATSAPP_URL} aria-label="WhatsApp Annapurna"><MessageCircle /></a>
      <div className="mobile-action-bar">
        <a href={`tel:+91${BUSINESS.phone}`}><Phone /><span>Call Now</span></a>
        <a href={WHATSAPP_URL}><MessageCircle /><span>WhatsApp</span></a>
        <Link to="/contact"><CalendarDays /><span>Book</span></Link>
      </div>
    </div>
  );
}

export function ContactActions() {
  return (
    <div className="hero-actions">
      <a className="btn btn-primary" href={`tel:+91${BUSINESS.phone}`}><Phone size={18} />Call {BUSINESS.phone}</a>
      <a className="btn btn-secondary" href={WHATSAPP_URL}><MessageCircle size={18} />WhatsApp Us</a>
    </div>
  );
}

export function PageHero({ crumb, h1, lead, img, alt }: { crumb: string; h1: string; lead: string; img: string; alt: string }) {
  return (
    <section className="sp-hero section">
      <img src={img} alt={alt} width="1400" height="1100" />
      <div className="section-inner">
        <nav className="sp-crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{crumb}</span></nav>
        <h1>{h1}</h1>
        <p className="lead">{lead}</p>
        <ContactActions />
      </div>
    </section>
  );
}

export function ServicePage({ page }: { page: ServicePageData }) {
  return (
    <SiteShell>
      <main className="sp-main">
        <PageHero crumb={page.crumb} h1={page.h1} lead={page.lead} img={images[page.image]} alt={page.imageAlt} />
        <section className="section"><div className="section-inner sp-content">
          {page.blocks.map((b) => (
            <div key={b.h2}>
              <h2>{b.h2}</h2>
              {b.paras?.map((p) => <p key={p}>{p}</p>)}
              {b.list && <ul>{b.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              {b.qa?.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
            </div>
          ))}
          <div className="sp-cta-box">
            <h2>Book or enquire</h2>
            <p>Call or WhatsApp {BUSINESS.name} on {BUSINESS.phone} with your event date, guest count and requirements. You can also email {BUSINESS.email} or use the enquiry form on our <Link to="/" hash="enquiry">home page</Link>.</p>
            <ContactActions />
          </div>
          <h2>Related services</h2>
          <div className="sp-related">
            {page.related.map((r) => <Link key={r.path} to={r.path} className="service-link-card"><h3>{r.label}</h3><span>View <ChevronRight size={16} /></span></Link>)}
            <Link to="/" className="service-link-card"><h3>Annapurna home page</h3><span>View <ChevronRight size={16} /></span></Link>
          </div>
        </div></section>
      </main>
    </SiteShell>
  );
}

export const contactIcons = { Mail, MapPin, Phone };
