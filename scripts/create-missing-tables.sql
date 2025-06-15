-- Create coaches table if it doesn't exist (based on the schema you provided)
CREATE TABLE IF NOT EXISTS coaches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    description TEXT,
    experience_years INTEGER DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 0.0,
    price_per_hour INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workouts table if it doesn't exist
CREATE TABLE IF NOT EXISTS workouts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER DEFAULT 0,
    difficulty VARCHAR(50) DEFAULT 'beginner',
    category VARCHAR(255) DEFAULT 'General',
    trainer_id INTEGER REFERENCES coaches(id),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Update users table to add missing columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Update bookings table to use correct column names
DO $$ 
BEGIN
    -- Add trainer_id column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'trainer_id') THEN
        ALTER TABLE bookings ADD COLUMN trainer_id INTEGER REFERENCES coaches(id);
    END IF;
    
    -- If coach_id exists, copy data to trainer_id and drop coach_id
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'coach_id') THEN
        UPDATE bookings SET trainer_id = coach_id WHERE trainer_id IS NULL;
        ALTER TABLE bookings DROP COLUMN coach_id;
    END IF;
END $$;

-- Add booking_time column to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_time VARCHAR(10);
