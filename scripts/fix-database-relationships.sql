-- Fix the database schema to ensure proper relationships

-- First, let's make sure the coaches table has the correct structure
ALTER TABLE coaches ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- Make sure workouts table has the correct foreign key reference
-- Drop the constraint if it exists and recreate it properly
DO $$ 
BEGIN
    -- Drop existing foreign key constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'workouts_trainer_id_fkey'
    ) THEN
        ALTER TABLE workouts DROP CONSTRAINT workouts_trainer_id_fkey;
    END IF;
    
    -- Add the foreign key constraint properly
    ALTER TABLE workouts 
    ADD CONSTRAINT workouts_trainer_id_fkey 
    FOREIGN KEY (trainer_id) REFERENCES coaches(id) ON DELETE SET NULL;
END $$;

-- Update any workouts that might have invalid trainer_id references
UPDATE workouts 
SET trainer_id = NULL 
WHERE trainer_id NOT IN (SELECT id FROM coaches);

-- Make sure we have some sample data
INSERT INTO coaches (name, specialization, description, experience_years, rating, price_per_hour, image_url) VALUES
('Алексей Петров', 'Силовые тренировки', 'Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.', 8, 4.9, 3000, '/placeholder.svg?height=300&width=300'),
('Мария Иванова', 'Йога и пилатес', 'Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.', 6, 5.0, 2500, '/placeholder.svg?height=300&width=300'),
('Дмитрий Козлов', 'Функциональный тренинг', 'Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.', 5, 4.8, 2800, '/placeholder.svg?height=300&width=300'),
('Анна Смирнова', 'Кардио и жиросжигание', 'Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.', 4, 4.7, 2200, '/placeholder.svg?height=300&width=300'),
('Игорь Волков', 'Единоборства', 'Мастер спорта по боксу. Обучает технике бокса и самообороне.', 10, 4.9, 3500, '/placeholder.svg?height=300&width=300'),
('Елена Новикова', 'Групповые программы', 'Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.', 7, 4.8, 2000, '/placeholder.svg?height=300&width=300')
ON CONFLICT (name) DO UPDATE SET
    specialization = EXCLUDED.specialization,
    description = EXCLUDED.description,
    experience_years = EXCLUDED.experience_years,
    rating = EXCLUDED.rating,
    price_per_hour = EXCLUDED.price_per_hour,
    image_url = EXCLUDED.image_url;

-- Insert sample workouts with proper trainer references
INSERT INTO workouts (title, description, duration, difficulty, category, trainer_id, image_url) VALUES
('Силовая тренировка', 'Комплексная тренировка для развития силы и мышечной массы', 60, 'Средний', 'Силовые', (SELECT id FROM coaches WHERE name = 'Алексей Петров' LIMIT 1), '/placeholder.svg?height=200&width=300'),
('HIIT тренировка', 'Высокоинтенсивная интервальная тренировка для жиросжигания', 45, 'Высокий', 'Кардио', (SELECT id FROM coaches WHERE name = 'Анна Смирнова' LIMIT 1), '/placeholder.svg?height=200&width=300'),
('Йога для начинающих', 'Мягкая практика йоги для улучшения гибкости и расслабления', 75, 'Легкий', 'Йога', (SELECT id FROM coaches WHERE name = 'Мария Иванова' LIMIT 1), '/placeholder.svg?height=200&width=300'),
('Функциональный тренинг', 'Тренировка движений, которые мы используем в повседневной жизни', 50, 'Средний', 'Функциональный', (SELECT id FROM coaches WHERE name = 'Дмитрий Козлов' LIMIT 1), '/placeholder.svg?height=200&width=300'),
('Пилатес', 'Укрепление мышц кора и улучшение осанки', 55, 'Легкий', 'Пилатес', (SELECT id FROM coaches WHERE name = 'Мария Иванова' LIMIT 1), '/placeholder.svg?height=200&width=300'),
('Бокс', 'Тренировка боксерских техник и кардио нагрузка', 60, 'Высокий', 'Единоборства', (SELECT id FROM coaches WHERE name = 'Игорь Волков' LIMIT 1), '/placeholder.svg?height=200&width=300')
ON CONFLICT (title) DO UPDATE SET
    description = EXCLUDED.description,
    duration = EXCLUDED.duration,
    difficulty = EXCLUDED.difficulty,
    category = EXCLUDED.category,
    trainer_id = EXCLUDED.trainer_id,
    image_url = EXCLUDED.image_url;
