# Annapurna Lead-Generation Website

## Overview
Build a polished, mobile-first bilingual website for Annapurna Tent House and Caterings. The experience will use a premium traditional Indian visual identity, real business details, realistic event imagery, and strong enquiry actions throughout.

## Website structure
- Build one smooth-scrolling home experience with anchored sections: Home, About, Catering, Tent & Equipment, Events, Gallery, and Contact.
- Add a sticky desktop/mobile header, compact bilingual text logo, hamburger navigation, and visible EN / తెలుగు switch.
- Add a mobile bottom action bar for Call, WhatsApp, and Quote, plus a floating WhatsApp action.
- Keep every key action functional: phone dialer, pre-filled WhatsApp enquiry, email link, section navigation, and enquiry-form focus.

## Visual direction
- Use deep wine/maroon as the primary brand color, restrained saffron-gold detailing, ivory surfaces, charcoal text, and subtle green accents.
- Pair a refined English display face with a highly readable Telugu Unicode face.
- Use subtle Indian border/pattern motifs as accents rather than heavy decoration.
- Generate a coordinated set of realistic Indian wedding, Andhra food, buffet, tent, seating, cooking, serving, and family-function images; optimize and lazy-load supporting imagery.
- Use restrained section reveals and tactile card/button interactions, respecting reduced-motion preferences.

## Content and conversion flow
- Create the requested hero, service trust strip, about, catering categories, equipment services, event types, practical benefits, sample gallery, enquiry area, contact details, and full footer.
- Preserve the supplied claims and business details without inventing awards, rankings, exact menus, coordinates, response times, or policies.
- Clearly label the gallery as sample imagery that should be replaced with real business photos.
- Add a map-ready location panel without fabricated coordinates or a false verified listing.

## Telugu support
- Translate navigation, major headings, key marketing copy, service labels, form labels/options, CTAs, success feedback, and footer content into natural Andhra Telugu.
- Keep the business name, phone number, email address, and factual location details unchanged where appropriate.
- Make language switching immediate and preserve the selected language during the visit.

## Enquiry handling
- Store every valid enquiry in Lovable Cloud with name, phone, event type/date, guest count, selected services, message, language, and submission time.
- Keep submissions private: public visitors may submit, but cannot view, edit, or delete enquiries.
- Add server-side validation and basic abuse protection alongside clear front-end validation and success/error states.
- Verify the flow by submitting a test enquiry, confirming it reached the database, and removing only that test row.
- Email notifications are not included in this version; enquiries will be available under Cloud → Database → `event_enquiries`.

## SEO and accessibility
- Add route-specific title, description, Open Graph fields, Twitter card metadata, canonical URL, and LocalBusiness/FoodEstablishment structured data using only verified information.
- Use semantic heading order, useful image alternatives, keyboard-accessible controls, visible focus states, and correctly labelled fields.
- Keep the first screen lightweight and prevent layout shift or horizontal overflow across phone, tablet, and desktop sizes.

## Technical approach
- Implement the site in the existing TanStack Start and Tailwind v4 project.
- Keep visual values in semantic design tokens and split the long page into focused reusable sections/data modules.
- Use a server function for validated enquiry submission and a locked-down Cloud table for storage.
- Record the site’s structural decisions in `AGENTS.md` and verify the finished flow in mobile and desktop browser sizes.
