import { createFileRoute } from "@tanstack/react-router";
import { AnnapurnaSite } from "@/components/annapurna-site";
import { businessJsonLd, SITE_URL } from "@/lib/service-pages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catering Services & Tent House in Anakapalle | Annapurna" },
      { name: "description", content: "Annapurna Tent House and Caterings offers Andhra catering, tents, chairs and event equipment for weddings and functions in Anakapalle. Call 7396627263." },
      { property: "og:title", content: "Catering Services & Tent House in Anakapalle | Annapurna" },
      { property: "og:description", content: "Andhra catering, tents, chairs and event equipment for weddings and functions in Anakapalle. Call or WhatsApp 7396627263." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "u7PXBFYyPcmTD5x7hFFYBkvHALOjzgyo2VbfcZtGImQ" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      businessJsonLd(),
      { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Annapurna Tent House and Caterings", url: `${SITE_URL}/`, inLanguage: ["en", "te"], publisher: { "@id": `${SITE_URL}/#business` } },
    ].map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  }),
  component: Index,
});

function Index() {
  return <AnnapurnaSite />;
}
