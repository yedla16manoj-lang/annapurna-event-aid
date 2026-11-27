# Annapurna Website Audit and Targeted Improvements

## Overview
Improve the existing website in place, preserving its brand, colors, current public URLs, enquiry storage and notification flow. The current eight pages already return successfully, have unique page metadata and current-domain canonicals, and the SEO foundation scan reports no failures. Desktop and phone checks show no horizontal overflow; the mobile menu and browser-side quote validation work.

The main gaps are two missing equipment-rental pages, no categorized photo gallery on the current homepage, and no explicit phone/WhatsApp/quote-success event tracking.

## Work
- Add dedicated tent-equipment/utensils and chairs/tables/equipment rental pages with unique factual content, FAQs, contact actions, internal links, page metadata, canonical URLs and Service/Breadcrumb structured data.
- Add a four-category homepage gallery using existing lightweight WebP examples, clearly labeled as illustrative rather than real Annapurna jobs; connect it to the existing navigation and footer.
- Include the new pages in existing service links and the sitemap; keep robots.txt and all current URLs unchanged.
- Instrument phone clicks, WhatsApp clicks and successful quote submissions through the built-in visitor-event pipeline without adding a paid service, key, or personal data.
- Preserve the existing quote form and backend. Verify its validation and error/success behavior without sending a test enquiry to the owner's real inbox.

## Technical details
- Continue the current TanStack file-route and shared service-page data patterns; keep existing English/Telugu copy co-located in the homepage module.
- Use only existing imagery and WebP files; no generated or third-party business photos, new subscriptions, database changes, or visual redesign.
- Recheck metadata, canonical and JSON-LD for every route, sitemap coverage, internal links, image loading, mobile menu, click events, and 390px/desktop layouts after changes.