-- Make image_url columns big enough to hold Base-64 data-URLs
-- Run this once in the Supabase SQL editor (or include in your next reset).

-- Add the column if it doesn't exist, then widen it to TEXT
ALTER TABLE coaches
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ALTER COLUMN image_url TYPE TEXT;

ALTER TABLE workouts
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ALTER COLUMN image_url TYPE TEXT;
