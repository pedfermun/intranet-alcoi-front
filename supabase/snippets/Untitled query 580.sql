  DROP VIEW IF EXISTS public.users CASCADE;
  CREATE VIEW public.users WITH (security_invoker = false) AS
  SELECT
    u.id,
    COALESCE(u.raw_user_meta_data->>'name',   split_part(u.email, '@', 1)) AS name,
    COALESCE(u.raw_user_meta_data->>'role',   '')       AS role,
    COALESCE(u.raw_user_meta_data->>'avatar', '')       AS avatar,
    COALESCE(u.raw_user_meta_data->>'tone',   'brand')  AS tone
  FROM auth.users u;
  GRANT SELECT ON public.users TO authenticated;