import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { getServicePage, pageHead, SITE_URL } from "@/lib/service-pages";

const page = getServicePage("/wedding-catering-anakapalle");

export const Route = createFileRoute("/wedding-catering-anakapalle")({
  head: () =>
    pageHead({
      ...page,
      extra: [{ "@context": "https://schema.org", "@type": "Service", name: page.h1, serviceType: page.serviceType, url: SITE_URL + page.path, areaServed: { "@type": "City", name: "Anakapalle" }, provider: { "@id": SITE_URL + "/#business" } }],
    }),
  component: () => <ServicePage page={page} />,
});
