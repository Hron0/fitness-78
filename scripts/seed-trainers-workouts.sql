-- Insert trainers (coaches)
INSERT INTO coaches (name, specialization, description, experience_years, rating, price_per_hour) VALUES
('Алексей Петров', 'Силовые тренировки', 'Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.', 8, 4.9, 3000),
('Мария Иванова', 'Йога и пилатес', 'Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.', 6, 5.0, 2500),
('Дмитрий Козлов', 'Функциональный тренинг', 'Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.', 5, 4.8, 2800),
('Анна Смирнова', 'Кардио и жиросжигание', 'Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.', 4, 4.7, 2200),
('Игорь Волков', 'Единоборства', 'Мастер спорта по боксу. Обучает технике бокса и самообороне.', 10, 4.9, 3500),
('Елена Новикова', 'Групповые программы', 'Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.', 7, 4.8, 2000)
ON CONFLICT (name) DO NOTHING;

-- Insert workouts
INSERT INTO workouts (title, description, duration, difficulty, category) VALUES
('Силовая тренировка', 'Комплексная тренировка для развития силы и мышечной массы', 60, 'Средний', 'Силовые'),
('HIIT тренировка', 'Высокоинтенсивная интервальная тренировка для жиросжигания', 45, 'Высокий', 'Кардио'),
('Йога для начинающих', 'Мягкая практика йоги для улучшения гибкости и расслабления', 75, 'Легкий', 'Йога'),
('Функциональный тренинг', 'Тренировка движений, которые мы используем в повседневной жизни', 50, 'Средний', 'Функциональный'),
('Пилатес', 'Укрепление мышц кора и улучшение осанки', 55, 'Легкий', 'Пилатес'),
('Бокс', 'Тренировка боксерских техник и кардио нагрузка', 60, 'Высокий', 'Единоборства')
ON CONFLICT (title) DO NOTHING;

-- Update workouts with trainer assignments (assuming trainers exist)
UPDATE workouts SET trainer_id = (SELECT id FROM coaches WHERE name = 'Алексей Петров' LIMIT 1) WHERE title = 'Силовая тренировка';
UPDATE workouts SET trainer_id = (SELECT id FROM coaches WHERE name = 'Анна Смирнова' LIMIT 1) WHERE title = 'HIIT тренировка';
UPDATE workouts SET trainer_id = (SELECT id FROM coaches WHERE name = 'Мария Иванова' LIMIT 1) WHERE title = 'Йога для начинающих';
UPDATE workouts SET trainer_id = (SELECT id FROM coaches WHERE name = 'Дмитрий Козлов' LIMIT 1) WHERE title = 'Функциональный тренинг';
UPDATE workouts SET trainer_id = (SELECT id FROM coaches WHERE name = 'Мария Иванова' LIMIT 1) WHERE title = 'Пилатес';
UPDATE workouts SET trainer_id = (SELECT id FROM coaches WHERE name = 'Игорь Волков' LIMIT 1) WHERE title = 'Бокс';
