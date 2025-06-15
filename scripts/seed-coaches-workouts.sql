-- Insert sample coaches data
INSERT INTO coaches (name, specialization, description, experience_years, rating, price_per_hour, image_url) VALUES
('Алексей Петров', 'Силовые тренировки', 'Мастер спорта по пауэрлифтингу. Специализируется на наборе мышечной массы и увеличении силовых показателей.', 8, 4.9, 3000, '/assets/images/trainers/dmitry.jpg'),
('Мария Иванова', 'Йога и пилатес', 'Сертифицированный инструктор йоги. Поможет улучшить гибкость, осанку и найти внутреннюю гармонию.', 6, 5.0, 2500, '/assets/images/trainers/maria.jpg'),
('Дмитрий Козлов', 'Функциональный тренинг', 'Эксперт по функциональным движениям. Специализируется на реабилитации и профилактике травм.', 5, 4.8, 2800, '/assets/images/trainers/dmitry.jpg'),
('Анна Смирнова', 'Кардио и жиросжигание', 'Специалист по снижению веса и кардио тренировкам. Поможет достичь идеальной формы.', 4, 4.7, 2200, '/assets/images/trainers/elena.jpg'),
('Игорь Волков', 'Единоборства', 'Мастер спорта по боксу. Обучает технике бокса и самообороне.', 10, 4.9, 3500, '/assets/images/trainers/igor.jpg'),
('Елена Новикова', 'Групповые программы', 'Ведущий инструктор групповых программ. Создает мотивирующую атмосферу на занятиях.', 7, 4.8, 2000, '/assets/images/trainers/elena.jpg')
ON CONFLICT DO NOTHING;

-- Insert sample workouts data
INSERT INTO workouts (title, description, duration, difficulty, category, trainer_id, image_url) VALUES
('Силовая тренировка для начинающих', 'Базовая программа для развития силы и мышечной массы', 60, 'beginner', 'Силовые тренировки', 1, '/assets/images/workouts/strength.jpg'),
('Хатха-йога', 'Классическая йога для улучшения гибкости и баланса', 90, 'beginner', 'Йога', 2, '/assets/images/workouts/pilates.jpg'),
('Функциональный тренинг', 'Комплексная тренировка для развития функциональной силы', 45, 'intermediate', 'Функциональный тренинг', 3, '/assets/images/workouts/functional.jpg'),
('HIIT кардио', 'Высокоинтенсивная интервальная тренировка для жиросжигания', 30, 'advanced', 'Кардио', 4, '/assets/images/workouts/hiit.jpg'),
('Бокс для начинающих', 'Основы бокса и самообороны', 60, 'beginner', 'Единоборства', 5, '/assets/images/workouts/boxing.jpg'),
('Групповая аэробика', 'Энергичная групповая тренировка под музыку', 45, 'intermediate', 'Групповые программы', 6, '/assets/images/workouts/hiit.jpg')
ON CONFLICT DO NOTHING;

-- Create admin user
INSERT INTO users (name, email, password, role) VALUES
('Администратор', 'admin@fitness.com', '$2b$10$rQJ5qP7QzQJ5qP7QzQJ5qOzQJ5qP7QzQJ5qP7QzQJ5qP7QzQJ5qP7Q', 'admin')
ON CONFLICT (email) DO NOTHING;
