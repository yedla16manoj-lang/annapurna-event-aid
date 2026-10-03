CREATE TABLE public.event_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 100),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 10 AND 15),
  event_type TEXT NOT NULL CHECK (char_length(event_type) BETWEEN 2 AND 80),
  event_date DATE,
  guest_count INTEGER CHECK (guest_count IS NULL OR (guest_count BETWEEN 1 AND 100000)),
  services TEXT[] NOT NULL DEFAULT '{}',
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1500),
  language TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'te')),
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.event_enquiries TO service_role;
ALTER TABLE public.event_enquiries ENABLE ROW LEVEL SECURITY;