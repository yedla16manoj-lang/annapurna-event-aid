import { createFileRoute } from "@tanstack/react-router";
import { AnnapurnaSite } from "@/components/annapurna-site";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Annapurna Tent House & Caterings | Catering & Tent Services in Anakapalle" },
      { name: "description", content: "Andhra & South Indian catering, tents, tables, chairs, cooking vessels, gas stoves and serving equipment for weddings, functions and events in Anakapalle." },
      { property: "og:title", content: "Annapurna Tent House & Caterings | Anakapalle" },
      { property: "og:description", content: "Traditional Andhra catering and complete tent house support for weddings, functions and events in Anakapalle." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "u7PXBFYyPcmTD5x7hFFYBkvHALOjzgyo2VbfcZtGImQ" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context":"https://schema.org","@type":["LocalBusiness","FoodEstablishment"],name:"Annapurna Tent House and Caterings",telephone:"+91-7396627263",email:"yedla16manoj@gmail.com",slogan:"Traditional Taste. Complete Event Support.",address:{"@type":"PostalAddress",streetAddress:"Beside Shivalayam, Laxminarayana Nagar, Golla Vedi, Chinarajupeta",addressLocality:"Anakapalle",addressRegion:"Andhra Pradesh",addressCountry:"IN"},areaServed:"Anakapalle and nearby areas"
    }) }],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <AnnapurnaSite />;
}
