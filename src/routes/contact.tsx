import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteShell, PageHero, ContactActions } from "@/components/service-page";
import tent from "@/assets/tent-setup.webp";
import { BUSINESS, businessJsonLd, pageHead, servicePages } from "@/lib/service-pages";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact Annapurna Tent House and Caterings | Anakapalle",
      description: "Call or WhatsApp 7396627263 to book catering or tent house services in Anakapalle. Email yedla16manoj@gmail.com. Share your event date and guest count.",
      path: "/contact",
      crumb: "Contact",
      extra: [businessJsonLd()],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <main className="sp-main">
        <PageHero crumb="Contact" h1="Contact Annapurna Tent House and Caterings" lead="Call, WhatsApp or email us to plan catering and tent house arrangements for your event in Anakapalle." img={tent} alt="Shamiana tent set up with tables and chairs for a function" />
        <section className="section"><div className="section-inner sp-content">
          <h2>Contact details</h2>
          <p><b>{BUSINESS.name}</b></p>
          <p><Phone size={16} style={{ display: "inline" }} /> Phone / WhatsApp: <a href={`tel:+91${BUSINESS.phone}`}>{BUSINESS.phone}</a></p>
          <p><Mail size={16} style={{ display: "inline" }} /> Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
          <p><MapPin size={16} style={{ display: "inline" }} /> Address: {BUSINESS.street}, Anakapalle, Andhra Pradesh</p>
          <ContactActions />
          <h2>How to book</h2>
          <p>The quickest way to book is a phone call or WhatsApp message. To help us give you a clear answer, please share:</p>
          <ul>
            <li>The type of event (wedding, housewarming, birthday, pooja, etc.)</li>
            <li>The event date and approximate timing</li>
            <li>Expected number of guests</li>
            <li>The venue or area in Anakapalle</li>
            <li>Services you need — catering, tents, tables and chairs, cooking vessels, gas stoves or serving equipment</li>
          </ul>
          <p>You can also fill in the enquiry form on our <Link to="/" hash="enquiry">home page</Link>, and we will contact you.</p>
          <h2>Service area</h2>
          <p>We are based in Anakapalle and serve Anakapalle and nearby areas. If your venue is outside Anakapalle, call us to check availability for your date.</p>
          <h2>Our services</h2>
          <ul>{servicePages.map((p) => <li key={p.path}><Link to={p.path}>{p.cardTitle} in Anakapalle</Link></li>)}</ul>
        </div></section>
      </main>
    </SiteShell>
  );
}
