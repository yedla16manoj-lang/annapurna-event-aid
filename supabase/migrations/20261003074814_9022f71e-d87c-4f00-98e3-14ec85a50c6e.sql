CREATE POLICY "Event enquiries are private"
ON public.event_enquiries
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);