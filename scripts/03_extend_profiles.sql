-- Extend profiles table with additional user information
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS mobile_number TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS pin_code TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Create wishlist table to store user course interests
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist_items table to store individual course interests
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES public.wishlists(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  course_name TEXT NOT NULL,
  course_price_cents INTEGER,
  course_level TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on wishlists table
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own wishlists
CREATE POLICY "users_can_view_own_wishlists" ON public.wishlists
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to create their own wishlists
CREATE POLICY "users_can_create_wishlists" ON public.wishlists
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own wishlists
CREATE POLICY "users_can_update_wishlists" ON public.wishlists
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own wishlists
CREATE POLICY "users_can_delete_wishlists" ON public.wishlists
  FOR DELETE
  USING (auth.uid() = user_id);

-- Enable RLS on wishlist_items table
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view items in their wishlists
CREATE POLICY "users_can_view_own_wishlist_items" ON public.wishlist_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.wishlists w
      WHERE w.id = wishlist_items.wishlist_id
      AND w.user_id = auth.uid()
    )
  );

-- Create policy to allow users to insert items in their wishlists
CREATE POLICY "users_can_add_wishlist_items" ON public.wishlist_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.wishlists w
      WHERE w.id = wishlist_items.wishlist_id
      AND w.user_id = auth.uid()
    )
  );

-- Create policy to allow users to delete items from their wishlists
CREATE POLICY "users_can_delete_wishlist_items" ON public.wishlist_items
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.wishlists w
      WHERE w.id = wishlist_items.wishlist_id
      AND w.user_id = auth.uid()
    )
  );

-- Create function to automatically create wishlist on signup
CREATE OR REPLACE FUNCTION public.create_wishlist_for_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wishlists (user_id)
  VALUES (NEW.user_id)
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger to auto-create wishlist
DROP TRIGGER IF EXISTS create_wishlist_on_profile_creation ON public.profiles;
CREATE TRIGGER create_wishlist_on_profile_creation
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_wishlist_for_user();

-- Create index for faster wishlist lookups
CREATE INDEX IF NOT EXISTS wishlist_user_id_idx ON public.wishlists(user_id);
CREATE INDEX IF NOT EXISTS wishlist_items_wishlist_id_idx ON public.wishlist_items(wishlist_id);
CREATE INDEX IF NOT EXISTS wishlist_items_course_id_idx ON public.wishlist_items(course_id);
