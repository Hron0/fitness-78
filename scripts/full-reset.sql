-- Complete database reset and setup
-- Run this script to completely reset and populate your database

-- Step 1: Reset the database
\i scripts/reset-database.sql

-- Step 2: Seed with data
\i scripts/seed-all-data.sql

-- Verify the setup
SELECT 'Users:' as table_name, count(*) as count FROM users
UNION ALL
SELECT 'Coaches:', count(*) FROM coaches
UNION ALL
SELECT 'Workouts:', count(*) FROM workouts
UNION ALL
SELECT 'Bookings:', count(*) FROM bookings
UNION ALL
SELECT 'Messages:', count(*) FROM contact_messages;
