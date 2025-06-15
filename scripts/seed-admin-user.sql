-- Insert admin user
INSERT INTO users (name, email, phone, password, role, created_at, updated_at)
VALUES (
    'Администратор',
    'admin@fitness.com',
    '+7 (999) 000-00-00',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for '132132132'
    'admin',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,
    password = EXCLUDED.password,
    role = EXCLUDED.role,
    updated_at = NOW();

-- Insert sample trainers
INSERT INTO trainers (name, specialization, description, experience, rating, price_per_hour, image_url, created_at, updated_at)
VALUES 
    ('Дмитрий Петров', 'Силовые тренировки', 'Опытный тренер по силовым тренировкам с 8-летним стажем', 8, 4.9, 2500, '/assets/images/trainers/dmitry.jpg', NOW(), NOW()),
    ('Елена Смирнова', 'Йога и пилатес', 'Сертифицированный инструктор по йоге и пилатесу', 6, 4.8, 2000, '/assets/images/trainers/elena.jpg', NOW(), NOW()),
    ('Игорь Волков', 'Кроссфит', 'Специалист по функциональным тренировкам и кроссфиту', 5, 4.7, 2200, '/assets/images/trainers/igor.jpg', NOW(), NOW()),
    ('Мария Козлова', 'Фитнес и аэробика', 'Тренер групповых программ и персональных тренировок', 7, 4.9, 1800, '/assets/images/trainers/maria.jpg', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert sample workouts
INSERT INTO workouts (title, description, duration, difficulty, category, trainer_id, image_url, created_at, updated_at)
VALUES 
    ('Силовая тренировка', 'Комплексная тренировка для развития силы и мышечной массы', 60, 'Средний', 'Силовые', 1, '/assets/images/workouts/strength.jpg', NOW(), NOW()),
    ('HIIT тренировка', 'Высокоинтенсивная интервальная тренировка для жиросжигания', 45, 'Высокий', 'Кардио', 3, '/assets/images/workouts/hiit.jpg', NOW(), NOW()),
    ('Йога для начинающих', 'Мягкая практика йоги для новичков', 60, 'Легкий', 'Йога', 2, '/assets/images/workouts/pilates.jpg', NOW(), NOW()),
    ('Функциональный тренинг', 'Тренировка функциональных движений', 50, 'Средний', 'Функциональный', 3, '/assets/images/workouts/functional.jpg', NOW(), NOW()),
    ('Бокс для фитнеса', 'Кардио-тренировка с элементами бокса', 55, 'Высокий', 'Бокс', 4, '/assets/images/workouts/boxing.jpg', NOW(), NOW())
ON CONFLICT (title) DO NOTHING;
