-- Add missing columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Create contact_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update bookings table to use trainer_id instead of coach_id (for consistency)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'coach_id') THEN
        ALTER TABLE bookings RENAME COLUMN coach_id TO trainer_id;
    END IF;
END $$;

-- Rename coaches table to trainers for consistency
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'coaches') THEN
        ALTER TABLE coaches RENAME TO trainers;
    END IF;
END $$;

-- Update trainers table column names to match code expectations
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'trainers' AND column_name = 'experience_years') THEN
        ALTER TABLE trainers RENAME COLUMN experience_years TO experience;
    END IF;
END $$;

-- Add missing columns to workouts table
ALTER TABLE workouts ADD COLUMN IF NOT EXISTS category VARCHAR(255) DEFAULT 'General';
ALTER TABLE workouts ADD COLUMN IF NOT EXISTS trainer_id INTEGER REFERENCES trainers(id);
ALTER TABLE workouts ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Add missing columns to trainers table
ALTER TABLE trainers ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Add booking_time column to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_time VARCHAR(10);
