
-- Drop the overly permissive policy
DROP POLICY "Allow service role full access" ON public.orders;

-- No public policies needed - edge function uses service role which bypasses RLS
-- Add a restrictive policy that blocks all direct access
CREATE POLICY "No direct access" ON public.orders
  FOR SELECT USING (false);
