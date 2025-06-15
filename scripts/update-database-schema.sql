-- Add foreign key constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'workouts_trainer_id_fkey'
    ) THEN
        ALTER TABLE workouts 
        ADD CONSTRAINT workouts_trainer_id_fkey 
        FOREIGN KEY (trainer_id) REFERENCES coaches(id);
    END IF;
END $$;
